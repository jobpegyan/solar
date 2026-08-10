export interface LoadProfile {
  name: string;
  hourlyDistribution: number[]; // 24 values
}

export const BUSINESS_PROFILES: Record<string, LoadProfile> = {
  office: {
    name: 'Standard Office',
    hourlyDistribution: [
      0.1, 0.1, 0.1, 0.1, 0.1, 0.2, // 12 AM - 6 AM
      0.6, 1.0, 1.0, 1.0, 1.0, 1.0, // 6 AM - 12 PM
      1.0, 1.0, 1.0, 1.0, 0.8, 0.6, // 12 PM - 6 PM
      0.4, 0.3, 0.2, 0.1, 0.1, 0.1  // 6 PM - 12 AM
    ]
  },
  retail: {
    name: 'Retail Store',
    hourlyDistribution: [
      0.2, 0.2, 0.2, 0.2, 0.2, 0.3,
      0.5, 0.7, 0.9, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      0.8, 0.6, 0.4, 0.2, 0.2, 0.2
    ]
  },
  warehouse: {
    name: 'Warehouse / Logistics',
    hourlyDistribution: [
      0.4, 0.4, 0.4, 0.4, 0.5, 0.7,
      0.9, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 1.0, 1.0, 0.9, 0.7,
      0.6, 0.5, 0.4, 0.4, 0.4, 0.4
    ]
  },
  factory: {
    name: '24/7 Manufacturing',
    hourlyDistribution: Array(24).fill(1.0)
  }
};

export const getLoadProfile = (type: string): LoadProfile => {
  const profile = BUSINESS_PROFILES[type.toLowerCase()] || BUSINESS_PROFILES['office'];
  if (!profile) throw new Error('Default profile not found');
  return profile;
};
