/* ============================================
   RechnerPilot – Shared Components
   ============================================ */

const SITE = {
  name: 'RechnerPilot',
  url: 'https://www.rechnerpilot.de',
  year: new Date().getFullYear(),
};

function renderNav(activePage = '') {
  const isFinanz  = ['brutto','kredit','etf','kk'].includes(activePage);
  const isEnergie = ['strom','gas'].includes(activePage);
  return `
  <nav>
    <a href="https://www.rechnerpilot.de/" class="logo">
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
        <a href="#" class="nav-dropdown-trigger ${isFinanz?'active':''}">Finanzen <span class="nav-arrow">▾</span></a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Gehalt &amp; Steuern</div>
            <a href="https://www.rechnerpilot.de/brutto-netto-rechner" class="${activePage==='brutto'?'active':''}">
              <span class="nav-item-icon">💼</span>
              <span><strong>Brutto-Netto-Rechner</strong><small>Nettogehalt berechnen</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Kredit &amp; Anlage</div>
            <a href="https://www.rechnerpilot.de/kreditrechner" class="${activePage==='kredit'?'active':''}">
              <span class="nav-item-icon">🏦</span>
              <span><strong>Kreditrechner</strong><small>Monatsrate &amp; Tilgungsplan</small></span>
            </a>
            <a href="https://www.rechnerpilot.de/etf-sparplan-rechner" class="${activePage==='etf'?'active':''}">
              <span class="nav-item-icon">📈</span>
              <span><strong>ETF-Sparplan</strong><small>Vermögen aufbauen</small></span>
            </a>
          </div>
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Versicherung</div>
            <a href="https://www.rechnerpilot.de/krankenkassenrechner" class="${activePage==='kk'?'active':''}">
              <span class="nav-item-icon">🏥</span>
              <span><strong>Krankenkasse</strong><small>GKV-Beitrag vergleichen</small></span>
            </a>
          </div>
        </div>
      </li>
      <li class="nav-dropdown">
        <a href="#" class="nav-dropdown-trigger ${isEnergie?'active':''}">Energie <span class="nav-arrow">▾</span></a>
        <div class="nav-dropdown-menu">
          <div class="nav-dropdown-group">
            <div class="nav-dropdown-label">Energiekosten</div>
            <a href="https://www.rechnerpilot.de/stromkostenrechner" class="${activePage==='strom'?'active':''}">
              <span class="nav-item-icon">⚡</span>
              <span><strong>Stromkostenrechner</strong><small>Jahreskosten &amp; Anbieter</small></span>
            </a>
            <a href="https://www.rechnerpilot.de/gaskostenrechner" class="${activePage==='gas'?'active':''}">
              <span class="nav-item-icon">🔥</span>
              <span><strong>Gaskostenrechner</strong><small>Heizkosten berechnen</small></span>
            </a>
          </div>
        </div>
      </li>
      <li><a href="https://www.rechnerpilot.de/#rechner" class="nav-cta">Alle Rechner</a></li>
    </ul>
    <button class="nav-hamburger" onclick="toggleMobileNav()" aria-label="Menue oeffnen">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="mobile-nav" id="mobile-nav">
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">Finanzen</div>
      <a href="https://www.rechnerpilot.de/brutto-netto-rechner">💼 Brutto-Netto-Rechner</a>
      <a href="https://www.rechnerpilot.de/kreditrechner">🏦 Kreditrechner</a>
      <a href="https://www.rechnerpilot.de/etf-sparplan-rechner">📈 ETF-Sparplan</a>
      <a href="https://www.rechnerpilot.de/krankenkassenrechner">🏥 Krankenkasse</a>
    </div>
    <div class="mobile-nav-section">
      <div class="mobile-nav-label">Energie</div>
      <a href="https://www.rechnerpilot.de/stromkostenrechner">⚡ Stromkostenrechner</a>
      <a href="https://www.rechnerpilot.de/gaskostenrechner">🔥 Gaskostenrechner</a>
    </div>
    <a href="https://www.rechnerpilot.de/#rechner" class="mobile-nav-cta">Alle Rechner ansehen</a>
  </div>`;
}

function renderFooter() {
  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="https://www.rechnerpilot.de/" class="logo">
            <div class="logo-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <polyline points="2,15 7,9 11,12 18,4" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="14,4 18,4 18,8" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="logo-wordmark logo-wordmark-white">RechnerPilot</span>
          </a>
          <p>Kostenlose Finanzrechner fuer Deutschland. Klar, praezise, werbefrei.</p>
        </div>
        <div class="footer-col">
          <h4>Finanzen</h4>
          <ul>
            <li><a href="https://www.rechnerpilot.de/brutto-netto-rechner">Brutto-Netto</a></li>
            <li><a href="https://www.rechnerpilot.de/kreditrechner">Kreditrechner</a></li>
            <li><a href="https://www.rechnerpilot.de/etf-sparplan-rechner">ETF Sparplan</a></li>
            <li><a href="https://www.rechnerpilot.de/krankenkassenrechner">Krankenkasse</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Energie</h4>
          <ul>
            <li><a href="https://www.rechnerpilot.de/stromkostenrechner">Stromrechner</a></li>
            <li><a href="https://www.rechnerpilot.de/gaskostenrechner">Gasrechner</a></li>
            <li><a href="https://www.rechnerpilot.de/#rechner">Alle Rechner</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Rechtliches</h4>
          <ul>
            <li><a href="https://www.rechnerpilot.de/impressum">Impressum</a></li>
            <li><a href="https://www.rechnerpilot.de/datenschutz">Datenschutz</a></li>
            <li><a href="https://www.rechnerpilot.de/methodik">Methodik</a></li>
            <li><a href="https://www.rechnerpilot.de/ueber-uns">Ueber uns</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© ${SITE.year} RechnerPilot · rechnerpilot.de</div>
        <div class="footer-disc">Alle Angaben ohne Gewaehr. Kein Ersatz fuer individuelle Steuer- oder Finanzberatung. Stand: ${SITE.year}.</div>
      </div>
    </div>
  </footer>`;
}

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  if (nav) nav.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.nav-hamburger');
  if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const navEl    = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  const activePage = document.body.dataset.page || '';
  if (navEl)    navEl.innerHTML    = renderNav(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => q.closest('.faq-row').classList.toggle('open'));
  });
});
