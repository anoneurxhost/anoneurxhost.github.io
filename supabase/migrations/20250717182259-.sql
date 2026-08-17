-- Create intern applications table
CREATE TABLE public.intern_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  university TEXT NOT NULL,
  program TEXT NOT NULL,
  year_of_study TEXT,
  skills TEXT,
  motivation TEXT,
  status TEXT NOT NULL DEFAULT 'Under Review' CHECK (status IN ('Under Review', 'Accepted', 'Rejected', 'Published')),
  submitted_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expected_decision TIMESTAMP WITH TIME ZONE,
  cover_letter TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.intern_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since anyone can apply)
CREATE POLICY "Anyone can create applications" 
ON public.intern_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view applications" 
ON public.intern_applications 
FOR SELECT 
USING (true);

-- Create policies for authenticated users to update applications
CREATE POLICY "Authenticated users can update applications" 
ON public.intern_applications 
FOR UPDATE 
USING (true);

-- Create function to auto-generate application ID
CREATE OR REPLACE FUNCTION generate_application_id() RETURNS TEXT AS $$
DECLARE
  year_part TEXT := date_part('year', now())::TEXT;
  sequence_num TEXT;
BEGIN
  SELECT LPAD((COALESCE(MAX(CAST(SUBSTRING(application_id FROM 10) AS INTEGER)), 0) + 1)::TEXT, 3, '0')
  INTO sequence_num
  FROM public.intern_applications
  WHERE application_id LIKE 'INT-' || year_part || '-%';
  
  RETURN 'INT-' || year_part || '-' || sequence_num;
END;
$$ LANGUAGE plpgsql;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_intern_applications_updated_at
BEFORE UPDATE ON public.intern_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-generate application ID
CREATE OR REPLACE FUNCTION set_application_id() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.application_id IS NULL OR NEW.application_id = '' THEN
    NEW.application_id := generate_application_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_application_id_trigger
BEFORE INSERT ON public.intern_applications
FOR EACH ROW
EXECUTE FUNCTION set_application_id();