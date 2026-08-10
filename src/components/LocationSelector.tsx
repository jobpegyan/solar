import React, { useState, useEffect } from 'react';
import { useSolarSettings } from '@/lib/location/location-context';
import { countries } from '@/lib/data/countries';
import { getRegionsByCountry } from '@/lib/data/regions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Globe, Search, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { resolveLocation, searchLocations, ResolvedLocation } from '@/lib/location/location-resolver';

export function LocationSelector() {
  const { country, region, setCountry, setRegion, unitPreference, setUnitPreference } = useSolarSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [resolvedLoc, setResolvedLoc] = useState<ResolvedLocation | null>(null);
  
  const availableRegions = getRegionsByCountry(country.code);


  useEffect(() => {
    let active = true;
    if (searchQuery.length > 2) {
      const timer = setTimeout(async () => {
        setIsSearching(true);
        const results = await searchLocations(country.code, searchQuery);
        if (active) {
          setSearchResults(results);
          setIsSearching(false);
        }
      }, 500);
      return () => {
        active = false;
        clearTimeout(timer);
      };
    } else {
      setSearchResults([]);
      return undefined;
    }
  }, [searchQuery, country.code]);

  const handleSelectResult = async (result: any) => {
    setSearchQuery(result.postal_code || result.name);
    setSearchResults([]);
    
    const resolved = await resolveLocation(country.code, result.postal_code || result.name);
    if (resolved) {
      setResolvedLoc(resolved);
      if (resolved.regionCode) {
        setRegion(resolved.regionCode);
      }
      toast.success(`Location set to ${resolved.cityName || resolved.regionName || resolved.countryName}`);
    }
  };

  const handleManualSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    const resolved = await resolveLocation(country.code, searchQuery);
    if (resolved) {
      setResolvedLoc(resolved);
      if (resolved.regionCode) {
        setRegion(resolved.regionCode);
      }
      toast.success(`Resolved to ${resolved.cityName || resolved.regionName || resolved.countryName}`);
    } else {
      toast.error("Could not resolve location. Using country defaults.");
    }
    setIsSearching(false);
  };

  const handleDetectLocation = () => {
    if ("geolocation" in navigator) {
      toast.info("Detecting your location...");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Future: Reverse geocode with lat/long
          toast.success("Location detected! Please verify your country and region.");
        },
        (error) => {
          toast.error("Location access denied. Please select manually.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-solar" />
          Location & Preferences
        </CardTitle>
        <CardDescription>
          Search by {country.postalCodeLabel || 'ZIP code'} or City for the most accurate solar estimates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country-select">Country</Label>
              <Select value={country.code} onValueChange={(val) => {
                setCountry(val);
                setSearchQuery('');
                setResolvedLoc(null);
              }}>
                <SelectTrigger id="country-select">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="location-search">Search City or {country.postalCodeLabel || 'ZIP'}</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="location-search"
                    placeholder={`e.g. ${country.code === 'US' ? '90210' : country.code === 'IN' ? '401404' : 'Mumbai'}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                <Button variant="secondary" onClick={handleManualSearch} size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchResults.map((res) => (
                    <button
                      key={res.id}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 text-sm border-b last:border-0"
                      onClick={() => handleSelectResult(res)}
                    >
                      <span className="font-medium">{res.name}</span>
                      {res.postal_code && <span className="text-muted-foreground ml-2">({res.postal_code})</span>}
                      {res.regions?.name && <span className="text-xs text-muted-foreground block">{res.regions.name}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="region-select">State / Region (Backup)</Label>
              <Select 
                value={region?.code || "none"} 
                onValueChange={(val) => setRegion(val === "none" ? undefined : val)}
              >
                <SelectTrigger id="region-select">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Select Region (Optional)</SelectItem>
                  {availableRegions.map((r) => (
                    <SelectItem key={r.code} value={r.code}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit-select">Measurement Units</Label>
              <Select value={unitPreference} onValueChange={(val: any) => setUnitPreference(val)}>
                <SelectTrigger id="unit-select">
                  <SelectValue placeholder="Select Units" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">Automatic ({country.measurementSystem})</SelectItem>
                  <SelectItem value="Metric">Metric (m, sq m)</SelectItem>
                  <SelectItem value="US">US Customary (ft, sq ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {resolvedLoc && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">
                Precision Level: {resolvedLoc.level}
              </p>
              <p className="text-xs text-green-700">
                Using solar data for {resolvedLoc.cityName || resolvedLoc.regionName || resolvedLoc.countryName}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={handleDetectLocation}
          >
            <Globe className="mr-2 h-4 w-4" />
            Auto-Detect Location
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
