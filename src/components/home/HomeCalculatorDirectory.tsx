import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalculatorCard } from "@/components/calculator/CalculatorCard";
import { getCalculatorsByCategory } from "@/calculators/helpers";
import { getNavCategoryGroups, getPublicFeaturedCalculators } from "@/calculators/navigation";
import type { CalculatorDefinition } from "@/calculators/types";

const CATEGORY_CARD_LIMIT = 6;
const FEATURED_LIMIT = 8;

function toDefinitions(ids: string[], category: string): CalculatorDefinition[] {
  const list = getCalculatorsByCategory(category as any).filter((c) => c.status === "active");
  return ids
    .map((id) => list.find((c) => c.id === id))
    .filter((c): c is CalculatorDefinition => Boolean(c));
}

export function HomeCalculatorDirectory() {
  const featuredMeta = getPublicFeaturedCalculators(FEATURED_LIMIT);
  const groups = getNavCategoryGroups();

  const featured = groups
    .flatMap((g) => getCalculatorsByCategory(g.category.slug as any))
    .filter((c) => featuredMeta.some((f) => f.id === c.id));

  return (
    <>
      {featured.length > 0 && (
        <section className="mb-20" aria-labelledby="featured-calculators">
          <h2 id="featured-calculators" className="mb-3 text-3xl font-bold">
            Featured Solar Calculators
          </h2>
          <p className="mb-8 max-w-3xl text-muted-foreground">
            Start with our most complete solar tools for system sizing, panel count, costs,
            savings, battery storage and inverter capacity.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, FEATURED_LIMIT).map((c) => (
              <CalculatorCard key={c.id} calculator={c} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="solar" size="lg" asChild>
              <Link to="/calculators">
                Explore All Solar Calculators <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      <section className="mb-20" aria-labelledby="all-solar-calculators">
        <h2 id="all-solar-calculators" className="mb-3 text-3xl font-bold">
          All Solar Calculators
        </h2>
        <p className="mb-10 max-w-3xl text-muted-foreground">
          Explore free solar calculators for system sizing, panel requirements, battery storage,
          inverter sizing, solar costs, savings and more.
        </p>

        <div className="space-y-16">
          {groups.map(({ category, calculators, count }) => {
            const cards = toDefinitions(
              calculators.slice(0, CATEGORY_CARD_LIMIT).map((c) => c.id),
              category.slug,
            );
            return (
              <div key={category.slug}>
                <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-solar">
                      {count} {count === 1 ? "calculator" : "calculators"}
                    </p>
                  </div>
                  <Link
                    to="/calculators/$category"
                    params={{ category: category.slug }}
                    className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-solar hover:underline sm:inline-flex"
                  >
                    View all <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {cards.map((c) => (
                    <CalculatorCard key={c.id} calculator={c} />
                  ))}
                </div>

                {count > cards.length && (
                  <div className="mt-6">
                    <Button variant="outline" asChild>
                      <Link to="/calculators/$category" params={{ category: category.slug }}>
                        View All {category.name} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
