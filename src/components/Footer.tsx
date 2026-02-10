import { Link } from "react-router-dom";
import { Wrench, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card">
      <div className="container py-6">
        <div className="flex flex-col items-center gap-4">
          {/* Pro access button */}
          <div className="flex gap-3">
            <Link 
              to="/pro"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors font-semibold text-secondary-foreground"
            >
              <Wrench className="w-5 h-5" />
              Espace Pro
            </Link>
            <Link 
              to="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors font-semibold text-secondary-foreground"
            >
              <Shield className="w-5 h-5" />
              Admin
            </Link>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/mentions" className="hover:text-foreground transition-colors">
              Mentions légales
            </Link>
            <span>•</span>
            <Link to="/confidentialite" className="hover:text-foreground transition-colors">
              Confidentialité
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © 2024 Artisan Connect - Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
