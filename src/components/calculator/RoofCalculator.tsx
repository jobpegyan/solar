import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, Maximize2, MoveDiagonal, Layout } from 'lucide-react';
import { useServerFn } from '@tanstack/react-start';
import { calculateRoofRequirement } from '@/lib/calculations/roof.functions';
import { RoofAreaResults } from '@/lib/calculations/roof';

interface RoofCalculatorProps {
  initialPanelCount?: number;
  onResultsChange?: (results: RoofAreaResults & { inputs: any }) => void;
  hidePanelCount?: boolean;
}

export function RoofCalculator({ 
  initialPanelCount = 10,
  onResultsChange,
  hidePanelCount = false
}: RoofCalculatorProps) {
  const calculateFn = useServerFn(calculateRoofRequirement);
  
  const [panelCount, setPanelCount] = useState<number>(initialPanelCount);
  const [panelWidth, setPanelWidth] = useState<number>(40);
  const [panelHeight, setPanelHeight] = useState<number>(79);
  const [spacingFactor, setSpacingFactor] = useState<number>(1.25);
  const [availableArea, setAvailableArea] = useState<number>(0);
  const [unit, setUnit] = useState<'sqft' | 'sqm'>('sqft');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [rowSpacing, setRowSpacing] = useState<number>(1);
  const [colSpacing, setColSpacing] = useState<number>(1);

  const handleCalculate = React.useCallback(async () => {
    try {
      const inputs = {
        panelCount,
        panelWidthIn: panelWidth,
        panelHeightIn: panelHeight,
        spacingFactor,
        availableRoofAreaSqFt: unit === 'sqm' ? availableArea / 0.092903 : availableArea,
        unit,
        orientation,
        rowSpacingIn: rowSpacing,
        columnSpacingIn: colSpacing
      };

      if (onResultsChange) {
        const results = await calculateFn({ data: inputs });
        onResultsChange({
          ...results,
          inputs
        });
      }
    } catch (error) {
      console.error("Roof calculation error:", error);
    }
  }, [panelCount, panelWidth, panelHeight, spacingFactor, availableArea, unit, orientation, rowSpacing, colSpacing, calculateFn, onResultsChange]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      handleCalculate();
    }, 300);
    return () => clearTimeout(timer);
  }, [handleCalculate]);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Layout className="w-4 h-4 text-solar" />
            <span className="text-sm font-medium">Panel & Layout Specifications</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!hidePanelCount && (
              <div className="space-y-2">
                <Label htmlFor="panelCount">Number of Panels</Label>
                <Input
                  id="panelCount"
                  type="number"
                  value={panelCount}
                  onChange={(e) => setPanelCount(Math.max(1, Number(e.target.value)))}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Panel Orientation</Label>
              <Select value={orientation} onValueChange={(v: any) => setOrientation(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="width">Panel Width (inches)</Label>
              <Input
                id="width"
                type="number"
                value={panelWidth}
                onChange={(e) => setPanelWidth(Math.max(1, Number(e.target.value)))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Panel Height (inches)</Label>
              <Input
                id="height"
                type="number"
                value={panelHeight}
                onChange={(e) => setPanelHeight(Math.max(1, Number(e.target.value)))}
              />
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t">
            <div className="flex justify-between items-center">
              <Label htmlFor="spacing">Spacing/Safety Factor</Label>
              <span className="text-xs font-bold text-solar">{Math.round((spacingFactor - 1) * 100)}% extra space</span>
            </div>
            <Input
              id="spacing"
              type="range"
              min="1.0"
              max="2.0"
              step="0.05"
              value={spacingFactor}
              onChange={(e) => setSpacingFactor(Number(e.target.value))}
              className="accent-solar"
            />
            <p className="text-[10px] text-muted-foreground">Accounts for walkways, mounting rails, and roof obstacles.</p>
          </div>

          <div className="space-y-4 pt-4 border-t">
             <div className="flex items-center gap-2 text-sm font-medium">
               <Maximize2 className="w-4 h-4" />
               Site Constraints
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <Label htmlFor="unit">Area Unit</Label>
                 <Select value={unit} onValueChange={(v: any) => setUnit(v)}>
                   <SelectTrigger>
                     <SelectValue />
                   </SelectTrigger>
                   <SelectContent>
                     <SelectItem value="sqft">Square Feet (sq ft)</SelectItem>
                     <SelectItem value="sqm">Square Meters (sq m)</SelectItem>
                   </SelectContent>
                 </Select>
               </div>
               <div className="space-y-2">
                 <Label htmlFor="availableArea">Available Roof Area</Label>
                 <Input
                   id="availableArea"
                   type="number"
                   value={availableArea}
                   onChange={(e) => setAvailableArea(Math.max(0, Number(e.target.value)))}
                   placeholder="Enter total usable roof area"
                 />
               </div>
             </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800">
              Standard panel size is roughly 40" x 79" (for ~400W+ modules). Custom dimensions allowed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
