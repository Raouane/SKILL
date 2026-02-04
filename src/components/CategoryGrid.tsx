import { categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface CategoryGridProps {
  onCategorySelect: (categoryId: string) => void;
}

export function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <div className="animate-slide-up">
      <h2 className="text-lg font-bold text-foreground mb-4">
        De quoi avez-vous besoin ?
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant="category"
              className="h-auto py-5 px-4 flex-col gap-3 hover:border-primary/30 transition-all duration-300"
              onClick={() => onCategorySelect(category.id)}
              style={{ 
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'backwards'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <Icon 
                  className="w-6 h-6" 
                  style={{ color: category.color }}
                />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {category.name}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
