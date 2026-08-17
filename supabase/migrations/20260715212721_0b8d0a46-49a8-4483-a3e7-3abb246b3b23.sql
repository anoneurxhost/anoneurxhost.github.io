
CREATE POLICY "team-media public read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'team-media');
CREATE POLICY "team-media auth insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'team-media');
CREATE POLICY "team-media auth update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'team-media') WITH CHECK (bucket_id = 'team-media');
CREATE POLICY "team-media auth delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'team-media');
