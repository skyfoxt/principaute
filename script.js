// Principauté de Romarin — comportements du site

// ➜ À modifier à la main : historique du total cumulé des revenus (en euros).
// À chaque mise à jour, AJOUTEZ une ligne avec la date (AAAA-MM-JJ) et le nouveau total cumulé.
// La dernière ligne (la plus récente) est celle affichée en grand ; toutes alimentent le graphique.
const HISTORIQUE = [
  { date: '2026-11-27', montant: 2 }
  { date: '2026-11-22', montant: 1 }
  // exemple : { date: '2026-12-05', montant: 1250.50 },
];

const _tri = HISTORIQUE.slice().sort((a, b) => a.date.localeCompare(b.date));
const REVENU = { montant: _tri[_tri.length - 1].montant, majLe: _tri[_tri.length - 1].date };

// Construit le contenu SVG du graphique (courbe du total cumulé dans le temps)
function construireGraphique(historique, W, H) {
  const DAY = 864e5;
  const pts = historique
    .map(p => ({ t: Date.parse(p.date + 'T00:00:00Z'), v: Number(p.montant), date: p.date }))
    .filter(p => isFinite(p.t) && isFinite(p.v))
    .sort((a, b) => a.t - b.t);
  if (!pts.length) return '';

  const aujourdhui = Date.parse(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
  const tMin = pts[0].t;
  let tMax = Math.max(pts[pts.length - 1].t, aujourdhui);
  if (tMax - tMin < 7 * DAY) tMax = tMin + 7 * DAY;

  const maxV = Math.max(...pts.map(p => p.v), 0);
  const nice = m => {
    if (m <= 0) return 1;
    const e = Math.pow(10, Math.floor(Math.log10(m)));
    const f = m / e;
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * e;
  };
  const yMax = nice(maxV);

  const L = 74, R = 24, T = 18, B = 44;
  const x = t => L + (t - tMin) / (tMax - tMin) * (W - L - R);
  const y = v => T + (1 - v / yMax) * (H - T - B);
  const eur = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const long = (tMax - tMin) > 300 * DAY;
  const fmtDate = t => new Date(t).toLocaleDateString('fr-FR', long
    ? { month: 'short', year: 'numeric', timeZone: 'UTC' }
    : { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const f = n => n.toFixed(1);

  let s = '';
  // Grille horizontale + valeurs
  for (let i = 0; i <= 5; i++) {
    const v = yMax * i / 5, yy = y(v);
    s += `<line class="${i === 0 ? 'grid-base' : 'grid'}" x1="${L}" x2="${W - R}" y1="${f(yy)}" y2="${f(yy)}"/>`;
    s += `<text class="axis-text" x="${L - 10}" y="${f(yy + 4)}" text-anchor="end">${eur.format(v)}</text>`;
  }
  // Dates en abscisse
  const nT = W < 500 ? 3 : 5;
  for (let i = 0; i < nT; i++) {
    const t = tMin + (tMax - tMin) * i / (nT - 1);
    const anchor = i === 0 ? 'start' : i === nT - 1 ? 'end' : 'middle';
    s += `<text class="axis-text" x="${f(x(t))}" y="${H - 14}" text-anchor="${anchor}">${fmtDate(t)}</text>`;
  }
  // Aire + courbe
  const d = pts.map((p, i) => (i ? 'L' : 'M') + f(x(p.t)) + ',' + f(y(p.v))).join(' ');
  const last = pts[pts.length - 1];
  s += `<path class="area" d="${d} L${f(x(last.t))},${f(y(0))} L${f(x(pts[0].t))},${f(y(0))} Z"/>`;
  s += `<path class="line" d="${d}"/>`;
  // Prolongement pointillé jusqu'à aujourd'hui
  if (last.t < tMax) {
    s += `<line class="proj" x1="${f(x(last.t))}" y1="${f(y(last.v))}" x2="${f(x(tMax))}" y2="${f(y(last.v))}"/>`;
  }
  // Points (infobulle au survol)
  pts.forEach(p => {
    const txt = new Date(p.t).toLocaleDateString('fr-FR', { dateStyle: 'long', timeZone: 'UTC' }) + ' : ' + eur.format(p.v);
    s += `<circle class="dot" cx="${f(x(p.t))}" cy="${f(y(p.v))}" r="5"><title>${txt}</title></circle>`;
  });
  return s;
}

function dessinerGraphique(svg) {
  const W = Math.max(300, Math.round(svg.parentElement.clientWidth || 700));
  const H = W < 500 ? 260 : 340;
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = construireGraphique(HISTORIQUE, W, H);
}

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

    // Graphique de l'évolution du total (redessiné si la fenêtre change de taille)
    const chartEl = document.getElementById('revenue-chart');
    if (chartEl) {
      dessinerGraphique(chartEl);
      let attente;
      window.addEventListener('resize', () => {
        clearTimeout(attente);
        attente = setTimeout(() => dessinerGraphique(chartEl), 150);
      });
    }
  }
});
