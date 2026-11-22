// Principauté de Romarin — comportements du site

// ➜ À modifier à la main : montant cumulé de l'année (en euros) et date de mise à jour (AAAA-MM-JJ)
const REVENU = { montant: 1, majLe: '2026-11-22' };

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('header nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Marque le lien de navigation correspondant à la page courante
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('header nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Revenu cumulé annuel de Romarin (affiché uniquement si le bloc existe sur la page)
  const revenueEl = document.getElementById('revenue');
  if (revenueEl) {
    const eur = new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2
    });
    revenueEl.textContent = eur.format(REVENU.montant);

    const yearEl = document.getElementById('rev-year');
    if (yearEl) yearEl.textContent = REVENU.majLe.slice(0, 4);

    const dateEl = document.getElementById('rev-date');
    if (dateEl) {
      dateEl.textContent = new Date(REVENU.majLe + 'T00:00:00Z')
        .toLocaleDateString('fr-FR', { dateStyle: 'long', timeZone: 'UTC' });
    }

    // Équivalent en dollars, au dernier taux EUR/USD publié (source : Frankfurter, taux de la BCE)
    const usdEl = document.getElementById('revenue-usd');
    if (usdEl) {
      fetch('https://api.frankfurter.dev/v2/rate/eur/usd')
        .then(res => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        })
        .then(data => {
          const taux = parseFloat(data.rate);
          if (!isFinite(taux)) throw new Error('taux invalide');
          const usd = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          let texte = '≈ ' + usd.format(REVENU.montant * taux) + ' $';
          if (data.date) {
            const d = new Date(data.date + 'T00:00:00Z')
              .toLocaleDateString('fr-FR', { dateStyle: 'long', timeZone: 'UTC' });
            texte += ' au taux du ' + d + ' (1 € = ' + taux.toFixed(4).replace('.', ',') + ' $)';
          }
          usdEl.textContent = texte;
          usdEl.hidden = false;
        })
        .catch(() => { usdEl.hidden = true; });
    }
  }
});
