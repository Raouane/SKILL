import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CitySelector } from "@/components/CitySelector";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ArtisanList } from "@/components/ArtisanList";
import { Artisan } from "@/lib/data";
import { toast } from "sonner";

type View = "home" | "artisans";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Load saved city from localStorage
  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setSelectedCity(savedCity);
    }
  }, []);

  // Save city to localStorage
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    localStorage.setItem("selectedCity", city);
  };

  const handleCategorySelect = (categoryId: string) => {
    if (!selectedCity) {
      toast.error("Veuillez d'abord choisir votre ville");
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
    // In a real app, this would trigger the 1 DNT debit logic
    toast.success(`Contact avec ${artisan.name} via ${method === "call" ? "téléphone" : "WhatsApp"}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-6">
        {view === "home" ? (
          <div className="space-y-8">
            {/* City selector */}
            <CitySelector 
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />

            {/* Welcome message when no city selected */}
            {!selectedCity && (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-warm flex items-center justify-center shadow-elevated">
                  <span className="text-4xl">👋</span>
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Bienvenue !
                </h2>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Commencez par choisir votre ville pour découvrir les artisans disponibles
                </p>
              </div>
            )}

            {/* Categories grid - shown after city selection */}
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
    </div>
  );
};

export default Index;
