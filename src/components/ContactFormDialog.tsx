import { useState } from "react";
import { Phone, MessageCircle, User, Smartphone } from "lucide-react";
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
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};
    
    if (!clientName.trim()) {
      newErrors.name = "Veuillez entrer votre nom";
    } else if (clientName.trim().length < 2) {
      newErrors.name = "Le nom doit contenir au moins 2 caractères";
    } else if (clientName.trim().length > 50) {
      newErrors.name = "Le nom ne peut pas dépasser 50 caractères";
    }
    
    // Tunisian phone number validation (8 digits, starting with 2, 5, 9)
    const phoneRegex = /^[259]\d{7}$/;
    const cleanPhone = clientPhone.replace(/\s/g, "");
    
    if (!cleanPhone) {
      newErrors.phone = "Veuillez entrer votre numéro";
    } else if (!phoneRegex.test(cleanPhone)) {
      newErrors.phone = "Numéro invalide (ex: 98 123 456)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm() || !artisan) return;
    
    setIsSubmitting(true);
    
    const cleanPhone = clientPhone.replace(/\s/g, "");
    const fullPhone = `+216${cleanPhone}`;
    
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
    setErrors({});
    setIsSubmitting(false);
    onClose();
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and format as XX XXX XXX
    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)} ${value.slice(2)}`;
    }
    if (value.length > 5) {
      formatted = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5)}`;
    }
    setClientPhone(formatted);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetAndClose()}>
      <DialogContent className="sm:max-w-md mx-4 rounded-2xl">
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
              <div className="flex items-center px-3 bg-muted rounded-md border border-input text-sm font-medium">
                +216
              </div>
              <Input
                id="clientPhone"
                type="tel"
                placeholder="98 123 456"
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
