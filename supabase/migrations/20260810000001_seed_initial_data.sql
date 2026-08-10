-- Seed initial countries
INSERT INTO public.countries (name, code, currency_code, currency_symbol, locale, unit_system, default_electricity_rate, default_peak_sun_hours, default_performance_ratio, status)
VALUES 
('United States', 'US', 'USD', '$', 'en-US', 'US', 0.16, 5.0, 0.75, 'active'),
('India', 'IN', 'INR', '₹', 'en-IN', 'Metric', 7.5, 5.0, 0.8, 'active'),
('Canada', 'CA', 'CAD', 'C$', 'en-CA', 'Metric', 0.14, 4.2, 0.75, 'active');

-- Seed initial regions for US
INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'California', 'CA', 0.28, 5.5, 0.75, 'active' FROM public.countries WHERE code = 'US';
INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Texas', 'TX', 0.14, 5.2, 0.75, 'active' FROM public.countries WHERE code = 'US';

-- Seed initial regions for India
INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Maharashtra', 'MH', 9.5, 5.2, 0.8, 'active' FROM public.countries WHERE code = 'IN';
INSERT INTO public.regions (country_id, name, code, average_electricity_rate, peak_sun_hours, performance_ratio, status)
SELECT id, 'Gujarat', 'GJ', 7.2, 5.5, 0.8, 'active' FROM public.countries WHERE code = 'IN';

-- Seed calculator settings
INSERT INTO public.calculator_settings (key, value, unit, category, description)
VALUES 
('default_panel_wattage', '550', 'W', 'solar', 'Default wattage for a single solar panel'),
('default_performance_ratio', '0.80', '', 'solar', 'System efficiency factor (0.0 to 1.0)'),
('default_system_lifetime', '25', 'years', 'financial', 'Standard operational lifespan of the solar system'),
('default_battery_voltage', '48', 'V', 'battery', 'Standard battery bank voltage');

-- Seed initial SEO content
INSERT INTO public.seo_pages (title, slug, meta_title, meta_description, content, status)
VALUES 
('Privacy Policy', 'privacy-policy', 'Privacy Policy - Solar Panel Calculator', 'Our commitment to your data privacy.', '<h2>Privacy Policy</h2><p>We take your privacy seriously...</p>', 'published'),
('Terms of Use', 'terms', 'Terms of Use - Solar Panel Calculator', 'Rules for using our platform.', '<h2>Terms of Use</h2><p>By using this site, you agree to...</p>', 'published'),
('Disclaimer', 'disclaimer', 'Disclaimer - Solar Panel Calculator', 'Legal limitations of our estimates.', '<h2>Disclaimer</h2><p>All calculations are estimates...</p>', 'published'),
('Cookie Policy', 'cookie-policy', 'Cookie Policy - Solar Panel Calculator', 'How we use cookies.', '<h2>Cookie Policy</h2><p>We use cookies to improve experience...</p>', 'published');
