import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { CalculatorSEOLayout } from '@/components/seo/CalculatorSEOLayout';
import { SharedCalculator } from '@/components/calculator/SharedCalculator';
import { getSEOData } from '@/seo/calculator-seo';

const searchSchema = z.object({
  systemSize: z.string().optional(),
});

export const Route = createFileRoute('/solar-panel-cost-calculator/')({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => {
    const seo = getSEOData('solar-panel-cost-calculator');
    return {
      title: seo?.seoTitle || 'Solar Panel Cost Calculator',
      meta: [
        { name: 'description', content: seo?.seoDescription || '' },
        { property: 'og:title', content: seo?.seoTitle || '' },
        { property: 'og:description', content: seo?.seoDescription || '' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [
        { rel: 'canonical', href: 'https://solarpanel-calculator.com/solar-panel-cost-calculator' },
      ],
    };
  },
  component: CostCalculatorPage,
});

function CostCalculatorPage() {
  const seo = getSEOData('solar-panel-cost-calculator');
  
  if (!seo) return <SharedCalculator calculatorId="solar-panel-cost-calculator" />;

  return (
    <CalculatorSEOLayout seoData={seo}>
      <SharedCalculator calculatorId="solar-panel-cost-calculator" />
    </CalculatorSEOLayout>
  );
}
