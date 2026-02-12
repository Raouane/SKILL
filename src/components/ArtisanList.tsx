import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArtisanCard } from "@/components/ArtisanCard";
import { Artisan, categories, getAllArtisans } from "@/lib/data";

interface ArtisanListProps {
  cityId: string;
  categoryId: string;
  onBack: () => void;
  onContact: (artisan: Artisan, method: "call" | "whatsapp") => void;
}

export function ArtisanList({ cityId, categoryId, onBack, onContact }: ArtisanListProps) {
  const category = categories.find(c => c.id === categoryId);
  
  // Filter artisans by city, category, and online status (balance > 0)
  const artisans = getAllArtisans().filter(
    a => a.city === cityId && 
         a.category === categoryId && 
         a.isOnline && 
         a.balance > 0
  );

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onBack}
          className="rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {category?.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {artisans.length} artisan{artisans.length !== 1 ? 's' : ''} disponible{artisans.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Artisan list */}
      {artisans.length > 0 ? (
        <div className="space-y-3">
          {artisans.map((artisan, index) => (
            <div 
              key={artisan.id}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'backwards'
              }}
              className="animate-slide-up"
            >
              <ArtisanCard 
                artisan={artisan} 
                onContact={onContact}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">
            Aucun artisan disponible
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Il n'y a pas d'artisans en ligne dans cette catégorie pour le moment. Réessayez plus tard.
          </p>
        </div>
      )}
    </div>
  );
}
