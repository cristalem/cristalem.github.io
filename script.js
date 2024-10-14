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
        console.log("Image path:", image); // Ajoutez cette ligne pour déboguer
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
      console.log("Current item:", item); // Ajoutez cette ligne pour déboguer
      popupImage.src = item.image ? item.image : ""; // Vérifiez ici que le chemin est correct
      popup.style.display = "flex";
    }
  });

  const burgerMenu = document.getElementById('burger-menu');
  const headerMenu = document.getElementById('header__menu');

  burgerMenu.addEventListener('click', () => {
    headerMenu.classList.toggle('show');
  });


  