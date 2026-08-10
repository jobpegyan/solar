export const solarConfig = {
  // System Defaults
  defaultPanelWattage: 550,
  defaultPerformanceRatio: 0.80,
  defaultPeakSunHours: 5,
  defaultPanelAreaSqFt: 23,
  defaultSystemLifetime: 25,
  
  // Financial Defaults (India specific as per Phase 1)
  defaultTariffPerKWh: 7.0, // INR
  defaultAnnualPriceIncrease: 0.05, // 5%
  defaultMaintenanceRate: 0.01, // 1% of system cost per year
  
  // Battery Defaults
  defaultBatteryVoltage: 48,
  defaultBatteryEfficiency: 0.90,
  defaultDepthOfDischarge: 0.80,
  defaultAutonomyDays: 1,

  // Inverter Defaults
  defaultInverterLoadingRatio: 1.2,
  defaultFutureExpansion: 0.2, // 20%

  // Appliance Defaults (Typical Wattages)
  applianceDefaults: [
    { id: "led-bulb", name: "LED Bulb", power: 9 },
    { id: "fan", name: "Ceiling Fan", power: 70 },
    { id: "tv", name: "Television", power: 100 },
    { id: "fridge", name: "Refrigerator", power: 150 },
    { id: "laptop", name: "Laptop", power: 60 },
    { id: "washing-machine", name: "Washing Machine", power: 500 },
    { id: "ac", name: "Air Conditioner", power: 1200 },
    { id: "water-pump", name: "Water Pump", power: 750 },
  ],
  
  // Cost Assumptions (INR estimates)
  costs: {
    panelPerWatt: 35,
    inverterPerKW: 15000,
    mountingPerKW: 5000,
    installationPerKW: 6000,
    electricalPerKW: 4000,
    batteryPerKWh: 15000,
  }
};

