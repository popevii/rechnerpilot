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

/**
 * Berechnet Lohnsteuer (Näherung) nach Steuerklasse
 * @param {number} brutto - Monatliches Bruttogehalt
 * @param {number} klasse - Steuerklasse 1-6
 * @returns {number} Monatliche Lohnsteuer
 */
function berechneLohnsteuer(brutto, klasse) {
  const G = STEUER_2026;
  const bruttoPJ = brutto * 12;

  let zvE; // zu versteuerndes Einkommen (vereinfacht)

  if (klasse === 3) {
    // Klasse III: doppelter Grundfreibetrag, günstigere Besteuerung
    zvE = Math.max(0, bruttoPJ - G.grundfreibetrag * 2);
  } else if (klasse === 2) {
    // Klasse II: Entlastungsbetrag für Alleinerziehende (~4260€ 2026)
    zvE = Math.max(0, bruttoPJ - G.grundfreibetrag - 4260);
  } else {
    zvE = Math.max(0, bruttoPJ - G.grundfreibetrag);
  }

  // Steuersatz berechnen (Progressionskurve vereinfacht)
  let steuersatz = 0;
  if (zvE <= 0) {
    steuersatz = 0;
  } else if (zvE <= G.zone1_bis - G.grundfreibetrag) {
    // Progressionszone 1: 14% → 23,97%
    const anteil = zvE / (G.zone1_bis - G.grundfreibetrag);
    steuersatz = 0.14 + anteil * (0.2397 - 0.14);
  } else if (zvE <= G.zone2_bis - G.grundfreibetrag) {
    // Progressionszone 2: 23,97% → 42%
    const anteil = (zvE - (G.zone1_bis - G.grundfreibetrag)) / (G.zone2_bis - G.zone1_bis);
    steuersatz = 0.2397 + anteil * (0.42 - 0.2397);
  } else if (zvE <= G.reichensteuer_ab - G.grundfreibetrag) {
    steuersatz = G.spitzensteuersatz;
  } else {
    steuersatz = G.reichensteuer;
  }

  // Klasse III: günstigere Besteuerung durch Splitting-Effekt
  if (klasse === 3) steuersatz *= 0.68;
  // Klasse V: deutlich höhere Besteuerung
  if (klasse === 5) steuersatz = Math.min(steuersatz * 1.85, 0.42);
  // Klasse VI: höchste Besteuerung
  if (klasse === 6) steuersatz = Math.min(steuersatz * 2.1, 0.45);

  return Math.max(0, zvE * steuersatz) / 12;
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
function bruttoNetto(brutto, klasse = 1, kirchensteuer = false, kvZusatz = 1.45, kinderlos = true) {
  const G = STEUER_2026;

  // Steuer
  const lohnsteuer = berechneLohnsteuer(brutto, klasse);
  const soli = berechneSoli(lohnsteuer);
  const kirche = kirchensteuer ? lohnsteuer * 0.09 : 0; // Ø 9%

  // Sozialabgaben (auf Bruttogehalt, max. Beitragsbemessungsgrenze)
  const bruttoKV  = Math.min(brutto, G.bbgKV);
  const bruttoRV  = Math.min(brutto, G.bbgRV);

  const rv  = bruttoRV  * G.rv;
  const alv = bruttoRV  * G.alv;
  const kv  = bruttoKV  * G.kv;
  const kvZ = bruttoKV  * (kvZusatz / 100);
  const pv  = bruttoKV  * (kinderlos ? G.pvOhneKinder : G.pvMitKind);

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
