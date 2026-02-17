import { Link } from "react-router-dom";
import { Wrench, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-auto border-t border-border/50 bg-card">
      <div className="container py-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            <Link 
              to="/pro"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors font-semibold text-secondary-foreground"
            >
              <Wrench className="w-5 h-5" />
              {t("footer.pro")}
            </Link>
            <Link 
              to="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors font-semibold text-secondary-foreground"
            >
              <Shield className="w-5 h-5" />
              {t("footer.admin")}
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/mentions" className="hover:text-foreground transition-colors">
              {t("footer.legal")}
            </Link>
            <span>•</span>
            <Link to="/confidentialite" className="hover:text-foreground transition-colors">
              {t("footer.privacy")}
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              {t("footer.contact")}
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
