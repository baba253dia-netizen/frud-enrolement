// Liste complète des 15 wilayas de Mauritanie avec leurs moughataas
export const wilayasMauritanie = [
  {
    nom: "Nouakchott",
    arabe: "نواكشوط",
    moughataas: ["Tevragh Zeina", "Ksar", "Teyarett", "Arafat", "El Mina", "Dar Naim", "Riyad", "El Moughataa", "Toujounine"]
  },
  {
    nom: "Nouadhibou",
    arabe: "نواذيبو",
    moughataas: ["Nouadhibou Centre", "Cansado", "Boulenoir"]
  },
  {
    nom: "Rosso",
    arabe: "روصو",
    moughataas: ["Rosso Centre", "Jidrel Mohguen", "Keir Macène"]
  },
  {
    nom: "Kaédi",
    arabe: "كيهيدي",
    moughataas: ["Kaédi Centre", "Ganki", "Lexeiba"]
  },
  {
    nom: "Atar",
    arabe: "أطار",
    moughataas: ["Atar Centre", "Chinguetti", "Ouadane"]
  },
  {
    nom: "Zouerate",
    arabe: "الزويرات",
    moughataas: ["Zouerate Centre", "F'Derick", "Bir Moghrein"]
  },
  {
    nom: "Néma",
    arabe: "النعمة",
    moughataas: ["Néma Centre", "Amourj", "Bassiknou"]
  },
  {
    nom: "Aleg",
    arabe: "ألاك",
    moughataas: ["Aleg Centre", "Boghé", "Bababé"]
  },
  {
    nom: "Tidjikja",
    arabe: "تجكجة",
    moughataas: ["Tidjikja Centre", "Moudjéria", "Tichitt"]
  },
  {
    nom: "Sélibaby",
    arabe: "سيلبابي",
    moughataas: ["Sélibaby Centre", "Ould Yengé", "Ghabou"]
  },
  {
    nom: "Aoujeft",
    arabe: "أوجفت",
    moughataas: ["Aoujeft Centre", "Maaden", "Nbeika"]
  },
  {
    nom: "Boutilimit",
    arabe: "بوتلميت",
    moughataas: ["Boutilimit Centre", "Aleg", "Mbagne"]
  },
  {
    nom: "Akjoujt",
    arabe: "أكجوجت",
    moughataas: ["Akjoujt Centre", "Benichab"]
  },
  {
    nom: "Mederdra",
    arabe: "المذرذرة",
    moughataas: ["Mederdra Centre", "Tiguent", "Rkiz"]
  },
  {
    nom: "Chami",
    arabe: "الشامي",
    moughataas: ["Chami Centre", "Tenhemad", "Nouamghar"]
  }
];

export function getMoughataasByWilaya(wilaya: string): string[] {
  const found = wilayasMauritanie.find(w => w.nom === wilaya);
  return found ? found.moughataas : [];
}

export function getAllWilayas(): string[] {
  return wilayasMauritanie.map(w => w.nom);
}
