export interface UnitConversion {
  from: string;
  to: string;
  factor: number;
}

export const conversions = {
  area: {
    sqMToSqFt: 10.7639,
    sqFtToSqM: 1 / 10.7639,
  },
  temperature: {
    cToF: (c: number) => (c * 9) / 5 + 32,
    fToC: (f: number) => ((f - 32) * 5) / 9,
  }
};

export const convertArea = (value: number, from: 'sq m' | 'sq ft', to: 'sq m' | 'sq ft'): number => {
  if (from === to) return value;
  return from === 'sq m' ? value * conversions.area.sqMToSqFt : value * conversions.area.sqFtToSqM;
};

export const convertTemperature = (value: number, from: 'Celsius' | 'Fahrenheit', to: 'Celsius' | 'Fahrenheit'): number => {
  if (from === to) return value;
  return from === 'Celsius' ? conversions.temperature.cToF(value) : conversions.temperature.fToC(value);
};
