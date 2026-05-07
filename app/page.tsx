"use client";
import { useState, useEffect } from "react";

// ============================================================
// APPLICATION COMPLÈTE D'ENRÔLEMENT FRUD-ESPOIR MAURITANIE
// Fonctionne sans base de données (stockage navigateur)
// ============================================================

interface Membre {
  id: string;
  nomPrenom: string;
  nni: string;
  dateNaissance: string;
  wilaya: string;
  moughataa: string;
  commune: string;
  quartierVillage: string;
  telephone: string;
  modePaiement: string;
  dateCreation: string;
  statut: string;
}

const WILAYAS = [
  "Nouakchott", "Nouadhibou", "Rosso", "Kaédi", "Atar",
  "Zouerate", "Néma", "Aleg", "Tidjikja", "Sélibaby",
  "Aoujeft", "Boutilimit", "Akjoujt", "Mederdra", "Chami"
];

const MOUGHATAAS: Record<string, string[]> = {
  "Nouakchott": ["Tevragh Zeina", "Ksar", "Teyarett", "Arafat", "El Mina", "Dar Naim", "Riyad", "Toujounine"],
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
  "Boutilimit": ["Boutilimit Centre", "Mbagne"],
  "Akjoujt": ["Akjoujt Centre", "Benichab"],
  "Mederdra": ["Mederdra Centre", "Rkiz"],
  "Chami": ["Chami Centre", "Nouamghar"]
};

export default function AppEnrolement() {
  const [page, setPage] = useState<"accueil" | "enrolement" | "liste">("accueil");
  const [etape, setEtape] = useState(1);
  const [membres, setMembres] = useState<Membre[]>([]);
  const [confirmation, setConfirmation] = useState(false);

  const [nomPrenom, setNomPrenom] = useState("");
  const [nni, setNni] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [telephone, setTelephone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [moughataa, setMoughataa] = useState("");
  const [commune, setCommune] = useState("");
  const [quartierVillage, setQuartierVillage] = useState("");
  const [modePaiement, setModePaiement] = useState("");

  const [erreurs, setErreurs] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("frud-membres");
    if (stored) setMembres(JSON.parse(stored));
  }, []);

  const sauvegarderMembres = (nouveauxMembres: Membre[]) => {
    setMembres(nouveauxMembres);
    localStorage.setItem("frud-membres", JSON.stringify(nouveauxMembres));
  };

  const validerEtape1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (nomPrenom.trim().length < 3) errs.nomPrenom = "Nom complet requis (min 3 caractères)";
    if (!/^\d{10}$/.test(nni)) errs.nni = "NNI invalide (10 chiffres exactement)";
    if (!dateNaissance) errs.dateNaissance = "Date de naissance requise";
    if (!telephone || !/^\d{8,}$/.test(telephone)) errs.telephone = "Téléphone invalide";
    if (membres.find(m => m.nni === nni)) errs.nni = "Ce NNI existe déjà !";
    setErreurs(errs);
    return Object.keys(errs).length === 0;
  };

  const validerEtape2 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!wilaya) errs.wilaya = "Sélectionnez une wilaya";
    if (!moughataa) errs.moughataa = "Sélectionnez une moughataa";
    if (!commune.trim()) errs.commune = "Commune requise";
    if (!quartierVillage.trim()) errs.quartierVillage = "Quartier/Village requis";
    setErreurs(errs);
    return Object.keys(errs).length === 0;
  };

  const validerEtape3 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!modePaiement) errs.modePaiement = "Choisissez un mode de paiement";
    setErreurs(errs);
    return Object.keys(errs).length === 0;
  };

  const soumettre = () => {
    if (!validerEtape3()) return;
    const nouveauMembre: Membre = {
      id: Date.now().toString(),
      nomPrenom: nomPrenom.trim(),
      nni,
      dateNaissance,
      telephone,
      wilaya,
      moughataa,
      commune: commune.trim(),
      quartierVillage: quartierVillage.trim(),
      modePaiement,
      dateCreation: new Date().toLocaleDateString("fr-FR"),
      statut: "VALIDÉ"
    };
    sauvegarderMembres([...membres, nouveauMembre]);
    setConfirmation(true);
    setTimeout(() => {
      setConfirmation(false);
      setEtape(1);
      setNomPrenom(""); setNni(""); setDateNaissance(""); setTelephone("");
      setWilaya(""); setMoughataa(""); setCommune(""); setQuartierVillage("");
      setModePaiement(""); setErreurs({});
    }, 3000);
  };

  const styleInput = "w-full border border-gray-300 rounded-lg p-3 text-base";
  const styleLabel = "block text-sm font-medium mb-1 text-gray-700";
  const styleErreur = "text-red-500 text-xs mt-1";
  const styleBtnPrincipal = "w-full bg-[#0047AB] text-white py-3 rounded-lg font-bold text-lg";
  const styleBtnSecondaire = "flex-1 bg-gray-200 text-black py-3 rounded-lg font-bold";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", fontFamily: "Arial, sans-serif" }}>
      
      <nav style={{ backgroundColor: "#0047AB", padding: "15px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontWeight: "bold", fontSize: 18 }}>FRUD-Espoir</div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setPage("accueil")} style={{ background: page === "accueil" ? "rgba(255,255,255,0.3)" : "transparent", color: "white", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
            🏠
          </button>
          <button onClick={() => { setPage("enrolement"); setEtape(1); }} style={{ background: page === "enrolement" ? "rgba(255,255,255,0.3)" : "transparent", color: "white", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
            ➕
          </button>
          <button onClick={() => setPage("liste")} style={{ background: page === "liste" ? "rgba(255,255,255,0.3)" : "transparent", color: "white", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer", fontSize: 13 }}>
            📋 ({membres.length})
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
        
        {page === "accueil" && (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ width: 100, height: 100, backgroundColor: "#0047AB", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 40, fontWeight: "bold" }}>FRUD</span>
            </div>
            <h1 style={{ color: "#0047AB", fontSize: 24, marginBottom: 5 }}>FRUD - Espoir Mauritanie</h1>
            <p style={{ color: "#666", marginBottom: 10, fontSize: 14 }}>الجبهة الجمهورية للوحدة والديمقراطية</p>
            <p style={{ color: "#999", marginBottom: 30, fontSize: 13 }}>Front Républicain pour l'Unité et la Démocratie</p>
            <button onClick={() => { setPage("enrolement"); setEtape(1); }} style={{ ...styleBtnPrincipal, width: "100%", marginBottom: 10, fontSize: 18 }}>
              ➕ Nouvel enrôlement
            </button>
            <button onClick={() => setPage("liste")} style={{ ...styleBtnSecondaire, width: "100%", background: "white", border: "2px solid #0047AB", color: "#0047AB", fontSize: 16 }}>
              📋 Voir la liste ({membres.length} membres)
            </button>
          </div>
        )}

        {page === "enrolement" && !confirmation && (
          <div>
            <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
              {[1, 2, 3].map(num => (
                <div key={num} style={{ height: 4, flex: 1, borderRadius: 4, background: num <= etape ? "#0047AB" : "#ddd", transition: "background 0.3s" }} />
              ))}
            </div>
            <h2 style={{ color: "#0047AB", fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
              {etape === 1 && "Étape 1/3 : Identité"}
              {etape === 2 && "Étape 2/3 : Localisation"}
              {etape === 3 && "Étape 3/3 : Paiement"}
            </h2>

            {etape === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <div>
                  <label style={styleLabel}>Nom & Prénom (الاسم واللقب)</label>
                  <input value={nomPrenom} onChange={e => setNomPrenom(e.target.value)} className={styleInput} placeholder="Entrez le nom complet" />
                  {erreurs.nomPrenom && <p style={styleErreur}>{erreurs.nomPrenom}</p>}
                </div>
                <div>
                  <label style={styleLabel}>NNI (رقم CIN) - 10 chiffres</label>
                  <input value={nni} onChange={e => setNni(e.target.value.replace(/\D/g, "").slice(0, 10))} className={styleInput} placeholder="1234567890" inputMode="numeric" maxLength={10} />
                  {erreurs.nni && <p style={styleErreur}>{erreurs.nni}</p>}
                </div>
                <div>
                  <label style={styleLabel}>Date de naissance</label>
                  <input type="date" value={dateNaissance} onChange={e => setDateNaissance(e.target.value)} className={styleInput} />
                  {erreurs.dateNaissance && <p style={styleErreur}>{erreurs.dateNaissance}</p>}
                </div>
                <div>
                  <label style={styleLabel}>Téléphone</label>
                  <input value={telephone} onChange={e => setTelephone(e.target.value.replace(/\D/g, "").slice(0, 8))} className={styleInput} placeholder="Numéro de téléphone" inputMode="tel" />
                  {erreurs.telephone && <p style={styleErreur}>{erreurs.telephone}</p>}
                </div>
                <button onClick={() => validerEtape1() && setEtape(2)} style={styleBtnPrincipal}>
                  Suivant → Localisation
                </button>
              </div>
            )}

            {etape === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <div>
                  <label style={styleLabel}>Wilaya (ولاية)</label>
                  <select value={wilaya} onChange={e => { setWilaya(e.target.value); setMoughataa(""); }} style={{ ...styleInput, background: "white" }}>
                    <option value="">Sélectionnez...</option>
                    {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                  {erreurs.wilaya && <p style={styleErreur}>{erreurs.wilaya}</p>}
                </div>
                <div>
                  <label style={styleLabel}>Moughataa (مقاطعة)</label>
                  <select value={moughataa} onChange={e => setMoughataa(e.target.value)} style={{ ...styleInput, background: "white" }} disabled={!wilaya}>
                    <option value="">Sélectionnez...</option>
                    {wilaya && MOUGHATAAS[wilaya]?.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  {erreurs.moughataa && <p style={styleErreur}>{erreurs.moughataa}</p>}
                </div>
                <div>
                  <label style={styleLabel}>Commune (بلدية)</label>
                  <input value={commune} onChange={e => setCommune(e.target.value)} className={styleInput} placeholder="Nom de la commune" />
                  {erreurs.commune && <p style={styleErreur}>{erreurs.commune}</p>}
                </div>
                <div>
                  <label style={styleLabel}>Quartier / Village (الحي/القرية)</label>
                  <input value={quartierVillage} onChange={e => setQuartierVillage(e.target.value)} className={styleInput} placeholder="Quartier ou village" />
                  {erreurs.quartierVillage && <p style={styleErreur}>{erreurs.quartierVillage}</p>}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setEtape(1)} style={styleBtnSecondaire}>← Retour</button>
                  <button onClick={() => validerEtape2() && setEtape(3)} style={styleBtnPrincipal}>Suivant → Paiement</button>
                </div>
              </div>
            )}

            {etape === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <label style={{ ...styleLabel, fontSize: 16, fontWeight: "bold" }}>Mode de paiement</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <label onClick={() => setModePaiement("BANKILY")} style={{ display: "flex", alignItems: "center", gap: 12, padding: 15, border: modePaiement === "BANKILY" ? "2px solid #0047AB" : "2px solid #ddd", borderRadius: 10, cursor: "pointer", background: modePaiement === "BANKILY" ? "#f0f4ff" : "white" }}>
                    <input type="radio" checked={modePaiement === "BANKILY"} onChange={() => setModePaiement("BANKILY")} style={{ width: 18, height: 18, accentColor: "#0047AB" }} />
                    <span style={{ fontWeight: "bold", fontSize: 16 }}>BANKILY</span>
                  </label>
                  <label onClick={() => setModePaiement("MASRVI")} style={{ display: "flex", alignItems: "center", gap: 12, padding: 15, border: modePaiement === "MASRVI" ? "2px solid #0047AB" : "2px solid #ddd", borderRadius: 10, cursor: "pointer", background: modePaiement === "MASRVI" ? "#f0f4ff" : "white" }}>
                    <input type="radio" checked={modePaiement === "MASRVI"} onChange={() => setModePaiement("MASRVI")} style={{ width: 18, height: 18, accentColor: "#0047AB" }} />
                    <span style={{ fontWeight: "bold", fontSize: 16 }}>MASRVI</span>
                  </label>
                </div>
                {erreurs.modePaiement && <p style={styleErreur}>{erreurs.modePaiement}</p>}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setEtape(2)} style={styleBtnSecondaire}>← Retour</button>
                  <button onClick={soumettre} style={{ ...styleBtnPrincipal, background: "#22c55e" }}>
                    ✅ Valider l'enrôlement
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {confirmation && (
          <div style={{ textAlign: "center", paddingTop: 40 }}>
            <div style={{ width: 80, height: 80, backgroundColor: "#22c55e", borderRadius: "50%", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 40 }}>✓</span>
            </div>
            <h2 style={{ color: "#22c55e", fontSize: 22, marginBottom: 10 }}>Enrôlement réussi !</h2>
            <p style={{ color: "#666" }}>{nomPrenom} a été enregistré.</p>
          </div>
        )}

        {page === "liste" && (
          <div>
            <h2 style={{ color: "#0047AB", fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
              📋 Membres enrôlés ({membres.length})
            </h2>
            {membres.length === 0 ? (
              <p style={{ color: "#999", textAlign: "center", padding: 40 }}>Aucun membre pour le moment.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {membres.map(m => (
                  <div key={m.id} style={{ background: "white", padding: 15, borderRadius: 10, border: "1px solid #eee" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <strong style={{ color: "#0047AB", fontSize: 16 }}>{m.nomPrenom}</strong>
                      <span style={{ background: "#dcfce7", color: "#16a34a", padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: "bold" }}>
                        {m.statut}
                      </span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, fontSize: 13, color: "#666" }}>
                      <span>NNI : {m.nni}</span>
                      <span>Né(e) : {m.dateNaissance}</span>
                      <span>Wilaya : {m.wilaya}</span>
                      <span>Moughataa : {m.moughataa}</span>
                      <span>Tél : {m.telephone}</span>
                      <span>Paiement : {m.modePaiement}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => { setPage("enrolement"); setEtape(1); }} style={{ ...styleBtnPrincipal, marginTop: 20 }}>
              ➕ Nouvel enrôlement
            </button>
          </div>
        )}
      </div>

      <footer style={{ textAlign: "center", padding: 20, color: "#999", fontSize: 12 }}>
        © FRUD-Espoir Mauritanie - الجبهة الجمهورية للوحدة والديمقراطية
      </footer>
    </div>
  );
  }
