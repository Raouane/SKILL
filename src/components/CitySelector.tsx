import { MapPin } from "lucide-react";
import { cities } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
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
  const { t } = useI18n();
  const currentCity = cities.find(c => c.id === selectedCity);

  return (
    <div className="w-full animate-fade-in">
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-full h-14 bg-card shadow-card border-border/50 rounded-xl px-4 text-base font-medium">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <SelectValue placeholder={t("city.placeholder")}>
              {currentCity ? (
                <span className="text-foreground">{currentCity.name}</span>
              ) : (
                <span className="text-muted-foreground">{t("city.placeholder")}</span>
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
               <span className="font-medium">{city.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
