export interface ContactLogEntry {
  id: string;
  clientName: string;
  clientPhone: string;
  artisanId: string;
  artisanName: string;
  artisanPhone: string;
  category: string;
  city: string;
  method: "call" | "whatsapp";
  date: string;
  clientLocation?: string;
}

const STORAGE_KEY = "contact_log";

export function getContactLog(): ContactLogEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addContactLog(entry: Omit<ContactLogEntry, "id" | "date">): ContactLogEntry {
  const log = getContactLog();
  const newEntry: ContactLogEntry = {
    ...entry,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  log.unshift(newEntry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  return newEntry;
}

export function clearContactLog() {
  localStorage.removeItem(STORAGE_KEY);
}
