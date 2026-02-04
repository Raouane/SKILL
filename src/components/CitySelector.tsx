import { MapPin, ChevronDown } from "lucide-react";
import { cities } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  const currentCity = cities.find(c => c.id === selectedCity);

  return (
    <div className="w-full animate-fade-in">
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-full h-14 bg-card shadow-card border-border/50 rounded-xl px-4 text-base font-medium">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <SelectValue placeholder="Choisir votre ville">
              {currentCity ? (
                <span className="text-foreground">{currentCity.name}</span>
              ) : (
                <span className="text-muted-foreground">Choisir votre ville</span>
              )}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="rounded-xl border-border/50 shadow-elevated">
          {cities.map((city) => (
            <SelectItem 
              key={city.id} 
              value={city.id}
              className="py-3 px-4 cursor-pointer rounded-lg focus:bg-secondary"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium">{city.name}</span>
                <span className="text-xs text-muted-foreground ml-4">{city.region}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
