import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, ArrowLeft, Phone, MessageCircle, Trash2, Search, Users, PhoneCall, MapPin, Calendar, ArrowRight, Coins, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getContactLog, clearContactLog, ContactLogEntry } from "@/lib/contactLog";
import { categories, cities, getAllArtisans, deleteArtisan, Artisan } from "@/lib/data";
import { AddArtisanDialog } from "@/components/AddArtisanDialog";
import { EditArtisanDialog } from "@/components/EditArtisanDialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

const ADMIN_PIN = "1234";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [logs, setLogs] = useState<ContactLogEntry[]>([]);
  const [search, setSearch] = useState("");
  const [proSearch, setProSearch] = useState("");
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey(r => r + 1);

  useEffect(() => {
    if (isAuthenticated) {
      setLogs(getContactLog());
      setArtisans(getAllArtisans());
    }
  }, [isAuthenticated, refreshKey]);

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
    } else {
      setPinError("Code incorrect");
    }
  };

  const handleClear = () => {
    if (window.confirm("Supprimer tout l'historique des contacts ?")) {
      clearContactLog();
      setLogs([]);
    }
  };

  const handleDeleteArtisan = (artisan: Artisan) => {
    if (window.confirm(`Supprimer ${artisan.name} ?`)) {
      deleteArtisan(artisan.id);
      toast.success(`${artisan.name} supprimé`);
      refresh();
    }
  };

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || id;

  const getCityName = (id: string) =>
    cities.find((c) => c.id === id)?.name || id;

  const filteredLogs = logs.filter((log) => {
    const q = search.toLowerCase();
    return (
      log.clientName.toLowerCase().includes(q) ||
      log.clientPhone.includes(q) ||
      log.artisanName.toLowerCase().includes(q) ||
      log.artisanPhone.includes(q)
    );
  });

  const filteredArtisans = artisans.filter((a) => {
    const q = proSearch.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.phone.includes(q) ||
      getCategoryName(a.category).toLowerCase().includes(q) ||
      getCityName(a.city).toLowerCase().includes(q)
    );
  });

  const totalCalls = logs.filter((l) => l.method === "call").length;
  const totalWhatsapp = logs.filter((l) => l.method === "whatsapp").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl gradient-warm flex items-center justify-center shadow-elevated">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Espace Admin</h1>
          <p className="text-muted-foreground text-sm">Entrez le code PIN pour accéder</p>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Code PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              className="text-center text-lg tracking-widest"
              maxLength={10}
            />
            {pinError && <p className="text-sm text-destructive">{pinError}</p>}
            <Button onClick={handleLogin} className="w-full gradient-warm text-primary-foreground">
              Accéder
            </Button>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-warm flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Gestion complète</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Retour
          </Button>
        </div>
      </header>

      <main className="container py-6">
        <Tabs defaultValue="pros" className="space-y-6">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="pros" className="flex items-center gap-2">
              <UserCog className="w-4 h-4" />
              Professionnels
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contacts
            </TabsTrigger>
          </TabsList>

          {/* === TAB PROS === */}
          <TabsContent value="pros" className="space-y-4">
            {/* Search + Add */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un pro..."
                  value={proSearch}
                  onChange={(e) => setProSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <AddArtisanDialog onArtisanAdded={refresh} />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {filteredArtisans.length} pro{filteredArtisans.length > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1">
                <Coins className="w-4 h-4" />
                Total solde : {filteredArtisans.reduce((s, a) => s + a.balance, 0)} DNT
              </span>
            </div>

            {/* Pro Cards */}
            {filteredArtisans.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Aucun professionnel trouvé</p>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArtisans.map((artisan) => (
                  <div key={artisan.id} className="bg-card rounded-xl border border-border shadow-card p-4 space-y-3">
                    {/* Top: name + actions */}
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{artisan.name}</p>
                        <p className="text-xs text-muted-foreground">{artisan.phone}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <EditArtisanDialog artisan={artisan} onArtisanUpdated={refresh} />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDeleteArtisan(artisan)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {getCategoryName(artisan.category)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {getCityName(artisan.city)}
                      </Badge>
                    </div>

                    {/* Balance + Status */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className={`text-sm font-bold ${artisan.balance < 5 ? "text-destructive" : "text-foreground"}`}>
                          {artisan.balance} DNT
                        </span>
                      </div>
                      <Badge variant={artisan.isOnline ? "default" : "secondary"} className="text-xs">
                        {artisan.isOnline ? "En ligne" : "Hors-ligne"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* === TAB CONTACTS === */}
          <TabsContent value="contacts" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-4 shadow-card border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-medium">Total</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{logs.length}</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-card border border-border">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <PhoneCall className="w-4 h-4" />
                  <span className="text-xs font-medium">Appels</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{totalCalls}</p>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-card border border-border">
                <div className="flex items-center gap-2 text-[hsl(var(--whatsapp))] mb-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">WhatsApp</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{totalWhatsapp}</p>
              </div>
            </div>

            {/* Search + Clear */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom ou numéro..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              {logs.length > 0 && (
                <Button variant="outline" size="icon" onClick={handleClear} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Contact Cards */}
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium">Aucun contact enregistré</p>
                <p className="text-sm">Les mises en relation apparaîtront ici</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="bg-card rounded-xl border border-border shadow-card p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(log.date), "dd/MM/yy à HH:mm", { locale: fr })}
                      </span>
                      {log.method === "whatsapp" ? (
                        <Badge className="bg-[hsl(var(--whatsapp))] text-[hsl(var(--whatsapp-foreground))] text-xs">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          WhatsApp
                        </Badge>
                      ) : (
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          <Phone className="w-3 h-3 mr-1" />
                          Appel
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-0.5">Client</p>
                        <p className="font-semibold text-sm">{log.clientName}</p>
                        <p className="text-xs text-muted-foreground">{log.clientPhone}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-0.5">Artisan</p>
                        <p className="font-semibold text-sm">{log.artisanName}</p>
                        <p className="text-xs text-muted-foreground">{log.artisanPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">{getCategoryName(log.category)}</Badge>
                      <Badge variant="outline" className="text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        {getCityName(log.city)}
                      </Badge>
                      {log.clientLocation && (
                        <a href={log.clientLocation} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          Voir position
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
