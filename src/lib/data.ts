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
  // Tataouine - Plomberie
  {
    id: "1",
    name: "Mohamed Ben Ali",
    category: "plomberie",
    city: "tataouine",
    phone: "+33783698509",
    whatsapp: "+33783698509",
    rating: 4.8,
    reviewCount: 42,
    isOnline: true,
    balance: 10,
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
    balance: 10,
  },
  // Tataouine - Électricité
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
    balance: 10,
  },
  {
    id: "4",
    name: "Karim Jebali",
    category: "electricite",
    city: "tataouine",
    phone: "+21698765432",
    whatsapp: "+21698765432",
    rating: 4.6,
    reviewCount: 33,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Peinture
  {
    id: "5",
    name: "Khaled Mansouri",
    category: "peinture",
    city: "tataouine",
    phone: "+21695432167",
    whatsapp: "+21695432167",
    rating: 4.6,
    reviewCount: 35,
    isOnline: true,
    balance: 10,
  },
  {
    id: "6",
    name: "Nabil Fourati",
    category: "peinture",
    city: "tataouine",
    phone: "+21694567890",
    whatsapp: "+21694567890",
    rating: 4.4,
    reviewCount: 22,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Climatisation
  {
    id: "7",
    name: "Youssef Hamdi",
    category: "climatisation",
    city: "tataouine",
    phone: "+21694321987",
    whatsapp: "+21694321987",
    rating: 4.7,
    reviewCount: 51,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Maçonnerie
  {
    id: "8",
    name: "Hassen Chabbi",
    category: "maconnerie",
    city: "tataouine",
    phone: "+21693456789",
    whatsapp: "+21693456789",
    rating: 4.8,
    reviewCount: 45,
    isOnline: true,
    balance: 10,
  },
  {
    id: "9",
    name: "Slim Mejri",
    category: "maconnerie",
    city: "tataouine",
    phone: "+21692345678",
    whatsapp: "+21692345678",
    rating: 4.5,
    reviewCount: 29,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Serrurerie
  {
    id: "10",
    name: "Faouzi Khlifi",
    category: "serrurerie",
    city: "tataouine",
    phone: "+21691234567",
    whatsapp: "+21691234567",
    rating: 4.9,
    reviewCount: 58,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Menuiserie
  {
    id: "11",
    name: "Ridha Souissi",
    category: "menuiserie",
    city: "tataouine",
    phone: "+21690123456",
    whatsapp: "+21690123456",
    rating: 4.7,
    reviewCount: 39,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Jardinage
  {
    id: "12",
    name: "Mongi Sassi",
    category: "jardinage",
    city: "tataouine",
    phone: "+21699012345",
    whatsapp: "+21699012345",
    rating: 4.4,
    reviewCount: 18,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Déménagement
  {
    id: "13",
    name: "Bassem Lahmar",
    category: "demenagement",
    city: "tataouine",
    phone: "+21698901234",
    whatsapp: "+21698901234",
    rating: 4.6,
    reviewCount: 31,
    isOnline: true,
    balance: 10,
  },
  // Tataouine - Réparation
  {
    id: "14",
    name: "Amine Cherif",
    category: "reparation",
    city: "tataouine",
    phone: "+21697890123",
    whatsapp: "+21697890123",
    rating: 4.5,
    reviewCount: 27,
    isOnline: true,
    balance: 10,
  },
  // Gabès - Plomberie
  {
    id: "15",
    name: "Jamel Hadj Ali",
    category: "plomberie",
    city: "gabes",
    phone: "+21696789012",
    whatsapp: "+21696789012",
    rating: 4.7,
    reviewCount: 44,
    isOnline: true,
    balance: 10,
  },
  // Gabès - Électricité
  {
    id: "16",
    name: "Walid Oueslati",
    category: "electricite",
    city: "gabes",
    phone: "+21695678901",
    whatsapp: "+21695678901",
    rating: 4.8,
    reviewCount: 52,
    isOnline: true,
    balance: 10,
  },
  // Médenine - Plomberie
  {
    id: "17",
    name: "Rachid Belhadj",
    category: "plomberie",
    city: "medenine",
    phone: "+21694567890",
    whatsapp: "+21694567890",
    rating: 4.6,
    reviewCount: 36,
    isOnline: true,
    balance: 10,
  },
  // Sfax - Électricité
  {
    id: "18",
    name: "Tarek Mzali",
    category: "electricite",
    city: "sfax",
    phone: "+21693456789",
    whatsapp: "+21693456789",
    rating: 4.9,
    reviewCount: 71,
    isOnline: true,
    balance: 10,
  },
];

export const contactHistory = [
  { id: "1", phone: "+21698111222", date: "2024-01-15T10:30:00", category: "plomberie" },
  { id: "2", phone: "+21697222333", date: "2024-01-15T14:15:00", category: "plomberie" },
  { id: "3", phone: "+21696333444", date: "2024-01-14T09:00:00", category: "plomberie" },
  { id: "4", phone: "+21695444555", date: "2024-01-14T16:45:00", category: "plomberie" },
  { id: "5", phone: "+21694555666", date: "2024-01-13T11:20:00", category: "plomberie" },
];
