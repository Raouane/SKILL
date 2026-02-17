import { useState } from "react";
import { Phone, MessageCircle, User, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Artisan } from "@/lib/data";
import { addContactLog } from "@/lib/contactLog";
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+216");
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
      newErrors.name = t("contact.error.name");
    } else if (clientName.trim().length < 2) {
      newErrors.name = t("contact.error.nameMin");
    } else if (clientName.trim().length > 50) {
      newErrors.name = t("contact.error.nameMax");
    }
    
    const cleanPhone = clientPhone.replace(/\s/g, "");
    
    if (!cleanPhone) {
      newErrors.phone = t("contact.error.phone");
    } else if (cleanPhone.length < 6 || cleanPhone.length > 15 || !/^\d+$/.test(cleanPhone)) {
      newErrors.phone = t("contact.error.phoneInvalid");
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm() || !artisan) return;
    
    setIsSubmitting(true);
    
    const cleanPhone = clientPhone.replace(/\s/g, "");
    const fullPhone = `${countryCode}${cleanPhone}`;
    
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
              t("whatsapp.messageWithLocation", {
                name: artisan.name,
                clientName: clientName.trim(),
                phone: fullPhone,
                location: mapLink,
              })
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
              t("whatsapp.message", {
                name: artisan.name,
                clientName: clientName.trim(),
                phone: fullPhone,
              })
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
          t("whatsapp.message", {
            name: artisan.name,
            clientName: clientName.trim(),
            phone: fullPhone,
          })
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
            {t("contact.title")} {artisan?.name}
          </DialogTitle>
          <DialogDescription>
            {t("contact.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {t("contact.name")}
            </Label>
            <Input
              id="clientName"
              placeholder={t("contact.namePlaceholder")}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              maxLength={50}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientPhone" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              {t("contact.phone")}
            </Label>
            <div className="flex gap-2">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[100px] h-10">
                  <SelectValue>
                    <span className="flex items-center gap-1">
                      <span>{countryCodes.find(c => c.code === countryCode)?.flag}</span>
                      <span className="text-xs">{countryCode}</span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="z-[200] bg-background">
                  {countryCodes.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span className="font-medium">{c.code}</span>
                        <span className="text-muted-foreground">{c.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="clientPhone"
                type="tel"
                placeholder={t("contact.phonePlaceholder")}
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

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetAndClose}
            className="flex-1"
          >
            {t("contact.cancel")}
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
                {t("artisan.whatsapp")}
              </>
            ) : (
              <>
                <Phone className="w-5 h-5" />
                {t("artisan.call")}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
