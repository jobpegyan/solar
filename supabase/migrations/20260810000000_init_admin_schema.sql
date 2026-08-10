-- Enum for application roles
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- User Roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL DEFAULT 'user',
    UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security Definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Base tables for global solar data
CREATE TABLE IF NOT EXISTS public.countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    currency_code TEXT NOT NULL,
    currency_symbol TEXT NOT NULL,
    locale TEXT NOT NULL,
    unit_system TEXT NOT NULL CHECK (unit_system IN ('US', 'Metric')),
    default_electricity_rate DECIMAL(10,4),
    default_peak_sun_hours DECIMAL(4,2),
    default_performance_ratio DECIMAL(4,2),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    average_electricity_rate DECIMAL(10,4),
    peak_sun_hours DECIMAL(4,2),
    performance_ratio DECIMAL(4,2),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    UNIQUE(country_id, code)
);

CREATE TABLE IF NOT EXISTS public.solar_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE,
    region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
    city TEXT,
    zip_code TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    peak_sun_hours DECIMAL(4,2) NOT NULL,
    performance_ratio DECIMAL(4,2),
    monthly_values JSONB, -- { "1": 4.5, "2": 5.1, ... }
    data_source TEXT,
    source_url TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    last_updated TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.electricity_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE,
    region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
    utility_provider TEXT,
    rate_per_kwh DECIMAL(10,4) NOT NULL,
    currency TEXT NOT NULL,
    rate_type TEXT NOT NULL DEFAULT 'residential' CHECK (rate_type IN ('residential', 'commercial', 'industrial')),
    fixed_charge DECIMAL(10,2),
    data_source TEXT,
    source_url TEXT,
    effective_date DATE,
    status TEXT NOT NULL DEFAULT 'active',
    last_updated TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.solar_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL CHECK (category IN ('panel', 'inverter', 'installation', 'battery')),
    country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE,
    region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
    item_name TEXT,
    wattage DECIMAL(10,2),
    capacity_kwh DECIMAL(10,2),
    price DECIMAL(15,2) NOT NULL,
    price_per_watt DECIMAL(10,4),
    currency TEXT NOT NULL,
    data_source TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    last_updated TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.calculator_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    unit TEXT,
    category TEXT NOT NULL,
    description TEXT,
    last_updated TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.seo_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    canonical_url TEXT,
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    content TEXT,
    faq JSONB,
    status TEXT NOT NULL DEFAULT 'published',
    published_date TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value TEXT NOT NULL,
    category TEXT
);

CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    record_type TEXT NOT NULL,
    record_id UUID,
    previous_value JSONB,
    new_value JSONB,
    timestamp TIMESTAMPTZ DEFAULT now()
);

-- Grants
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- RLS
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solar_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.electricity_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solar_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY \"Public read active countries\" ON public.countries FOR SELECT USING (status = 'active');
CREATE POLICY \"Admins full access countries\" ON public.countries FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read active regions\" ON public.regions FOR SELECT USING (status = 'active');
CREATE POLICY \"Admins full access regions\" ON public.regions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read active resources\" ON public.solar_resources FOR SELECT USING (status = 'active');
CREATE POLICY \"Admins full access resources\" ON public.solar_resources FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read active rates\" ON public.electricity_rates FOR SELECT USING (status = 'active');
CREATE POLICY \"Admins full access rates\" ON public.electricity_rates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read active pricing\" ON public.solar_pricing FOR SELECT USING (status = 'active');
CREATE POLICY \"Admins full access pricing\" ON public.solar_pricing FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read settings\" ON public.calculator_settings FOR SELECT USING (true);
CREATE POLICY \"Admins full access settings\" ON public.calculator_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read published pages\" ON public.seo_pages FOR SELECT USING (status = 'published');
CREATE POLICY \"Admins full access pages\" ON public.seo_pages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read active faqs\" ON public.faqs FOR SELECT USING (status = 'active');
CREATE POLICY \"Admins full access faqs\" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Public read site settings\" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY \"Admins full access site settings\" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY \"Admins can view logs\" ON public.admin_audit_logs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY \"Admins can insert logs\" ON public.admin_audit_logs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
