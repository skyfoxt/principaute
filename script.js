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
  }
});
