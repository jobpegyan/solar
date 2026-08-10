export type CalculatorCategory = 
  | 'solar-system'
  | 'cost-savings'
  | 'battery'
  | 'panel-requirements'
  | 'inverter'
  | 'advanced'
  | 'load'
  | 'micro'
  | 'conversion';

export type CalculatorStatus = 'draft' | 'active' | 'disabled' | 'coming-soon';

export type CalculatorCountry = 'US' | 'IN' | 'GLOBAL';

export type InputType = 
  | 'number'
  | 'currency'
  | 'percentage'
  | 'select'
  | 'location'
  | 'text'
  | 'boolean';

export interface CalculatorInput {
  id: string;
  label: string;
  description?: string;
  type: InputType;
  unit?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
  options?: { label: string; value: string | number }[];
}

export interface CalculatorOutput {
  id: string;
  label: string;
  value: any;
  unit?: string;
  format?: 'number' | 'currency' | 'percentage' | 'text';
  description?: string;
  highlight?: boolean;
}

export interface CategoryMetadata {
  id: CalculatorCategory;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface CalculatorDefinition {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  category: CalculatorCategory;
  icon: string;
  status: CalculatorStatus;
  featured: boolean;
  countries: CalculatorCountry[];
  seoTitle?: string;
  seoDescription?: string;
  faq?: FAQItem[];
  relatedCalculators?: string[]; // Array of calculator IDs
}

export type SearchIntent = 'informational' | 'calculational' | 'commercial-investigation' | 'transactional';

export type PublishingStatus = 'draft' | 'review' | 'published' | 'noindex' | 'disabled';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface CalculatorSEOData {
  id: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  intent: SearchIntent;
  publishingStatus: PublishingStatus;
  keywords: string[];
  faq: FAQItem[];
  howItWorks: string;
  methodology: string;
  example: string;
  limitations: string;
  canonical?: string;
}
