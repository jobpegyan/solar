import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Search, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  getNavCategoryGroups,
  getPublicFeaturedCalculators,
  searchNavCalculators,
  getNavCategoryName,
  type NavCalculator,
} from "@/calculators/navigation";
import { GUIDE_CATEGORIES } from "@/lib/content/types";
import { getCountryNavLinks } from "@/lib/data/country-links";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type MenuKey = "calculators" | "guides" | "countries" | null;

function CalculatorLink({
  calculator,
  onNavigate,
  showCategory,
}: {
  calculator: NavCalculator;
  onNavigate: () => void;
  showCategory?: boolean;
}) {
  return (
    <Link
      to={calculator.slug as any}
      onClick={onNavigate}
      className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <span className="block truncate font-medium text-foreground/90">{calculator.name}</span>
      {showCategory && (
        <span className="block truncate text-xs text-muted-foreground">
          {getNavCategoryName(calculator.navCategory)} · {calculator.shortDescription}
        </span>
      )}
    </Link>
  );
}

function SearchResults({ query, onNavigate }: { query: string; onNavigate: () => void }) {
  const results = useMemo(() => searchNavCalculators(query), [query]);

  if (!query.trim()) return null;

  return (
    <div className="max-h-72 overflow-y-auto rounded-lg border bg-background p-2">
      {results.length === 0 ? (
        <p className="px-2 py-3 text-sm text-muted-foreground">
          No calculators match “{query}”.
        </p>
      ) : (
        results.map((c) => (
          <CalculatorLink key={c.id} calculator={c} onNavigate={onNavigate} showCategory />
        ))
      )}
    </div>
  );
}

export function MainNav() {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const groups = useMemo(() => getNavCategoryGroups(), []);
  const featured = useMemo(() => getPublicFeaturedCalculators(6), []);
  const countryLinks = useMemo(() => getCountryNavLinks(), []);

  const closeMenus = () => {
    setOpenMenu(null);
    setQuery("");
  };

  // Click outside closes any open dropdown
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeMenus();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openMenu]);

  // Escape closes and returns focus to the trigger
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const key = openMenu;
        closeMenus();
        triggerRefs.current[key!]?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openMenu]);

  const toggle = (key: Exclude<MenuKey, null>) =>
    setOpenMenu((prev) => (prev === key ? null : key));

  const trigger = (key: Exclude<MenuKey, null>, label: string) => (
    <button
      ref={(el) => {
        triggerRefs.current[key] = el;
      }}
      type="button"
      aria-expanded={openMenu === key}
      aria-haspopup="true"
      onClick={() => toggle(key)}
      className={cn(
        "flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors",
        openMenu === key ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
      <ChevronDown
        className={cn("h-4 w-4 transition-transform", openMenu === key && "rotate-180")}
      />
    </button>
  );

  return (
    <div ref={navRef} className="flex flex-1 items-center justify-end">
      {/* Desktop / tablet navigation */}
      <nav className="hidden items-center gap-1 md:flex lg:gap-3" aria-label="Main navigation">
        <Link
          to="/"
          activeOptions={{ exact: true }}
          activeProps={{ className: "text-foreground font-semibold" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
          className="rounded-md px-2 py-1.5 text-sm font-medium transition-colors"
        >
          Home
        </Link>

        {trigger("calculators", "Calculators")}
        {trigger("guides", "Guides")}
        {trigger("countries", "Countries")}

        <Link
          to="/about"
          activeProps={{ className: "text-foreground font-semibold" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
          className="rounded-md px-2 py-1.5 text-sm font-medium transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          activeProps={{ className: "text-foreground font-semibold" }}
          inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
          className="rounded-md px-2 py-1.5 text-sm font-medium transition-colors"
        >
          Contact
        </Link>
      </nav>

      {/* Mobile trigger */}
      <button
        type="button"
        className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border md:hidden"
        aria-expanded={mobileOpen}
        aria-label="Toggle navigation menu"
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <span className="space-y-1" aria-hidden>
            <span className="block h-0.5 w-4 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </span>
        )}
      </button>

      {/* ---------- Desktop mega menu: Calculators ---------- */}
      {openMenu === "calculators" && (
        <div className="absolute left-0 right-0 top-16 z-50 hidden border-b bg-background shadow-lg md:block">
          <div className="container mx-auto max-h-[70vh] overflow-y-auto px-4 py-6">
            <div className="relative mb-5 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators..."
                aria-label="Search calculators"
                className="pl-9"
              />
            </div>

            {query.trim() ? (
              <SearchResults query={query} onNavigate={closeMenus} />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-3 xl:grid-cols-4">
                  {groups.map(({ category, calculators, count }) => (
                    <div key={category.slug} className="min-w-0">
                      <Link
                        to="/calculators/$category"
                        params={{ category: category.slug }}
                        onClick={closeMenus}
                        className="mb-2 block text-sm font-bold text-foreground hover:text-solar"
                      >
                        {category.name}{" "}
                        <span className="font-normal text-muted-foreground">({count})</span>
                      </Link>
                      <div className="space-y-0.5">
                        {calculators.slice(0, 10).map((c) => (
                          <CalculatorLink key={c.id} calculator={c} onNavigate={closeMenus} />
                        ))}
                      </div>
                      <Link
                        to="/calculators/$category"
                        params={{ category: category.slug }}
                        onClick={closeMenus}
                        className="mt-2 inline-flex items-center gap-1 px-2 text-xs font-semibold text-solar hover:underline"
                      >
                        View all <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  ))}
                </div>

                {featured.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Featured
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {featured.map((c) => (
                        <Link
                          key={c.id}
                          to={c.slug as any}
                          onClick={closeMenus}
                          className="rounded-full border bg-secondary px-3 py-1 text-xs font-medium hover:border-solar hover:text-solar"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="mt-6 flex justify-end border-t pt-4">
              <Link
                to="/calculators"
                onClick={closeMenus}
                className="inline-flex items-center gap-2 text-sm font-semibold text-solar hover:underline"
              >
                View All Solar Calculators <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Desktop dropdown: Guides ---------- */}
      {openMenu === "guides" && (
        <div className="absolute left-0 right-0 top-16 z-50 hidden border-b bg-background shadow-lg md:block">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {GUIDE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to="/guides/$category"
                  params={{ category: cat.id }}
                  onClick={closeMenus}
                  className="rounded-lg border p-3 transition-colors hover:border-solar"
                >
                  <span className="block text-sm font-semibold">{cat.title}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {cat.description}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex justify-end border-t pt-4">
              <Link
                to="/guides"
                onClick={closeMenus}
                className="inline-flex items-center gap-2 text-sm font-semibold text-solar hover:underline"
              >
                View All Guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Desktop dropdown: Countries ---------- */}
      {openMenu === "countries" && (
        <div className="absolute left-0 right-0 top-16 z-50 hidden border-b bg-background shadow-lg md:block">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {countryLinks.map((c) => (
                <Link
                  key={c.code}
                  to={c.href as any}
                  onClick={closeMenus}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {c.name}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex justify-end border-t pt-4">
              <Link
                to="/countries"
                onClick={closeMenus}
                className="inline-flex items-center gap-2 text-sm font-semibold text-solar hover:underline"
              >
                View All Countries <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Mobile navigation ---------- */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 max-h-[80vh] overflow-y-auto border-b bg-background px-4 py-4 md:hidden">
          <nav className="space-y-2" aria-label="Mobile navigation">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-semibold"
            >
              Home
            </Link>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                placeholder="Search calculators"
                aria-label="Search calculators"
                className="pl-9"
              />
            </div>

            {mobileQuery.trim() ? (
              <SearchResults
                query={mobileQuery}
                onNavigate={() => {
                  setMobileQuery("");
                  setMobileOpen(false);
                }}
              />
            ) : (
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="calculators">
                  <AccordionTrigger className="text-base font-semibold">
                    Calculators
                  </AccordionTrigger>
                  <AccordionContent>
                    <Accordion type="single" collapsible className="w-full">
                      {groups.map(({ category, calculators, count }) => (
                        <AccordionItem key={category.slug} value={category.slug}>
                          <AccordionTrigger className="text-sm">
                            {category.name} ({count})
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-0.5">
                              {calculators.map((c) => (
                                <CalculatorLink
                                  key={c.id}
                                  calculator={c}
                                  onNavigate={() => setMobileOpen(false)}
                                />
                              ))}
                              <Link
                                to="/calculators/$category"
                                params={{ category: category.slug }}
                                onClick={() => setMobileOpen(false)}
                                className="mt-1 inline-flex items-center gap-1 px-2 text-xs font-semibold text-solar"
                              >
                                View all <ArrowRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    <Link
                      to="/calculators"
                      onClick={() => setMobileOpen(false)}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-solar"
                    >
                      View All Solar Calculators <ArrowRight className="h-4 w-4" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="guides">
                  <AccordionTrigger className="text-base font-semibold">Guides</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-0.5">
                      {GUIDE_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          to="/guides/$category"
                          params={{ category: cat.id }}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {cat.title}
                        </Link>
                      ))}
                      <Link
                        to="/guides"
                        onClick={() => setMobileOpen(false)}
                        className="mt-1 inline-flex items-center gap-1 px-2 text-xs font-semibold text-solar"
                      >
                        View All Guides <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="countries">
                  <AccordionTrigger className="text-base font-semibold">
                    Countries
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-0.5">
                      {countryLinks.map((c) => (
                        <Link
                          key={c.code}
                          to={c.href as any}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                          {c.name}
                        </Link>
                      ))}
                      <Link
                        to="/countries"
                        onClick={() => setMobileOpen(false)}
                        className="mt-1 inline-flex items-center gap-1 px-2 text-xs font-semibold text-solar"
                      >
                        View All Countries <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-semibold"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-semibold"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
