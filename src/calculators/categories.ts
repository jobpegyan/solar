import { CalculatorCategory } from './types';
import { 
  Sun,
  TrendingUp, 
  Battery, 
  Layout, 
  Cpu, 
  Settings, 
  Grid 
} from 'lucide-react';

export interface CategoryMetadata {
  slug: CalculatorCategory | 'load-micro';
  name: string;
  description: string;
  longDescription: string;
  icon: any;
  order: number;
  seoTitle: string;
  seoDescription: string;
  faq: { question: string; answer: string }[];
  helpfulInfo: string;
  relatedCategories: (CalculatorCategory | 'load-micro')[];
}

export const CATEGORY_REGISTRY: CategoryMetadata[] = [
  {
    slug: 'solar-system',
    name: 'Solar System Calculators',
    description: 'Calculate system size, production, and capacity.',
    longDescription: 'Our solar system analysis tools help you determine the ideal size and output for your solar installation. Whether you are planning a residential rooftop or a commercial array, these calculators provide the technical foundation for your project.',
    icon: Sun,
    order: 1,
    seoTitle: 'Solar System Calculators — Free Solar Energy Tools',
    seoDescription: 'Estimate your solar system size, panel wattage, and annual energy production with our professional-grade solar system calculators.',
    helpfulInfo: 'Solar system sizing depends on two main factors: your annual energy consumption (kWh) and your local solar resource (Peak Sun Hours). We recommend designing for 100% offset, but local utility policies may influence your final decision.',
    faq: [
      { question: 'What solar calculator should I use?', answer: 'If you are just starting, the "Solar Panel Calculator" is our most comprehensive tool. If you already know your usage, the "System Size Calculator" is ideal.' },
      { question: 'How accurate are solar calculator results?', answer: 'Our calculators use regional solar data and industry-standard performance ratios (75-80%). While highly accurate for planning, they should be verified by a site survey.' },
      { question: 'Can I use these calculators in the USA and India?', answer: 'Yes, we provide specialized localization for both USA (US Customary units/USD) and India (Metric units/INR/PM Surya Ghar subsidies).' }
    ],
    relatedCategories: ['cost-savings', 'panel-requirements', 'battery']
  },
  {
    slug: 'cost-savings',
    name: 'Solar Cost & Savings Calculators',
    description: 'Estimate costs, savings, and payback periods.',
    longDescription: 'Understand the economics of your solar investment. These tools analyze initial costs, utility bill savings, return on investment (ROI), and the break-even point.',
    icon: TrendingUp,
    order: 2,
    seoTitle: 'Solar Cost & Savings Calculators — Estimate Solar Economics',
    seoDescription: 'Calculate the total cost, potential savings, and ROI of your solar project. Compare different financing models and payback periods.',
    helpfulInfo: 'It is important to distinguish between Cost (the initial capital expenditure), Savings (the monthly reduction in your utility bill), ROI (the total financial return over the system life), and Payback (how many years until the system pays for itself).',
    faq: [
      { question: 'How is solar payback calculated?', answer: 'Payback is determined by dividing the net system cost (after incentives) by your annual solar savings.' },
      { question: 'What affects solar installation cost?', answer: 'Key factors include equipment quality, labor rates, roof complexity, and available local incentives or tax credits.' }
    ],
    relatedCategories: ['solar-system', 'battery', 'panel-requirements']
  },
  {
    slug: 'battery',
    name: 'Solar Battery Calculators',
    description: 'Size batteries and backup systems.',
    longDescription: 'Plan your energy independence with battery storage. These calculators help you determine the capacity needed for overnight use or multi-day backup during grid outages.',
    icon: Battery,
    order: 3,
    seoTitle: 'Solar Battery Calculators — Size, Runtime & Storage',
    seoDescription: 'Calculate your solar battery storage needs, backup runtime, and usable capacity for home energy storage systems.',
    helpfulInfo: 'When sizing a battery, consider the Usable Capacity vs. Nominal Capacity. Lithium batteries typically allow for 80-95% Depth of Discharge (DoD), whereas Lead-Acid batteries should only be discharged to 50% to preserve their lifespan.',
    faq: [
      { question: 'How much battery storage do I need?', answer: 'This depends on your critical load (appliances that must run) and your desired backup duration (e.g., 4 hours vs. 24 hours).' },
      { question: 'How is battery runtime calculated?', answer: 'Divide the usable energy (kWh) by your average power consumption (kW), adjusted for inverter and battery efficiency.' }
    ],
    relatedCategories: ['inverter', 'solar-system', 'cost-savings']
  },
  {
    slug: 'panel-requirements',
    name: 'Solar Panel Requirement Calculators',
    description: 'Determine how many panels and how much space you need.',
    longDescription: 'Translate your energy goals into physical hardware requirements. Calculate the total number of panels and the required roof footprint for your solar array.',
    icon: Layout,
    order: 4,
    seoTitle: 'Solar Panel Calculators — Panel Count, Size & Roof Space',
    seoDescription: 'Find out exactly how many solar panels you need for your house and how much roof area the installation will require.',
    helpfulInfo: 'The flow is simple: calculate your required System Size (kW), divide by your chosen Panel Wattage to get the Panel Count, and then multiply by the panel dimensions to find the required Roof Space.',
    faq: [
      { question: 'How many solar panels does a house need?', answer: 'A typical US home needs 15-25 panels, while an energy-efficient home in India might need 6-12 panels depending on usage.' },
      { question: 'How much roof space do solar panels require?', answer: 'Standard residential panels are about 17.5 sq. ft (1.6 sq. m). A typical 6kW system requires about 350-450 sq. ft of clear roof space.' }
    ],
    relatedCategories: ['solar-system', 'advanced', 'load-micro']
  },
  {
    slug: 'inverter',
    name: 'Solar Inverter Calculators',
    description: 'Find the right inverter for your solar array.',
    longDescription: 'Ensure your system\'s heart is properly sized. These tools help match your inverter capacity to your solar panels and peak home loads.',
    icon: Cpu,
    order: 5,
    seoTitle: 'Solar Inverter Calculators — Size, Load & Capacity',
    seoDescription: 'Calculate the ideal solar inverter size, capacity, and load requirements for your grid-tied or off-grid solar system.',
    helpfulInfo: 'Inverters should be sized based on two factors: the PV array capacity (DC/AC ratio) and your peak load requirements. We recommend a DC/AC ratio between 1.1 and 1.3 for maximum efficiency.',
    faq: [
      { question: 'What is the difference between peak and surge load?', answer: 'Running load is continuous power, while surge load is the momentary spike required to start motors in appliances like refrigerators.' }
    ],
    relatedCategories: ['battery', 'solar-system', 'load-micro']
  },
  {
    slug: 'advanced',
    name: 'Advanced Solar Calculators',
    description: 'Advanced solar engineering and placement tools.',
    longDescription: 'For professionals and DIY enthusiasts, these tools provide high-precision analysis of tilt angles, irradiance, shading losses, and array engineering.',
    icon: Settings,
    order: 6,
    seoTitle: 'Advanced Solar Calculators — Tilt, Shading, Irradiance & Losses',
    seoDescription: 'High-precision tools for optimal solar panel tilt, shading analysis, irradiance calculation, and system loss modeling.',
    helpfulInfo: 'Small adjustments in tilt and orientation can increase annual production by 5-15%. Our advanced tools help you optimize these parameters based on your exact latitude and local climate data.',
    faq: [
      { question: 'Does panel angle really matter?', answer: 'Yes, especially at higher latitudes. In the winter, a steeper angle catches significantly more sunlight when the sun is low in the sky.' }
    ],
    relatedCategories: ['solar-system', 'panel-requirements', 'inverter']
  },
  {
    slug: 'load-micro',
    name: 'Solar Load & Micro Calculators',
    description: 'Quick conversion tools and load analysis.',
    longDescription: 'Simple tools for daily conversions and appliance-level load calculations. Ideal for quick estimates and cross-checking larger designs.',
    icon: Grid,
    order: 7,
    seoTitle: 'Solar Load Calculators — Home Load, AC & Panel Conversions',
    seoDescription: 'Calculate individual appliance loads, home energy consumption, and use quick conversion tools for solar planning.',
    helpfulInfo: 'These conversion tools help bridge the gap between different units (like Watts to Panels) and specific appliance requirements (like AC Tonnage to Solar Size).',
    faq: [
      { question: 'How do I estimate my home load?', answer: 'Sum the wattage of all appliances that run simultaneously, then add a 20% safety margin for unexpected usage peaks.' }
    ],
    relatedCategories: ['solar-system', 'panel-requirements', 'inverter']
  }
];

export function getCategories() {
  return CATEGORY_REGISTRY.sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(slug: string) {
  return CATEGORY_REGISTRY.find(c => c.slug === slug);
}
