-- Add postal code support to countries
ALTER TABLE public.countries ADD COLUMN IF NOT EXISTS postal_code_label TEXT DEFAULT 'Postal Code';
ALTER TABLE public.countries ADD COLUMN IF NOT EXISTS postal_code_regex TEXT;

UPDATE public.countries SET postal_code_label = 'ZIP Code', postal_code_regex = '^\d{5}(-\d{4})?$' WHERE code = 'US';
UPDATE public.countries SET postal_code_label = 'PIN Code', postal_code_regex = '^\d{6}$' WHERE code = 'IN';
UPDATE public.countries SET postal_code_label = 'Postcode', postal_code_regex = '^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$' WHERE code = 'GB'; -- UK
UPDATE public.countries SET postal_code_label = 'Postcode', postal_code_regex = '^\d{4}$' WHERE code = 'AU';

-- Enhanced location table for specific mappings
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID REFERENCES public.countries(id) ON DELETE CASCADE NOT NULL,
    region_id UUID REFERENCES public.regions(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- City or Area name
    postal_code TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(country_id, postal_code, name)
);

-- Add orientation and tilt defaults to regions/locations
ALTER TABLE public.regions ADD COLUMN IF NOT EXISTS default_orientation TEXT DEFAULT 'South';
ALTER TABLE public.regions ADD COLUMN IF NOT EXISTS default_tilt DECIMAL(4,2) DEFAULT 20.0;

ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS default_orientation TEXT;
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS default_tilt DECIMAL(4,2);

-- Update solar_resources to support different location levels
ALTER TABLE public.solar_resources ADD COLUMN IF NOT EXISTS location_id UUID REFERENCES public.locations(id) ON DELETE CASCADE;
ALTER TABLE public.solar_resources ADD COLUMN IF NOT EXISTS location_level TEXT NOT NULL DEFAULT 'Region' CHECK (location_level IN ('Global', 'Country', 'Region', 'City', 'Postal Code'));

-- Seed some test locations for 90210 and 401404
DO $$
DECLARE
    us_id UUID;
    ca_id UUID;
    in_id UUID;
    mh_id UUID;
    loc_us_id UUID;
    loc_in_id UUID;
BEGIN
    SELECT id INTO us_id FROM public.countries WHERE code = 'US';
    SELECT id INTO ca_id FROM public.regions WHERE code = 'CA' AND country_id = us_id;
    
    IF us_id IS NOT NULL AND ca_id IS NOT NULL THEN
        INSERT INTO public.locations (country_id, region_id, name, postal_code, latitude, longitude)
        VALUES (us_id, ca_id, 'Beverly Hills', '90210', 34.0736, -118.4004)
        ON CONFLICT DO NOTHING
        RETURNING id INTO loc_us_id;
        
        IF loc_us_id IS NOT NULL THEN
            INSERT INTO public.solar_resources (country_id, region_id, location_id, peak_sun_hours, location_level, monthly_values)
            VALUES (us_id, ca_id, loc_us_id, 5.8, 'Postal Code', '{"1": 4.2, "2": 4.8, "3": 5.5, "4": 6.2, "5": 6.8, "6": 7.2, "7": 7.5, "8": 7.1, "9": 6.4, "10": 5.2, "11": 4.5, "12": 4.0}')
            ON CONFLICT DO NOTHING;
        END IF;
    END IF;

    SELECT id INTO in_id FROM public.countries WHERE code = 'IN';
    SELECT id INTO mh_id FROM public.regions WHERE code = 'MH' AND country_id = in_id;
    
    IF in_id IS NOT NULL AND mh_id IS NOT NULL THEN
        INSERT INTO public.locations (country_id, region_id, name, postal_code, latitude, longitude)
        VALUES (in_id, mh_id, 'Palghar', '401404', 19.6936, 72.7655)
        ON CONFLICT DO NOTHING
        RETURNING id INTO loc_in_id;
        
        IF loc_in_id IS NOT NULL THEN
            INSERT INTO public.solar_resources (country_id, region_id, location_id, peak_sun_hours, location_level, monthly_values)
            VALUES (in_id, mh_id, loc_in_id, 5.5, 'Postal Code', '{"1": 5.0, "2": 5.5, "3": 6.2, "4": 6.8, "5": 7.0, "6": 4.5, "7": 3.8, "8": 4.0, "9": 4.8, "10": 5.5, "11": 5.2, "12": 5.0}')
            ON CONFLICT DO NOTHING;
        END IF;
    END IF;
END $$;

-- Grants
GRANT SELECT ON public.locations TO authenticated, anon;
GRANT ALL ON public.locations TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.locations TO authenticated;

-- RLS
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY \"Public read active locations\" ON public.locations FOR SELECT USING (status = 'active');
CREATE POLICY \"Admins full access locations\" ON public.locations FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

