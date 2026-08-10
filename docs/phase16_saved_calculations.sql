-- PHASE 16: SAVED CALCULATIONS + COMPARISON SYSTEM SCHEMA

-- 1. SAVED CALCULATIONS TABLE
CREATE TABLE public.saved_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    calculator_id TEXT NOT NULL, -- Logical ID from registry
    calculator_slug TEXT NOT NULL,
    name TEXT NOT NULL,
    inputs JSONB NOT NULL,
    results JSONB NOT NULL,
    country TEXT,
    location_context JSONB, -- For ZIP/PIN code etc
    currency TEXT,
    units TEXT, -- metric/imperial
    formula_version TEXT NOT NULL,
    share_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indices for common searches/filters
CREATE INDEX idx_saved_calculations_user_id ON public.saved_calculations(user_id);
CREATE INDEX idx_saved_calculations_calculator_id ON public.saved_calculations(calculator_id);
CREATE INDEX idx_saved_calculations_country ON public.saved_calculations(country);
CREATE INDEX idx_saved_calculations_share_token ON public.saved_calculations(share_token);

-- Permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_calculations TO authenticated;
GRANT ALL ON public.saved_calculations TO service_role;
-- Allow anonymous SELECT only if a policy permits (for sharing)
GRANT SELECT ON public.saved_calculations TO anon;

-- RLS Policies
ALTER TABLE public.saved_calculations ENABLE ROW LEVEL SECURITY;

-- Users can manage their own calculations
CREATE POLICY "Users can view their own calculations"
ON public.saved_calculations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own calculations"
ON public.saved_calculations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own calculations"
ON public.saved_calculations FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculations"
ON public.saved_calculations FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Public sharing policy
CREATE POLICY "Anyone can view shared calculations"
ON public.saved_calculations FOR SELECT
TO anon, authenticated
USING (is_public = true);

-- Admins can view everything (assuming has_role exists from Phase 14)
CREATE POLICY "Admins can view all calculations"
ON public.saved_calculations FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_saved_calculations_updated_at 
BEFORE UPDATE ON public.saved_calculations 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
