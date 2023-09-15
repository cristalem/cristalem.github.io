// empecher le navigateur de restaurer le scroll
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
// revenir en haut de la page
smoothScrollToTop();

const DUREE_SCROLL = 600;

const sections = document.querySelectorAll(".section");
const nbSections = sections.length;

let delai = false;
let indexSectionActuelle = 0;

const scrollJusqua = (el) => smoothScrollToElement(
  el,
  {
    duration: DUREE_SCROLL,
    easingFunction: EASING_FUNCTIONS.fastInSlowOut,
  }
);

const scroll = (ev) => {
  if (delai) {
    // si on a un scroll en cours, on ignore
    return;
  }
  delai = true;
  setTimeout(() => delai = false, DUREE_SCROLL); // on reinitialise le delai plus tard

  // la variation de scroll, negatif = vers le bas, positif = vers le haut
  const delta = ev.wheelDelta || -ev.detail;

  let ancienIndex = indexSectionActuelle;

  if (delta < 0) {
    if (indexSectionActuelle !== nbSections - 1) {
      indexSectionActuelle++;
    }
  } else if (indexSectionActuelle > 0) {
    indexSectionActuelle--;
  }

  if (ancienIndex !== indexSectionActuelle) {
    const el = sections[indexSectionActuelle];
    scrollJusqua(el);

    document.getElementById(`section-status-${el.id}`)
      .className += " active";

    document.getElementById(`section-status-${sections[ancienIndex].id}`).className = "";
  }
}

document.onwheel = scroll;
document.addEventListener("DOMMouseScroll", scroll);

// Affichage de la section actuelle
const ul = document.createElement("ul");
ul.className = "section-status";
for (const section of sections) {
  const li = document.createElement("li");
  li.id = `section-status-${section.id}`;
  if (section.id === sections[indexSectionActuelle].id) {
    li.className += " active";
  }
  ul.append(li);
}

document.body.append(ul);
