import { convertArea } from '../utils/internationalization/units';

export type UnitSystem = 'US' | 'Metric';

export const formatArea = (sqMeters: number, system: UnitSystem): string => {
  if (system === 'US') {
    const sqFt = convertArea(sqMeters, 'sq m', 'sq ft');
    return `${Math.round(sqFt).toLocaleString()} sq ft`;
  }
  return `${Math.round(sqMeters).toLocaleString()} sq m`;
};

export const formatDistance = (meters: number, system: UnitSystem): string => {
  if (system === 'US') {
    const ft = meters * 3.28084;
    return `${Math.round(ft).toLocaleString()} ft`;
  }
  return `${Math.round(meters).toLocaleString()} m`;
};

