import { Wrench, Zap, Droplets, Paintbrush, Hammer, Wind, Lock, Sofa, Leaf, Truck } from "lucide-react";

export const cities = [
  { id: "tataouine", name: "Tataouine", region: "Sud" },
  { id: "gabes", name: "Gabès", region: "Sud" },
  { id: "medenine", name: "Médenine", region: "Sud" },
  { id: "sfax", name: "Sfax", region: "Centre" },
  { id: "sousse", name: "Sousse", region: "Centre" },
  { id: "tunis", name: "Tunis", region: "Nord" },
];

export const categories = [
  { id: "plomberie", name: "Plomberie", icon: Droplets, color: "hsl(200, 80%, 50%)" },
  { id: "electricite", name: "Électricité", icon: Zap, color: "hsl(45, 90%, 50%)" },
  { id: "peinture", name: "Peinture", icon: Paintbrush, color: "hsl(280, 70%, 55%)" },
  { id: "maconnerie", name: "Maçonnerie", icon: Hammer, color: "hsl(25, 70%, 50%)" },
  { id: "climatisation", name: "Climatisation", icon: Wind, color: "hsl(190, 80%, 45%)" },
  { id: "serrurerie", name: "Serrurerie", icon: Lock, color: "hsl(220, 25%, 40%)" },
  { id: "menuiserie", name: "Menuiserie", icon: Sofa, color: "hsl(30, 60%, 45%)" },
  { id: "jardinage", name: "Jardinage", icon: Leaf, color: "hsl(120, 50%, 45%)" },
  { id: "demenagement", name: "Déménagement", icon: Truck, color: "hsl(0, 70%, 50%)" },
  { id: "reparation", name: "Réparation", icon: Wrench, color: "hsl(210, 15%, 50%)" },
];

export interface Artisan {
  id: string;
  name: string;
  category: string;
  city: string;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  balance: number;
}

export const mockArtisans: Artisan[] = [
  {
    id: "1",
    name: "Mohamed Ben Ali",
    category: "plomberie",
    city: "tataouine",
    phone: "+21698123456",
    whatsapp: "+21698123456",
    rating: 4.8,
    reviewCount: 42,
    isOnline: true,
    balance: 25,
  },
  {
    id: "2",
    name: "Ahmed Trabelsi",
    category: "plomberie",
    city: "tataouine",
    phone: "+21697654321",
    whatsapp: "+21697654321",
    rating: 4.5,
    reviewCount: 28,
    isOnline: true,
    balance: 15,
  },
  {
    id: "3",
    name: "Salah Bouazizi",
    category: "electricite",
    city: "tataouine",
    phone: "+21699876543",
    whatsapp: "+21699876543",
    rating: 4.9,
    reviewCount: 67,
    isOnline: true,
    balance: 40,
  },
  {
    id: "4",
    name: "Khaled Mansouri",
    category: "peinture",
    city: "tataouine",
    phone: "+21695432167",
    whatsapp: "+21695432167",
    rating: 4.6,
    reviewCount: 35,
    isOnline: false,
    balance: 0,
  },
  {
    id: "5",
    name: "Youssef Hamdi",
    category: "climatisation",
    city: "tataouine",
    phone: "+21694321987",
    whatsapp: "+21694321987",
    rating: 4.7,
    reviewCount: 51,
    isOnline: true,
    balance: 30,
  },
];

export const contactHistory = [
  { id: "1", phone: "+21698111222", date: "2024-01-15T10:30:00", category: "plomberie" },
  { id: "2", phone: "+21697222333", date: "2024-01-15T14:15:00", category: "plomberie" },
  { id: "3", phone: "+21696333444", date: "2024-01-14T09:00:00", category: "plomberie" },
  { id: "4", phone: "+21695444555", date: "2024-01-14T16:45:00", category: "plomberie" },
  { id: "5", phone: "+21694555666", date: "2024-01-13T11:20:00", category: "plomberie" },
];
