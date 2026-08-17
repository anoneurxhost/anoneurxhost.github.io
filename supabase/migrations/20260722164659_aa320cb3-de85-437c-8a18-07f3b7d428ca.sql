
-- 1. Role enum
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('ceo','hr','hod','user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 3. has_role helper (SECURITY DEFINER, avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 4. Replace team_portfolios write policies with role-gated ones
DROP POLICY IF EXISTS "Authenticated insert team portfolios" ON public.team_portfolios;
DROP POLICY IF EXISTS "Authenticated update team portfolios" ON public.team_portfolios;
DROP POLICY IF EXISTS "Authenticated delete team portfolios" ON public.team_portfolios;

CREATE POLICY "Admins insert team portfolios"
  ON public.team_portfolios FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'ceo')
    OR public.has_role(auth.uid(), 'hr')
    OR public.has_role(auth.uid(), 'hod')
  );

CREATE POLICY "Admins update team portfolios"
  ON public.team_portfolios FOR UPDATE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'ceo')
    OR public.has_role(auth.uid(), 'hr')
    OR public.has_role(auth.uid(), 'hod')
  )
  WITH CHECK (
    public.has_role(auth.uid(), 'ceo')
    OR public.has_role(auth.uid(), 'hr')
    OR public.has_role(auth.uid(), 'hod')
  );

CREATE POLICY "Admins delete team portfolios"
  ON public.team_portfolios FOR DELETE
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'ceo')
    OR public.has_role(auth.uid(), 'hr')
    OR public.has_role(auth.uid(), 'hod')
  );
