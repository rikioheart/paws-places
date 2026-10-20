CREATE TABLE public.first_contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  audience text NOT NULL CHECK (audience IN ('particulier','professionnel')),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb
);
GRANT INSERT ON public.first_contact_requests TO anon, authenticated;
GRANT ALL ON public.first_contact_requests TO service_role;
ALTER TABLE public.first_contact_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit" ON public.first_contact_requests FOR INSERT TO anon, authenticated WITH CHECK (true);