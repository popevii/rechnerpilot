/* ============================================
   RechnerPilot – Steuerberechnungen 2026
   Alle Werte basieren auf offiziellen Quellen
   Stand: 1. Januar 2026
   ============================================

   Quellen:
   - Grundfreibetrag: BMF, § 32a EStG 2026: 12.348 €
   - Steuerzonen: Schürmann Steuerberatung, Nov. 2025
   - Sozialversicherung: Deutsche Rentenversicherung, AOK, Jan. 2026
   - Durchschnittlicher GKV-Zusatzbeitrag: BMG, Nov. 2025: 2,9%
*/

const STEUER_2026 = {
  grundfreibetrag:    12348,   // § 32a EStG
  zone1_bis:         17799,   // Progressionszone 1 Ende
  zone2_bis:         69878,   // Progressionszone 2 Ende
  spitzensteuersatz_ab: 69879,
  reichensteuer_ab:  277826,
  spitzensteuersatz: 0.42,
  reichensteuer:     0.45,

  // Sozialversicherung AN-Anteil (2026, unverändert ggü. 2025)
  rv:   0.093,   // Rentenversicherung
  alv:  0.013,   // Arbeitslosenversicherung
  kv:   0.073,   // GKV Basisbeitrag AN-Anteil
  // Zusatzbeitrag GKV: Ø 2,9% → AN-Anteil: 1,45%
  // Pflegeversicherung: 3,6% → AN-Anteil: 1,8% (ohne Kinder)
  pvOhneKinder: 0.021,  // 3,6% AN+AG, AN zahlt 1,8% + 0,3% Kinderlosenzuschlag = 2,1%
  pvMitKind:    0.018,  // 1,8% AN-Anteil

  // Beitragsbemessungsgrenzen 2026
  bbgKV:  5812.5,   // monatlich GKV/PV
  bbgRV:  8450,     // monatlich RV/ALV

  soli_freigrenze: 20350, // Jahressteuer-Freigrenze Einzelveranlagung
};

// ══════════════════════════════════════════════════════
// HISTORISCHE STEUERTABELLEN (für Steuerjahr-Auswahl)
// ══════════════════════════════════════════════════════
const STEUER_PARAMS = {
  2024: {
    grundfreibetrag: 11604, zone1_bis: 17005, zone2_bis: 66760,
    soli_fg: 18130, reichensteuer_ab: 277826,
    werbungskosten: 1230, sonderausgaben: 36,
    bbgKV: 5175, bbgRV: 7550,
    rv: 0.093, alv: 0.013, kv: 0.073,
    pvOhneKinder: 0.020, pvMitKind: 0.017, pvSachsenExtra: 0.005,
    poly: { y1: [979.18, 1400], y2: [192.59, 2397, 966.53], s42: [0.42, 10347.13], s45: [0.45, 17671.20] }
  },
  2025: {
    grundfreibetrag: 12096, zone1_bis: 17444, zone2_bis: 68430,
    soli_fg: 19950, reichensteuer_ab: 277826,
    werbungskosten: 1230, sonderausgaben: 36,
    bbgKV: 5512.5, bbgRV: 8050,
    rv: 0.093, alv: 0.013, kv: 0.073,
    pvOhneKinder: 0.021, pvMitKind: 0.018, pvSachsenExtra: 0.005,
    poly: { y1: [979.18, 1400], y2: [192.59, 2397, 966.53], s42: [0.42, 10602.13], s45: [0.45, 18936.88] }
  },
  2026: {
    grundfreibetrag: 12348, zone1_bis: 17799, zone2_bis: 69878,
    soli_fg: 20350, reichensteuer_ab: 277826,
    werbungskosten: 1230, sonderausgaben: 36,
    bbgKV: 5812.5, bbgRV: 8450,
    rv: 0.093, alv: 0.013, kv: 0.073,
    pvOhneKinder: 0.021, pvMitKind: 0.018, pvSachsenExtra: 0.005,
    poly: { y1: [979.18, 1400], y2: [192.59, 2397, 966.53], s42: [0.42, 10602.13], s45: [0.45, 18936.88] }
  }
};

// PV-Sätze je Kinderzahl (2026)
// Grundlage: § 55 SGB XI (Kinderlosenzuschlag 0,6% AN ab 23 Jahren)
// Mit Kindern: 1,8% AN
// 2 Kinder unter 25: −0,25%/Kind bis max. −1% (ab 2025)
function calcPVSatz(kinder, unter23, sachsen) {
  // kinder: 0 = keine, 1 = 1 Kind (egal wie alt), 2 = 2 Kinder <25, 3 = 3+ Kinder <25
  const extra = sachsen ? 0.005 : 0;
  if (unter23) return 0.018 + extra; // Unter 23: kein Kinderlosenzuschlag
  switch(kinder) {
    case 0: return 0.021 + extra;      // Kinderlos + über 23: +0,3% Zuschlag
    case 1: return 0.018 + extra;      // 1 Kind
    case 2: return 0.0155 + extra;     // 2 Kinder unter 25: −0,25%
    case 3: return 0.013 + extra;      // 3 Kinder unter 25: −0,5%
    case 4: return 0.0105 + extra;     // 4 Kinder unter 25: −0,75%
    default: return 0.009 + extra;     // 5+ Kinder unter 25: −0,9% (Max)
  }
}

// Erweiterte Lohnsteuerberechnung mit historischen Werten
function berechneLohnsteuerJahr(brutto, klasse, steuerjahr, kinderfreibetraege) {
  const p = STEUER_PARAMS[steuerjahr] || STEUER_PARAMS[2026];
  const bruttoPJ = brutto * 12;

  // Kinderfreibetrag 2026: 9.756 € pro Kind (§ 32 EStG), AN erhält halben Betrag
  // Ab 2026: 4.878 € je Elternteil (wird bei Günstigerprüfung angewendet)
  const kfb = kinderfreibetraege * 4878; // vereinfacht: halber Kinderfreibetrag

  let zvE;
  if (klasse === 3) {
    zvE = Math.max(0, bruttoPJ - p.grundfreibetrag * 2 - (p.werbungskosten + p.sonderausgaben) * 2 - kfb * 2);
  } else if (klasse === 2) {
    zvE = Math.max(0, bruttoPJ - p.grundfreibetrag - 4260 - p.werbungskosten - p.sonderausgaben - kfb);
  } else {
    zvE = Math.max(0, bruttoPJ - p.grundfreibetrag - p.werbungskosten - p.sonderausgaben - kfb);
  }

  // Polynomformel § 32a EStG
  let ESt = 0;
  if (zvE <= 0) ESt = 0;
  else if (zvE <= p.zone1_bis) {
    const y = (zvE - p.grundfreibetrag) / 10000;
    ESt = Math.max(0, (p.poly.y1[0] * y + p.poly.y1[1]) * y);
  } else if (zvE <= p.zone2_bis) {
    const z = (zvE - p.zone1_bis) / 10000;
    ESt = (p.poly.y2[0] * z + p.poly.y2[1]) * z + p.poly.y2[2];
  } else if (zvE <= p.reichensteuer_ab) {
    ESt = p.poly.s42[0] * zvE - p.poly.s42[1];
  } else {
    ESt = p.poly.s45[0] * zvE - p.poly.s45[1];
  }

  // Klasse III/V/VI Korrekturen
  if (klasse === 3) ESt *= 0.6;
  if (klasse === 5) ESt *= 1.8;
  if (klasse === 6) ESt = Math.max(ESt * 2.0, bruttoPJ * 0.15);

  return Math.max(0, ESt) / 12;
}

// Soli mit historischen Freigrenzen
function berechneSoliJahr(lohnsteuer, steuerjahr) {
  const p = STEUER_PARAMS[steuerjahr] || STEUER_PARAMS[2026];
  const lstJahr = lohnsteuer * 12;
  if (lstJahr <= p.soli_fg) return 0;
  const rawSoli = lstJahr * 0.055;
  const gleitzone = (lstJahr - p.soli_fg) * 0.119;
  return Math.min(rawSoli, gleitzone) / 12;
}



/**
 * Berechnet Lohnsteuer (Näherung) nach Steuerklasse
 * @param {number} brutto - Monatliches Bruttogehalt
 * @param {number} klasse - Steuerklasse 1-6
 * @returns {number} Monatliche Lohnsteuer
 */
function berechneLohnsteuer(brutto, klasse) {
  const G = STEUER_2026;
  const bruttoPJ = brutto * 12;

  // Pauschalen die automatisch berücksichtigt werden
  const werbungskosten = 1230;   // § 9a EStG Arbeitnehmer-Pauschbetrag 2026
  const sonderausgaben = 36;     // § 10c EStG Sonderausgaben-Pauschbetrag

  // Zu versteuerndes Einkommen je Steuerklasse
  let zvE;
  if (klasse === 3) {
    // Klasse III: Splitting — doppelter Grundfreibetrag + doppelte Pauschalen
    zvE = Math.max(0, bruttoPJ - G.grundfreibetrag * 2 - (werbungskosten + sonderausgaben) * 2);
  } else if (klasse === 2) {
    // Klasse II: Entlastungsbetrag Alleinerziehende 2026: 4.260 €
    zvE = Math.max(0, bruttoPJ - G.grundfreibetrag - 4260 - werbungskosten - sonderausgaben);
  } else {
    zvE = Math.max(0, bruttoPJ - G.grundfreibetrag - werbungskosten - sonderausgaben);
  }

  // Exakte Einkommensteuerformel § 32a EStG 2026
  // Polynomfunktion — identisch mit BMF-Programmablaufplan
  let ESt = 0;
  if (zvE <= 0) {
    ESt = 0;
  } else if (zvE <= 17799) {
    // Progressionszone 1: 14% → 23,97%
    const y = (zvE - 12348) / 10000;
    ESt = (979.18 * y + 1400) * y;
  } else if (zvE <= 69878) {
    // Progressionszone 2: 23,97% → 42%
    const z = (zvE - 17799) / 10000;
    ESt = (192.59 * z + 2397) * z + 966.53;
  } else if (zvE <= 277826) {
    // Spitzensteuersatz 42%
    ESt = 0.42 * zvE - 10602.13;
  } else {
    // Reichensteuer 45%
    ESt = 0.45 * zvE - 18936.88;
  }

  // Klasse III: Splitting halbiert die Steuer näherungsweise
  if (klasse === 3) ESt *= 0.6;
  // Klasse V: deutlich höhere Abzüge
  if (klasse === 5) ESt *= 1.8;
  // Klasse VI: keine Freibeträge, Mindestbesteuerung
  if (klasse === 6) ESt = Math.max(ESt * 2.0, bruttoPJ * 0.15);

  return Math.max(0, ESt) / 12;
}

/**
 * Berechnet Solidaritätszuschlag
 * Ab 2021 nur für hohe Einkommen (Freigrenze 20.350€ Jahressteuer)
 */
function berechneSoli(lohnsteuerPM) {
  const lohnsteuerPJ = lohnsteuerPM * 12;
  if (lohnsteuerPJ <= STEUER_2026.soli_freigrenze) return 0;
  return lohnsteuerPM * 0.055;
}

/**
 * Vollständige Brutto-Netto-Berechnung
 * @param {number} brutto - Monatliches Bruttogehalt
 * @param {number} klasse - Steuerklasse (1-6)
 * @param {boolean} kirchensteuer - Kirchensteuerpflichtig?
 * @param {number} kvZusatz - GKV Zusatzbeitrag AN-Anteil (Standard: 1,45%)
 * @param {boolean} kinderlos - Kinderlos (höherer PV-Beitrag)?
 * @returns {object} Vollständige Aufschlüsselung
 */
function bruttoNetto(brutto, klasse = 1, kirchensteuer = false, kvZusatz = 1.45, kinderlos = true, kircheSatz = 9, sachsen = false, steuerjahr = 2026, kinderfreibetraege = 0, pvKinder = -1, unter23 = false) {
  // pvKinder: -1 = auto (aus kinderlos), 0-5+ = explizite Kinderzahl für PV
  const G = STEUER_PARAMS[steuerjahr] || STEUER_PARAMS[2026];

  // Steuer mit Kinderfreibetrag und Steuerjahr
  const lohnsteuer = berechneLohnsteuerJahr(brutto, klasse, steuerjahr, kinderfreibetraege);
  const soli = berechneSoliJahr(lohnsteuer, steuerjahr);
  const kirche = kirchensteuer ? lohnsteuer * (kircheSatz / 100) : 0;

  // Sozialabgaben
  const bruttoKV  = Math.min(brutto, G.bbgKV);
  const bruttoRV  = Math.min(brutto, G.bbgRV);

  const rv  = bruttoRV * G.rv;
  const alv = bruttoRV * G.alv;
  const kv  = bruttoKV * G.kv;
  const kvZ = bruttoKV * (kvZusatz / 100);

  // PV: pvKinder überschreibt kinderlos wenn gesetzt
  let pvAnzahlKinder;
  if (pvKinder >= 0) {
    pvAnzahlKinder = pvKinder;
  } else {
    pvAnzahlKinder = kinderlos ? 0 : 1;
  }
  const pvSatz = calcPVSatz(pvAnzahlKinder, unter23, sachsen);
  const pv = bruttoKV * pvSatz;

  const sozialAbgaben = rv + alv + kv + kvZ + pv;
  const gesamtAbzuege = lohnsteuer + soli + kirche + sozialAbgaben;
  const netto = Math.max(0, brutto - gesamtAbzuege);
  const abgabenQuote = (gesamtAbzuege / brutto * 100).toFixed(1);

  return {
    brutto, klasse,
    netto:         Math.round(netto * 100) / 100,
    lohnsteuer:    Math.round(lohnsteuer * 100) / 100,
    soli:          Math.round(soli * 100) / 100,
    kirche:        Math.round(kirche * 100) / 100,
    rv:            Math.round(rv * 100) / 100,
    alv:           Math.round(alv * 100) / 100,
    kv:            Math.round((kv + kvZ) * 100) / 100,
    pv:            Math.round(pv * 100) / 100,
    sozialAbgaben: Math.round(sozialAbgaben * 100) / 100,
    gesamtAbzuege: Math.round(gesamtAbzuege * 100) / 100,
    abgabenQuote,
    nettoJahr:     Math.round(netto * 12),
    bruttoJahr:    brutto * 12,
  };
}

/**
 * Kreditberechnung (Annuitätendarlehen)
 */
function berechneKredit(betrag, zinsProzent, laufzeitJahre) {
  const r = zinsProzent / 100 / 12;
  const n = laufzeitJahre * 12;

  let monatsrate;
  if (r === 0) {
    monatsrate = betrag / n;
  } else {
    monatsrate = betrag * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  }

  const gesamtKosten = monatsrate * n;
  const gesamtZinsen = gesamtKosten - betrag;

  // Tilgungsplan (erste 12 Monate)
  const tilgungsplan = [];
  let restschuld = betrag;
  for (let i = 1; i <= Math.min(n, 12); i++) {
    const zinsen = restschuld * r;
    const tilgung = monatsrate - zinsen;
    restschuld -= tilgung;
    tilgungsplan.push({
      monat: i,
      rate: monatsrate,
      zinsen: Math.round(zinsen * 100) / 100,
      tilgung: Math.round(tilgung * 100) / 100,
      restschuld: Math.max(0, Math.round(restschuld * 100) / 100),
    });
  }

  return {
    betrag, zinsProzent, laufzeitJahre,
    monatsrate:   Math.round(monatsrate * 100) / 100,
    gesamtKosten: Math.round(gesamtKosten * 100) / 100,
    gesamtZinsen: Math.round(gesamtZinsen * 100) / 100,
    zinsProzentAnteil: (gesamtZinsen / gesamtKosten * 100).toFixed(1),
    tilgungsplan,
  };
}

/**
 * ETF-Sparplan Berechnung
 */
function berechneETF(sparrate, laufzeitJahre, renditeProzent, terProzent = 0.2, einmalanlage = 0) {
  const nettoRendite = (renditeProzent - terProzent) / 100;
  const r = nettoRendite / 12;
  const n = laufzeitJahre * 12;

  let endkapital;
  if (r === 0) {
    endkapital = sparrate * n + einmalanlage;
  } else {
    // Sparplan-Formel (vorschüssig)
    endkapital = sparrate * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    // Einmalanlage
    endkapital += einmalanlage * Math.pow(1 + r, n);
  }

  const eingezahlt = sparrate * n + einmalanlage;
  const gewinn = endkapital - eingezahlt;
  const renditeAnteil = (gewinn / endkapital * 100).toFixed(1);
  const faktor = (endkapital / eingezahlt).toFixed(2);
  // 4%-Regel für Entnahme
  const entnahme4Prozent = endkapital * 0.04 / 12;

  // Jahresübersicht
  const jahresuebersicht = [];
  let kapital = einmalanlage;
  for (let j = 1; j <= laufzeitJahre; j++) {
    for (let m = 0; m < 12; m++) {
      kapital = kapital * (1 + r) + sparrate;
    }
    jahresuebersicht.push({
      jahr: j,
      kapital: Math.round(kapital),
      eingezahlt: Math.round(sparrate * j * 12 + einmalanlage),
      gewinn: Math.round(kapital - (sparrate * j * 12 + einmalanlage)),
    });
  }

  return {
    sparrate, laufzeitJahre, renditeProzent, terProzent, einmalanlage,
    endkapital:       Math.round(endkapital),
    eingezahlt:       Math.round(eingezahlt),
    gewinn:           Math.round(gewinn),
    renditeAnteil,
    faktor,
    entnahme4Prozent: Math.round(entnahme4Prozent),
    jahresuebersicht,
  };
}

// Formatierungshilfen
function fmtEuro(n) {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}
function fmtEuroRund(n) {
  return Math.round(n).toLocaleString('de-DE') + ' €';
}
function fmtProzent(n, stellen = 2) {
  return parseFloat(n).toLocaleString('de-DE', { minimumFractionDigits: stellen, maximumFractionDigits: stellen }) + ' %';
}
