-- PHASE 14: ADMIN CALCULATOR MANAGEMENT SCHEMA
-- This migration adds the tables for managing calculators, categories, and redirects via the admin dashboard.

-- 1. CALCULATOR CATEGORIES
CREATE TABLE public.calculator_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.calculator_categories TO authenticated;
GRANT ALL ON public.calculator_categories TO service_role;

ALTER TABLE public.calculator_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage categories" ON public.calculator_categories
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view categories" ON public.calculator_categories
    FOR SELECT USING (true);

-- 2. CALCULATORS (Extended Registry)
CREATE TABLE public.calculators (
    id TEXT PRIMARY KEY, -- The ID from registry.ts
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID REFERENCES public.calculator_categories(id),
    status TEXT NOT NULL DEFAULT 'draft', -- draft, review, published, noindex, disabled
    countries TEXT[] DEFAULT '{}',
    meta_title TEXT,
    meta_description TEXT,
    h1_title TEXT,
    intro_text TEXT,
    methodology TEXT,
    formula_text TEXT,
    example_calculation TEXT,
    config JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.calculators TO authenticated;
GRANT ALL ON public.calculators TO service_role;

ALTER TABLE public.calculators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage calculators" ON public.calculators
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view published calculators" ON public.calculators
    FOR SELECT USING (status IN ('published', 'noindex'));

-- 3. CALCULATOR CONTENT (Regional Overrides)
CREATE TABLE public.calculator_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calculator_id TEXT REFERENCES public.calculators(id) ON DELETE CASCADE,
    country_code TEXT, -- NULL means global/default
    h1_title TEXT,
    meta_title TEXT,
    meta_description TEXT,
    intro_text TEXT,
    methodology TEXT,
    how_it_works TEXT,
    faqs JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(calculator_id, country_code)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.calculator_content TO authenticated;
GRANT ALL ON public.calculator_content TO service_role;

ALTER TABLE public.calculator_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage calculator content" ON public.calculator_content
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public can view content" ON public.calculator_content
    FOR SELECT USING (true);

-- 4. REDIRECTS (301 Management)
CREATE TABLE public.redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_path TEXT NOT NULL UNIQUE,
    destination_path TEXT NOT NULL,
    status_code INTEGER DEFAULT 301,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.redirects TO authenticated;
GRANT ALL ON public.redirects TO service_role;

ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage redirects" ON public.redirects
    USING (public.has_role(auth.uid(), 'admin'));

-- 5. AUDIT LOGS
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    table_name TEXT,
    row_id TEXT,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view logs" ON public.audit_logs
    USING (public.has_role(auth.uid(), 'admin'));

-- Helper to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_calculators_updated_at BEFORE UPDATE ON public.calculators FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.calculator_categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON public.calculator_content FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_redirects_updated_at BEFORE UPDATE ON public.redirects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
