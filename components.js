/* ============================================
   RechnerPilot – Shared Components
   Nav + Footer werden per JS eingebunden
   ============================================ */

const SITE = {
  name: 'RechnerPilot',
  url: 'https://rechnerpilot.de',
  year: new Date().getFullYear(),
};

function renderNav(activePage = '') {
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
      <li><a href="https://www.rechnerpilot.de/brutto-netto-rechner" class="${activePage==='brutto'?'active':''}">Brutto-Netto</a></li>
      <li><a href="https://www.rechnerpilot.de/kreditrechner" class="${activePage==='kredit'?'active':''}">Kredit</a></li>
      <li><a href="https://www.rechnerpilot.de/etf-sparplan-rechner" class="${activePage==='etf'?'active':''}">ETF Sparplan</a></li>
      <li><a href="https://www.rechnerpilot.de/#rechner" class="nav-cta">Alle Rechner</a></li>
    </ul>
  </nav>`;
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
          <p>Kostenlose Finanzrechner für Deutschland. Klar, präzise, werbefrei.</p>
        </div>
        <div class="footer-col">
          <h4>Rechner</h4>
          <ul>
            <li><a href="https://www.rechnerpilot.de/brutto-netto-rechner">Brutto-Netto</a></li>
            <li><a href="https://www.rechnerpilot.de/kreditrechner">Kreditrechner</a></li>
            <li><a href="https://www.rechnerpilot.de/etf-sparplan-rechner">ETF Sparplan</a></li>
            <li><a href="https://www.rechnerpilot.de/#rechner">Alle ansehen →</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Ratgeber</h4>
          <ul>
            <li><a href="#">Steuerklassen</a></li>
            <li><a href="#">ETF Grundlagen</a></li>
            <li><a href="#">Zinseszins</a></li>
            <li><a href="#">Kreditvergleich</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Rechtliches</h4>
          <ul>
            <li><a href="${base}impressum.html">Impressum</a></li>
            <li><a href="${base}datenschutz.html">Datenschutz</a></li>
            <li><a href="${base}methodik.html">Methodik</a></li>
            <li><a href="${base}ueber-uns.html">Über uns</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copy">© ${SITE.year} RechnerPilot · rechnerpilot.de</div>
        <div class="footer-disc">Alle Angaben ohne Gewähr. Kein Ersatz für individuelle Steuer- oder Finanzberatung. Stand: ${SITE.year}.</div>
      </div>
    </div>
  </footer>`;
}

function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  nav.classList.toggle('open');
}

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.nav-hamburger');
  if (nav && btn && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// Auto-render when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('nav-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  const activePage = document.body.dataset.page || '';
  if (navEl) navEl.innerHTML = renderNav(activePage);
  if (footerEl) footerEl.innerHTML = renderFooter();

  // FAQ toggle
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      q.closest('.faq-row').classList.toggle('open');
    });
  });
});
