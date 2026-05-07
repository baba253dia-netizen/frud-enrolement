import { z } from "zod";

// Validation du NNI mauritanien : 10 chiffres
export const nniSchema = z.string().regex(/^\d{10}$/, "Le NNI doit contenir exactement 10 chiffres");

// Validation du téléphone mauritanien
export const telephoneSchema = z.string().regex(/^(\+222)?[234]\d{7}$/, "Numéro de téléphone invalide");

// Validation de l'email
export const emailSchema = z.string().email("Email invalide");

// Validation du code PIN (6 chiffres)
export const codePinSchema = z.string().regex(/^\d{6}$/, "Le code PIN doit contenir 6 chiffres");

// Schéma complet d'un membre
export const membreSchema = z.object({
  nomPrenom: z.string().min(3, "Nom complet requis"),
  nni: nniSchema,
  dateNaissance: z.string().min(1, "Date de naissance requise"),
  telephone: telephoneSchema,
  wilaya: z.string().min(1, "Wilaya requise"),
  moughataa: z.string().min(1, "Moughataa requise"),
  commune: z.string().min(1, "Commune requise"),
  quartierVillage: z.string().min(1, "Quartier/Village requis"),
  modePaiement: z.enum(["BANKILY", "MASRVI"]),
});

export type MembreData = z.infer<typeof membreSchema>;
