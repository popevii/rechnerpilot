/* ============================================
   RechnerPilot – Shared Components
   Nav + Footer + Toggle
   ============================================ */

const SITE = {
  name: 'RechnerPilot',
  url: 'https://www.rechnerpilot.de',
  year: new Date().getFullYear(),
};

function renderNav(activePage = '') {
  const base = 'https://www.rechnerpilot.de';
  const isActive = (page) => activePage === page ? 'active' : '';
  const isGroupActive = (pages) => pages.includes(activePage) ? 'active' : '';

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
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isGroupActive(['brutto','kredit','etf','kk'])}">
          Finanzen <span class="nav-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Gehalt & Steuern</div>
            <a href="${base}/brutto-netto-rechner" class="${isActive('brutto')}">
              <span class="nav-item-icon">💼</span>
              <span><strong>Brutto-Netto-Rechner</strong><small>Nettogehalt berechnen</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Kredit & Anlage</div>
            <a href="${base}/kreditrechner" class="${isActive('kredit')}">
              <span class="nav-item-icon">🏦</span>
              <span><strong>Kreditrechner</strong><small>Monatsrate & Tilgungsplan</small></span>
            </a>
            <a href="${base}/etf-sparplan-rechner" class="${isActive('etf')}">
              <span class="nav-item-icon">📈</span>
              <span><strong>ETF-Sparplan</strong><small>Vermögen aufbauen</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Öffentlicher Dienst</div>
            <a href="${base}/tvoed-rechner" class="${isActive('tvoed')}">
              <span class="nav-item-icon">🏛️</span>
              <span><strong>TVöD Gehaltsrechner</strong><small>Kommunen & Bund</small></span>
            </a>
            <a href="${base}/tv-l-rechner" class="${isActive('tvl')}">
              <span class="nav-item-icon">🎓</span>
              <span><strong>TV-L Gehaltsrechner</strong><small>Länder & Hochschulen</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Versicherung</div>
            <a href="${base}/krankenkassenrechner" class="${isActive('kk')}">
              <span class="nav-item-icon">🏥</span>
              <span><strong>Krankenkasse</strong><small>GKV-Beitrag vergleichen</small></span>
            </a>
          </div>
        </div>
      </li>

      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isGroupActive(['strom','gas'])}">
          Energie <span class="nav-arrow">▾</span>
        </a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Energiekosten</div>
            <a href="${base}/stromkostenrechner" class="${isActive('strom')}">
              <span class="nav-item-icon">⚡</span>
              <span><strong>Stromkostenrechner</strong><small>Jahreskosten & Anbieter</small></span>
            </a>
            <a href="${base}/gaskostenrechner" class="${isActive('gas')}">
              <span class="nav-item-icon">🔥</span>
              <span><strong>Gaskostenrechner</strong><small>Heizkosten berechnen</small></span>
            </a>
          </div>
        </div>
      </li>
    </ul>

    <div class="nav-cta-wrap">
      <a href="${base}/#rechner" class="nav-cta">Alle Rechner</a>
      <button class="nav-hamburger" onclick="toggleMobileNav()" aria-label="Menü öffnen">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-nav" id="mobile-nav">
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">Finanzen</div>
      <a href="${base}/brutto-netto-rechner">💼 Brutto-Netto-Rechner</a>
      <a href="${base}/kreditrechner">🏦 Kreditrechner</a>
      <a href="${base}/etf-sparplan-rechner">📈 ETF-Sparplan</a>
      <a href="${base}/tvoed-rechner">🏛️ TVöD Gehaltsrechner</a>
      <a href="${base}/tv-l-rechner">🎓 TV-L Gehaltsrechner</a>
      <a href="${base}/krankenkassenrechner">🏥 Krankenkasse</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">Energie</div>
      <a href="${base}/stromkostenrechner">⚡ Stromkostenrechner</a>
      <a href="${base}/gaskostenrechner">🔥 Gaskostenrechner</a>
    </div>
    <a href="${base}/#rechner" class="mobile-nav-cta">Alle Rechner ansehen →</a>
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
          <p>Kostenlose Finanzrechner für Deutschland. Klar, präzise, werbefrei.</p>
        </div>
        <div class="footer-col">
          <h4>Finanzen</h4>
          <ul>
            <li><a href="${base}/brutto-netto-rechner">Brutto-Netto</a></li>
            <li><a href="${base}/kreditrechner">Kreditrechner</a></li>
            <li><a href="${base}/etf-sparplan-rechner">ETF Sparplan</a></li>
            <li><a href="${base}/tvoed-rechner">TVöD Rechner</a></li>
            <li><a href="${base}/tv-l-rechner">TV-L Rechner</a></li>
            <li><a href="${base}/krankenkassenrechner">Krankenkasse</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Energie</h4>
          <ul>
            <li><a href="${base}/stromkostenrechner">Stromrechner</a></li>
            <li><a href="${base}/gaskostenrechner">Gasrechner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Rechtliches</h4>
          <ul>
            <li><a href="${base}/impressum">Impressum</a></li>
            <li><a href="${base}/datenschutz">Datenschutz</a></li>
            <li><a href="${base}/methodik">Methodik</a></li>
            <li><a href="${base}/ueber-uns">Über uns</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© ${SITE.year} RechnerPilot · rechnerpilot.de</div>
        <div class="footer-disc">Alle Angaben ohne Gewähr. Kein Ersatz für individuelle Steuer- oder Finanzberatung.</div>
      </div>
    </div>
  </footer>`;
}

function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.nav-hamburger');
  if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  const activePage = document.body.dataset.page || '';
  if (navEl) navEl.innerHTML = renderNav(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();

  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => q.closest('.faq-row').classList.toggle('open'));
  });
});
