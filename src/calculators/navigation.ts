import { CALCULATORS } from './registry';
import { CATEGORY_REGISTRY, CategoryMetadata } from './categories';
import { CalculatorCategory, CalculatorDefinition } from './types';

/**
 * Lightweight navigation metadata derived from the central calculator registry.
 * Intentionally contains NO calculation logic — only the fields needed to render
 * navigation, homepage cards and search results.
 */
export interface NavCalculator {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  category: CalculatorCategory;
  navCategory: NavCategorySlug;
  featured: boolean;
  keywords: string[];
}

export type NavCategorySlug = CategoryMetadata['slug'];

/** Statuses that may be surfaced in public navigation / listings. */
const PUBLIC_STATUSES = new Set(['active']);

function toNavCategory(category: CalculatorCategory): NavCategorySlug {
  if (category === 'load' || category === 'micro' || category === 'conversion') {
    return 'load-micro';
  }
  return category as NavCategorySlug;
}

function toNavCalculator(c: CalculatorDefinition): NavCalculator {
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    shortDescription: c.shortDescription,
    category: c.category,
    navCategory: toNavCategory(c.category),
    featured: Boolean(c.featured),
    keywords: [c.name, c.slug.replace(/[/-]/g, ' '), c.shortDescription]
      .join(' ')
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean),
  };
}

/** All publicly visible calculators (drafts, disabled, coming-soon excluded). */
export function getPublicCalculators(): NavCalculator[] {
  return CALCULATORS.filter((c) => PUBLIC_STATUSES.has(c.status)).map(toNavCalculator);
}

export interface NavCategoryGroup {
  category: CategoryMetadata;
  calculators: NavCalculator[];
  count: number;
}

/** Categories with their published calculators, ordered by registry order. */
export function getNavCategoryGroups(): NavCategoryGroup[] {
  const all = getPublicCalculators();
  return [...CATEGORY_REGISTRY]
    .sort((a, b) => a.order - b.order)
    .map((category) => {
      const calculators = all.filter((c) => c.navCategory === category.slug);
      return { category, calculators, count: calculators.length };
    })
    .filter((group) => group.count > 0);
}

/** Featured calculators, from the registry `featured` flag only. */
export function getPublicFeaturedCalculators(limit = 8): NavCalculator[] {
  return getPublicCalculators()
    .filter((c) => c.featured)
    .slice(0, limit);
}

/** Search published calculators by name, slug, description, keywords and category. */
export function searchNavCalculators(query: string, limit = 12): NavCalculator[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const categoryName = (slug: NavCategorySlug) =>
    CATEGORY_REGISTRY.find((c) => c.slug === slug)?.name.toLowerCase() ?? '';

  return getPublicCalculators()
    .map((c) => {
      const haystack = [
        c.name,
        c.slug,
        c.shortDescription,
        c.keywords.join(' '),
        c.category,
        categoryName(c.navCategory),
      ]
        .join(' ')
        .toLowerCase();

      const matchesAll = terms.every((t) => haystack.includes(t));
      if (!matchesAll) return null;
      const score = c.name.toLowerCase().startsWith(q) ? 0 : c.name.toLowerCase().includes(q) ? 1 : 2;
      return { calculator: c, score };
    })
    .filter((r): r is { calculator: NavCalculator; score: number } => r !== null)
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((r) => r.calculator);
}

export function getNavCategoryName(slug: NavCategorySlug): string {
  return CATEGORY_REGISTRY.find((c) => c.slug === slug)?.name ?? 'Calculators';
}

/** Total number of publicly available calculators. */
export function getPublicCalculatorCount(): number {
  return getPublicCalculators().length;
}
