import React, { useState } from "react";
import { Plus, Trash2, Search, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Appliance, getApplianceDefaults } from "@/lib/calculations/appliances";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ApplianceSelectorProps {
  appliances: Appliance[];
  onChange: (appliances: Appliance[]) => void;
}

export function ApplianceSelector({ appliances, onChange }: ApplianceSelectorProps) {
  const defaults = getApplianceDefaults();
  const [searchTerm, setSearchTerm] = useState("");

  const addAppliance = (app: Appliance) => {
    onChange([...appliances, { ...app, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const removeAppliance = (id: string) => {
    onChange(appliances.filter((a) => a.id !== id));
  };

  const updateAppliance = (id: string, updates: Partial<Appliance>) => {
    onChange(
      appliances.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const filteredDefaults = defaults.filter((d) =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Add Appliances</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search common appliances..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filteredDefaults.slice(0, 8).map((app) => (
            <Button
              key={app.id}
              variant="outline"
              size="sm"
              onClick={() => addAppliance(app)}
              className="h-8"
            >
              <Plus className="mr-1 h-3 w-3" /> {app.name}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => addAppliance({ id: "custom", name: "Custom Appliance", quantity: 1, power: 100, hoursPerDay: 4 })}
            className="h-8"
          >
            <Plus className="mr-1 h-3 w-3" /> Custom
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Appliance</TableHead>
                <TableHead className="w-24 text-center">Qty</TableHead>
                <TableHead className="w-32 text-center">Power (W)</TableHead>
                <TableHead className="w-32 text-center">Hours/Day</TableHead>
                <TableHead className="w-32 text-right">Daily Energy</TableHead>
                <TableHead className="w-16"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appliances.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    No appliances added yet.
                  </TableCell>
                </TableRow>
              ) : (
                appliances.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <Input
                        value={app.name}
                        onChange={(e) => updateAppliance(app.id, { name: e.target.value })}
                        className="h-8 border-none bg-transparent p-0 focus-visible:ring-0"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={app.quantity}
                        onChange={(e) => updateAppliance(app.id, { quantity: parseInt(e.target.value) || 0 })}
                        className="h-8 text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={app.power}
                        onChange={(e) => updateAppliance(app.id, { power: parseInt(e.target.value) || 0 })}
                        className="h-8 text-center"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0.1"
                        max="24"
                        step="0.1"
                        value={app.hoursPerDay}
                        onChange={(e) => updateAppliance(app.id, { hoursPerDay: parseFloat(e.target.value) || 0 })}
                        className="h-8 text-center"
                      />
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {((app.quantity * app.power * app.hoursPerDay) / 1000).toFixed(2)} kWh
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAppliance(app.id)}
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y">
          {appliances.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No appliances added yet.
            </div>
          ) : (
            appliances.map((app) => (
              <div key={app.id} className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <Input
                    value={app.name}
                    onChange={(e) => updateAppliance(app.id, { name: e.target.value })}
                    className="h-8 font-semibold border-none bg-transparent p-0 focus-visible:ring-0 w-auto flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAppliance(app.id)}
                    className="h-8 w-8 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Qty</Label>
                    <Input
                      type="number"
                      min="1"
                      value={app.quantity}
                      onChange={(e) => updateAppliance(app.id, { quantity: parseInt(e.target.value) || 0 })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Watts</Label>
                    <Input
                      type="number"
                      min="1"
                      value={app.power}
                      onChange={(e) => updateAppliance(app.id, { power: parseInt(e.target.value) || 0 })}
                      className="h-8"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] uppercase text-muted-foreground mb-1 block">Hours</Label>
                    <Input
                      type="number"
                      min="0.1"
                      max="24"
                      step="0.1"
                      value={app.hoursPerDay}
                      onChange={(e) => updateAppliance(app.id, { hoursPerDay: parseFloat(e.target.value) || 0 })}
                      className="h-8"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t">
                  <span>Daily Energy</span>
                  <span>{((app.quantity * app.power * app.hoursPerDay) / 1000).toFixed(2)} kWh</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 p-3 rounded-lg">
        <Info className="h-4 w-4 flex-shrink-0" />
        <p>Total Daily Load: {((appliances.reduce((acc, app) => acc + (app.quantity * app.power * app.hoursPerDay), 0)) / 1000).toFixed(2)} kWh/day</p>
      </div>
    </div>
  );
}
