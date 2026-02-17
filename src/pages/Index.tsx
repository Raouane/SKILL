import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CitySelector } from "@/components/CitySelector";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ArtisanList } from "@/components/ArtisanList";
import { ContactFormDialog } from "@/components/ContactFormDialog";
import { Artisan } from "@/lib/data";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

type View = "home" | "artisans";

const Index = () => {
  const { t } = useI18n();
  const [view, setView] = useState<View>("home");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);
  const [contactMethod, setContactMethod] = useState<"call" | "whatsapp" | null>(null);

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
  };

  const handleCategorySelect = (categoryId: string) => {
    if (!selectedCity) {
      toast.error(t("artisans.toast.selectCity"));
      return;
    }
    setSelectedCategory(categoryId);
    setView("artisans");
  };

  const handleBack = () => {
    setView("home");
    setSelectedCategory("");
  };

  const handleContact = (artisan: Artisan, method: "call" | "whatsapp") => {
    setSelectedArtisan(artisan);
    setContactMethod(method);
    setContactDialogOpen(true);
  };

  const handleCloseContactDialog = () => {
    setContactDialogOpen(false);
    setSelectedArtisan(null);
    setContactMethod(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        {view === "home" ? (
          <div className="space-y-8">
            <CitySelector 
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />

            {!selectedCity && (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-warm flex items-center justify-center shadow-elevated">
                  <span className="text-4xl">👋</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  {t("welcome.title")}
                </h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  {t("welcome.text")}
                </p>
              </div>
            )}

            {selectedCity && (
              <CategoryGrid onCategorySelect={handleCategorySelect} />
            )}
          </div>
        ) : (
          <ArtisanList
            cityId={selectedCity}
            categoryId={selectedCategory}
            onBack={handleBack}
            onContact={handleContact}
          />
        )}
      </main>

      <Footer />

      <ContactFormDialog
        artisan={selectedArtisan}
        isOpen={contactDialogOpen}
        onClose={handleCloseContactDialog}
        contactMethod={contactMethod}
      />
    </div>
  );
};

export default Index;
