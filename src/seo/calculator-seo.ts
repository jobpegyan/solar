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
  },
  'home-load-solar-calculator': {
    id: 'home-load-solar-calculator',
    seoTitle: 'Home Load Solar Calculator — Size Solar by Household Load',
    seoDescription: 'Calculate running load, daily energy consumption, and solar system requirements from your household appliances.',
    h1: 'Home Load Solar Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['home load solar calculator', 'appliance solar calculator', 'household electrical load solar'],
    intro: 'Estimate your required solar system capacity by calculating total power demand from your household appliances.',
    howItWorks: 'We sum the running wattage and operating hours of selected appliances to derive daily kWh energy demand and required solar panel capacity.',
    methodology: 'Total Energy (kWh) = Sum(Watts × Hours / 1000). System Size (kW) = Total Energy ÷ (Peak Sun Hours × PR).',
    example: 'A refrigerator (200W), 10 LEDs (100W), and a TV (150W) running 8 hours/day draw ~3.6 kWh/day, requiring ~1 kW solar system.',
    limitations: 'Calculations assume average power draw. Motor inrush/surge currents should be accounted for when choosing inverter size.',
    faq: [{ question: 'How is home electrical load calculated?', answer: 'We sum the total running wattage and operating hours of all active household appliances.' }]
  },
  'ac-load-solar-calculator': {
    id: 'ac-load-solar-calculator',
    seoTitle: 'AC Load Solar Calculator — Solar System for Air Conditioners',
    seoDescription: 'Estimate solar panel and battery capacity required to run your air conditioner units.',
    h1: 'AC Load Solar Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['ac load solar calculator', 'solar panels for air conditioner', 'solar system for 1.5 ton ac'],
    intro: 'Calculate the solar panel array and battery storage needed to power air conditioning units.',
    howItWorks: 'The calculator factors in AC tonnage, running wattage, daily operating hours, and inverter surge requirements.',
    methodology: 'Daily AC Consumption = AC Wattage × Operating Hours. Array Size = Daily Consumption ÷ (Sun Hours × PR).',
    example: 'A 1.5-ton inverter AC (1500W) running 8 hours/day uses 12 kWh/day, requiring approximately a 3 kW solar array.',
    limitations: 'Inverter ACs vary power draw based on room temperature settings. Non-inverter ACs draw high startup surge power.',
    faq: [{ question: 'Can solar run an AC unit?', answer: 'Yes, provided the solar array and inverter are sized to match the running and surge wattage of the AC.' }]
  },
  'kw-to-solar-panels-calculator': {
    id: 'kw-to-solar-panels-calculator',
    seoTitle: 'kW to Solar Panels Calculator — Convert kW to Panel Count',
    seoDescription: 'Quickly convert system capacity in kW to total number of solar panels needed based on panel wattage.',
    h1: 'kW to Solar Panels Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['kw to solar panels calculator', 'convert kw to solar panels', '5kw how many panels'],
    intro: 'Convert system capacity in kilowatts (kW) to total solar panel count.',
    howItWorks: 'Divides total target system wattage by selected individual panel wattage.',
    methodology: 'Panel Count = Ceiling((System kW × 1000) ÷ Panel Wattage).',
    example: 'A 5 kW system (5,000 Watts) using 400W panels requires 13 panels (5000 / 400 = 12.5 -> 13).',
    limitations: 'Actual panel count must be rounded up to whole panels.',
    faq: [{ question: 'How many 400W panels make 5kW?', answer: '5000W / 400W = 12.5, which rounds up to 13 panels (giving 5.2 kW capacity).' }]
  },
  'watts-to-solar-panels-calculator': {
    id: 'watts-to-solar-panels-calculator',
    seoTitle: 'Watts to Solar Panels Calculator — Convert Watts to Panels',
    seoDescription: 'Convert total wattage requirement into individual solar panel count.',
    h1: 'Watts to Solar Panels Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['watts to solar panels calculator', 'convert watts to panels', 'how many panels for 2000W'],
    intro: 'Determine how many solar panels are needed to achieve a target wattage rating.',
    howItWorks: 'Divides required total wattage by the wattage of a single panel.',
    methodology: 'Panels = Ceiling(Total Watts ÷ Single Panel Wattage).',
    example: '2,000 Watts using 400W panels requires 5 panels (2000 / 400 = 5).',
    limitations: 'Panel outputs are rated at Standard Test Conditions (STC).',
    faq: [{ question: 'How do I convert Watts to solar panels?', answer: 'Divide total required Watts by the rating of a single solar panel.' }]
  },
  'electricity-bill-to-solar-size-calculator': {
    id: 'electricity-bill-to-solar-size-calculator',
    seoTitle: 'Electricity Bill to Solar Size Calculator — Sizing from Bill',
    seoDescription: 'Estimate required solar system capacity in kW directly from your monthly electricity bill amount.',
    h1: 'Electricity Bill to Solar Size Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['electricity bill to solar size calculator', 'size solar panel from bill', 'bill to solar kw'],
    intro: 'Estimate the recommended solar system size (kW) directly from your average monthly power bill.',
    howItWorks: 'Converts monthly bill to monthly kWh usage using your tariff rate, then calculates system kW for 100% offset.',
    methodology: 'Monthly kWh = Monthly Bill ÷ Electricity Tariff. System kW = (Monthly kWh × 12) ÷ (Peak Sun Hours × 365 × PR).',
    example: 'A $150 monthly bill at $0.15/kWh equals 1,000 kWh/month. In 5 sun hours, this requires ~7.3 kW system.',
    limitations: 'Tiered rate structures or fixed utility fees may affect exact kWh consumption estimates.',
    faq: [{ question: 'Can I size a solar system from just my electricity bill?', answer: 'Yes, by dividing your bill by the local electricity rate, we find your monthly kWh consumption and calculate the required solar system size.' }]
  },
  'solar-battery-calculator': {
    id: 'solar-battery-calculator',
    seoTitle: 'Solar Battery Calculator — Calculate Battery Size & Backup',
    seoDescription: 'Estimate the battery capacity required for your solar system based on electricity usage and backup requirements.',
    h1: 'Solar Battery Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar battery calculator', 'solar storage calculator', 'battery size solar'],
    intro: 'Calculate required battery storage capacity and runtime for your solar installation.',
    howItWorks: 'Models battery storage needs based on daily energy consumption or specific backup load and duration.',
    methodology: 'Required Capacity (kWh) = (Backup Load kW × Backup Hours) ÷ (DoD × Efficiency).',
    example: 'A 1 kW backup load for 4 hours with 80% DoD and 90% efficiency requires 5.56 kWh nominal capacity.',
    limitations: 'Battery health, ambient operating temperature, and discharge rate impact available capacity.',
    faq: [{ question: 'How big a battery do I need for solar backup?', answer: 'Battery size depends on the total wattage of critical appliances and desired hours of backup runtime.' }]
  },
  'solar-cost-calculator': {
    id: 'solar-cost-calculator',
    seoTitle: 'Solar Cost Calculator — Detailed Price Estimates',
    seoDescription: 'Break down system costs, equipment, installation, and incentives for your solar energy project.',
    h1: 'Solar Cost Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar cost calculator', 'solar system cost breakdown', 'solar installation cost'],
    intro: 'Estimate gross and net system installation costs, component pricing, and government subsidies.',
    howItWorks: 'Calculates total project cost based on system size, component inclusion, and local market per-watt pricing.',
    methodology: 'Net Cost = (System Size kW × 1000 × Price/Watt) + Component Add-ons - Incentives.',
    example: 'A 5 kW system at $2.80/W ($14,000 gross) minus a $4,200 tax credit leaves $9,800 net cost.',
    limitations: 'Local installer labor rates, roof tilt/complexity, and panel brand selection cause price variance.',
    faq: [{ question: 'How much does a solar system cost?', answer: 'Costs vary by system capacity, equipment type, and incentives available in your region.' }]
  },
  'solar-inverter-calculator': {
    id: 'solar-inverter-calculator',
    seoTitle: 'Solar Inverter Calculator — Calculate Recommended Inverter Size',
    seoDescription: 'Estimate an appropriate inverter size based on your solar panel capacity and electrical load requirements.',
    h1: 'Solar Inverter Calculator',
    intent: 'calculational',
    publishingStatus: 'published',
    keywords: ['solar inverter calculator', 'inverter size calculator', 'solar inverter capacity'],
    intro: 'Determine the correct solar inverter rating (kW / kVA) for grid-tied, off-grid, or hybrid solar arrays.',
    howItWorks: 'Sizes inverter capacity from solar array DC wattage and peak load requirements.',
    methodology: 'Inverter kW = Max(Array DC kW ÷ DC-AC Ratio, Peak Continuous Load kW × Safety Margin).',
    example: 'A 6 kW DC panel array with a 1.2 DC/AC ratio requires a 5 kW AC inverter.',
    limitations: 'Motor startup surge loads require sufficient inverter peak/surge capacity.',
    faq: [{ question: 'How do I choose the right inverter size?', answer: 'Match the inverter AC output capacity to your PV array DC wattage adjusted by the target DC/AC ratio or peak load.' }]
  },
  'solar-payback-calculator': {
    id: 'solar-payback-calculator',
    seoTitle: 'Solar Payback Calculator — Break-Even Estimates',
    seoDescription: 'Determine your solar investment break-even point and total lifetime savings.',
    h1: 'Solar Payback Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar payback calculator', 'solar break even calculator', 'payback period solar'],
    intro: 'Calculate how many years it takes for electricity bill savings to pay off your solar system net cost.',
    howItWorks: 'Compares net upfront investment against annual bill savings adjusted for electricity inflation.',
    methodology: 'Payback Years = Net System Cost ÷ (Annual Savings - Annual Maintenance).',
    example: 'A $12,000 net system saving $1,800/year breaks even in ~6.7 years.',
    limitations: 'Future utility price changes and net metering rate changes alter exact payback timing.',
    faq: [{ question: 'What is a typical payback period for solar?', answer: 'Most residential systems achieve payback within 6 to 10 years.' }]
  },
  'solar-roi-calculator': {
    id: 'solar-roi-calculator',
    seoTitle: 'Solar ROI Calculator — 25-Year Financial Projection',
    seoDescription: 'Calculate long-term solar ROI, modeling maintenance, panel degradation, and rising electricity costs.',
    h1: 'Solar ROI Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar roi calculator', 'solar return on investment', '25 year solar financial projection'],
    intro: 'Forecast cumulative financial returns and simple ROI over 25 years of solar operation.',
    howItWorks: 'Models 25-year cash flow accounting for panel degradation (0.5%/yr) and electricity inflation (3%/yr).',
    methodology: 'ROI % = ((25-Year Savings - Net Cost) ÷ Net Cost) × 100.',
    example: 'A $15,000 system generating $60,000 in 25-year savings yields $45,000 net gain (300% ROI).',
    limitations: 'Projections assume continuous grid connectivity and consistent solar irradiance.',
    faq: [{ question: 'What ROI can I expect from solar?', answer: 'Solar investments typically deliver 200% to 500% simple lifetime return.' }]
  },
  'solar-savings-calculator': {
    id: 'solar-savings-calculator',
    seoTitle: 'Solar Savings Calculator — Estimate Solar Energy Savings',
    seoDescription: 'Accurately predict your monthly and 25-year solar electricity bill savings.',
    h1: 'Solar Savings Calculator',
    intent: 'commercial-investigation',
    publishingStatus: 'published',
    keywords: ['solar savings calculator', 'electricity bill savings solar', 'how much solar saves'],
    intro: 'Calculate monthly and lifetime utility bill savings from producing your own solar power.',
    howItWorks: 'Estimates solar production vs utility rates to compute monthly and multi-year savings.',
    methodology: 'Monthly Savings = Solar Generation (kWh) × Utility Electricity Rate ($/kWh).',
    example: 'Generating 600 kWh/month at $0.20/kWh saves $120 per month ($1,440/year).',
    limitations: 'Utility fixed monthly connection charges still apply under most utility rate tariffs.',
    faq: [{ question: 'How much money can solar save me?', answer: 'Solar can offset 70-100% of your energy charges depending on system sizing and net metering.' }]
  }
};

export const getSEOData = (id: string): CalculatorSEOData | undefined => {
  return CALCULATOR_SEO_REGISTRY[id];
};
