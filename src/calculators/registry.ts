import { CalculatorDefinition, CategoryMetadata } from './types';

export const CATEGORIES: CategoryMetadata[] = [
  {
    id: 'solar-system',
    name: 'Solar System Analysis',
    description: 'Calculate system size, production, and capacity.',
    icon: 'Zap',
    order: 1,
  },
  {
    id: 'cost-savings',
    name: 'Financials & ROI',
    description: 'Estimate costs, savings, and payback periods.',
    icon: 'TrendingUp',
    order: 2,
  },
  {
    id: 'battery',
    name: 'Storage & Backup',
    description: 'Size batteries and backup systems.',
    icon: 'Battery',
    order: 3,
  },
  {
    id: 'panel-requirements',
    name: 'Panel Needs',
    description: 'Determine how many panels and how much space you need.',
    icon: 'Layout',
    order: 4,
  },
  {
    id: 'inverter',
    name: 'Inverter Sizing',
    description: 'Find the right inverter for your solar array.',
    icon: 'Cpu',
    order: 5,
  },
  {
    id: 'advanced',
    name: 'Technical & Engineering',
    description: 'Advanced solar engineering and placement tools.',
    icon: 'Settings',
    order: 6,
  },
  {
    id: 'load',
    name: 'Load Calculations',
    description: 'Calculate your home or business electrical load.',
    icon: 'Home',
    order: 7,
  },
  {
    id: 'micro',
    name: 'Micro Calculators',
    description: 'Quick conversion tools and single-purpose calculators.',
    icon: 'Zap',
    order: 8,
  },
  {
    id: 'conversion',
    name: 'Conversions',
    description: 'Quick conversion tools for solar professionals.',
    icon: 'RefreshCw',
    order: 9,
  },
];

export const CALCULATORS: CalculatorDefinition[] = [
  {
    id: 'solar-panel-calculator',
    slug: '/',
    name: 'Solar Panel Calculator',
    shortDescription: 'Comprehensive solar analysis for home and business.',
    category: 'solar-system',
    icon: 'Sun',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Calculator – Free Solar Estimates & ROI',
    seoDescription: 'Accurate solar panel calculator to estimate system size, costs, and savings for your home or business.',
    relatedCalculators: [
      'solar-panel-savings-calculator',
      'solar-panel-cost-calculator',
      'solar-payback-period-calculator'
    ]
  },
  {
    id: 'solar-panel-savings-calculator',
    slug: '/solar-panel-savings-calculator',
    name: 'Solar Panel Savings Calculator',
    shortDescription: 'Estimate your monthly and lifetime electricity savings.',
    category: 'cost-savings',
    icon: 'TrendingUp',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Savings Calculator — Estimate Solar Savings',
    seoDescription: 'Estimate monthly, annual and long-term electricity savings from installing solar panels based on your usage and electricity rate.',
    faq: [
      { question: "How much can solar save?", answer: "Solar savings depend on your energy consumption, system size, and local electricity rates. Most homeowners save 70-100% on their electricity bills." },
      { question: "Does solar eliminate the electricity bill?", answer: "While solar can offset most of your energy charges, most utilities still charge a monthly grid connection fee." },
      { question: "Does electricity price affect savings?", answer: "Yes, the higher your utility's electricity rate, the more you save by generating your own solar power." },
      { question: "How does net metering affect savings?", answer: "Net metering allows you to export excess solar energy to the grid in exchange for credits, significantly increasing your overall savings." }
    ],
    relatedCalculators: ['solar-panel-cost-calculator', 'solar-payback-period-calculator', 'solar-panel-roi-calculator']
  },
  {
    id: 'solar-panel-cost-calculator',
    slug: '/solar-panel-cost-calculator',
    name: 'Solar Panel Cost Calculator',
    shortDescription: 'Calculate the total cost of installation and components.',
    category: 'cost-savings',
    icon: 'DollarSign',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Cost Calculator — Estimate Solar Installation Cost',
    seoDescription: 'Estimate solar panel system costs, installation expenses, incentives and potential net project cost for your home or property.',
    faq: [
      { question: "How much does a solar system cost?", answer: "Costs vary by region and system size. In the US, it's typically $2.50-$3.20 per watt. In India, ₹60,000-₹75,000 per kW." },
      { question: "What affects solar installation cost?", answer: "Key factors include equipment quality, roof complexity, labor rates, permitting fees, and whether you include battery storage." },
      { question: "Does system size affect cost?", answer: "Yes, larger systems have a higher total cost but often a lower cost-per-watt due to economies of scale." },
      { question: "Does battery storage increase the cost?", answer: "Yes, adding a battery can increase the total project cost by 30-50% but provides backup power and higher self-consumption." },
      { question: "Are these actual installer quotes?", answer: "No, these are estimates for planning purposes. Always get multiple quotes from certified local installers." }
    ],
    relatedCalculators: ['solar-panel-size-calculator', 'solar-panel-savings-calculator', 'solar-payback-period-calculator', 'solar-panel-roi-calculator']
  },
  {
    id: 'solar-payback-period-calculator',
    slug: '/solar-payback-period-calculator',
    name: 'Solar Payback Period Calculator',
    shortDescription: 'Calculate your ROI and the time to break even.',
    category: 'cost-savings',
    icon: 'BarChart3',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Payback Calculator — Estimate Your Solar Payback Period',
    seoDescription: 'Calculate an estimated solar payback period using system cost, incentives, electricity savings and annual expenses.',
    faq: [
      { question: "How is solar payback calculated?", answer: "Payback is calculated by dividing the net system cost by your annual solar savings minus maintenance costs." },
      { question: "What is a typical solar payback period?", answer: "Typically 6 to 10 years, depending on electricity rates, incentives, and solar resource." },
      { question: "Do incentives reduce payback?", answer: "Absolutely. Federal tax credits and local rebates can reduce the payback period by several years." },
      { question: "Can electricity prices affect payback?", answer: "Yes, if electricity prices rise, your solar savings increase, which shortens your payback period." }
    ],
    relatedCalculators: ['solar-panel-roi-calculator', 'solar-panel-savings-calculator', 'solar-panel-cost-calculator']
  },

  {
    id: 'solar-battery-size-calculator',
    slug: '/solar-battery-size-calculator',
    name: 'Solar Battery Size Calculator',
    shortDescription: 'Calculate the estimated battery capacity needed for solar backup.',
    category: 'battery',
    icon: 'Battery',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Battery Size Calculator — Calculate Battery Capacity',
    seoDescription: 'Calculate the estimated battery capacity needed for solar backup based on your energy use, load, backup duration, efficiency and depth of discharge.',
    faq: [
      { question: "How big a battery do I need for solar?", answer: "The size depends on your daily energy consumption, the critical loads you want to power, and how many hours of backup you require." },
      { question: "How many kWh of battery storage do I need?", answer: "A typical US home might need 10-20kWh for partial backup, while a smaller backup for lights and fans in India might only need 2-5kWh." },
      { question: "How does depth of discharge affect battery size?", answer: "A lower Depth of Discharge (DoD) means you need a larger nominal capacity to get the same amount of usable energy." },
      { question: "Does battery efficiency affect capacity?", answer: "Yes, because some energy is lost during charging and discharging, you need a slightly larger battery to compensate for those losses." }
    ],
    relatedCalculators: ['solar-battery-capacity-calculator', 'solar-battery-backup-calculator', 'solar-battery-runtime-calculator', 'solar-panel-calculator']
  },
  {
    id: 'solar-battery-backup-calculator',
    slug: '/solar-battery-backup-calculator',
    name: 'Solar Battery Backup Calculator',
    shortDescription: 'Estimate how long a solar battery can power your home.',
    category: 'battery',
    icon: 'Shield',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Battery Backup Calculator — Estimate Backup Time',
    seoDescription: 'Estimate how long a solar battery can power your home or selected loads based on battery capacity, load and efficiency.',
    faq: [
      { question: "How long will a solar battery last?", answer: "It depends on the battery's usable capacity and the total wattage of the appliances you are running. A 10kWh battery can run a 1,000W load for about 8-9 hours accounting for efficiency." },
      { question: "How many appliances can a battery power?", answer: "This depends on the inverter's power rating (how many watts at once) and the battery's capacity (how long it lasts)." },
      { question: "What affects battery backup time?", answer: "Major factors include the total load, battery state of charge, depth of discharge limits, and ambient temperature." },
      { question: "Can a battery run an AC?", answer: "Yes, but air conditioners draw a lot of power (1,500W-3,000W+), which will drain most residential batteries very quickly." }
    ],
    relatedCalculators: ['solar-battery-size-calculator', 'solar-battery-runtime-calculator', 'solar-battery-capacity-calculator']
  },
  {
    id: 'solar-battery-capacity-calculator',
    slug: '/solar-battery-capacity-calculator',
    name: 'Solar Battery Capacity Calculator',
    shortDescription: 'Find the estimated battery storage capacity needed.',
    category: 'battery',
    icon: 'Zap',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Battery Capacity Calculator — Find Required Storage',
    seoDescription: 'Calculate the estimated battery storage capacity needed for your solar system and backup requirements.',
    faq: [
      { question: "How do I calculate battery capacity?", answer: "Capacity is calculated by multiplying your required backup energy by safety factors for efficiency and depth of discharge." },
      { question: "What is usable battery capacity?", answer: "It is the amount of energy you can actually draw from the battery without damaging it, usually 80-95% for Lithium and 50% for Lead Acid." },
      { question: "What is the difference between kWh and Ah?", answer: "kWh measures total energy, while Ah (Amp-hours) measures charge. Energy (Wh) = Ah × Voltage (V)." }
    ],
    relatedCalculators: ['solar-battery-size-calculator', 'solar-battery-backup-calculator', 'solar-battery-runtime-calculator']
  },
  {
    id: 'solar-battery-runtime-calculator',
    slug: '/solar-battery-runtime-calculator',
    name: 'Solar Battery Runtime Calculator',
    shortDescription: 'Calculate how many hours your battery will last.',
    category: 'battery',
    icon: 'Timer',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Battery Runtime Calculator — How Long Will It Last?',
    seoDescription: 'Calculate estimated battery runtime using battery capacity, load, state of charge, efficiency and depth of discharge.',
    faq: [
      { question: "How do I calculate battery runtime?", answer: "Divide the available usable energy (kWh) by your average power draw (kW). Remember to account for inverter and battery efficiency." },
      { question: "How many hours will a 10 kWh battery last?", answer: "If you pull 1kW, it lasts about 8-9 hours. If you pull 500W, it lasts 16-18 hours." },
      { question: "Does inverter efficiency affect runtime?", answer: "Yes, inverters usually lose 5-15% of energy when converting DC battery power to AC power for your home." }
    ],
    relatedCalculators: ['solar-battery-size-calculator', 'solar-battery-backup-calculator', 'solar-battery-capacity-calculator']
  },
  {
    id: 'solar-battery-storage-calculator',
    slug: '/solar-battery-storage-calculator',
    name: 'Solar Battery Storage Calculator',
    shortDescription: 'Estimate solar battery storage requirements.',
    category: 'battery',
    icon: 'Database',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Battery Storage Calculator — Estimate Battery Storage Needs',
    seoDescription: 'Estimate solar battery storage requirements based on energy consumption, backup duration, load and battery assumptions.',
    faq: [
      { question: "How much battery storage does a house need?", answer: "A typical energy-efficient home uses 20-30kWh per day. For full overnight backup, you might need 10-15kWh of storage." },
      { question: "What is the best battery for solar storage?", answer: "Lithium Iron Phosphate (LiFePO4) is currently the industry standard for home solar due to its long life and safety." }
    ],
    relatedCalculators: ['solar-battery-size-calculator', 'solar-battery-backup-calculator', 'solar-battery-runtime-calculator']
  },
  {
    id: 'solar-inverter-battery-calculator',
    slug: '/solar-inverter-battery-calculator',
    name: 'Solar Inverter Battery Calculator',
    shortDescription: 'Estimate battery requirements for an inverter load.',
    category: 'battery',
    icon: 'Cpu',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Inverter Battery Calculator — Estimate Battery Requirements',
    seoDescription: 'Estimate battery capacity requirements for an inverter and backup load using power, duration, efficiency and battery assumptions.',
    faq: [
      { question: "What is the relationship between inverter and battery?", answer: "The inverter determines how much power (Watts) you can use at once, while the battery determines how long (Hours) you can use it." },
      { question: "Does inverter voltage matter?", answer: "Yes, your battery bank voltage (12V, 24V, 48V) must match the DC input voltage requirement of your inverter." }
    ],
    relatedCalculators: ['solar-battery-size-calculator', 'solar-battery-backup-calculator', 'solar-inverter-calculator']
  },
  {
    id: 'solar-inverter-size-calculator',
    slug: '/solar-inverter-size-calculator',
    name: 'Solar Inverter Size Calculator',
    shortDescription: 'Estimate an appropriate inverter capacity based on solar array and/or load.',
    category: 'inverter',
    icon: 'Cpu',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Inverter Size Calculator — Estimate Inverter Capacity',
    seoDescription: 'Calculate an estimated solar inverter size using your PV system capacity, electrical load, DC/AC ratio and safety assumptions.',
    faq: [
      { question: "How do I calculate solar inverter size?", answer: "Inverter size is typically calculated based on the DC capacity of your solar array (using a DC/AC ratio) or by the peak power demand of your electrical loads." },
      { question: "Should inverter size match solar panel capacity?", answer: "Not exactly. Inverters are often slightly undersized (DC/AC ratio of 1.1 to 1.3) to maximize efficiency and ROI." },
      { question: "What is the DC/AC ratio?", answer: "It is the ratio of solar panel DC power to inverter AC output power. A ratio of 1.2 means 12kW of panels for a 10kW inverter." }
    ],
    relatedCalculators: ['inverter-load-calculator', 'solar-inverter-requirement-calculator', 'solar-panel-calculator']
  },
  {
    id: 'solar-inverter-capacity-calculator',
    slug: '/solar-inverter-capacity-calculator',
    name: 'Solar Inverter Capacity Calculator',
    shortDescription: 'Calculate inverter capacity required for a solar system.',
    category: 'inverter',
    icon: 'Zap',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Inverter Capacity Calculator — Calculate Inverter Size',
    seoDescription: 'Estimate the inverter capacity needed for a solar array and electrical load using configurable sizing assumptions.',
    faq: [
      { question: "Why might an inverter be smaller than the solar array?", answer: "Solar panels rarely produce their full rated power due to heat, orientation, and weather. A slightly smaller inverter operates more efficiently at lower power levels." }
    ],
    relatedCalculators: ['solar-inverter-size-calculator', 'solar-inverter-requirement-calculator']
  },
  {
    id: 'inverter-load-calculator',
    slug: '/inverter-load-calculator',
    name: 'Inverter Load Calculator',
    shortDescription: 'Calculate the load an inverter needs to support.',
    category: 'load',
    icon: 'Activity',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Inverter Load Calculator — Calculate Running & Peak Load',
    seoDescription: 'Calculate running load, estimated peak load and inverter capacity requirements from your appliances and electrical loads.',
    faq: [
      { question: "What is running load?", answer: "Running load is the continuous power consumption of your appliances while they are operational." },
      { question: "What is surge load?", answer: "Surge load (or startup load) is the high initial power required by motors and compressors to start, which can be 3-7 times the running power." }
    ],
    relatedCalculators: ['solar-inverter-size-calculator', 'solar-battery-backup-calculator']
  },
  {
    id: 'solar-inverter-requirement-calculator',
    slug: '/solar-inverter-requirement-calculator',
    name: 'Solar Inverter Requirement Calculator',
    shortDescription: 'Comprehensive inverter requirement tool.',
    category: 'inverter',
    icon: 'Cpu',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Inverter Requirement Calculator — Estimate Your Inverter',
    seoDescription: 'Estimate solar inverter requirements using PV capacity, running load, peak load, DC/AC ratio and safety assumptions.',
    faq: [
      { question: "How large an inverter do I need for my house?", answer: "A typical house needs between 3kW and 10kW depending on heavy appliances like ACs, pumps, and water heaters." }
    ],
    relatedCalculators: ['solar-inverter-size-calculator', 'inverter-load-calculator', 'solar-panel-calculator']
  },
  {
    id: 'off-grid-solar-calculator',
    slug: '/off-grid-solar-calculator',
    name: 'Off-Grid Solar Calculator',
    shortDescription: 'Design an independent solar system for remote locations.',
    category: 'solar-system',
    icon: 'Mountain',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    relatedCalculators: ['solar-battery-calculator']
  },
  {
    id: 'hybrid-solar-calculator',
    slug: '/hybrid-solar-calculator',
    name: 'Hybrid Solar Calculator',
    shortDescription: 'Optimize energy storage with grid connectivity.',
    category: 'solar-system',
    icon: 'GitCompare',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    relatedCalculators: ['solar-battery-calculator', 'solar-panel-calculator']
  },
  {
    id: 'solar-panel-roi-calculator',
    slug: '/solar-panel-roi-calculator',
    name: 'Solar Panel ROI Calculator',
    shortDescription: 'Detailed financial analysis of your solar investment.',
    category: 'cost-savings',
    icon: 'PieChart',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel ROI Calculator — Estimate Solar Return on Investment',
    seoDescription: 'Estimate solar investment returns, cumulative savings and simple ROI using system cost, savings and project assumptions.',
    faq: [
      { question: "How is solar ROI calculated?", answer: "Simple ROI is the net gain (total savings minus net cost) divided by the net investment cost, expressed as a percentage." },
      { question: "What is simple solar ROI?", answer: "It's a straightforward measure of profitability that doesn't account for the time value of money (like NPV would)." },
      { question: "Does the calculator include maintenance?", answer: "Yes, you can include annual maintenance and degradation to get a more realistic ROI estimate." },
      { question: "Are ROI results guaranteed?", answer: "No, these are estimates based on your inputs and assumptions about future electricity prices and system performance." }
    ],
    relatedCalculators: ['solar-payback-period-calculator', 'solar-panel-savings-calculator', 'solar-investment-return-calculator']
  },

  {
    id: 'commercial-solar-calculator',
    slug: '/commercial-solar-calculator',
    name: 'Commercial Solar Calculator',
    shortDescription: 'Solar analysis for businesses and industrial units.',
    category: 'solar-system',
    icon: 'Building2',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    relatedCalculators: ['solar-panel-calculator']
  },
  {
    id: 'solar-bill-savings-calculator',
    slug: '/solar-bill-savings-calculator',
    name: 'Solar Bill Savings Calculator',
    shortDescription: 'Precisely how much will your bill drop with solar?',
    category: 'cost-savings',
    icon: 'ReceiptText',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Bill Savings Calculator — Estimate Your Electricity Savings',
    seoDescription: 'Estimate how much your electricity bill could change after solar using your usage, electricity rate, solar production and export assumptions.',
    faq: [
      { question: "How is solar bill savings calculated?", answer: "We compare your current utility bill against a post-solar bill that includes solar generation, self-consumption, and any grid export credits." },
      { question: "Does solar eliminate the electricity bill?", answer: "Not usually. Most utilities have a minimum monthly connection fee even if you generate more power than you use." },
      { question: "Does electricity price affect savings?", answer: "Yes, as utility rates increase, the value of the energy your solar system produces also increases." },
      { question: "How does net metering affect savings?", answer: "Net metering allows you to get credit for the energy you send back to the grid, which offsets the cost of energy you buy at night." }
    ],
    relatedCalculators: ['solar-panel-savings-calculator', 'solar-panel-cost-calculator', 'solar-payback-period-calculator']
  },
  {
    id: 'solar-electricity-cost-calculator',
    slug: '/solar-electricity-cost-calculator',
    name: 'Solar Electricity Cost Calculator',
    shortDescription: 'Compare estimated electricity costs with grid power and solar.',
    category: 'cost-savings',
    icon: 'Zap',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Electricity Cost Calculator — Compare Solar & Grid Costs',
    seoDescription: 'Compare estimated electricity costs with grid power and solar using your energy usage, rates, system costs and assumptions.',
    faq: [
      { question: "How does solar electricity cost compare to grid power?", answer: "Over its 25-year life, solar typically provides electricity at a lower 'levelized cost' than the grid in most regions." },
      { question: "Does this include battery storage?", answer: "Yes, you can choose to include battery costs to see how storage affects your overall cost of electricity." },
      { question: "What factors affect the cost of solar energy?", answer: "The initial system cost, maintenance, system degradation, and your location's solar resource all play a role." }
    ],
    relatedCalculators: ['solar-panel-cost-calculator', 'solar-panel-savings-calculator', 'solar-payback-period-calculator']
  },
  {
    id: 'solar-installation-cost-calculator',
    slug: '/solar-installation-cost-calculator',
    name: 'Solar Installation Cost Calculator',
    shortDescription: 'Estimate detailed installation and project costs.',
    category: 'cost-savings',
    icon: 'Hammer',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Installation Cost Calculator — Estimate Project Costs',
    seoDescription: 'Estimate solar installation and project costs using system size, cost per watt, labor, equipment and other project expenses.',
    faq: [
      { question: "What are the components of solar installation cost?", answer: "It typically includes labor, electrical wiring, mounting hardware, permitting, and inspection fees." },
      { question: "How much does labor cost for solar installation?", answer: "Labor usually accounts for 10-25% of the total system cost, depending on roof complexity and local wages." },
      { question: "Do installation costs vary by roof type?", answer: "Yes, installing on a flat roof or a metal roof is often simpler and cheaper than on a steep tile roof." }
    ],
    relatedCalculators: ['solar-panel-cost-calculator', 'solar-panel-size-calculator', 'solar-payback-period-calculator']
  },
  {
    id: 'solar-investment-return-calculator',
    slug: '/solar-investment-return-calculator',
    name: 'Solar Investment Return Calculator',
    shortDescription: 'Estimate long-term solar savings and return.',
    category: 'cost-savings',
    icon: 'TrendingUp',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Investment Return Calculator — Estimate Solar Returns',
    seoDescription: 'Estimate long-term solar savings, net gain, payback and simple return using project cost and energy savings assumptions.',
    faq: [
      { question: "Is solar a good financial investment?", answer: "For most homeowners in sunny regions with high electricity rates, solar offers an internal rate of return (IRR) that beats traditional savings accounts." },
      { question: "What affects the return on a solar investment?", answer: "Key factors are the net system cost, local electricity rates, utility price inflation, and system longevity." },
      { question: "How long will a solar investment last?", answer: "Most systems are warrantied for 25 years and can continue producing power long after that." }
    ],
    relatedCalculators: ['solar-panel-roi-calculator', 'solar-payback-period-calculator', 'solar-panel-savings-calculator']
  },

  {
    id: 'net-metering-calculator',
    slug: '/net-metering-calculator',
    name: 'Net Metering Calculator',
    shortDescription: 'Calculate credits for energy exported to the grid.',
    category: 'cost-savings',
    icon: 'ArrowLeftRight',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    relatedCalculators: ['solar-panel-calculator']
  },
  {
    id: 'solar-panel-size-calculator',
    slug: '/solar-panel-size-calculator',
    name: 'Solar Panel Size Calculator',
    shortDescription: 'Calculate the recommended solar system capacity.',
    category: 'solar-system',
    icon: 'Maximize',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Size Calculator — Find Your Solar System Size',
    seoDescription: 'Calculate the solar panel system size you may need based on electricity usage, solar hours, panel efficiency and your target energy offset.',
    relatedCalculators: ['solar-panel-calculator', 'solar-system-size-calculator', 'solar-panel-output-calculator']
  },
  {
    id: 'solar-system-size-calculator',
    slug: '/solar-system-size-calculator',
    name: 'Solar System Size Calculator',
    shortDescription: 'Estimate the solar system capacity needed for your home or property.',
    category: 'solar-system',
    icon: 'Zap',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar System Size Calculator — Calculate Required Solar Capacity',
    seoDescription: 'Estimate the solar system capacity needed for your home or property based on electricity consumption and solar production assumptions.',
    relatedCalculators: ['solar-panel-calculator', 'solar-panel-size-calculator', 'solar-energy-production-calculator']
  },
  {
    id: 'solar-panel-wattage-calculator',
    slug: '/solar-panel-wattage-calculator',
    name: 'Solar Panel Wattage Calculator',
    shortDescription: 'Compare solar panel wattages and calculate how many panels you need.',
    category: 'panel-requirements',
    icon: 'Layout',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Wattage Calculator — Calculate Panels Needed',
    seoDescription: 'Compare solar panel wattages and calculate how many panels you need for a target solar system size.',
    relatedCalculators: ['solar-panel-calculator', 'solar-panel-size-calculator', 'solar-panel-output-calculator']
  },
  {
    id: 'solar-panel-output-calculator',
    slug: '/solar-panel-output-calculator',
    name: 'Solar Panel Output Calculator',
    shortDescription: 'Estimate electricity generated by a solar panel or system.',
    category: 'solar-system',
    icon: 'Sun',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Output Calculator — Estimate Solar Energy Production',
    seoDescription: 'Estimate daily, monthly and annual electricity production from a solar panel or complete solar system.',
    relatedCalculators: ['solar-energy-production-calculator', 'solar-panel-size-calculator', 'solar-system-size-calculator']
  },
  {
    id: 'solar-energy-production-calculator',
    slug: '/solar-energy-production-calculator',
    name: 'Solar Energy Production Calculator',
    shortDescription: 'Estimate monthly and annual solar energy production.',
    category: 'solar-system',
    icon: 'TrendingUp',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Energy Production Calculator — Estimate Solar Generation',
    seoDescription: 'Estimate monthly and annual solar energy production based on system size, location, sunlight and system performance.',
    relatedCalculators: ['solar-panel-output-calculator', 'solar-panel-size-calculator', 'solar-system-size-calculator']
  },
  {
    id: 'solar-tilt-angle-calculator',
    slug: '/solar-tilt-angle-calculator',
    name: 'Solar Tilt Angle Calculator',
    shortDescription: 'Find the optimal tilt for your location.',
    category: 'advanced',
    icon: 'Compass',
    status: 'coming-soon',
    featured: false,
    countries: ['GLOBAL']
  },
  {
    id: 'how-many-solar-panels-do-i-need',
    slug: '/how-many-solar-panels-do-i-need',
    name: 'How Many Solar Panels Do I Need?',
    shortDescription: 'Calculate the estimated number of solar panels required for your home.',
    category: 'panel-requirements',
    icon: 'Grid',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'How Many Solar Panels Do I Need? Calculator',
    seoDescription: 'Calculate how many solar panels you may need based on electricity usage, panel wattage, location and your target solar energy offset.',
    faq: [
      { question: "How many solar panels does a house need?", answer: "An average US home requires 15-25 panels, while a typical Indian home might need 6-12 panels depending on usage." },
      { question: "How many 400W solar panels do I need?", answer: "Divide your required system wattage by 400. For a 5kW system, you need 13 panels (5000 / 400 = 12.5, rounded up)." },
      { question: "Does electricity usage affect panel count?", answer: "Yes, the more energy you consume, the larger the solar system and panel count required to offset that usage." },
      { question: "Does panel wattage change the number of panels?", answer: "Yes, higher wattage panels generate more power per panel, meaning you need fewer physical panels to reach your target capacity." }
    ],
    relatedCalculators: ['solar-panel-calculator', 'solar-panel-size-calculator', 'solar-panel-wattage-calculator', 'solar-roof-area-calculator', 'solar-panel-space-calculator']
  },
  {
    id: 'solar-panels-needed-calculator',
    slug: '/solar-panels-needed-calculator',
    name: 'Solar Panels Needed Calculator',
    shortDescription: 'Calculate panels needed for a target system size.',
    category: 'panel-requirements',
    icon: 'Maximize',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panels Needed Calculator — Calculate Panel Count',
    seoDescription: 'Calculate the estimated number of solar panels required for your target solar system size and panel wattage.',
    faq: [
      { question: "How do I calculate panels for a 5kW system?", answer: "If using 400W panels, divide 5,000 Watts by 400 Watts, which equals 12.5. You would need 13 panels." }
    ],
    relatedCalculators: ['how-many-solar-panels-do-i-need', 'solar-panel-wattage-calculator', 'solar-panel-requirement-calculator']
  },
  {
    id: 'solar-panels-for-house-calculator',
    slug: '/solar-panels-for-house-calculator',
    name: 'Solar Panels for House Calculator',
    shortDescription: 'Estimate panels and energy production for your home.',
    category: 'panel-requirements',
    icon: 'Home',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panels for House Calculator — Estimate Panel Requirements',
    seoDescription: 'Estimate the solar system size, panel count and energy production needed for your home.',
    faq: [
      { question: "How many solar panels do I need for my home?", answer: "It depends on your annual kWh usage. A home using 10,000 kWh per year might need a 6-8kW system (15-20 panels)." },
      { question: "Can I calculate panels from my electricity bill?", answer: "Yes, by dividing your monthly bill by the electricity rate, we can estimate your usage and the panels needed to offset it." },
      { question: "Does house size determine solar panel requirements?", answer: "Not directly. Energy consumption behavior and appliance usage are much better indicators than square footage alone." }
    ],
    relatedCalculators: ['how-many-solar-panels-do-i-need', 'solar-panel-requirement-calculator', 'solar-roof-area-calculator']
  },
  {
    id: 'solar-roof-area-calculator',
    slug: '/solar-roof-area-calculator',
    name: 'Solar Roof Area Calculator',
    shortDescription: 'Estimate the roof area needed for your solar panels.',
    category: 'panel-requirements',
    icon: 'Box',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Roof Area Calculator — Estimate Solar Panel Space',
    seoDescription: 'Calculate the estimated roof area needed for solar panels using panel dimensions, panel count and spacing assumptions.',
    faq: [
      { question: "How much roof space does solar require?", answer: "A typical 6kW system with 15 panels requires about 300-400 square feet of usable roof area." },
      { question: "How much space does one solar panel take?", answer: "A standard 400W panel is roughly 20-23 square feet (approx 1.7-2.0 square meters)." },
      { question: "Do I need extra roof space between panels?", answer: "Yes, professional installers leave gaps for mounting hardware, walkways, and thermal expansion, typically adding 20-30% to the panel-only area." },
      { question: "Can all roof space be used for solar?", answer: "No, local fire codes and building regulations usually require setbacks from roof edges and ridges for safety and access." }
    ],
    relatedCalculators: ['solar-panels-needed-calculator', 'solar-panel-space-calculator', 'solar-panel-requirement-calculator', 'solar-panel-calculator']
  },
  {
    id: 'solar-panel-space-calculator',
    slug: '/solar-panel-space-calculator',
    name: 'Solar Panel Space Calculator',
    shortDescription: 'Calculate the physical space required for an array.',
    category: 'panel-requirements',
    icon: 'Maximize2',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Space Calculator — Calculate Solar Array Area',
    seoDescription: 'Estimate the physical space required for a solar panel array based on panel size, quantity and layout.',
    faq: [
      { question: "What is the difference between panel area and array area?", answer: "Panel area is just the surface of the glass. Array area includes the spacing, mounting frames, and required walkways." },
      { question: "Does portrait or landscape orientation use less space?", answer: "The total area is similar, but one orientation might fit your specific roof dimensions better than the other." }
    ],
    relatedCalculators: ['solar-roof-area-calculator', 'solar-panel-requirement-calculator', 'solar-panels-needed-calculator']
  },
  {
    id: 'solar-panel-requirement-calculator',
    slug: '/solar-panel-requirement-calculator',
    name: 'Solar Panel Requirement Calculator',
    shortDescription: 'Complete analysis of panel count and roof space.',
    category: 'panel-requirements',
    icon: 'CheckSquare',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Requirement Calculator — Size Your Solar Array',
    seoDescription: 'Estimate solar panel quantity, system capacity, energy production and roof space requirements for your property.',
    faq: [
      { question: "What is a solar panel requirement analysis?", answer: "It's a comprehensive look at your energy needs, local sun resources, and physical space availability to determine the ideal solar configuration." }
    ],
    relatedCalculators: ['how-many-solar-panels-do-i-need', 'solar-roof-area-calculator', 'solar-panel-space-calculator', 'solar-panel-calculator']
  },
  {
    id: 'solar-tilt-angle-calculator',
    slug: '/solar-tilt-angle-calculator',
    name: 'Solar Tilt Angle Calculator',
    shortDescription: 'Find the optimal tilt for your solar panels based on latitude.',
    category: 'advanced',
    icon: 'Maximize',
    status: 'active',
    featured: true,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Tilt Angle Calculator — Find an Estimated Panel Tilt',
    seoDescription: 'Estimate a suitable solar panel tilt angle using location, latitude and your production goal.',
    faq: [
      { question: 'What angle should solar panels be installed at?', answer: 'The optimal angle depends on your latitude and whether you want to maximize production for summer, winter, or the entire year.' },
      { question: 'Does latitude affect solar panel tilt?', answer: 'Yes, latitude is the primary factor. As a general rule, your tilt should be close to your latitude for balanced annual production.' },
      { question: 'Should solar panels have a different angle in winter?', answer: 'Yes, panels should be tilted more steeply (Latitude + 15°) in winter to capture the sun when it is lower in the sky.' }
    ],
    relatedCalculators: ['solar-panel-angle-calculator', 'solar-irradiance-calculator', 'solar-energy-production-calculator', 'solar-array-size-calculator']
  },
  {
    id: 'solar-panel-angle-calculator',
    slug: '/solar-panel-angle-calculator',
    name: 'Solar Panel Angle Calculator',
    shortDescription: 'Guidance on solar panel tilt and azimuth orientation.',
    category: 'advanced',
    icon: 'Compass',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Panel Angle Calculator — Tilt & Orientation Guide',
    seoDescription: 'Estimate solar panel tilt and orientation using your location, latitude, hemisphere and production goals.',
    faq: [
      { question: 'What is solar panel azimuth?', answer: 'Azimuth is the horizontal direction the panels face, measured in degrees relative to North (0°).' },
      { question: 'Which direction should solar panels face?', answer: 'In the Northern Hemisphere, True South (180°) is generally best. In the Southern Hemisphere, True North (0°) is preferred.' }
    ],
    relatedCalculators: ['solar-tilt-angle-calculator', 'solar-system-loss-calculator', 'solar-energy-production-calculator']
  },
  {
    id: 'solar-irradiance-calculator',
    slug: '/solar-irradiance-calculator',
    name: 'Solar Irradiance Calculator',
    shortDescription: 'Calculate solar resource and energy metrics for your location.',
    category: 'advanced',
    icon: 'Sun',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Irradiance Calculator — Estimate Solar Energy',
    seoDescription: 'Calculate or interpret solar irradiance and solar energy values using location or manual solar resource inputs.',
    faq: [
      { question: 'What is solar irradiance?', answer: 'Solar irradiance is the power per unit area received from the sun (W/m²).' },
      { question: 'What is the difference between irradiance and irradiation?', answer: 'Irradiance is power (W/m²), while irradiation is energy (kWh/m²) received over a specific time period.' }
    ],
    relatedCalculators: ['solar-energy-production-calculator', 'solar-panel-output-calculator']
  },
  {
    id: 'solar-shading-calculator',
    slug: '/solar-shading-calculator',
    name: 'Solar Shading Calculator',
    shortDescription: 'Estimate how shading impacts your solar production.',
    category: 'advanced',
    icon: 'CloudOff',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Shading Calculator — Estimate Shading Losses',
    seoDescription: 'Estimate the potential effect of shading on solar production using shading percentage and solar generation assumptions.',
    faq: [
      { question: 'How much does shading reduce solar production?', answer: 'Even small amounts of shading can significantly reduce output, as panels are often connected in series like a kinked hose.' }
    ],
    relatedCalculators: ['solar-system-loss-calculator', 'solar-energy-production-calculator', 'solar-panel-output-calculator']
  },
  {
    id: 'solar-system-loss-calculator',
    slug: '/solar-system-loss-calculator',
    name: 'Solar System Loss Calculator',
    shortDescription: 'Calculate combined solar system losses from various factors.',
    category: 'advanced',
    icon: 'TrendingDown',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar System Loss Calculator — Estimate Solar Losses',
    seoDescription: 'Estimate combined solar system losses from shading, wiring, inverter, soiling, temperature and other factors.',
    faq: [
      { question: 'What causes solar system losses?', answer: 'Common factors include inverter inefficiency, wiring resistance, dust (soiling), and high temperatures.' }
    ],
    relatedCalculators: ['solar-shading-calculator', 'solar-energy-production-calculator', 'solar-panel-output-calculator']
  },
  {
    id: 'solar-array-size-calculator',
    slug: '/solar-array-size-calculator',
    name: 'Solar Array Size Calculator',
    shortDescription: 'Calculate the required PV array capacity and panel count.',
    category: 'advanced',
    icon: 'Maximize',
    status: 'active',
    featured: false,
    countries: ['GLOBAL'],
    seoTitle: 'Solar Array Size Calculator — Calculate PV Array Capacity',
    seoDescription: 'Calculate an estimated solar array size, panel count and energy production based on electricity demand and solar resource.',
    faq: [
      { question: 'What is a solar array?', answer: 'A solar array is a collection of multiple solar panels connected together to function as a single power-generating unit.' }
    ],
    relatedCalculators: ['solar-panel-size-calculator', 'solar-panel-requirement-calculator', 'solar-panel-wattage-calculator', 'solar-energy-production-calculator']
  },
  {
    id: 'solar-panel-calculator-usa',
    slug: 'solar-calculator/usa',
    name: 'USA Solar Calculator',
    shortDescription: 'Estimate solar panel requirements for any US state.',
    category: 'solar-system',
    icon: 'Flag',
    status: 'active',
    featured: true,
    countries: ['US'],
    seoTitle: 'Solar Calculator USA — Estimate Solar Panels, Cost & Savings',
    seoDescription: 'Use our free solar calculator for the USA to estimate system size, panels needed, energy production, solar costs, savings and payback.',
    faq: [
      {
        question: 'How much does solar cost in the USA?',
        answer: 'Solar pricing in the USA varies by state, system size, property characteristics, and installer competition. National averages range from $2.50 to $3.50 per watt before incentives.'
      },
      {
        question: 'How many solar panels does a US home need?',
        answer: 'The average US home needs 15 to 25 solar panels, depending on electricity usage, local solar resource (peak sun hours), and the wattage of the panels chosen.'
      }
    ]
  },
  {
    id: 'solar-panel-cost-calculator-usa',
    slug: 'solar-panel-cost-calculator/usa',
    name: 'USA Solar Cost Calculator',
    shortDescription: 'Estimate solar system and installation costs across the United States.',
    category: 'cost-savings',
    icon: 'DollarSign',
    status: 'active',
    featured: false,
    countries: ['US'],
    seoTitle: 'Solar Panel Cost Calculator USA — Estimate Solar Installation Cost',
    seoDescription: 'Estimate solar system and installation costs in the USA using system size, electricity rates, incentives and your own assumptions.',
    faq: [
      {
        question: 'Does every state have the same solar incentives?',
        answer: 'No, solar incentives vary significantly by state. While the 30% federal tax credit is available nationwide, state rebates, tax exemptions, and performance incentives are program-specific.'
      }
    ]
  },
  {
    id: 'solar-panel-savings-calculator-usa',
    slug: 'solar-panel-savings-calculator/usa',
    name: 'USA Solar Savings Calculator',
    shortDescription: 'Estimate potential solar electricity savings in the USA.',
    category: 'cost-savings',
    icon: 'TrendingUp',
    status: 'active',
    featured: false,
    countries: ['US'],
    seoTitle: 'Solar Savings Calculator USA — Estimate Electricity Savings',
    seoDescription: 'Estimate potential solar electricity savings in the USA using your energy usage, utility rate, solar production and export assumptions.',
    faq: [
      {
        question: 'Does every utility offer the same net-metering rules?',
        answer: 'No. Net-metering policies and export compensation rates are determined by individual state utility commissions and specific utility programs.'
      }
    ]
  },
  {
    id: 'solar-payback-period-calculator-usa',
    slug: 'solar-payback-period-calculator/usa',
    name: 'USA Solar Payback Calculator',
    shortDescription: 'Calculate the estimated time for your solar investment to pay for itself.',
    category: 'cost-savings',
    icon: 'Clock',
    status: 'active',
    featured: false,
    countries: ['US'],
    seoTitle: 'Solar Payback Period Calculator USA — Estimate Payback Time',
    seoDescription: 'Use our payback calculator for the USA to estimate how many years it will take for your solar savings to cover the initial investment cost.',
    faq: [
      {
        question: 'Are calculator results guaranteed?',
        answer: 'No. All results are estimates based on provided inputs and regional averages. Actual production and savings depend on specific installation conditions and utility rate changes.'
      }
    ]
  },
  {
    id: 'solar-panel-calculator-india',
    slug: 'solar-calculator/india',
    name: 'India Solar Calculator',
    shortDescription: 'Estimate solar panel requirements for any Indian state or UT.',
    category: 'solar-system',
    icon: 'Sun',
    status: 'active',
    featured: true,
    countries: ['IN'],
    seoTitle: 'Solar Calculator India — Estimate Solar Panels, Cost & Savings',
    seoDescription: 'Use our solar calculator for India to estimate solar system size, panel count, energy production, cost, savings and payback.',
    faq: [
      {
        question: 'How much does a solar system cost in India?',
        answer: 'Solar system costs in India typically range from ₹50,000 to ₹80,000 per kW, depending on the system type (On-grid, Off-grid, Hybrid), equipment quality, and installation requirements.'
      },
      {
        question: 'How many solar panels does a house need in India?',
        answer: 'A typical Indian household with a monthly bill of 250-300 units (kWh) usually requires a 3kW system, which consists of about 6-9 panels depending on their individual wattage.'
      },
      {
        question: 'What is 1 unit of electricity in India?',
        answer: 'In the Indian electricity billing system, 1 unit equals 1 kWh (kilowatt-hour) of energy consumption.'
      }
    ]
  },
  {
    id: 'solar-panel-cost-calculator-india',
    slug: 'solar-panel-cost-calculator/india',
    name: 'India Solar Cost Calculator',
    shortDescription: 'Estimate solar system and installation costs across India.',
    category: 'cost-savings',
    icon: 'Zap',
    status: 'active',
    featured: false,
    countries: ['IN'],
    seoTitle: 'Solar Panel Cost Calculator India — Estimate Solar System Cost',
    seoDescription: 'Estimate solar system and installation costs in India using system size, cost per watt, electricity usage and your own assumptions.',
    faq: [
      {
        question: 'Is solar subsidy available in every state?',
        answer: 'Subsidy eligibility depends on current central government programs (like PM Surya Ghar) and additional state-specific incentives, which vary by capacity and residential status.'
      }
    ]
  },
  {
    id: 'solar-panel-savings-calculator-india',
    slug: 'solar-panel-savings-calculator/india',
    name: 'India Solar Savings Calculator',
    shortDescription: 'Estimate potential solar electricity savings in India.',
    category: 'cost-savings',
    icon: 'TrendingUp',
    status: 'active',
    featured: false,
    countries: ['IN'],
    seoTitle: 'Solar Savings Calculator India — Estimate Electricity Bill Savings',
    seoDescription: 'Estimate potential solar electricity savings in India using your electricity units, tariff, solar production and export assumptions.',
    faq: [
      {
        question: 'Does solar eliminate the electricity bill in India?',
        answer: 'Solar can significantly reduce energy charges, but most DISCOMs still include fixed monthly charges and taxes in the final bill.'
      }
    ]
  },
  {
    id: 'solar-payback-period-calculator-india',
    slug: 'solar-payback-period-calculator/india',
    name: 'India Solar Payback Calculator',
    shortDescription: 'Calculate the estimated time for your solar investment to pay for itself in India.',
    category: 'cost-savings',
    icon: 'Clock',
    status: 'active',
    featured: false,
    countries: ['IN'],
    seoTitle: 'Solar Payback Period Calculator India — Estimate Payback Time',
    seoDescription: 'Use our payback calculator for India to estimate how many years it will take for your solar savings to cover the initial investment cost.',
    faq: [
      {
        question: 'What is a typical solar payback period in India?',
        answer: 'With the current central subsidy and rising electricity tariffs, the payback period for residential solar in India is typically 4 to 6 years.'
      }
    ]
  }
];

