import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Wallet, Phone, ToggleLeft, ToggleRight, AlertCircle,
  Clock, TrendingUp, Wrench, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactHistory, categories } from "@/lib/data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useI18n } from "@/lib/i18n";

const mockArtisan = {
  name: "Mohamed Ben Ali",
  category: "plomberie",
  city: "Tataouine",
  balance: 25,
  phone: "+21698123456",
};

function ProLoginScreen({ onLogin }: { onLogin: () => void }) {
  const { t, lang, setLang } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">{t("pro.title")}</h1>
                <p className="text-xs text-muted-foreground">{t("pro.subtitle")}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="rounded-xl gap-2 text-sm font-semibold"
            >
              <Globe className="w-4 h-4" />
              {t("lang.switch")}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-2xl gradient-warm flex items-center justify-center mx-auto shadow-lg">
              <Wrench className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">{t("pro.join")}</h2>
            <p className="text-sm text-muted-foreground">{t("pro.joinText")}</p>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-14 rounded-xl text-base font-semibold gap-3 border-border hover:bg-muted/50"
              onClick={onLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t("pro.google")}
            </Button>

            <Button
              variant="outline"
              className="w-full h-14 rounded-xl text-base font-semibold gap-3 border-border hover:bg-muted/50"
              onClick={onLogin}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {t("pro.facebook")}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">{t("pro.terms")}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ProDashboard() {
  const { t, lang, setLang } = useI18n();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const category = categories.find(c => c.id === mockArtisan.category);
  const catKey = `cat.${mockArtisan.category}` as any;

  if (!isLoggedIn) {
    return <ProLoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  const lowBalance = mockArtisan.balance < 5;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold text-foreground">{t("pro.title")}</h1>
                <p className="text-xs text-muted-foreground">{t("pro.manage")}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="rounded-xl gap-2 text-sm font-semibold"
            >
              <Globe className="w-4 h-4" />
              {t("lang.switch")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        {/* Profile card */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 p-5 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-warm flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                {mockArtisan.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{mockArtisan.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${category?.color}15`,
                    color: category?.color 
                  }}
                >
                  {t(catKey)}
                </span>
                <span className="text-xs text-muted-foreground">• {mockArtisan.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status toggle */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 p-5 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isOnline ? 'bg-online/10' : 'bg-muted'}`}>
                {isOnline ? <ToggleRight className="w-6 h-6 text-online" /> : <ToggleLeft className="w-6 h-6 text-muted-foreground" />}
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("pro.status")}</p>
                <p className={`text-sm ${isOnline ? 'text-online' : 'text-muted-foreground'}`}>
                  {isOnline ? t("pro.online") : t("pro.offline")}
                </p>
              </div>
            </div>
            <Button variant={isOnline ? "default" : "secondary"} onClick={() => setIsOnline(!isOnline)} className="rounded-xl">
              {isOnline ? t("pro.disable") : t("pro.enable")}
            </Button>
          </div>
        </div>

        {/* Wallet */}
        <div className={`bg-card rounded-2xl shadow-card border p-5 animate-fade-in ${lowBalance ? 'border-destructive/50' : 'border-border/50'}`} style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lowBalance ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                <Wallet className={`w-6 h-6 ${lowBalance ? 'text-destructive' : 'text-primary'}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">{t("pro.balance")}</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockArtisan.balance} <span className="text-base font-normal text-muted-foreground">DNT</span>
                </p>
              </div>
            </div>
            <Button variant="default" className="rounded-xl">{t("pro.recharge")}</Button>
          </div>
          
          {lowBalance && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-destructive/10 rounded-xl">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-sm text-destructive font-medium">{t("pro.lowBalance")}</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{contactHistory.length}</p>
            <p className="text-sm text-muted-foreground">{t("pro.contacts")}</p>
          </div>
          <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">4.8</p>
            <p className="text-sm text-muted-foreground">{t("pro.avgRating")}</p>
          </div>
        </div>

        {/* Contact history */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 p-5 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            {t("pro.history")}
          </h3>
          <div className="space-y-3">
            {contactHistory.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{contact.phone}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(contact.date), "d MMM à HH:mm", { locale: fr })}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-destructive">-1 DNT</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
