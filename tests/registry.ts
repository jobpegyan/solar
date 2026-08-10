/**
 * Test Registry for Phase 15 Accuracy Engine
 */
export interface TestRegistryEntry {
  calculatorId: string;
  testFile: string;
  formulaVersion: string;
  status: 'passing' | 'failing' | 'pending';
  lastTested: string;
}

export const TEST_REGISTRY: TestRegistryEntry[] = [
  {
    calculatorId: 'solar-panel-calculator',
    testFile: 'tests/calculators/solar.test.ts',
    formulaVersion: 'v1.0.0',
    status: 'pending',
    lastTested: new Date().toISOString(),
  },
  {
    calculatorId: 'solar-inverter-size-calculator',
    testFile: 'tests/calculators/inverter.test.ts',
    formulaVersion: 'v1.0.0',
    status: 'passing',
    lastTested: new Date().toISOString(),
  },
  {
    calculatorId: 'formatting-engine',
    testFile: 'tests/localization/formatting.test.ts',
    formulaVersion: 'v1.0.0',
    status: 'passing',
    lastTested: new Date().toISOString(),
  }
];
