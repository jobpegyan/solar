-- docs/phase19_monetization.sql

-- Monetization Settings Table
CREATE TABLE public.monetization_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ads_enabled boolean DEFAULT false NOT NULL,
    adsense_publisher_id text,
    auto_ads_enabled boolean DEFAULT false NOT NULL,
    calculator_ads_enabled boolean DEFAULT false NOT NULL,
    guide_ads_enabled boolean DEFAULT false NOT NULL,
    category_ads_enabled boolean DEFAULT false NOT NULL,
    homepage_ads_enabled boolean DEFAULT false NOT NULL,
    max_ads_per_page integer DEFAULT 3 NOT NULL,
    ad_placements jsonb DEFAULT '{}'::jsonb NOT NULL,
    affiliate_links_enabled boolean DEFAULT false NOT NULL,
    affiliate_disclosure text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Audit logs for monetization changes
CREATE TABLE public.monetization_audit_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id uuid REFERENCES auth.users(id),
    action text NOT NULL,
    old_data jsonb,
    new_data jsonb,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.monetization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monetization_audit_logs ENABLE ROW LEVEL SECURITY;

-- Permissions
GRANT SELECT ON public.monetization_settings TO authenticated, anon;
GRANT ALL ON public.monetization_settings TO service_role;

GRANT SELECT ON public.monetization_audit_logs TO authenticated;
GRANT ALL ON public.monetization_audit_logs TO service_role;

-- Policies
CREATE POLICY "Allow public read-only access to monetization settings"
ON public.monetization_settings
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow admins to update monetization settings"
ON public.monetization_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Allow admins to view audit logs"
ON public.monetization_audit_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_monetization_settings_updated_at
    BEFORE UPDATE ON public.monetization_settings
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Seed initial record if not exists
INSERT INTO public.monetization_settings (id, ads_enabled)
VALUES ('00000000-0000-0000-0000-000000000001', false)
ON CONFLICT (id) DO NOTHING;
