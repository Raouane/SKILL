import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, cities, addArtisan } from "@/lib/data";
import { toast } from "sonner";

interface AddArtisanDialogProps {
  onArtisanAdded: () => void;
}

export function AddArtisanDialog({ onArtisanAdded }: AddArtisanDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = value;
    if (value.length > 2) formatted = `${value.slice(0, 2)} ${value.slice(2)}`;
    if (value.length > 5) formatted = `${value.slice(0, 2)} ${value.slice(2, 5)} ${value.slice(5)}`;
    setPhone(formatted);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) newErrors.name = "Nom requis (min 2 caractères)";
    const cleanPhone = phone.replace(/\s/g, "");
    if (!/^[259]\d{7}$/.test(cleanPhone)) newErrors.phone = "Numéro invalide (ex: 98 123 456)";
    if (!city) newErrors.city = "Ville requise";
    if (!category) newErrors.category = "Catégorie requise";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const cleanPhone = phone.replace(/\s/g, "");
    const fullPhone = `+216${cleanPhone}`;

    addArtisan({
      name: name.trim(),
      category,
      city,
      phone: fullPhone,
      whatsapp: fullPhone,
      rating: 5.0,
      reviewCount: 0,
      isOnline: true,
      balance: 10,
    });

    toast.success(`${name.trim()} ajouté avec succès`);
    resetForm();
    setOpen(false);
    onArtisanAdded();
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setCity("");
    setCategory("");
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetForm(); setOpen(o); }}>
      <DialogTrigger asChild>
        <Button className="gradient-warm text-primary-foreground">
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un Pro
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <UserPlus className="w-6 h-6 text-primary" />
            Nouveau Professionnel
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de l'artisan (crédit initial : 10 DNT)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="artisanName">Nom complet</Label>
            <Input
              id="artisanName"
              placeholder="Ex: Mohamed Ben Ali"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-destructive" : ""}
              maxLength={50}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="artisanPhone">Numéro de téléphone</Label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 bg-muted rounded-md border border-input text-sm font-medium">
                +216
              </div>
              <Input
                id="artisanPhone"
                type="tel"
                placeholder="98 123 456"
                value={phone}
                onChange={handlePhoneChange}
                className={`flex-1 ${errors.phone ? "border-destructive" : ""}`}
              />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label>Ville</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className={errors.city ? "border-destructive" : ""}>
                <SelectValue placeholder="Choisir une ville" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className={errors.category ? "border-destructive" : ""}>
                <SelectValue placeholder="Choisir une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => { resetForm(); setOpen(false); }} className="flex-1">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="flex-1 gradient-warm text-primary-foreground">
            Ajouter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
