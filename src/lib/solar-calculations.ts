import { calculateSystemSize, type SystemInput, type SystemResults } from "./calculations/solar-system";

export type { SystemInput as SolarInput, SystemResults as SolarResults };

/**
 * @deprecated Use calculateSystemSize from ./calculations/solar-system instead
 */
export function calculateSolar(input: any): any {
  return calculateSystemSize(input);
}
