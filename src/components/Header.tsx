import { Hammer } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center shadow-card">
            <Hammer className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">
              Artisan Connect
            </h1>
            <p className="text-xs text-muted-foreground">
              Trouvez un artisan près de chez vous
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
