-- Allow public uploads to images bucket
CREATE POLICY "Allow public uploads"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'images');

-- Allow public reads from images bucket  
CREATE POLICY "Allow public reads"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'images');
