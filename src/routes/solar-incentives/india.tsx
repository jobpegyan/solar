import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/solar-incentives/india')({
  head: () => ({
    title: "India Solar Subsidies | PM-Surya Ghar & State Programs",
    meta: [
      { name: "description", content: "Explore the PM-Surya Ghar Muft Bijli Yojana and other central/state solar subsidies available in India. Save on your solar installation costs." }
    ]
  }),
  component: () => (
    <div className="container mx-auto px-4 py-12">
      
      <h1 className="text-4xl font-bold mb-6">India Solar Subsidies</h1>
      <p>Content hub for Central and State subsidies in India.</p>
    </div>
  ),
});
