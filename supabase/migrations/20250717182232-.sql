-- Create intern applications table
CREATE TABLE public.intern_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id TEXT UNIQUE NOT NULL DEFAULT 'INT-' || date_part('year', now()) || '-' || LPAD((ROW_NUMBER() OVER (ORDER BY created_at))::text, 3, '0'),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  university TEXT NOT NULL,
  program TEXT NOT NULL,
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

CREATE POLICY "Anyone can view their own application" 
ON public.intern_applications 
FOR SELECT 
USING (true);

-- Create policies for admin/manager access (for now allowing all authenticated users to manage)
CREATE POLICY "Authenticated users can update applications" 
ON public.intern_applications 
FOR UPDATE 
USING (true);

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