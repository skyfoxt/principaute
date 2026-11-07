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
    date: "2026-11-07",
    categorie: "Annonce",
    resume: "La Principauté de Romarin inaugure sa rubrique d'actualités officielles.",
    image: "",
    contenu: `
      <p>La Principauté de Romarin met en ligne sa rubrique d'actualités. Vous y retrouverez les annonces officielles, les décisions du gouvernement et les moments marquants de la vie politique de la Principauté.</p>
    `
  },
  {
    id: "manifestation-france",
    titre: "Participation de sa Majesté au évenement du 17 octobre",
    date: "2026-10-17",
    categorie: "Annonce",
    resume: "Découvrez l'engagement du Prince pour sa seconde patrie.",
    image: "assets/manifestionprince17.jpg",
    contenu: `
      <p>Face à la dégradation rapide de la grandeur de la République Française, Mahé Ier, en sa qualité de chef d'état, a participer à la manifestation du 17 Octobre à Nantes. </p>
      <h3>Ses revendications</h3>
      <ul>
        <li>Une amélioration du système démocratique</li>
        <li>La modernisation du système scolaire français</li>
        <li>La défense de la liberté</li>
      </ul>
      <p>Le prince a déclaré :"Je ressors grandie de cette expérience politique, l'usage avec banalité d'armes chimiques et la présence d'élements appartenants à des factions idéologiques radicales m'a profondément choqué et surpris". .</p>
    `
  },
{
    id: "election-2026",
    titre: "Organisation de l'élection présidentielle",
    date: "2026-10-17",
    categorie: "Election",
    resume: "Le prince a autorisé ce samedi la tenue de l'élection présidentielle.",
    image: "assets/voteimage.jpg",
    contenu: `
      <p>Depuis maintenant plus d'un an le poste de Premier Ministre est vacant, le gouvernement a finalement décidé d'organisé un scrutin avant la fin de l'année calendaire. .</p>
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
