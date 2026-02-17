import { Phone, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Artisan, categories, cities } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

interface ArtisanCardProps {
  artisan: Artisan;
  onContact: (artisan: Artisan, method: "call" | "whatsapp") => void;
}

export function ArtisanCard({ artisan, onContact }: ArtisanCardProps) {
  const { t } = useI18n();
  const category = categories.find(c => c.id === artisan.category);
  const city = cities.find(c => c.id === artisan.city);
  const catKey = `cat.${artisan.category}` as any;

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-4 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {artisan.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            {artisan.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-online rounded-full border-2 border-card animate-pulse-soft" />
            )}
          </div>
          
          <div>
            <h3 className="font-bold text-foreground">{artisan.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {t(catKey)}
              </span>
              <span className="text-xs text-muted-foreground">
                {city?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-lg">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-semibold text-foreground">{artisan.rating}</span>
          <span className="text-xs text-muted-foreground">({artisan.reviewCount})</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="call" 
          className="flex-1"
          onClick={() => onContact(artisan, "call")}
        >
          <Phone className="w-5 h-5" />
          {t("artisan.call")}
        </Button>
        <Button 
          variant="whatsapp" 
          className="flex-1"
          onClick={() => onContact(artisan, "whatsapp")}
        >
          <MessageCircle className="w-5 h-5" />
          {t("artisan.whatsapp")}
        </Button>
      </div>
    </div>
  );
}
