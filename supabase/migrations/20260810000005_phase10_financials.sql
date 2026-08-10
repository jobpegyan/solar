-- Phase 10: Advanced Solar Financial & Utility Calculation Engine

-- 1. Utility Billing Models
CREATE TABLE public.utility_billing_models (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id uuid REFERENCES public.countries(id) ON DELETE CASCADE,
    region_id uuid REFERENCES public.regions(id) ON DELETE CASCADE,
    utility_name text NOT NULL,
    model_type text NOT NULL, -- 'flat', 'tiered', 'tou', 'net-metering', 'net-billing'
    fixed_monthly_charge numeric DEFAULT 0,
    effective_date date NOT NULL DEFAULT CURRENT_DATE,
    expiration_date date,
    source_url text,
    last_verified timestamptz DEFAULT now(),
    status text DEFAULT 'active',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 2. Utility Rates
CREATE TABLE public.utility_rates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    billing_model_id uuid REFERENCES public.utility_billing_models(id) ON DELETE CASCADE,
    rate_type text NOT NULL, -- 'import', 'export'
    price_per_kwh numeric NOT NULL,
    tier_threshold numeric, -- for tiered rates
    created_at timestamptz DEFAULT now()
);

-- 3. Time of Use (TOU) Rates
CREATE TABLE public.time_of_use_rates (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    billing_model_id uuid REFERENCES public.utility_billing_models(id) ON DELETE CASCADE,
    period_name text NOT NULL, -- 'peak', 'off-peak', 'shoulder'
    start_time time NOT NULL,
    end_time time NOT NULL,
    days_of_week int[] DEFAULT '{1,2,3,4,5,6,7}', -- 1=Monday
    months int[] DEFAULT '{1,2,3,4,5,6,7,8,9,10,11,12}',
    price_per_kwh numeric NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- 4. Incentives
CREATE TABLE public.incentives (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id uuid REFERENCES public.countries(id) ON DELETE CASCADE,
    region_id uuid REFERENCES public.regions(id) ON DELETE CASCADE,
    program_name text NOT NULL,
    incentive_type text NOT NULL, -- 'tax_credit', 'rebate', 'subsidy', 'grant', 'utility', 'performance'
    amount numeric,
    percentage numeric,
    max_amount numeric,
    eligibility_rules text,
    effective_date date NOT NULL DEFAULT CURRENT_DATE,
    expiration_date date,
    source_url text,
    last_verified timestamptz DEFAULT now(),
    status text DEFAULT 'active',
    slug text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- 5. Financial Assumptions (Global/Regional defaults)
CREATE TABLE public.financial_assumptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id uuid REFERENCES public.countries(id) ON DELETE CASCADE,
    region_id uuid REFERENCES public.regions(id) ON DELETE CASCADE,
    annual_electricity_price_increase numeric DEFAULT 0.03, -- 3%
    solar_degradation_rate numeric DEFAULT 0.005, -- 0.5%
    maintenance_cost_annual numeric DEFAULT 0,
    maintenance_cost_percentage numeric DEFAULT 0.01, -- 1% of system cost
    inverter_replacement_year int DEFAULT 12,
    battery_replacement_year int DEFAULT 10,
    created_at timestamptz DEFAULT now()
);

-- RLS & Grants
GRANT SELECT ON public.utility_billing_models TO authenticated, anon;
GRANT SELECT ON public.utility_rates TO authenticated, anon;
GRANT SELECT ON public.time_of_use_rates TO authenticated, anon;
GRANT SELECT ON public.incentives TO authenticated, anon;
GRANT SELECT ON public.financial_assumptions TO authenticated, anon;

GRANT ALL ON public.utility_billing_models TO service_role;
GRANT ALL ON public.utility_rates TO service_role;
GRANT ALL ON public.time_of_use_rates TO service_role;
GRANT ALL ON public.incentives TO service_role;
GRANT ALL ON public.financial_assumptions TO service_role;

ALTER TABLE public.utility_billing_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utility_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_of_use_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incentives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_assumptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read utility_billing_models" ON public.utility_billing_models FOR SELECT USING (status = 'active');
CREATE POLICY "Public read utility_rates" ON public.utility_rates FOR SELECT USING (true);
CREATE POLICY "Public read time_of_use_rates" ON public.time_of_use_rates FOR SELECT USING (true);
CREATE POLICY "Public read incentives" ON public.incentives FOR SELECT USING (status = 'active');
CREATE POLICY "Public read financial_assumptions" ON public.financial_assumptions FOR SELECT USING (true);

-- Admin write policies
CREATE POLICY "Admins can manage utility_billing_models" ON public.utility_billing_models FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage utility_rates" ON public.utility_rates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage time_of_use_rates" ON public.time_of_use_rates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage incentives" ON public.incentives FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage financial_assumptions" ON public.financial_assumptions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
