-- Add status and categories to seo_pages for content hub
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_status') THEN
        CREATE TYPE public.content_status AS ENUM ('draft', 'review', 'published', 'archived');
    END IF;
END $$;

ALTER TABLE public.seo_pages 
ADD COLUMN IF NOT EXISTS author text,
ADD COLUMN IF NOT EXISTS last_updated_at timestamptz DEFAULT now(),
ADD COLUMN IF NOT EXISTS category text,
ADD COLUMN IF NOT EXISTS featured_image text,
ADD COLUMN IF NOT EXISTS is_indexable boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS structured_data jsonb,
ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.seo_pages(id);

-- Add unique constraint to regions to avoid duplicates during seeding
ALTER TABLE public.regions ADD CONSTRAINT unique_region_code_country UNIQUE (country_id, code);

-- Seed more US Regions
INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Florida', 'FL', 0.15, 5.4, 0.75, 'active' FROM public.countries WHERE code = 'US'
ON CONFLICT (country_id, code) DO NOTHING;

INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Arizona', 'AZ', 0.14, 6.0, 0.75, 'active' FROM public.countries WHERE code = 'US'
ON CONFLICT (country_id, code) DO NOTHING;

INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Nevada', 'NV', 0.16, 5.8, 0.75, 'active' FROM public.countries WHERE code = 'US'
ON CONFLICT (country_id, code) DO NOTHING;

INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'New York', 'NY', 0.22, 4.2, 0.75, 'active' FROM public.countries WHERE code = 'US'
ON CONFLICT (country_id, code) DO NOTHING;

-- Seed more India Regions
INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Rajasthan', 'RJ', 7.5, 5.8, 0.8, 'active' FROM public.countries WHERE code = 'IN'
ON CONFLICT (country_id, code) DO NOTHING;

INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Karnataka', 'KA', 8.2, 5.2, 0.8, 'active' FROM public.countries WHERE code = 'IN'
ON CONFLICT (country_id, code) DO NOTHING;

INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Tamil Nadu', 'TN', 7.8, 5.4, 0.8, 'active' FROM public.countries WHERE code = 'IN'
ON CONFLICT (country_id, code) DO NOTHING;

-- Grants
GRANT ALL ON public.seo_pages TO authenticated;
GRANT SELECT ON public.seo_pages TO anon;
