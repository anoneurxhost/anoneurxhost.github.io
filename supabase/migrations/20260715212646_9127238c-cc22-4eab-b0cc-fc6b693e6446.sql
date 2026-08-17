
CREATE TABLE public.team_portfolios (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  department TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  tagline TEXT NOT NULL DEFAULT '',
  photo TEXT NOT NULL DEFAULT '',
  location TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  availability_status TEXT NOT NULL DEFAULT 'open',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.team_portfolios TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_portfolios TO authenticated;
GRANT ALL ON public.team_portfolios TO service_role;

ALTER TABLE public.team_portfolios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read team portfolios" ON public.team_portfolios FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated insert team portfolios" ON public.team_portfolios FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update team portfolios" ON public.team_portfolios FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated delete team portfolios" ON public.team_portfolios FOR DELETE TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.tp_touch_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER team_portfolios_touch BEFORE UPDATE ON public.team_portfolios
FOR EACH ROW EXECUTE FUNCTION public.tp_touch_updated_at();

CREATE INDEX team_portfolios_department_idx ON public.team_portfolios (department);
CREATE INDEX team_portfolios_updated_at_idx ON public.team_portfolios (updated_at DESC);
