import { CalculatorSEOData } from '../calculators/types';

export const CALCULATOR_SEO_REGISTRY: Record<string, CalculatorSEOData> = {
  'solar-panel-calculator': {
    id: 'solar-panel-calculator',
    seoTitle: 'Solar Panel Calculator — Estimate Solar Size & Panels',
    seoDescription: 'Professional solar panel calculator to estimate system size, number of panels, solar production and electricity savings for your home.',
    h1: 'Solar Panel Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar panel calculator', 'solar panel size calculator', 'solar system calculator', 'solar panel estimate', 'how many solar panels do I need'],
    intro: 'Determine the ideal solar system size and panel count for your home based on your electricity usage and local sunlight conditions.',
    howItWorks: 'Our calculator analyzes your annual energy consumption, factors in your location\'s specific peak sun hours, and applies a performance ratio to determine the precise DC system capacity required to meet your energy goals.',
    methodology: 'Required System Size (kW) = Annual Energy Requirement (kWh) ÷ (Peak Sun Hours × 365 × Performance Ratio). Panel Count = System Size in Watts ÷ Panel Wattage.',
    example: 'A home using 900 kWh/month (10,800 kWh/year) in a location with 4.5 peak sun hours requires approximately an 8 kW system (20 panels of 400W each).',
    limitations: 'Calculations are estimates. Actual production depends on shading, tilt, orientation, and specific equipment efficiencies.',
    faq: [
      { 
        question: 'How many solar panels do I need for my house?', 
        answer: 'The average US home requires between 15 and 25 solar panels to offset 100% of its electricity usage, depending on the panel wattage and local sunlight.' 
      },
      { 
        question: 'What information do I need to use the solar calculator?', 
        answer: 'You will need your average monthly electricity usage (kWh) or your average monthly bill amount, and your location to determine solar irradiance.' 
      }
    ]
  },
  'solar-panel-savings-calculator': {
    id: 'solar-panel-savings-calculator',
    seoTitle: 'Solar Panel Savings Calculator — Estimate Solar Savings',
    seoDescription: 'Calculate estimated monthly, annual and lifetime electricity bill savings from installing solar panels.',
    h1: 'Solar Panel Savings Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar panel savings calculator', 'solar savings estimator', 'electricity bill savings solar'],
    intro: 'Estimate how much money you can save on your electricity bills by switching to solar energy.',
    howItWorks: 'We compare your current utility costs against the projected solar production, factoring in net metering credits and annual electricity price inflation.',
    methodology: 'Total Savings = (Solar Generation × Utility Rate) - (Maintenance + Insurance). 25-Year Savings accounts for 0.5% annual panel degradation and 3% electricity price escalation.',
    example: 'A system saving $150 per month on a utility bill with a 3% annual rate hike can save over $65,000 over 25 years.',
    limitations: 'Savings depend on utility net metering policies and future electricity rate changes which cannot be guaranteed.',
    faq: [
      { 
        question: 'Does solar eliminate my electricity bill?', 
        answer: 'While solar can offset 100% of your energy usage charges, most utilities still charge a small monthly grid connection fee.' 
      }
    ]
  },
  'solar-battery-runtime-calculator': {
    id: 'solar-battery-runtime-calculator',
    seoTitle: 'Solar Battery Runtime Calculator — Estimate Backup Time',
    seoDescription: 'Calculate how long your solar battery will last during a power outage based on your load and battery capacity.',
    h1: 'Solar Battery Runtime Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar battery runtime calculator', 'how long will solar battery last', 'battery backup calculator'],
    intro: 'Determine how many hours or days your battery storage system can power your critical home loads.',
    howItWorks: 'The calculator divides your usable battery capacity (Total Capacity × Depth of Discharge) by your average power consumption (Load).',
    methodology: 'Runtime (Hours) = (Battery Capacity in kWh × DoD × Efficiency) ÷ Load (kW).',
    example: 'A 10kWh battery with a 90% DoD and 90% efficiency powering a 1kW continuous load will last approximately 8.1 hours.',
    limitations: 'Runtime varies significantly based on instantaneous power surges from appliances like air conditioners or pumps.',
    faq: [
      { 
        question: 'How long will a 10kWh battery power my house?', 
        answer: 'A 10kWh battery typically powers critical loads (lights, fridge, internet) for 8-12 hours, or a whole modern house for 2-4 hours.' 
      }
    ]
  },
  'solar-panel-cost-calculator': {
    id: 'solar-panel-cost-calculator',
    seoTitle: 'Solar Panel Cost Calculator — Estimate Solar Installation Cost',
    seoDescription: 'Estimate solar panel system costs, installation expenses, incentives and potential net project cost for your home or property.',
    h1: 'Solar Panel Cost Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar panel cost calculator', 'solar installation cost', 'solar system price', 'solar panels price estimate'],
    intro: 'Calculate the total estimated cost of your solar energy system, including components, labor, and available financial incentives.',
    howItWorks: 'We estimate the gross cost based on system size and local pricing benchmarks, then subtract federal and state incentives to find your net project cost.',
    methodology: 'Net Cost = (System Size in Watts × Cost Per Watt) + Component Add-ons - (Tax Credits + Rebates).',
    example: 'A 7 kW system at $3.00/watt costs $21,000 gross. After a 30% Federal Tax Credit ($6,300), the net cost is $14,700.',
    limitations: 'Market prices fluctuate based on equipment availability, labor rates, and roof complexity. These are estimates for planning purposes.',
    faq: [
      { 
        question: 'What is the average cost of solar panels?', 
        answer: 'In 2024, the average cost of residential solar in the US ranges from $2.50 to $3.30 per watt before incentives.' 
      },
      { 
        question: 'How do tax credits reduce solar cost?', 
        answer: 'Federal tax credits like the ITC allow you to deduct a percentage of your installation cost (currently 30%) directly from your federal income taxes.' 
      }
    ]
  },
  'solar-payback-period-calculator': {
    id: 'solar-payback-period-calculator',
    seoTitle: 'Solar Payback Calculator — Estimate Your Solar Break-Even Point',
    seoDescription: 'Calculate an estimated solar payback period using system cost, incentives, electricity savings and annual expenses.',
    h1: 'Solar Payback Period Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar payback period calculator', 'solar roi calculator', 'solar break even point', 'solar investment analysis'],
    intro: 'Determine how many years it will take for your solar panel system to pay for itself through electricity bill savings.',
    howItWorks: 'The calculator compares the net cost of your solar installation against the cumulative electricity bill savings over time, factoring in utility rate inflation.',
    methodology: 'Payback Period = Net System Cost ÷ (Annual Savings - Annual Maintenance). We account for 0.5% annual panel degradation and 3% utility inflation.',
    example: 'A system with a net cost of $15,000 saving $2,000 in the first year with a 3% annual utility increase will pay for itself in approximately 7 years.',
    limitations: 'Payback speed depends heavily on local utility rates and net metering policies which may change over the system life.',
    faq: [
      { 
        question: 'What is a good payback period for solar?', 
        answer: 'A payback period under 10 years is generally considered an excellent investment for residential solar.' 
      },
      { 
        question: 'Does a battery affect my payback period?', 
        answer: 'Yes, adding a battery increases initial cost, which typically extends the payback period, though it provides essential backup and higher self-consumption value.' 
      }
    ]
  },
  'solar-panel-size-calculator': {
    id: 'solar-panel-size-calculator',
    seoTitle: 'Solar Panel Size Calculator — Find Your Ideal kW Capacity',
    seoDescription: 'Calculate the estimated solar panel system size you need based on your electricity consumption and local sun hours.',
    h1: 'Solar Panel Size Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar panel size calculator', 'how many kw solar system', 'solar array sizing', 'solar capacity calculator'],
    intro: 'Find the right solar capacity (kW) to offset your electricity usage based on your specific location.',
    howItWorks: 'We calculate the daily kWh requirement needed to meet your target offset and divide it by the peak sun hours available at your location, adjusting for system losses.',
    methodology: 'System Size (kW) = (Annual Energy Target ÷ 365) ÷ (Peak Sun Hours × Efficiency Ratio). Efficiency is typically assumed at 78-80%.',
    example: 'A home needing 30 kWh per day in a location with 5 peak sun hours requires a 6 kW DC system size to reach 100% offset.',
    limitations: 'Ideal system size may be limited by available roof space or utility interconnection limits.',
    faq: [
      { 
        question: 'How do I know what size solar system I need?', 
        answer: 'The best way is to look at your utility bills from the last 12 months to find your total annual kWh consumption.' 
      },
      { 
        question: 'Is it better to oversize my solar system?', 
        answer: 'Slightly oversizing (10-20%) is common to account for future electric vehicle charging or heat pump installation.' 
      }
    ]
  },
  'solar-battery-size-calculator': {
    id: 'solar-battery-size-calculator',
    seoTitle: 'Solar Battery Size Calculator — Calculate Battery Capacity',
    seoDescription: 'Calculate the estimated battery capacity needed for solar backup based on energy use, load, backup duration, efficiency and depth of discharge.',
    h1: 'Solar Battery Size Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar battery size calculator', 'battery capacity calculator', 'solar backup sizing', 'how much battery storage do I need'],
    intro: 'Determine the appropriate solar battery capacity required to support your home loads during a grid outage.',
    howItWorks: 'Our calculator determines battery size by multiplying your expected power load by the desired backup duration, then adjusting for depth of discharge and system efficiency losses.',
    methodology: 'Required Capacity (kWh) = (Backup Load in kW × Duration in Hours) ÷ (Depth of Discharge × Efficiency). A safety reserve (e.g., 10%) is typically added.',
    example: 'To power a 1kW critical load for 8 hours with a battery that has 80% DoD and 90% efficiency, you need a (1 × 8) ÷ (0.8 × 0.9) = 11.1 kWh battery.',
    limitations: 'Calculations assume constant load. Large appliance startup surges (inrush current) may require a higher power rating regardless of capacity.',
    faq: [
      { 
        question: 'How big a battery do I need for my solar system?', 
        answer: 'The size depends on whether you want "partial backup" for critical loads (typically 5-10kWh) or "whole-home backup" (typically 20kWh+).' 
      }
    ]
  },
  'solar-battery-backup-calculator': {
    id: 'solar-battery-backup-calculator',
    seoTitle: 'Solar Battery Backup Calculator — Estimate Backup Time',
    seoDescription: 'Estimate how long a solar battery can power your home or selected loads based on battery capacity, load and efficiency.',
    h1: 'Solar Battery Backup Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar battery backup calculator', 'how long will battery last', 'backup time calculator'],
    intro: 'Estimate the total backup time your current or planned solar battery system can provide.',
    howItWorks: 'The calculator estimates runtime by taking the usable energy in the battery and dividing it by your average power consumption rate.',
    methodology: 'Backup Time (Hours) = (Total Battery kWh × Current SoC% × DoD limit × Efficiency) ÷ Load (kW).',
    example: 'A fully charged 13.5kWh battery (Tesla Powerwall 2 equivalent) with a 90% efficiency powering a 500W (0.5kW) load will last approximately 24 hours.',
    limitations: 'Real-world backup time is shortened by high-wattage appliances and extreme temperatures which reduce battery efficiency.',
    faq: [
      { 
        question: 'How long will a solar battery run an AC?', 
        answer: 'Most residential batteries can only run a standard air conditioner for 2-4 hours before being depleted, depending on the AC\'s power draw.' 
      }
    ]
  },
  'solar-inverter-size-calculator': {
    id: 'solar-inverter-size-calculator',
    seoTitle: 'Solar Inverter Size Calculator — Estimate Inverter Capacity',
    seoDescription: 'Calculate an estimated solar inverter size using your PV system capacity, electrical load, DC/AC ratio and safety assumptions.',
    h1: 'Solar Inverter Size Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar inverter size calculator', 'inverter capacity calculator', 'solar inverter sizing', 'dc ac ratio calculator'],
    intro: 'Calculate the required inverter capacity for your solar array to ensure maximum efficiency and performance.',
    howItWorks: 'We size the inverter by applying an industry-standard DC/AC ratio to your total solar panel capacity, ensuring the inverter is optimized for the actual power delivery of the array.',
    methodology: 'Inverter Size (kW AC) = Solar Array Size (kW DC) ÷ Target DC/AC Ratio. Common ratios range from 1.1 to 1.3.',
    example: 'A 6kW DC solar array with a target DC/AC ratio of 1.2 requires a 5kW AC inverter.',
    limitations: 'Off-grid systems must also size for peak surge loads of appliances, which may require a larger inverter than the solar array alone suggest.',
    faq: [
      { 
        question: 'What is the DC/AC ratio in solar?', 
        answer: 'The DC/AC ratio is the ratio of solar panel power to inverter power. Since panels rarely produce 100% of their rating, inverters are often slightly smaller than the array to improve low-light efficiency.' 
      }
    ]
  },
  'how-many-solar-panels-do-i-need': {
    id: 'how-many-solar-panels-do-i-need',
    seoTitle: 'How Many Solar Panels Do I Need? — Panel Count Calculator',
    seoDescription: 'Calculate how many solar panels you need based on your electricity usage, location, and solar panel wattage.',
    h1: 'How Many Solar Panels Do I Need?',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['how many solar panels do I need', 'solar panel count calculator', 'calculate number of solar panels', 'solar panel requirement'],
    intro: 'Find the exact number of solar panels required to power your home and offset your electricity bills.',
    howItWorks: 'The calculator determines panel count by first calculating your required system capacity (kW) and then dividing that capacity by the wattage of your chosen solar panels.',
    methodology: 'Panel Count = Roundup( (Annual kWh Target ÷ (Peak Sun Hours × 365 × Efficiency)) × 1000 ÷ Panel Wattage ). Efficiency is typically 75-80%.',
    example: 'A home needing 10,000 kWh/year in a location with 4.5 peak sun hours needs a 7.6 kW system. If using 400W panels, this requires 19 panels.',
    limitations: 'Calculations assume optimal panel placement. Obstructions, shading, or non-ideal roof orientation will increase the number of panels needed.',
    faq: [
      { 
        question: 'Is it better to have more panels or higher wattage panels?', 
        answer: 'Higher wattage panels are more efficient and save roof space. Having more lower-wattage panels is often cheaper but requires a larger mounting area.' 
      },
      { 
        question: 'How many panels for a 5kW system?', 
        answer: 'For a 5kW (5000W) system using standard 400W panels, you would need 13 panels (rounded up from 12.5).' 
      }
    ]
  },
  'solar-panel-roi-calculator': {
    id: 'solar-panel-roi-calculator',
    seoTitle: 'Solar Panel ROI Calculator — Calculate Your Solar Investment Return',
    seoDescription: 'Estimate your solar return on investment (ROI), net gain, and long-term financial benefits of switching to solar energy.',
    h1: 'Solar Panel ROI Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar panel roi calculator', 'solar investment return', 'solar roi', 'is solar worth it'],
    intro: 'Determine the total financial return on your solar investment by analyzing costs, savings, and long-term performance.',
    howItWorks: 'We calculate ROI by comparing the net cost of the system against the cumulative savings generated over its 25-year lifetime, factoring in maintenance and degradation.',
    methodology: 'ROI (%) = ((Total Lifetime Savings - Net System Cost) ÷ Net System Cost) × 100. Simple ROI does not account for the time value of money.',
    example: 'A system with a net cost of $15,000 that saves $60,000 over 25 years has a net gain of $45,000 and a simple ROI of 300%.',
    limitations: 'Calculations are estimates. Future electricity rates and maintenance costs can vary from initial projections.',
    faq: [
      { 
        question: 'What is a typical ROI for residential solar?', 
        answer: 'Most residential systems see a simple lifetime ROI between 200% and 500%, depending on local rates and sunlight.' 
      }
    ]
  },
  'solar-panel-output-calculator': {
    id: 'solar-panel-output-calculator',
    seoTitle: 'Solar Panel Output Calculator — Estimate Energy Production',
    seoDescription: 'Estimate how much electricity a solar panel or complete solar system will produce daily and monthly.',
    h1: 'Solar Panel Output Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar panel output calculator', 'solar energy production', 'how much power does a solar panel produce', 'solar generation estimator'],
    intro: 'Calculate the expected electricity output of your solar panels based on their wattage and your local sunlight conditions.',
    howItWorks: 'The calculator multiplies the panel or system wattage by the average daily peak sun hours, adjusting for typical system losses.',
    methodology: 'Daily Output (kWh) = (System Size in kW × Peak Sun Hours × Performance Ratio). Performance Ratio is usually 0.75-0.80.',
    example: 'A 400W panel in a location with 5 peak sun hours will produce about 1.5-1.6 kWh per day (400W × 5h × 0.8 efficiency).',
    limitations: 'Actual output varies daily based on weather, temperature, shading, and the seasonal angle of the sun.',
    faq: [
      { 
        question: 'Why does my output vary by month?', 
        answer: 'Solar production changes with the seasons as the days get longer/shorter and the sun\'s angle in the sky changes.' 
      }
    ]
  },
  'solar-energy-production-calculator': {
    id: 'solar-energy-production-calculator',
    seoTitle: 'Solar Energy Production Calculator — Monthly & Annual Generation',
    seoDescription: 'Estimate your monthly and annual solar energy production based on your location and solar system size.',
    h1: 'Solar Energy Production Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar energy production calculator', 'solar generation estimator', 'monthly solar production'],
    intro: 'Accurately estimate how many kilowatt-hours (kWh) of clean energy your solar system will generate throughout the year.',
    howItWorks: 'Our model analyzes historical solar irradiance data for your specific location and applies industry-standard performance factors to calculate predictable energy yields.',
    methodology: 'Annual Energy (kWh) = System Size (kW) × Annual Peak Sun Hours × Performance Ratio. Monthly values are calculated using seasonal sun-hour distribution.',
    example: 'A 10kW system in a location with 1,800 annual peak sun hours produces approximately 14,400 kWh per year (assuming 80% efficiency).',
    limitations: 'Production can be reduced by localized shading from trees or buildings, and varies year-over-year based on weather patterns.',
    faq: [
      { 
        question: 'How much energy does a 5kW solar system produce per month?', 
        answer: 'On average, a 5kW system produces between 450 and 750 kWh per month, depending on the season and your location\'s sunlight.' 
      }
    ]
  },
  'solar-bill-savings-calculator': {
    id: 'solar-bill-savings-calculator',
    seoTitle: 'Solar Bill Savings Calculator — Predict Your Utility Savings',
    seoDescription: 'Calculate exactly how much your monthly electricity bill will decrease after installing solar panels.',
    h1: 'Solar Bill Savings Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar bill savings calculator', 'electricity bill reduction solar', 'solar savings estimator'],
    intro: 'Find out how much you can slash from your monthly utility costs by switching to solar power.',
    howItWorks: 'We compare your historical electricity usage against projected solar generation and self-consumption, factoring in your utility\'s specific billing structure.',
    methodology: 'Bill Reduction = (Self-Consumed Solar × Grid Rate) + (Exported Solar × Net Metering Credit Rate).',
    example: 'If you use 1,000 kWh and solar produces 800 kWh with 70% self-consumption, you save money on the 560 kWh used directly plus credits for the 240 kWh exported.',
    limitations: 'Savings are dependent on your local utility\'s net metering policies and fixed monthly connection fees which typically remain.',
    faq: [
      { 
        question: 'Will I still get an electricity bill with solar?', 
        answer: 'Yes, most homeowners still receive a monthly statement showing their net usage, though the total amount due is significantly lower or just covers fixed connection fees.' 
      }
    ]
  }
};

export const getSEOData = (id: string): CalculatorSEOData | undefined => {
  return CALCULATOR_SEO_REGISTRY[id];
};
