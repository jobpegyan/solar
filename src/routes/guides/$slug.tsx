import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArticleTemplate } from "@/components/seo/ArticleTemplate";
import { getGuideBySlug } from "@/lib/content/guides.functions";

export const Route = createFileRoute("/guides/$slug")({
  component: SolarGuideArticle,
  head: ({ params }) => {
    const title = params.slug.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
    return {
      title: `${title} – Solar Panel Calculator Guide`,
      meta: [
        { name: "description", content: `Learn about ${title.toLowerCase()} in our expert solar energy guide. Detailed explanations and planning tips.` },
      ],
    };
  },
});

function SolarGuideArticle() {
  const { slug } = Route.useParams();
  const getGuideFn = useServerFn(getGuideBySlug);

  const { data: guide, isLoading } = useQuery({
    queryKey: ['guide', slug],
    queryFn: () => getGuideFn({ data: { slug } })
  });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading guide...</div>;
  }

  if (!guide) {
    return <div className="container mx-auto px-4 py-24 text-center">Guide not found</div>;
  }

  return (
    <ArticleTemplate 
      title={guide.h1 || guide.title}
      introduction={guide.intro || ""}
      content={guide.content}
      keyTakeaways={[]} 
      lastUpdated={guide.publishedAt ? new Date(guide.publishedAt).toLocaleDateString() : new Date().toLocaleDateString()}
      category={guide.category}
      {...(guide.calculatorLinks?.length ? {
        relatedTools: guide.calculatorLinks.map(link => ({
          label: link.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
          href: link.startsWith('/') ? link : `/${link}`
        }))
      } : {})}
      {...(guide.faqs?.length ? {
        faqs: guide.faqs.map(f => ({ question: f.question, answer: f.answer }))
      } : {})}
      {...(guide.sources?.length ? {
        sources: guide.sources.map(s => ({ name: s.name, ...(s.url ? { url: s.url } : {}) }))
      } : {})}
    />
  );
}
