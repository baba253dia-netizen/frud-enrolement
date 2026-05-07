// Fonctions utilitaires pour l'application

/**
 * Calcule le hash MD5 d'une chaîne (simplifié pour le navigateur)
 * Utilisé pour détecter les doublons d'images de preuve de paiement
 */
export async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Formate une date au format mauritanien (JJ/MM/AAAA)
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-MR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Génère un code PIN aléatoire à 6 chiffres
 */
export function generatePin(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Vérifie si un NNI est valide (10 chiffres)
 */
export function isValidNni(nni: string): boolean {
  return /^\d{10}$/.test(nni);
}

/**
 * Vérifie si un numéro de téléphone mauritanien est valide
 */
export function isValidPhone(phone: string): boolean {
  return /^(\+222)?[234]\d{7}$/.test(phone);
}
