-- Phase 8: Monetization, Analytics & Lead Generation

-- Analytics Settings
CREATE TABLE public.analytics_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ga4_measurement_id text,
    is_ga4_enabled boolean DEFAULT false,
    gsc_verification_code text,
    cookie_consent_required boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Monetization Settings
CREATE TABLE public.monetization_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    country_code text REFERENCES public.countries(code) ON DELETE CASCADE,
    ads_enabled boolean DEFAULT false,
    quote_cta_enabled boolean DEFAULT false,
    affiliate_enabled boolean DEFAULT false,
    adsense_pub_id text,
    affiliate_disclosure text DEFAULT 'Some links on SolarPanelCalculator.xyz may be affiliate links. If you make a purchase through one of these links, we may earn a commission at no additional cost to you.',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(country_code)
);

-- Solar Leads
CREATE TYPE public.lead_status AS ENUM ('new', 'contacted', 'qualified', 'quote_requested', 'quote_received', 'converted', 'not_interested', 'invalid', 'archived');

CREATE TABLE public.solar_leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    country_code text REFERENCES public.countries(code),
    region_id uuid REFERENCES public.regions(id),
    postal_code text,
    property_type text, -- residential / commercial
    is_owner boolean,
    monthly_bill numeric,
    system_size_kw numeric,
    battery_interest boolean DEFAULT false,
    solar_interest boolean DEFAULT true,
    lead_source text, -- calculator type
    status lead_status DEFAULT 'new',
    consent_timestamp timestamptz DEFAULT now(),
    internal_notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Partners (Future Architecture)
CREATE TABLE public.solar_partners (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name text NOT NULL,
    country_code text REFERENCES public.countries(code),
    email text,
    phone text,
    website text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Affiliate Links
CREATE TABLE public.affiliate_links (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_name text NOT NULL,
    product_name text,
    url text NOT NULL,
    country_code text REFERENCES public.countries(code),
    category text, -- panels, inverters, batteries, etc.
    cta_text text DEFAULT 'View on Partner Site',
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- Analytics Events (Aggregate only for dashboard)
CREATE TABLE public.analytics_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_name text NOT NULL,
    country_code text,
    calculator_type text,
    created_at timestamptz DEFAULT now()
);

-- Grants
GRANT SELECT ON public.analytics_settings TO anon, authenticated;
GRANT SELECT ON public.monetization_settings TO anon, authenticated;
GRANT INSERT ON public.solar_leads TO anon;
GRANT SELECT ON public.affiliate_links TO anon, authenticated;
GRANT INSERT ON public.analytics_events TO anon;

GRANT ALL ON public.analytics_settings TO service_role;
GRANT ALL ON public.monetization_settings TO service_role;
GRANT ALL ON public.solar_leads TO service_role;
GRANT ALL ON public.solar_partners TO service_role;
GRANT ALL ON public.affiliate_links TO service_role;
GRANT ALL ON public.analytics_events TO service_role;

GRANT SELECT, UPDATE ON public.solar_leads TO authenticated;
GRANT SELECT ON public.solar_partners TO authenticated;

-- RLS
ALTER TABLE public.analytics_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monetization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solar_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solar_partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read analytics settings" ON public.analytics_settings FOR SELECT USING (true);
CREATE POLICY "Public read monetization settings" ON public.monetization_settings FOR SELECT USING (true);
CREATE POLICY "Public insert leads" ON public.solar_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view leads" ON public.solar_leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin update leads" ON public.solar_leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public read affiliate links" ON public.affiliate_links FOR SELECT USING (is_active = true);
CREATE POLICY "Public insert events" ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view events" ON public.analytics_events FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Seed default settings
INSERT INTO public.analytics_settings (is_ga4_enabled) VALUES (false);
INSERT INTO public.monetization_settings (country_code, quote_cta_enabled) 
SELECT code, true FROM public.countries WHERE code IN ('US', 'IN');

