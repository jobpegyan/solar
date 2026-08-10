export type ContentStatus = 'draft' | 'review' | 'published' | 'noindex' | 'archived';

export type GuideCategory = 
  | 'solar-basics'
  | 'system-sizing'
  | 'solar-panels'
  | 'solar-batteries'
  | 'solar-inverters'
  | 'costs-savings'
  | 'performance'
  | 'installation-planning';

export interface GuideCategoryMetadata {
  id: GuideCategory;
  title: string;
  description: string;
  iconName: string;
}

export const GUIDE_CATEGORIES: GuideCategoryMetadata[] = [
  {
    id: 'solar-basics',
    title: 'Solar Basics',
    description: 'Foundational knowledge about how solar systems work.',
    iconName: 'BookOpen'
  },
  {
    id: 'system-sizing',
    title: 'Solar System Sizing',
    description: 'Learn how to calculate the right solar capacity for your needs.',
    iconName: 'Maximize'
  },
  {
    id: 'solar-panels',
    title: 'Solar Panels',
    description: 'Detailed information about solar PV panels and performance.',
    iconName: 'Sun'
  },
  {
    id: 'solar-batteries',
    title: 'Solar Batteries',
    description: 'Guides on energy storage and battery capacity sizing.',
    iconName: 'Battery'
  },
  {
    id: 'solar-inverters',
    title: 'Solar Inverters',
    description: 'Understanding inverter types and sizing for your array.',
    iconName: 'Zap'
  },
  {
    id: 'costs-savings',
    title: 'Costs & Savings',
    description: 'Financial analysis of solar investments and payback periods.',
    iconName: 'Wallet'
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Factors affecting solar production, losses, and efficiency.',
    iconName: 'TrendingUp'
  },
  {
    id: 'installation-planning',
    title: 'Installation Planning',
    description: 'Roof requirements, orientation, and layout considerations.',
    iconName: 'Map'
  }
];

export interface GuideSource {
  id: string;
  name: string;
  url?: string;
  sourceType?: string;
  publicationDate?: string;
  accessedDate?: string;
}

export interface GuideFAQ {
  id: string;
  question: string;
  answer: string;
  displayOrder: number;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  content: string;
  category: GuideCategory;
  status: ContentStatus;
  authorId?: string;
  author?: {
    name: string;
    role: string;
    bio: string;
  };
  featured: boolean;
  calculatorLinks: string[]; // slugs
  country?: string;
  publishedAt?: string;
  lastReviewedAt?: string;
  createdAt: string;
  updatedAt: string;
  sources?: GuideSource[];
  faqs?: GuideFAQ[];
}
