import { createFileRoute } from '@tanstack/react-router';


export const Route = createFileRoute('/solar-incentives/usa')({
  head: () => ({
    title: "USA Solar Incentives & Tax Credits | Federal & State",
    meta: [
      { name: "description", content: "Guide to the 30% Federal Investment Tax Credit (ITC), state rebates, and utility incentives for solar energy in the United States." }
    ]
  }),
  component: () => (
    <div className="container mx-auto px-4 py-12">
      
      <h1 className="text-4xl font-bold mb-6">USA Solar Incentives</h1>
      <p>Content hub for US Federal ITC, state rebates, and utility programs.</p>
    </div>
  ),
});
