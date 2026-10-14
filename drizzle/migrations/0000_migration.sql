CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  subject text CHECK (char_length(subject) <= 200),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit contact" ON public.contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.walk_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text NOT NULL CHECK (char_length(event_id) <= 60),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (char_length(phone) <= 30),
  dog_name text CHECK (char_length(dog_name) <= 80),
  participants int NOT NULL DEFAULT 1 CHECK (participants BETWEEN 1 AND 10),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.walk_registrations TO anon, authenticated;
GRANT ALL ON public.walk_registrations TO service_role;
ALTER TABLE public.walk_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can register" ON public.walk_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);