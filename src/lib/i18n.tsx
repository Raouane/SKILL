import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "fr" | "ar";

const translations = {
  fr: {
    // Header
    "header.title": "Artisan Connect",
    "header.subtitle": "Trouvez un artisan près de chez vous",

    // City selector
    "city.placeholder": "Choisir votre ville",

    // Welcome
    "welcome.title": "Bienvenue !",
    "welcome.text": "Commencez par choisir votre ville pour découvrir les artisans disponibles",

    // Categories
    "categories.title": "De quoi avez-vous besoin ?",
    "cat.plomberie": "Plomberie",
    "cat.electricite": "Électricité",
    "cat.peinture": "Peinture",
    "cat.maconnerie": "Maçonnerie",
    "cat.climatisation": "Climatisation",
    "cat.serrurerie": "Serrurerie",
    "cat.menuiserie": "Menuiserie",
    "cat.jardinage": "Jardinage",
    "cat.demenagement": "Déménagement",
    "cat.reparation": "Réparation",

    // Artisan list
    "artisans.available": "artisan(s) disponible(s)",
    "artisans.none.title": "Aucun artisan disponible",
    "artisans.none.text": "Il n'y a pas d'artisans en ligne dans cette catégorie pour le moment. Réessayez plus tard.",
    "artisans.toast.selectCity": "Veuillez d'abord choisir votre ville",

    // Artisan card
    "artisan.call": "Appeler",
    "artisan.whatsapp": "WhatsApp",

    // Contact form
    "contact.title": "Contacter",
    "contact.subtitle": "Entrez vos informations pour contacter l'artisan",
    "contact.name": "Votre nom",
    "contact.namePlaceholder": "Ex: Ahmed Ben Salah",
    "contact.phone": "Votre numéro",
    "contact.phonePlaceholder": "Votre numéro",
    "contact.cancel": "Annuler",
    "contact.error.name": "Veuillez entrer votre nom",
    "contact.error.nameMin": "Le nom doit contenir au moins 2 caractères",
    "contact.error.nameMax": "Le nom ne peut pas dépasser 50 caractères",
    "contact.error.phone": "Veuillez entrer votre numéro",
    "contact.error.phoneInvalid": "Numéro invalide (6 à 15 chiffres)",

    // Footer
    "footer.pro": "Espace Pro",
    "footer.admin": "Admin",
    "footer.legal": "Mentions légales",
    "footer.privacy": "Confidentialité",
    "footer.contact": "Contact",
    "footer.copyright": "© 2024 Artisan Connect - Tous droits réservés",

    // Pro dashboard
    "pro.title": "Espace Pro",
    "pro.subtitle": "Connexion / Inscription",
    "pro.join": "Rejoignez Artisan Connect",
    "pro.joinText": "Inscrivez-vous ou connectez-vous pour gérer votre profil artisan",
    "pro.google": "Continuer avec Google",
    "pro.facebook": "Continuer avec Facebook",
    "pro.terms": "En vous inscrivant, vous acceptez nos conditions d'utilisation",
    "pro.manage": "Gérez votre compte artisan",
    "pro.status": "Statut",
    "pro.online": "En ligne",
    "pro.offline": "Hors-ligne",
    "pro.disable": "Désactiver",
    "pro.enable": "Activer",
    "pro.balance": "Solde",
    "pro.recharge": "Recharger",
    "pro.lowBalance": "Solde faible ! Rechargez pour rester visible.",
    "pro.contacts": "Contacts ce mois",
    "pro.avgRating": "Note moyenne",
    "pro.history": "Historique des contacts",

    // WhatsApp message
    "whatsapp.message": "Bonjour {name}, je suis {clientName} ({phone}). J'ai besoin de vos services.",
    "whatsapp.messageWithLocation": "Bonjour {name}, je suis {clientName} ({phone}). J'ai besoin de vos services. Ma position: {location}",

    // Lang
    "lang.switch": "العربية",
  },
  ar: {
    // Header
    "header.title": "حرفي كونكت",
    "header.subtitle": "ابحث عن حرفي بالقرب منك",

    // City selector
    "city.placeholder": "اختر مدينتك",

    // Welcome
    "welcome.title": "!مرحبا",
    "welcome.text": "ابدأ باختيار مدينتك لاكتشاف الحرفيين المتاحين",

    // Categories
    "categories.title": "ماذا تحتاج؟",
    "cat.plomberie": "سباكة",
    "cat.electricite": "كهرباء",
    "cat.peinture": "دهان",
    "cat.maconnerie": "بناء",
    "cat.climatisation": "تكييف",
    "cat.serrurerie": "أقفال",
    "cat.menuiserie": "نجارة",
    "cat.jardinage": "بستنة",
    "cat.demenagement": "نقل",
    "cat.reparation": "إصلاح",

    // Artisan list
    "artisans.available": "حرفي(ين) متاح(ين)",
    "artisans.none.title": "لا يوجد حرفي متاح",
    "artisans.none.text": "لا يوجد حرفيون متصلون في هذه الفئة حاليًا. حاول لاحقًا.",
    "artisans.toast.selectCity": "يرجى اختيار مدينتك أولاً",

    // Artisan card
    "artisan.call": "اتصال",
    "artisan.whatsapp": "واتساب",

    // Contact form
    "contact.title": "الاتصال بـ",
    "contact.subtitle": "أدخل معلوماتك للاتصال بالحرفي",
    "contact.name": "اسمك",
    "contact.namePlaceholder": "مثال: أحمد بن صالح",
    "contact.phone": "رقم هاتفك",
    "contact.phonePlaceholder": "رقم هاتفك",
    "contact.cancel": "إلغاء",
    "contact.error.name": "يرجى إدخال اسمك",
    "contact.error.nameMin": "يجب أن يحتوي الاسم على حرفين على الأقل",
    "contact.error.nameMax": "لا يمكن أن يتجاوز الاسم 50 حرفًا",
    "contact.error.phone": "يرجى إدخال رقمك",
    "contact.error.phoneInvalid": "رقم غير صالح (6 إلى 15 أرقام)",

    // Footer
    "footer.pro": "مساحة المهنيين",
    "footer.admin": "الإدارة",
    "footer.legal": "الإشعارات القانونية",
    "footer.privacy": "السرية",
    "footer.contact": "اتصل بنا",
    "footer.copyright": "© 2024 حرفي كونكت - جميع الحقوق محفوظة",

    // Pro dashboard
    "pro.title": "مساحة المهنيين",
    "pro.subtitle": "تسجيل الدخول / التسجيل",
    "pro.join": "انضم إلى حرفي كونكت",
    "pro.joinText": "سجّل أو سجّل الدخول لإدارة ملفك المهني",
    "pro.google": "متابعة مع جوجل",
    "pro.facebook": "متابعة مع فيسبوك",
    "pro.terms": "بالتسجيل، أنت توافق على شروط الاستخدام",
    "pro.manage": "أدر حسابك المهني",
    "pro.status": "الحالة",
    "pro.online": "متصل",
    "pro.offline": "غير متصل",
    "pro.disable": "تعطيل",
    "pro.enable": "تفعيل",
    "pro.balance": "الرصيد",
    "pro.recharge": "إعادة الشحن",
    "pro.lowBalance": "رصيد منخفض! أعد الشحن لتبقى مرئياً.",
    "pro.contacts": "الاتصالات هذا الشهر",
    "pro.avgRating": "التقييم المتوسط",
    "pro.history": "سجل الاتصالات",

    // WhatsApp message
    "whatsapp.message": "مرحبا {name}، أنا {clientName} ({phone}). أحتاج إلى خدماتكم.",
    "whatsapp.messageWithLocation": "مرحبا {name}، أنا {clientName} ({phone}). أحتاج إلى خدماتكم. موقعي: {location}",

    // Lang
    "lang.switch": "Français",
  },
} as const;

type TranslationKey = keyof typeof translations.fr;

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey, params?: Record<string, string>) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("app_lang");
    if (saved === "fr" || saved === "ar") return saved;
    // Auto-detect
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith("ar") ? "ar" : "fr";
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    localStorage.setItem("app_lang", lang);
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const setLang = (newLang: Lang) => setLangState(newLang);

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    let text = (translations[lang] as Record<string, string>)[key] || (translations.fr as Record<string, string>)[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
