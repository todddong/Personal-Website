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

const failedFiles = [
  'alaska/alaksa-5.jpg',
  'general/yosemite.jpg',
  'logos/cmu.jpg',
];

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

async function uploadFile(supabasePath: string): Promise<boolean> {
  const localPath = path.join(MEDIA_DIR, supabasePath);
  
  if (!fs.existsSync(localPath)) {
    console.error(`✗ File not found: ${localPath}`);
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
  console.log('Retrying failed uploads...\n');

  let successCount = 0;
  let failCount = 0;

  for (const file of failedFiles) {
    const success = await uploadFile(file);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log(`\n✓ Retry complete!`);
  console.log(`  Success: ${successCount}`);
  console.log(`  Failed: ${failCount}`);
}

main().catch(console.error);
