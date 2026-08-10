-- Phase 18: Solar Content Hub & Topical Authority Schema

-- 1. Create guide categories enum
CREATE TYPE public.guide_category AS ENUM (
    'solar-basics',
    'system-sizing',
    'solar-panels',
    'solar-batteries',
    'solar-inverters',
    'costs-savings',
    'performance',
    'installation-planning'
);

-- 2. Create content status enum
CREATE TYPE public.content_status AS ENUM (
    'draft',
    'review',
    'published',
    'noindex',
    'archived'
);

-- 3. Create guides table
CREATE TABLE public.guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    h1 TEXT,
    meta_title TEXT,
    meta_description TEXT,
    intro TEXT,
    content TEXT NOT NULL,
    category public.guide_category NOT NULL,
    status public.content_status DEFAULT 'draft' NOT NULL,
    author_id UUID REFERENCES auth.users(id),
    featured BOOLEAN DEFAULT false,
    calculator_links JSONB DEFAULT '[]'::jsonb, -- Array of calculator IDs/slugs
    country TEXT, -- Null for global, ISO code for localized
    published_at TIMESTAMPTZ,
    last_reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create sources table
CREATE TABLE public.guide_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guide_id UUID REFERENCES public.guides(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT,
    source_type TEXT, -- Government, Utility, etc.
    publication_date DATE,
    accessed_date DATE DEFAULT CURRENT_DATE
);

-- 5. Create FAQ table for guides
CREATE TABLE public.guide_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guide_id UUID REFERENCES public.guides(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0
);

-- 6. Enable RLS
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_faqs ENABLE ROW LEVEL SECURITY;

-- 7. Grants
GRANT SELECT ON public.guides TO anon, authenticated;
GRANT SELECT ON public.guide_sources TO anon, authenticated;
GRANT SELECT ON public.guide_faqs TO anon, authenticated;

GRANT ALL ON public.guides TO service_role;
GRANT ALL ON public.guide_sources TO service_role;
GRANT ALL ON public.guide_faqs TO service_role;

-- Admin policies
CREATE POLICY "Admins can manage guides" ON public.guides
    FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage sources" ON public.guide_sources
    FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage faqs" ON public.guide_faqs
    FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER set_guides_updated_at
    BEFORE UPDATE ON public.guides
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
