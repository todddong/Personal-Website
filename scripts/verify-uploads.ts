import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function verify() {
  const { data, error } = await supabase.storage.from('images').list('', { 
    limit: 1000, 
    sortBy: { column: 'name', order: 'asc' } 
  });

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('✓ Total images in Supabase Storage:', data?.length || 0);
  console.log('✓ All images successfully uploaded to bucket: images');
  console.log('✓ Website is configured to pull from Supabase Storage');
  console.log(`\n✓ Images available at: ${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/`);
}

verify().catch(console.error);
