import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const BUCKET_NAME = 'images';
const MEDIA_DIR = path.join(process.cwd(), 'public', 'media');

async function checkBucketExists(): Promise<boolean> {
  try {
    const testPath = '__bucket_check__';
    const testContent = Buffer.from('test');
    
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(testPath, testContent, { upsert: true });
    
    if (error) {
      if (error.message.includes('not found') || error.message.includes('Bucket')) {
        return false;
      }
    }
    
    await supabase.storage.from(BUCKET_NAME).remove([testPath]);
    return true;
  } catch {
    return false;
  }
}

function getAllImageFiles(dir: string, baseDir: string = dir): Array<{ localPath: string; supabasePath: string }> {
  const files: Array<{ localPath: string; supabasePath: string }> = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getAllImageFiles(fullPath, baseDir));
    } else if (/\.(jpg|jpeg|png|gif|webp|PNG)$/i.test(item)) {
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      files.push({
        localPath: fullPath,
        supabasePath: relativePath,
      });
    }
  }

  return files;
}

function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const contentTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return contentTypes[ext] || 'image/jpeg';
}

async function uploadFile(localPath: string, supabasePath: string): Promise<boolean> {
  if (!fs.existsSync(localPath)) {
    console.error(`File not found: ${localPath}`);
    return false;
  }

  const fileBuffer = fs.readFileSync(localPath);
  const contentType = getContentType(supabasePath);

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(supabasePath, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    if (error.message.includes('not found') || error.message.includes('Bucket')) {
      console.error(`✗ Bucket "${BUCKET_NAME}" not found. Please create it first.`);
      return false;
    }
    console.error(`✗ Error uploading ${supabasePath}:`, error.message);
    return false;
  }

  console.log(`✓ Uploaded: ${supabasePath}`);
  return true;
}

async function verifyUpload(supabasePath: string): Promise<boolean> {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(supabasePath);

  if (!data?.publicUrl) {
    return false;
  }

  try {
    const response = await fetch(data.publicUrl, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function main() {
  console.log('Starting Supabase Storage upload...\n');

  const bucketExists = await checkBucketExists();
  if (!bucketExists) {
    console.log(`\n✗ Bucket "${BUCKET_NAME}" not found or not accessible.`);
    console.log('Please ensure:');
    console.log(`1. Bucket "${BUCKET_NAME}" exists in Supabase Dashboard`);
    console.log('2. Bucket is set to Public');
    console.log('3. RLS policies allow public access\n');
    process.exit(1);
  }

  console.log(`✓ Bucket "${BUCKET_NAME}" is accessible\n`);

  console.log(`\nScanning ${MEDIA_DIR}...`);
  const imageFiles = getAllImageFiles(MEDIA_DIR, MEDIA_DIR);
  console.log(`Found ${imageFiles.length} image files\n`);

  let successCount = 0;
  let failCount = 0;

  for (const { localPath, supabasePath } of imageFiles) {
    const success = await uploadFile(localPath, supabasePath);
    if (success) {
      const verified = await verifyUpload(supabasePath);
      if (verified) {
        successCount++;
      } else {
        console.log(`  ⚠ Uploaded but verification failed: ${supabasePath}`);
        successCount++;
      }
    } else {
      failCount++;
    }
  }

  console.log(`\n✓ Upload complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
  console.log(`\n✓ Images available at: ${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`);
  console.log('\n✓ Website is configured to pull images from Supabase Storage');
}

main().catch(console.error);
