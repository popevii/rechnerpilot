/* ============================================
   RechnerPilot – Shared Components v3
   Nav: Start | Alle Rechner | Gehalt & Steuern | 
        Geldanlage | Altersvorsorge | Kredite | Sparen & Zinsen
   ============================================ */

const SITE = {
  name: 'RechnerPilot',
  url: 'https://www.rechnerpilot.de',
  year: new Date().getFullYear(),
};

function renderNav(activePage = '') {
  const base = 'https://www.rechnerpilot.de';
  const isActive = (page) => activePage === page ? 'active' : '';
  const isGrpActive = (pages) => pages.some(p => activePage === p) ? 'active' : '';

  return `
  <nav>
    <a href="${base}/" class="logo">
      <div class="logo-icon">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <polyline points="2,15 7,9 11,12 18,4" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="14,4 18,4 18,8" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="logo-wordmark">RechnerPilot</span>
    </a>

    <ul class="nav-links">

      <!-- ALLE RECHNER -->
      <li>
        <a href="${base}/alle-rechner" class="nav-direct ${isActive('alle-rechner')}">Alle Rechner</a>
      </li>

      <!-- GEHALT & STEUERN -->
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isGrpActive(['brutto','gehaltserhöhung','kk','abgeltung'])}">
          Gehalt & Steuern <span class="nav-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Gehalt</div>
            <a href="${base}/brutto-netto-rechner" class="${isActive('brutto')}">
              <span class="nav-item-icon">💼</span>
              <span><strong>Brutto-Netto-Rechner</strong><small>Nettogehalt berechnen</small></span>
            </a>
            <a href="${base}/gehaltserhöhung-rechner" class="${isActive('gehaltserhöhung')}">
              <span class="nav-item-icon">📊</span>
              <span><strong>Gehaltserhöhung Rechner</strong><small>Wie viel Netto bleibt?</small></span>
            </a>
            <a href="${base}/krankenkassenrechner" class="${isActive('kk')}">
              <span class="nav-item-icon">🏥</span>
              <span><strong>Krankenkassen-Rechner</strong><small>GKV-Beitrag vergleichen</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Steuern</div>
            <a href="${base}/abgeltungssteuer-rechner" class="${isActive('abgeltung')}">
              <span class="nav-item-icon">💶</span>
              <span><strong>Abgeltungssteuer</strong><small>Kapitalertragsteuer berechnen</small></span>
            </a>
          </div>
        </div>
      </li>

      <!-- GELDANLAGE -->
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isGrpActive(['etf','etf-tools','inflation'])}">
          Geldanlage <span class="nav-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">ETF & Aktien</div>
            <a href="${base}/etf-sparplan-rechner" class="${isActive('etf')}">
              <span class="nav-item-icon">📈</span>
              <span><strong>ETF Sparplan Rechner</strong><small>Rendite & Endkapital</small></span>
            </a>
            <a href="${base}/etf-rechner" class="${isActive('etf-tools')}">
              <span class="nav-item-icon">🔬</span>
              <span><strong>ETF Tools</strong><small>Vorabpauschale, Kosten, Wechsel</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Weitere Tools</div>
            <a href="${base}/inflationsrechner" class="${isActive('inflation')}">
              <span class="nav-item-icon">📉</span>
              <span><strong>Inflationsrechner</strong><small>Kaufkraft & Realrendite</small></span>
            </a>
          </div>
        </div>
      </li>

      <!-- ALTERSVORSORGE -->
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isGrpActive(['altersvorsorge','entnahme'])}">
          Altersvorsorge <span class="nav-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Rente & Vorsorge</div>
            <a href="${base}/altersvorsorge-rechner" class="${isActive('altersvorsorge')}">
              <span class="nav-item-icon">🏛️</span>
              <span><strong>Rentenlücken-Rechner</strong><small>Rentenlücke berechnen</small></span>
            </a>
            <a href="${base}/altersvorsorge-rechner#ruerup" class="${isActive('altersvorsorge')}">
              <span class="nav-item-icon">📊</span>
              <span><strong>Rürup / Basisrente</strong><small>Steuerersparnis berechnen</small></span>
            </a>
            <a href="${base}/altersvorsorge-rechner#riester" class="${isActive('altersvorsorge')}">
              <span class="nav-item-icon">🏠</span>
              <span><strong>Riester-Rechner</strong><small>Förderung & Zulage</small></span>
            </a>
            <a href="${base}/entnahmerechner" class="${isActive('entnahme')}">
              <span class="nav-item-icon">💸</span>
              <span><strong>Entnahmerechner</strong><small>4%-Regel & finanzielle Freiheit</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Öffentlicher Dienst</div>
            <a href="${base}/tvoed-rechner" class="${isActive('tvoed')}">
              <span class="nav-item-icon">🏛️</span>
              <span><strong>TVöD Rechner</strong><small>VKA & Bund, E1–E15</small></span>
            </a>
            <a href="${base}/tv-l-rechner" class="${isActive('tvl')}">
              <span class="nav-item-icon">🎓</span>
              <span><strong>TV-L Rechner</strong><small>Länder & Hochschulen</small></span>
            </a>
            <a href="${base}/beamte-rechner" class="${isActive('beamte')}">
              <span class="nav-item-icon">⚖️</span>
              <span><strong>Beamtenbesoldung</strong><small>Bund & alle 16 Länder</small></span>
            </a>
          </div>
        </div>
      </li>

      <!-- KREDITE -->
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isGrpActive(['kredit','baufinanzierung'])}">
          Kredite <span class="nav-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Kredit & Immobilien</div>
            <a href="${base}/baufinanzierung-rechner" class="${isActive('baufinanzierung')}">
              <span class="nav-item-icon">🏠</span>
              <span><strong>Baufinanzierung</strong><small>Immobilienkredit berechnen</small></span>
            </a>
            <a href="${base}/kreditrechner" class="${isActive('kredit')}">
              <span class="nav-item-icon">🏦</span>
              <span><strong>Kreditrechner</strong><small>Rate & Tilgungsplan</small></span>
            </a>
          </div>
        </div>
      </li>

      <!-- SPAREN & ZINSEN -->
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isGrpActive(['zinseszins','sparrechner','tagesgeld','festgeld'])}">
          Sparen & Zinsen <span class="nav-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Sparen & Anlegen</div>
            <a href="${base}/zinseszins-rechner" class="${isActive('zinseszins')}">
              <span class="nav-item-icon">♾️</span>
              <span><strong>Zinseszins Rechner</strong><small>Vermögenswachstum berechnen</small></span>
            </a>
            <a href="${base}/sparrechner" class="${isActive('sparrechner')}">
              <span class="nav-item-icon">🎯</span>
              <span><strong>Sparrechner</strong><small>Sparziel & Sparrate berechnen</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Zinsen & Konten</div>
            <a href="${base}/tagesgeld-rechner" class="${isActive('tagesgeld')}">
              <span class="nav-item-icon">🏦</span>
              <span><strong>Tagesgeld Rechner</strong><small>Zinsen vergleichen</small></span>
            </a>
            <a href="${base}/festgeld-rechner" class="${isActive('festgeld')}">
              <span class="nav-item-icon">🔒</span>
              <span><strong>Festgeld Rechner</strong><small>Feste Zinsen vergleichen</small></span>
            </a>
          </div>
        </div>
      </li>

    </ul>

    <div class="nav-cta-wrap">
      <a href="${base}/alle-rechner" class="nav-cta">Alle Rechner</a>
      <button class="nav-hamburger" onclick="toggleMobileNav()" aria-label="Menü öffnen">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- MOBILE NAV — nach Priorität geordnet -->
  <div class="mobile-nav" id="mobile-nav">
    <div class="mobile-nav-section">
      <a href="${base}/alle-rechner" style="font-weight:700;color:var(--accent);">🗂️ Alle 25 Rechner ansehen</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">💼 Gehalt & Steuern</div>
      <a href="${base}/brutto-netto-rechner">Brutto-Netto-Rechner</a>
      <a href="${base}/gehaltserhöhung-rechner">Gehaltserhöhung Rechner</a>
      <a href="${base}/krankenkassenrechner">Krankenkassen-Rechner</a>
      <a href="${base}/abgeltungssteuer-rechner">Abgeltungssteuer</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">📈 Geldanlage</div>
      <a href="${base}/etf-sparplan-rechner">ETF Sparplan Rechner</a>
      <a href="${base}/etf-rechner">ETF Tools</a>
      <a href="${base}/inflationsrechner">Inflationsrechner</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">🏛️ Altersvorsorge</div>
      <a href="${base}/altersvorsorge-rechner">Rentenlücken-Rechner</a>
      <a href="${base}/entnahmerechner">Entnahmerechner</a>
      <a href="${base}/tvoed-rechner">TVöD Rechner</a>
      <a href="${base}/beamte-rechner">Beamtenbesoldung</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">🏠 Kredite</div>
      <a href="${base}/baufinanzierung-rechner">Baufinanzierung</a>
      <a href="${base}/kreditrechner">Kreditrechner</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">💰 Sparen & Zinsen</div>
      <a href="${base}/zinseszins-rechner">Zinseszins Rechner</a>
      <a href="${base}/sparrechner">Sparrechner</a>
      <a href="${base}/tagesgeld-rechner">Tagesgeld Rechner</a>
      <a href="${base}/festgeld-rechner">Festgeld Rechner</a>
    </div>
    <a href="${base}/alle-rechner" class="mobile-nav-cta">Alle 25 Rechner ansehen →</a>
  </div>`;
}

function renderFooter() {
  const base = 'https://www.rechnerpilot.de';
  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="${base}/" class="logo">
            <div class="logo-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <polyline points="2,15 7,9 11,12 18,4" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="14,4 18,4 18,8" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="logo-wordmark logo-wordmark-white">RechnerPilot</span>
          </a>
          <p>Kostenlose Finanzrechner für Deutschland. Klar, präzise, ohne Bannerwerbung.</p>
        </div>
        <div class="footer-col">
          <h4>Gehalt & Steuern</h4>
          <ul>
            <li><a href="${base}/brutto-netto-rechner">Brutto-Netto</a></li>
            <li><a href="${base}/gehaltserhöhung-rechner">Gehaltserhöhung</a></li>
            <li><a href="${base}/krankenkassenrechner">Krankenkasse</a></li>
            <li><a href="${base}/abgeltungssteuer-rechner">Abgeltungssteuer</a></li>
            <li><a href="${base}/tvoed-rechner">TVöD Rechner</a></li>
            <li><a href="${base}/tvoed-sue-rechner">TVöD-SuE</a></li>
            <li><a href="${base}/tvoed-p-rechner">TVöD-P Pflege</a></li>
            <li><a href="${base}/tv-l-rechner">TV-L Rechner</a></li>
            <li><a href="${base}/beamte-rechner">Beamte Bund</a></li>
            <li><a href="${base}/beamte-laender-rechner">Beamte Länder</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Geldanlage & Sparen</h4>
          <ul>
            <li><a href="${base}/etf-sparplan-rechner">ETF Sparplan</a></li>
            <li><a href="${base}/etf-rechner">ETF Tools</a></li>
            <li><a href="${base}/zinseszins-rechner">Zinseszins Rechner</a></li>
            <li><a href="${base}/sparrechner">Sparrechner</a></li>
            <li><a href="${base}/inflationsrechner">Inflationsrechner</a></li>
            <li><a href="${base}/tagesgeld-rechner">Tagesgeld Rechner</a></li>
            <li><a href="${base}/festgeld-rechner">Festgeld Rechner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Kredit & Vorsorge</h4>
          <ul>
            <li><a href="${base}/alle-rechner" style="font-weight:700;">→ Alle 25 Rechner</a></li>
            <li><a href="${base}/baufinanzierung-rechner">Baufinanzierung</a></li>
            <li><a href="${base}/kreditrechner">Kreditrechner</a></li>
            <li><a href="${base}/altersvorsorge-rechner">Altersvorsorge</a></li>
            <li><a href="${base}/entnahmerechner">Entnahmerechner</a></li>
            <li><a href="${base}/stromkostenrechner">Stromkostenrechner</a></li>
            <li><a href="${base}/gaskostenrechner">Gaskostenrechner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Ratgeber & Info</h4>
          <ul>
            <li><a href="${base}/ratgeber/terraLuna-lektion">20.000 € Lektion</a></li>
            <li><a href="${base}/impressum">Impressum</a></li>
            <li><a href="${base}/datenschutz">Datenschutz</a></li>
            <li><a href="${base}/methodik">Methodik</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${SITE.year} RechnerPilot · Keine Anlageberatung · Alle Angaben ohne Gewähr</span>
        <span>Kein Tracking · Keine Bannerwerbung · Affiliate-transparent</span>
      </div>
    </div>
  </footer>`;
}

// Standard "Weitere Rechner" Block — einheitlich für alle Seiten
function renderRelatedRechner(exclude = '') {
  const base = 'https://www.rechnerpilot.de';
  const all = [
    { url: 'brutto-netto-rechner', icon: '💼', name: 'Brutto-Netto-Rechner', desc: 'Nettogehalt berechnen.' },
    { url: 'etf-sparplan-rechner', icon: '📈', name: 'ETF Sparplan', desc: 'Rendite & Endkapital.' },
    { url: 'zinseszins-rechner', icon: '♾️', name: 'Zinseszins Rechner', desc: 'Vermögenswachstum.' },
    { url: 'altersvorsorge-rechner', icon: '🏛️', name: 'Altersvorsorge', desc: 'Rentenlücke berechnen.' },
    { url: 'tagesgeld-rechner', icon: '🏦', name: 'Tagesgeld Rechner', desc: 'Aktuelle Zinsen vergleichen.' },
    { url: 'baufinanzierung-rechner', icon: '🏠', name: 'Baufinanzierung', desc: 'Immobilienkredit berechnen.' },
    { url: 'kreditrechner', icon: '💳', name: 'Kreditrechner', desc: 'Rate & Tilgungsplan.' },
    { url: 'sparrechner', icon: '🎯', name: 'Sparrechner', desc: 'Sparziel berechnen.' },
  ];
  const filtered = all.filter(r => !r.url.includes(exclude)).slice(0, 4);
  return `
  <div class="content-section">
    <h2>Weitere passende Rechner</h2>
    <div class="related-grid">
      ${filtered.map(r => `
      <a href="${base}/${r.url}" class="cc">
        <div class="cc-icon bg-g">${r.icon}</div>
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
        <div class="cc-link">Zum Rechner →</div>
      </a>`).join('')}
    </div>
    <div style="text-align:center;margin-top:16px;">
      <a href="${base}/alle-rechner" style="font-size:13px;color:var(--accent);font-weight:600;text-decoration:none;">Alle 25 Rechner ansehen →</a>
    </div>
  </div>`;
}

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.nav-hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown') && !e.target.closest('.nav-hamburger')) {
    document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.style.opacity = '');
  }
});

// Init
function initComponents() {
  const navEl = document.getElementById('nav-placeholder');
  const footEl = document.getElementById('footer-placeholder');
  const page = document.body.dataset.page || '';
  if (navEl) navEl.outerHTML = renderNav(page);
  if (footEl) footEl.outerHTML = renderFooter();

  // FAQ Toggle
  document.querySelectorAll('.faq-q').forEach(q => {
    if (!q.dataset.bound) {
      q.dataset.bound = '1';
      q.addEventListener('click', () => q.closest('.faq-row').classList.toggle('open'));
    }
  });

  // Cur year
  document.querySelectorAll('.cur-year').forEach(el => el.textContent = new Date().getFullYear());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComponents);
} else {
  initComponents();
}
