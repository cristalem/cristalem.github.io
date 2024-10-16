document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const popupImage = document.getElementById("popup-image");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  let currentIndex = 0;

  const collectionItems = document.querySelectorAll(".collection-item");
  const items = Array.from(collectionItems).map(item => {
    const image = item.getAttribute("data-image");
    return { image };
  });

  collectionItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      showPopup();
    });
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showPopup();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showPopup();
  });

  function showPopup() {
    const item = items[currentIndex];
    popupImage.src = item.image;
    popup.style.display = "flex";
  }

  // Ajout du code pour afficher la navigation après le bouton "Entrer"
  const enterButton = document.getElementById("enter-site");
  const header = document.querySelector("header");
  const aboutSection = document.getElementById("about");

  enterButton.addEventListener("click", () => {
    document.getElementById("home").style.display = "none";
    header.classList.add("show");
    aboutSection.classList.remove("hidden");
  });

  // Gestion des animations lors du défilement
  const hiddenElements = document.querySelectorAll(".hidden");
  const showOnScroll = () => {
    const scrollY = window.scrollY;
    hiddenElements.forEach(el => {
      if (el.getBoundingClientRect().top + scrollY < scrollY + window.innerHeight - 100) {
        el.classList.add("show-on-scroll");
      }
    });
  };
  window.addEventListener("scroll", showOnScroll);
  showOnScroll(); // Vérifier à l'initialisation

  // Gestion du menu burger
  const burgerMenu = document.getElementById("burger-menu");
  const headerMenu = document.getElementById("header__menu");

  burgerMenu.addEventListener("click", () => {
    headerMenu.classList.toggle("show");
  });
});
