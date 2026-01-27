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

  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(supabasePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      if (error.message.includes('not found') || error.message.includes('Bucket')) {
        console.error(`✗ Bucket "${BUCKET_NAME}" not found`);
        return false;
      }
      console.error(`✗ ${supabasePath}: ${error.message}`);
      return false;
    }

    console.log(`✓ ${supabasePath}`);
    return true;
  } catch (err: any) {
    console.error(`✗ ${supabasePath}: ${err.message || 'Unknown error'}`);
    return false;
  }
}

async function main() {
  console.log('Uploading images to Supabase Storage...\n');
  console.log('Note: If you see RLS policy errors, you need to:');
  console.log('1. Go to Supabase Dashboard → Storage → Policies');
  console.log('2. For the "images" bucket, create a policy that allows:');
  console.log('   - INSERT for authenticated users OR anon role');
  console.log('   - SELECT for anon role (public read)\n');

  console.log(`Scanning ${MEDIA_DIR}...`);
  const imageFiles = getAllImageFiles(MEDIA_DIR, MEDIA_DIR);
  console.log(`Found ${imageFiles.length} image files\n`);

  let successCount = 0;
  let failCount = 0;
  const failedFiles: string[] = [];

  for (const { localPath, supabasePath } of imageFiles) {
    const success = await uploadFile(localPath, supabasePath);
    if (success) {
      successCount++;
    } else {
      failCount++;
      failedFiles.push(supabasePath);
    }
  }

  console.log(`\n✓ Upload complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failCount}`);

  if (failedFiles.length > 0 && failedFiles.some(f => f.includes('row-level security'))) {
    console.log('\n⚠ RLS Policy Issue Detected');
    console.log('To fix, run this SQL in Supabase SQL Editor:');
    console.log(`
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'images');
    `);
  }

  if (successCount > 0) {
    console.log(`\n✓ Images available at: ${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`);
  }
}

main().catch(console.error);
