import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/sitemap')({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = 'https://solarpanel-calculator.com';
        const pages = [
          '',
          '/calculators',
          '/calculators/solar-system',
          '/calculators/cost-savings',
          '/calculators/battery',
          '/calculators/panel-requirements',
          '/calculators/inverter',
          '/calculators/advanced',
          '/calculators/load-micro',
          '/solar-panel-calculator/usa',
          '/solar-panel-calculator/india',
          '/solar-calculator/usa',
          '/solar-calculator/india',
          '/guides',
          '/guides/solar-basics',
          '/guides/system-sizing',
          '/guides/solar-panels',
          '/guides/solar-batteries',
          '/guides/solar-inverters',
          '/guides/costs-savings',
          '/guides/performance',
          '/guides/installation-planning',
          '/solar-savings-calculator',
          '/solar-cost-calculator',
          '/solar-payback-calculator',
          '/solar-battery-calculator',
          '/solar-inverter-calculator',
          '/off-grid-solar-calculator',
          '/hybrid-solar-calculator',
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
          },
        });
      }
    }
  }
})
