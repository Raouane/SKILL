import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
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
import { categories, cities, Artisan, updateArtisan } from "@/lib/data";
import { toast } from "sonner";

interface EditArtisanDialogProps {
  artisan: Artisan;
  onArtisanUpdated: () => void;
}

export function EditArtisanDialog({ artisan, onArtisanUpdated }: EditArtisanDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(artisan.name);
  const [phone, setPhone] = useState(artisan.phone.replace("+216", ""));
  const [city, setCity] = useState(artisan.city);
  const [category, setCategory] = useState(artisan.category);
  const [balance, setBalance] = useState(String(artisan.balance));
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setName(artisan.name);
      setPhone(artisan.phone.replace("+216", ""));
      setCity(artisan.city);
      setCategory(artisan.category);
      setBalance(String(artisan.balance));
      setErrors({});
    }
  }, [open, artisan]);

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
    const bal = parseFloat(balance);
    if (isNaN(bal) || bal < 0) newErrors.balance = "Solde invalide";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const cleanPhone = phone.replace(/\s/g, "");
    const fullPhone = `+216${cleanPhone}`;

    updateArtisan(artisan.id, {
      name: name.trim(),
      category,
      city,
      phone: fullPhone,
      whatsapp: fullPhone,
      balance: parseFloat(balance),
    });

    toast.success(`${name.trim()} modifié avec succès`);
    setOpen(false);
    onArtisanUpdated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Pencil className="w-5 h-5 text-primary" />
            Modifier le Pro
          </DialogTitle>
          <DialogDescription>Modifiez les informations de {artisan.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="editName">Nom complet</Label>
            <Input id="editName" value={name} onChange={(e) => setName(e.target.value)} className={errors.name ? "border-destructive" : ""} maxLength={50} />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="editPhone">Numéro de téléphone</Label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 bg-muted rounded-md border border-input text-sm font-medium">+216</div>
              <Input id="editPhone" type="tel" value={phone} onChange={handlePhoneChange} className={`flex-1 ${errors.phone ? "border-destructive" : ""}`} />
            </div>
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label>Ville</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className={errors.city ? "border-destructive" : ""}><SelectValue /></SelectTrigger>
              <SelectContent>{cities.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}</SelectContent>
            </Select>
            {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className={errors.category ? "border-destructive" : ""}><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map((c) => (<SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>))}</SelectContent>
            </Select>
            {errors.category && <p className="text-sm text-destructive">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="editBalance">Solde (DNT)</Label>
            <Input id="editBalance" type="number" min="0" step="0.5" value={balance} onChange={(e) => setBalance(e.target.value)} className={errors.balance ? "border-destructive" : ""} />
            {errors.balance && <p className="text-sm text-destructive">{errors.balance}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Annuler</Button>
          <Button onClick={handleSubmit} className="flex-1 gradient-warm text-primary-foreground">Enregistrer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
