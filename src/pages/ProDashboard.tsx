import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Wallet, 
  Phone, 
  ToggleLeft, 
  ToggleRight, 
  AlertCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactHistory, categories } from "@/lib/data";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Mock artisan data (would come from auth in real app)
const mockArtisan = {
  name: "Mohamed Ben Ali",
  category: "plomberie",
  city: "Tataouine",
  balance: 25,
  phone: "+21698123456",
};

export default function ProDashboard() {
  const [isOnline, setIsOnline] = useState(true);
  const category = categories.find(c => c.id === mockArtisan.category);

  const lowBalance = mockArtisan.balance < 5;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">
                Espace Pro
              </h1>
              <p className="text-xs text-muted-foreground">
                Gérez votre compte artisan
              </p>
            </div>
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
              <h2 className="text-xl font-bold text-foreground">
                {mockArtisan.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${category?.color}15`,
                    color: category?.color 
                  }}
                >
                  {category?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {mockArtisan.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status toggle */}
        <div 
          className="bg-card rounded-2xl shadow-card border border-border/50 p-5 animate-fade-in"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isOnline ? 'bg-online/10' : 'bg-muted'}`}>
                {isOnline ? (
                  <ToggleRight className="w-6 h-6 text-online" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-semibold text-foreground">Statut</p>
                <p className={`text-sm ${isOnline ? 'text-online' : 'text-muted-foreground'}`}>
                  {isOnline ? 'En ligne' : 'Hors-ligne'}
                </p>
              </div>
            </div>
            <Button
              variant={isOnline ? "default" : "secondary"}
              onClick={() => setIsOnline(!isOnline)}
              className="rounded-xl"
            >
              {isOnline ? 'Désactiver' : 'Activer'}
            </Button>
          </div>
        </div>

        {/* Wallet */}
        <div 
          className={`bg-card rounded-2xl shadow-card border p-5 animate-fade-in ${lowBalance ? 'border-destructive/50' : 'border-border/50'}`}
          style={{ animationDelay: '200ms' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${lowBalance ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                <Wallet className={`w-6 h-6 ${lowBalance ? 'text-destructive' : 'text-primary'}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Solde</p>
                <p className="text-2xl font-bold text-foreground">
                  {mockArtisan.balance} <span className="text-base font-normal text-muted-foreground">DNT</span>
                </p>
              </div>
            </div>
            <Button variant="default" className="rounded-xl">
              Recharger
            </Button>
          </div>
          
          {lowBalance && (
            <div className="mt-4 flex items-center gap-2 p-3 bg-destructive/10 rounded-xl">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-sm text-destructive font-medium">
                Solde faible ! Rechargez pour rester visible.
              </p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div 
          className="grid grid-cols-2 gap-3 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        >
          <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{contactHistory.length}</p>
            <p className="text-sm text-muted-foreground">Contacts ce mois</p>
          </div>
          <div className="bg-card rounded-2xl shadow-card border border-border/50 p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">4.8</p>
            <p className="text-sm text-muted-foreground">Note moyenne</p>
          </div>
        </div>

        {/* Contact history */}
        <div 
          className="bg-card rounded-2xl shadow-card border border-border/50 p-5 animate-fade-in"
          style={{ animationDelay: '400ms' }}
        >
          <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            Historique des contacts
          </h3>
          <div className="space-y-3">
            {contactHistory.map((contact, index) => (
              <div 
                key={contact.id}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
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
