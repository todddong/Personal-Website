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

async function checkBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  
  if (listError) {
    if (listError.message.includes('permission') || listError.message.includes('policy')) {
      console.log('⚠ Cannot list buckets with anon key. Checking if bucket exists by attempting upload...');
      return 'unknown';
    }
    console.error('Error listing buckets:', listError);
    return false;
  }

  const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);
  if (bucketExists) {
    console.log(`✓ Bucket "${BUCKET_NAME}" exists`);
    return true;
  }

  console.log(`⚠ Bucket "${BUCKET_NAME}" does not exist.`);
  console.log('Please create it manually in Supabase Dashboard:');
  console.log('1. Go to https://supabase.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to Storage → New bucket');
  console.log(`4. Name: "${BUCKET_NAME}"`);
  console.log('5. Set to Public');
  console.log('6. Click Create\n');
  return false;
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
    console.error(`✗ Error uploading ${supabasePath}:`, error.message);
    return false;
  }

  console.log(`✓ Uploaded: ${supabasePath}`);
  return true;
}

async function testBucketAccess() {
  const testPath = 'test-access.txt';
  const testContent = Buffer.from('test');
  
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(testPath, testContent, { upsert: true });
  
  if (uploadError) {
    if (uploadError.message.includes('not found') || uploadError.message.includes('Bucket')) {
      return false;
    }
  }
  
  await supabase.storage.from(BUCKET_NAME).remove([testPath]);
  return true;
}

async function main() {
  console.log('Starting Supabase Storage setup...\n');

  const bucketStatus = await checkBucket();
  if (bucketStatus === false) {
    console.log('Waiting for bucket to be created...');
    console.log('After creating the bucket, run this script again.\n');
    process.exit(1);
  }

  if (bucketStatus === 'unknown') {
    const hasAccess = await testBucketAccess();
    if (!hasAccess) {
      console.log('⚠ Cannot access bucket. Please ensure:');
      console.log(`1. Bucket "${BUCKET_NAME}" exists in Supabase Dashboard`);
      console.log('2. Bucket is set to Public');
      console.log('3. RLS policies allow public access\n');
      process.exit(1);
    }
    console.log(`✓ Bucket "${BUCKET_NAME}" is accessible\n`);
  }

  console.log(`\nScanning ${MEDIA_DIR}...`);
  const imageFiles = getAllImageFiles(MEDIA_DIR, MEDIA_DIR);
  console.log(`Found ${imageFiles.length} image files\n`);

  let successCount = 0;
  let failCount = 0;

  for (const { localPath, supabasePath } of imageFiles) {
    const success = await uploadFile(localPath, supabasePath);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n✓ Upload complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
  console.log(`\nImages are now available at: ${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/`);
}

main().catch(console.error);
