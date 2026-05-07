"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation
const schemaEnrolement = z.object({
  nomPrenom: z.string().min(3, "Nom complet requis"),
  nni: z.string().regex(/^\d{10}$/, "NNI invalide (10 chiffres)"),
  dateNaissance: z.string().min(1, "Date de naissance requise"),
  wilaya: z.string().min(1, "Sélectionnez une wilaya"),
  moughataa: z.string().min(1, "Sélectionnez une moughataa"),
  commune: z.string().min(1, "Sélectionnez une commune"),
  quartierVillage: z.string().min(1, "Quartier/Village requis"),
  modePaiement: z.enum(["BANKILY", "MASRVI"], { required_error: "Mode de paiement requis" }),
});

type FormData = z.infer<typeof schemaEnrolement>;

// Liste des wilayas de Mauritanie
const wilayas = [
  "Nouakchott", "Nouadhibou", "Rosso", "Kaédi", "Atar",
  "Zouerate", "Néma", "Aleg", "Tidjikja", "Sélibaby",
  "Aoujeft", "Boutilimit", "Akjoujt", "Mederdra", "Chami"
];

const moughataas: Record<string, string[]> = {
  "Nouakchott": ["Tevragh Zeina", "Ksar", "Teyarett", "Arafat", "El Mina", "Dar Naim", "Riyad", "El Moughataa", "Toujounine"],
  "Nouadhibou": ["Nouadhibou Centre", "Cansado", "Boulenoir"],
  "Rosso": ["Rosso Centre", "Jidrel Mohguen", "Keir Macène"],
  "Kaédi": ["Kaédi Centre", "Ganki", "Lexeiba"],
  "Atar": ["Atar Centre", "Chinguetti", "Ouadane"],
  "Zouerate": ["Zouerate Centre", "F'Derick", "Bir Moghrein"],
  "Néma": ["Néma Centre", "Amourj", "Bassiknou"],
  "Aleg": ["Aleg Centre", "Boghé", "Bababé"],
  "Tidjikja": ["Tidjikja Centre", "Moudjéria", "Tichitt"],
  "Sélibaby": ["Sélibaby Centre", "Ould Yengé", "Ghabou"],
  "Aoujeft": ["Aoujeft Centre", "Maaden", "Nbeika"],
  "Boutilimit": ["Boutilimit Centre", "Aleg", "Mbagne"],
  "Akjoujt": ["Akjoujt Centre", "Benichab"],
  "Mederdra": ["Mederdra Centre", "Tiguent", "Rkiz"],
  "Chami": ["Chami Centre", "Tenhemad", "Nouamghar"]
};

export default function PageEnrolement() {
  const [etape, setEtape] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schemaEnrolement),
    mode: "onChange",
  });

  const { register, watch, formState: { errors }, handleSubmit, trigger } = methods;
  const wilayaSelectionnee = watch("wilaya");

  const nextStep = async () => {
    const isValid = await trigger(
      etape === 1 ? ["nomPrenom", "nni", "dateNaissance"] :
      etape === 2 ? ["wilaya", "moughataa", "commune", "quartierVillage"] :
      ["modePaiement"]
    );
    if (isValid) setEtape((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => setEtape((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: FormData) => {
    console.log("Données soumises :", data);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <span className="text-white text-4xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Enrôlement réussi !</h2>
        <p className="text-gray-600 text-center">
          Le membre a été enregistré avec succès.
        </p>
        <button
          onClick={() => { setSubmitted(false); setEtape(1); methods.reset(); }}
          className="mt-8 bg-[#0047AB] text-white py-3 px-6 rounded-lg font-bold"
        >
          Nouvel enrôlement
        </button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-white p-4 max-w-lg mx-auto">
        {/* Barre de progression */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-2 flex-1 rounded-full transition-colors ${num <= etape ? "bg-[#0047AB]" : "bg-gray-200"}`}
            />
          ))}
        </div>

        <h2 className="text-xl font-bold text-[#0047AB] mb-4">
          {etape === 1 && "Étape 1 : Identité"}
          {etape === 2 && "Étape 2 : Localisation"}
          {etape === 3 && "Étape 3 : Paiement"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Étape 1 : Identité */}
          {etape === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Nom & Prénom (الاسم واللقب)</label>
                <input
                  {...register("nomPrenom")}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Entrez le nom complet"
                />
                {errors.nomPrenom && <p className="text-red-500 text-sm mt-1">{errors.nomPrenom.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">NNI (رقم CIN)</label>
                <input
                  {...register("nni")}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="1234567890"
                  maxLength={10}
                  inputMode="numeric"
                />
                {errors.nni && <p className="text-red-500 text-sm mt-1">{errors.nni.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date de naissance</label>
                <input
                  type="date"
                  {...register("dateNaissance")}
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
                {errors.dateNaissance && <p className="text-red-500 text-sm mt-1">{errors.dateNaissance.message}</p>}
              </div>

              <button type="button" onClick={nextStep} className="w-full bg-[#0047AB] text-white py-3 rounded-lg font-bold">
                Suivant →
              </button>
            </>
          )}

          {/* Étape 2 : Localisation */}
          {etape === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Wilaya</label>
                <select {...register("wilaya")} className="w-full border border-gray-300 rounded-lg p-3 bg-white">
                  <option value="">Sélectionnez une wilaya</option>
                  {wilayas.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.wilaya && <p className="text-red-500 text-sm mt-1">{errors.wilaya.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Moughataa</label>
                <select {...register("moughataa")} className="w-full border border-gray-300 rounded-lg p-3 bg-white" disabled={!wilayaSelectionnee}>
                  <option value="">Sélectionnez une moughataa</option>
                  {wilayaSelectionnee && moughataas[wilayaSelectionnee]?.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                {errors.moughataa && <p className="text-red-500 text-sm mt-1">{errors.moughataa.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Commune</label>
                <input {...register("commune")} className="w-full border border-gray-300 rounded-lg p-3" placeholder="Nom de la commune" />
                {errors.commune && <p className="text-red-500 text-sm mt-1">{errors.commune.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quartier / Village</label>
                <input {...register("quartierVillage")} className="w-full border border-gray-300 rounded-lg p-3" placeholder="Quartier ou village" />
                {errors.quartierVillage && <p className="text-red-500 text-sm mt-1">{errors.quartierVillage.message}</p>}
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={prevStep} className="flex-1 bg-gray-300 text-black py-3 rounded-lg font-bold">
                  ← Retour
                </button>
                <button type="button" onClick={nextStep} className="flex-1 bg-[#0047AB] text-white py-3 rounded-lg font-bold">
                  Suivant →
                </button>
              </div>
            </>
          )}

          {/* Étape 3 : Paiement */}
          {etape === 3 && (
            <>
              <p className="font-medium mb-2">Mode de paiement</p>
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" {...register("modePaiement")} value="BANKILY" className="w-5 h-5 accent-[#0047AB]" />
                  <span className="font-bold">BANKILY</span>
                </label>
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input type="radio" {...register("modePaiement")} value="MASRVI" className="w-5 h-5 accent-[#0047AB]" />
                  <span className="font-bold">MASRVI</span>
                </label>
              </div>
              {errors.modePaiement && <p className="text-red-500 text-sm mb-3">{errors.modePaiement.message}</p>}

              <div>
                <label className="block text-sm font-medium mb-1">Capture d&apos;écran du paiement</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
                  <p className="text-gray-500">📷 Cliquez pour prendre une photo</p>
                  <p className="text-xs text-gray-400 mt-1">ou glissez-déposez une image</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={prevStep} className="flex-1 bg-gray-300 text-black py-3 rounded-lg font-bold">
                  ← Retour
                </button>
                <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold">
                  ✓ Valider l&apos;enrôlement
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </FormProvider>
  );
}
