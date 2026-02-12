import { useState } from "react";
import { Phone, MessageCircle, User, Smartphone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Artisan } from "@/lib/data";
import { addContactLog } from "@/lib/contactLog";

interface ContactFormDialogProps {
  artisan: Artisan | null;
  isOpen: boolean;
  onClose: () => void;
  contactMethod: "call" | "whatsapp" | null;
}

export function ContactFormDialog({ 
  artisan, 
  isOpen, 
  onClose, 
  contactMethod 
}: ContactFormDialogProps) {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+216");
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCodes = [
    { code: "+216", flag: "🇹🇳", label: "Tunisie" },
    { code: "+33", flag: "🇫🇷", label: "France" },
    { code: "+212", flag: "🇲🇦", label: "Maroc" },
    { code: "+213", flag: "🇩🇿", label: "Algérie" },
    { code: "+218", flag: "🇱🇾", label: "Libye" },
    { code: "+39", flag: "🇮🇹", label: "Italie" },
    { code: "+49", flag: "🇩🇪", label: "Allemagne" },
    { code: "+44", flag: "🇬🇧", label: "UK" },
    { code: "+1", flag: "🇺🇸", label: "USA" },
    { code: "+966", flag: "🇸🇦", label: "Arabie S." },
    { code: "+971", flag: "🇦🇪", label: "EAU" },
    { code: "+974", flag: "🇶🇦", label: "Qatar" },
  ];

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!clientName.trim()) {
      newErrors.name = "Veuillez entrer votre nom";
    } else if (clientName.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    } else if (clientName.trim().length > 50) {
      newErrors.name = "Le nom ne peut pas dépasser 50 caractères";
    }
    
    const cleanPhone = clientPhone.replace(/\s/g, "");
    
    if (!cleanPhone) {
      newErrors.phone = "Veuillez entrer votre numéro";
    } else if (cleanPhone.length < 6 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
      newErrors.phone = "Numéro invalide (6 à 15 chiffres)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm() || !artisan) return;
    
    setIsSubmitting(true);
    
    const cleanPhone = clientPhone.replace(/\s/g, "");
    const fullPhone = `${countryCode}${cleanPhone}`;
    
    // Log the contact
    const logEntry = {
      clientName: clientName.trim(),
      clientPhone: fullPhone,
      artisanId: artisan.id,
      artisanName: artisan.name,
      artisanPhone: artisan.phone,
      category: artisan.category,
      city: artisan.city,
      method: contactMethod!,
    };

    if (contactMethod === "whatsapp") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;
            addContactLog({ ...logEntry, clientLocation: mapLink });
            const message = encodeURIComponent(
              `Bonjour ${artisan.name}, je suis ${clientName.trim()} (${fullPhone}). J'ai besoin de vos services. Ma position: ${mapLink}`
            );
            window.open(
              `https://wa.me/${artisan.whatsapp.replace('+', '')}?text=${message}`,
              '_blank'
            );
            resetAndClose();
          },
          () => {
            addContactLog(logEntry);
            const message = encodeURIComponent(
              `Bonjour ${artisan.name}, je suis ${clientName.trim()} (${fullPhone}). J'ai besoin de vos services.`
            );
            window.open(
              `https://wa.me/${artisan.whatsapp.replace('+', '')}?text=${message}`,
              '_blank'
            );
            resetAndClose();
          }
        );
      } else {
        addContactLog(logEntry);
        const message = encodeURIComponent(
          `Bonjour ${artisan.name}, je suis ${clientName.trim()} (${fullPhone}). J'ai besoin de vos services.`
        );
        window.open(
          `https://wa.me/${artisan.whatsapp.replace('+', '')}?text=${message}`,
          '_blank'
        );
        resetAndClose();
      }
    } else if (contactMethod === "call") {
      addContactLog(logEntry);
      window.open(`tel:${artisan.phone}`, '_self');
      resetAndClose();
    }
  };

  const resetAndClose = () => {
    setClientName("");
    setClientPhone("");
    setCountryCode("+216");
    setShowCountryPicker(false);
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setClientPhone(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {contactMethod === "whatsapp" ? (
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
            ) : (
              <Phone className="w-6 h-6 text-primary" />
            )}
            Contacter {artisan?.name}
          </DialogTitle>
          <DialogDescription>
            Entrez vos informations pour contacter l'artisan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Client Name */}
          <div className="space-y-2">
            <Label htmlFor="clientName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Votre nom
            </Label>
            <Input
              id="clientName"
              placeholder="Ex: Ahmed Ben Salah"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              maxLength={50}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Client Phone */}
          <div className="space-y-2">
            <Label htmlFor="clientPhone" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Votre numéro
            </Label>
            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryPicker(!showCountryPicker)}
                  className="flex items-center gap-1 px-2 h-10 bg-muted rounded-md border border-input text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  <span>{countryCodes.find(c => c.code === countryCode)?.flag}</span>
                  <span className="text-xs">{countryCode}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
                {showCountryPicker && (
                  <div className="absolute top-11 left-0 z-50 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto w-52">
                    {countryCodes.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-left"
                        onClick={() => {
                          setCountryCode(c.code);
                          setShowCountryPicker(false);
                        }}
                      >
                        <span>{c.flag}</span>
                        <span className="font-medium">{c.code}</span>
                        <span className="text-muted-foreground">{c.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Input
                id="clientPhone"
                type="tel"
                placeholder="Votre numéro"
                value={clientPhone}
                onChange={handlePhoneChange}
                className={`flex-1 ${errors.phone ? "border-destructive" : ""}`}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetAndClose}
            className="flex-1"
          >
            Annuler
          </Button>
          <Button
            variant={contactMethod === "whatsapp" ? "whatsapp" : "call"}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
          >
            {contactMethod === "whatsapp" ? (
              <>
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                Appeler
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
