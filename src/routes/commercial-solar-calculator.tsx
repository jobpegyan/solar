import { createFileRoute } from '@tanstack/react-router';
import { CommercialSolarCalculator } from '@/components/CommercialSolarCalculator';

export const Route = createFileRoute('/commercial-solar-calculator')({
  component: CommercialSolarCalculator,
  head: () => ({
    title: "Commercial Solar Calculator | Solar Panel Calculator",
    meta: [
      { name: "description", content: "Estimate solar system size, energy production, cost, savings and payback for your business or commercial property." },
      { property: "og:title", content: "Commercial Solar Calculator | Planning Estimate" },
      { property: "og:description", content: "Professional solar calculator for businesses, warehouses, and factories." },
      { name: "twitter:card", content: "summary_large_image" }
    ]
  })
});
