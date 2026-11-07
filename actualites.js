(function () {
  "use strict";

  const vueListe = document.getElementById("vue-liste");
  const vueArticle = document.getElementById("vue-article");
  const grille = document.getElementById("grille");
  const vide = document.getElementById("vide");
  const filtres = document.getElementById("filtres");
  const recherche = document.getElementById("recherche");

  document.getElementById("annee").textContent = new Date().getFullYear();

  let categorieActive = "Tous";

  /* Échappe le texte pour éviter toute injection HTML dans les titres/résumés */
  function esc(texte) {
    const d = document.createElement("div");
    d.textContent = texte == null ? "" : String(texte);
    return d.innerHTML;
  }

  function formaterDate(iso) {
    const [a, m, j] = iso.split("-").map(Number);
    return new Date(a, m - 1, j).toLocaleDateString("fr-FR", {
      day: "numeric", month: "long", year: "numeric"
    });
  }

  /* Un article est visible si sa date est atteinte (publication programmée) */
  function estPublie(article) {
    const [a, m, j] = article.date.split("-").map(Number);
    return new Date(a, m - 1, j) <= new Date();
  }

  function articlesPublies() {
    return ARTICLES
      .filter(estPublie)
      .sort((x, y) => y.date.localeCompare(x.date));
  }

  function afficherFiltres(liste) {
    const categories = ["Tous", ...new Set(liste.map(a => a.categorie))];
    filtres.innerHTML = categories
      .map(c => `<button class="filtre${c === categorieActive ? " actif" : ""}" data-cat="${esc(c)}">${esc(c)}</button>`)
      .join("");
  }

  function afficherListe() {
    const tous = articlesPublies();
    afficherFiltres(tous);

    const terme = recherche.value.trim().toLowerCase();
    const liste = tous.filter(a =>
      (categorieActive === "Tous" || a.categorie === categorieActive) &&
      (!terme || (a.titre + " " + a.resume).toLowerCase().includes(terme))
    );

    grille.innerHTML = liste.map(a => `
      <a class="carte" href="#${esc(a.id)}">
        <div class="carte-image"${a.image ? ` style="background-image:url('${esc(a.image)}')"` : ""}></div>
        <div class="carte-corps">
          <div class="meta"><span class="tag">${esc(a.categorie)}</span><span>${formaterDate(a.date)}</span></div>
          <h2>${esc(a.titre)}</h2>
          <p>${esc(a.resume)}</p>
          <span class="lire">Lire l'article →</span>
        </div>
      </a>
    `).join("");

    vide.hidden = liste.length > 0;
  }

  function afficherArticle(article) {
    vueArticle.innerHTML = `
      <a class="retour" href="#">← Toutes les actualités</a>
      <div class="meta"><span class="tag">${esc(article.categorie)}</span><span>${formaterDate(article.date)}</span></div>
      <h1>${esc(article.titre)}</h1>
      ${article.image ? `<img class="article-image" src="${esc(article.image)}" alt="">` : ""}
      <div class="article-contenu">${article.contenu}</div>
    `;
    document.title = article.titre + " — Principauté de Romarin";
    vueListe.hidden = true;
    vueArticle.hidden = false;
    window.scrollTo(0, 0);
  }

  function router() {
    const id = decodeURIComponent(location.hash.slice(1));
    const article = id && articlesPublies().find(a => a.id === id);
    if (article) {
      afficherArticle(article);
    } else {
      document.title = "Actualités — Principauté de Romarin";
      vueArticle.hidden = true;
      vueListe.hidden = false;
      afficherListe();
    }
  }

  filtres.addEventListener("click", e => {
    const btn = e.target.closest(".filtre");
    if (!btn) return;
    categorieActive = btn.dataset.cat;
    afficherListe();
  });
  recherche.addEventListener("input", afficherListe);
  window.addEventListener("hashchange", router);

  router();
})();
