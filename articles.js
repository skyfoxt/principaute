/* ==========================================================
   ARTICLES DE LA PRINCIPAUTÉ DE ROMARIN
   ----------------------------------------------------------
   Pour publier un article : copiez un bloc { ... } ci-dessous,
   collez-le en haut de la liste, puis modifiez-le.

   - id        : identifiant unique, sans espace ni accent (sert dans le lien)
   - titre     : titre de l'article
   - date      : AAAA-MM-JJ. L'article n'apparaît qu'à partir de cette date.
                 => pour programmer une publication, mettez une date future.
   - categorie : au choix (Annonce, Institutions, Diplomatie, Culture...)
   - resume    : phrase courte affichée sur la carte
   - image     : chemin d'une image (ex. "img/mon-photo.jpg") ou "" pour aucune
   - contenu   : texte de l'article en HTML (<p>, <h3>, <ul>, <strong>...)
   ========================================================== */

const ARTICLES = [
  {
    id: "ouverture-page-actualites",
    titre: "Ouverture de la page d'actualités",
    date: "2026-11-04",
    categorie: "Annonce",
    resume: "La Principauté de Romarin inaugure sa rubrique d'actualités officielles.",
    image: "",
    contenu: `
      <p>La Principauté de Romarin met en ligne sa rubrique d'actualités. Vous y retrouverez les annonces officielles, les décisions des institutions et les moments marquants de la vie de la Principauté.</p>
      <p>Cet article est un exemple : modifiez-le ou supprimez-le dans le fichier <strong>articles.js</strong>.</p>
    `
  },
  {
    id: "exemple-institutions",
    titre: "Exemple d'article : décision des institutions",
    date: "2026-11-01",
    categorie: "Institutions",
    resume: "Un modèle d'article avec intertitre et liste, à reprendre pour vos publications.",
    image: "",
    contenu: `
      <p>Texte d'introduction de l'article.</p>
      <h3>Points principaux</h3>
      <ul>
        <li>Premier point</li>
        <li>Deuxième point</li>
        <li>Troisième point</li>
      </ul>
      <p>Conclusion de l'article.</p>
    `
  },
  {
    id: "exemple-programme",
    titre: "Exemple d'article programmé",
    date: "2027-01-01",
    categorie: "Annonce",
    resume: "Cet article n'apparaîtra qu'à partir du 1er janvier 2027.",
    image: "",
    contenu: `<p>Article programmé : invisible tant que la date n'est pas atteinte.</p>`
  }
];
