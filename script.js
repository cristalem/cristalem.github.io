document.addEventListener("DOMContentLoaded", () => {
  // Initialisation des éléments du carousel et du popup
  const popup = document.getElementById('popup');
  const closeBtn = document.querySelector('.close');
  const popupImage = document.getElementById('popup-image');
  const popupPrevBtn = document.getElementById('prev');
  const popupNextBtn = document.getElementById('next');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const carouselTrack = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const totalItems = carouselItems.length;
  let currentIndex = 0;

  // Vérification de l'existence des éléments du popup
  if (popup && closeBtn) {
    // Close popup
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      popup.style.display = "none";
    });

    // Fermeture du popup en cliquant en dehors
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }



  // Curseur personnalisé
  function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Suivre la position de la souris
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Positionner directement le curseur sans délai
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });
    
    // Effet hover sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .carousel-item, .header__link, .burger, .close, .nav-arrow, .lune-img, .soleil-img');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
      });
      
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    });
  }
  
  // Animation 3D organique
  function initOrganic3D() {
    const canvas = document.getElementById('organic3d');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let mouseX = 0;
    let mouseY = 0;
    let animationId;
    let isHoveringElsa = false;
    let svgImgs = [];
    
    // Ajuster la taille du canvas
    function resizeCanvas() {
      const aboutSection = document.getElementById('about');
      const rect = aboutSection.getBoundingClientRect();
      
      // Sur desktop, utiliser la largeur complète de l'écran
      if (window.innerWidth > 768) {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
      } else {
        // Sur mobile, utiliser la taille de la section
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
      }
      
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // S'assurer que le canvas couvre toute la section
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    
    // Suivre la position de la souris avec correction des coordonnées
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
    });
    
    // Suivre la position de la souris sur le document pour la réactivité
    document.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && 
          e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        mouseX = (e.clientX - rect.left) * scaleX;
        mouseY = (e.clientY - rect.top) * scaleY;
      }
    });
    
    // Points de référence pour former le "E" sans bruit aléatoire
    function getEPoints() {
      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio) + 200; // Déplacé encore plus bas
      const size = 160;
      const spacing = 12; // Espacement réduit entre les particules
      const lineWidth = 25; // Largeur des lignes du E
      
      const points = [];
      
      // Barre verticale gauche (avec courbe organique) - 2-3 colonnes
      for (let col = 0; col < 3; col++) {
        for (let i = 0; i < 15; i++) {
          const y = centerY - size/2 + (i * spacing);
          const x = centerX - size/2 + (col * 6); // Pas de bruit
          const curveOffset = Math.sin(i * 0.5) * 6; // Courbe organique
          points.push({
            x: x + curveOffset,
            y: y
          });
        }
      }
      
      // Barre horizontale du haut (avec courbe) - 2-3 rangées
      for (let row = 0; row < 3; row++) {
        for (let i = 0; i < 13; i++) {
          const x = centerX - size/2 + (i * spacing);
          const y = centerY - size/2 + (row * 6); // Pas de bruit
          const curveOffset = Math.sin(i * 0.3) * 4; // Courbe organique
          points.push({
            x: x,
            y: y + curveOffset
          });
        }
      }
      
      // Barre horizontale du milieu (plus courte et courbée) - 2-3 rangées
      for (let row = 0; row < 2; row++) {
        for (let i = 0; i < 10; i++) {
          const x = centerX - size/2 + (i * spacing);
          const y = centerY + (row * 6); // Pas de bruit
          const curveOffset = Math.sin(i * 0.4) * 3; // Courbe organique
          points.push({
            x: x,
            y: y + curveOffset
          });
        }
      }
      
      // Barre horizontale du bas (avec courbe) - 2-3 rangées
      for (let row = 0; row < 3; row++) {
        for (let i = 0; i < 13; i++) {
          const x = centerX - size/2 + (i * spacing);
          const y = centerY + size/2 + (row * 6); // Pas de bruit
          const curveOffset = Math.sin(i * 0.3) * 4; // Courbe organique
          points.push({
            x: x,
            y: y + curveOffset
          });
        }
      }
      
      return points;
    }
    
    // Fonction pour vérifier et corriger les superpositions
    function adjustForOverlap(points, minDistance = 45) {
      let iterations = 0;
      const maxIterations = 10;
      
      while (iterations < maxIterations) {
        let hasOverlap = false;
        
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < minDistance) {
              hasOverlap = true;
              // Déplacer les points pour éviter la superposition
              const angle = Math.atan2(dy, dx);
              const moveDistance = (minDistance - distance) / 2 + 2; // Ajout d'un petit buffer
              
              points[i].x += Math.cos(angle) * moveDistance;
              points[i].y += Math.sin(angle) * moveDistance;
              points[j].x -= Math.cos(angle) * moveDistance;
              points[j].y -= Math.sin(angle) * moveDistance;
            }
          }
        }
        
        if (!hasOverlap) break;
        iterations++;
      }
      
      return points;
    }
    
    // Particules organiques
    class Particle {
      constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.index = index;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 8 + 1;
        this.originalSize = this.size;
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = (Math.random() - 0.5) * 0.02;
        this.opacity = Math.random() * 0.5 + 0.3;
        // Couleurs blanc, jaune très clair, bleu très clair (aléatoire)
        const colorType = Math.random();
        if (colorType < 0.34) {
          this.hue = 0;
          this.sat = 0;
          this.lum = 100;
          this.svgType = 0;
        } else if (colorType < 0.67) {
          this.hue = 52;
          this.sat = 95;
          this.lum = 90;
          this.svgType = 1;
        } else {
          this.hue = 200;
          this.sat = 90;
          this.lum = 85;
          this.svgType = 2;
        }
        this.targetX = x;
        this.targetY = y;
        this.easing = 0.03;
        this.targetSize = this.size;
      }
      
      update() {
        if (isHoveringElsa) {
          // Mode "E" - chaque particule va à sa position spécifique dans le E
          let ePoints = getEPoints();
          
          // Chaque particule va à sa position unique (pas de modulo)
          if (this.index < ePoints.length) {
            this.targetX = ePoints[this.index].x;
            this.targetY = ePoints[this.index].y;
            
            // Taille variable pour créer l'effet de cercles différents
            this.targetSize = this.originalSize + Math.random() * 2;
            
            // Mouvement vers la cible avec stabilisation parfaite
            const distanceToTarget = Math.sqrt((this.targetX - this.x) ** 2 + (this.targetY - this.y) ** 2);
            
            if (distanceToTarget > 0.3) {
              // Mouvement vers la cible
              this.x += (this.targetX - this.x) * 0.06; // Easing équilibré
              this.y += (this.targetY - this.y) * 0.06; // Easing équilibré
            } else {
              // Stabilisation parfaite une fois proche de la cible
              this.x = this.targetX;
              this.y = this.targetY;
            }
            
            this.size += (this.targetSize - this.size) * 0.12; // Changement de taille équilibré
            
            // Effet de lueur plus intense
            this.opacity = Math.min(1, this.opacity + 0.04);
          }
        } else {
          // Mode normal - mouvement organique
          this.angle += this.angleSpeed;
          this.x += Math.cos(this.angle) * 0.5 + this.vx;
          this.y += Math.sin(this.angle) * 0.5 + this.vy;
          
          // Retour progressif à la position originale
          this.x += (this.originalX - this.x) * 0.01;
          this.y += (this.originalY - this.y) * 0.01;
          this.size += (this.originalSize - this.size) * 0.1;
          
          // Réaction à la souris
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            this.x -= dx * force * 0.01;
            this.y -= dy * force * 0.01;
            this.size = this.originalSize + force * 10;
            this.opacity = Math.min(1, this.opacity + force * 0.3);
          } else {
            this.opacity = Math.max(0.3, this.opacity - 0.02);
          }
          
          // Rebondir sur les bords
          if (this.x < 0 || this.x > canvas.width / window.devicePixelRatio) this.vx *= -1;
          if (this.y < 0 || this.y > canvas.height / window.devicePixelRatio) this.vy *= -1;
          
          // Garder dans les limites
          const canvasWidth = canvas.width / window.devicePixelRatio;
          const canvasHeight = canvas.height / window.devicePixelRatio;
          this.x = Math.max(0, Math.min(canvasWidth, this.x));
          this.y = Math.max(0, Math.min(canvasHeight, this.y));
        }
      }
      
      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        if (document.body.classList.contains('theme-light') && svgImgs.length === 3) {
          // Mode clair : SVG
          const img = svgImgs[this.svgType];
          if (img && img.complete) {
            ctx.drawImage(img, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
          }
        } else {
          // Mode sombre : cercle
          ctx.fillStyle = `hsl(${this.hue}, ${this.sat}%, ${this.lum}%)`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          const glowIntensity = this.size * 2;
          ctx.shadowColor = `hsl(${this.hue}, ${this.sat}%, ${this.lum}%)`;
          ctx.shadowBlur = glowIntensity;
          ctx.fill();
        }
        ctx.restore();
      }
    }
    
    // Prépare le chargement des SVGs
    const svgPaths = [
      'images/fleur_blanc.svg',
      'images/fleur_corail.svg',
      'images/fleur_bleu.svg'
    ];
    let svgDataArr = [];
    function loadSVGs(callback) {
      let loaded = 0;
      svgPaths.forEach((path, i) => {
        fetch(path).then(r => r.text()).then(data => {
          svgDataArr[i] = data;
          loaded++;
          if (loaded === svgPaths.length) {
            prepareSVGImages();
            callback();
          }
        });
      });
    }

    function prepareSVGImages() {
      svgImgs = svgDataArr.map(svg => {
        const img = new window.Image();
        const blob = new Blob([svg], {type: 'image/svg+xml'});
        img.src = URL.createObjectURL(blob);
        return img;
      });
    }

    // Dans initOrganic3D, remplace la création des particules et animate() par :
    loadSVGs(() => {
      prepareSVGImages();
      // Créer les particules
      const particles = [];
      const ePoints = getEPoints();
      const particleCount = ePoints.length;
      
      // Utiliser la taille réelle du canvas pour la création des particules
      const canvasWidth = canvas.width / window.devicePixelRatio;
      const canvasHeight = canvas.height / window.devicePixelRatio;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(
          Math.random() * canvasWidth,
          Math.random() * canvasHeight,
          i
        ));
      }
      // Animation
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
        animationId = requestAnimationFrame(animate);
      }
      animate();
      // Observer pour forcer un redraw immédiat lors du switch de thème
      const observer = new MutationObserver(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.draw());
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    });
    
    // Gestionnaire d'événements pour le survol de "ELSA"
    const elsaText = document.querySelector('#about h2');
    if (elsaText) {
      elsaText.addEventListener('mouseenter', () => {
        isHoveringElsa = true;
      });
      
      elsaText.addEventListener('mouseleave', () => {
        isHoveringElsa = false;
      });
    }
  }
  
  // Animation JavaScript pour la section about
  function initAboutAnimations() {
    const aboutText = document.querySelector('#about > div:first-child');
    const title = document.querySelector('#about h2');
    const subtitle = document.querySelector('#about h3');
    const paragraphs = document.querySelectorAll('#about p');
    
    // Masquer seulement les éléments de texte initialement
    [aboutText, title, subtitle, ...paragraphs].forEach(el => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.5)';
      }
    });
    
    // Animation du texte avec effet
    setTimeout(() => {
      if (aboutText) {
        aboutText.style.transition = 'all 0.6s ease-out';
        aboutText.style.opacity = '1';
        aboutText.style.transform = 'scale(1) translateX(0)';
        
        // Effet de lettre qui se forme pour le titre
        if (title) {
          letterFormationEffect(title, 'JE SUIS ELSA');
        }
        
        // Animation des paragraphes en même temps
        paragraphs.forEach((p, index) => {
          setTimeout(() => {
            if (p) {
              p.style.transition = 'all 0.8s ease-out';
              p.style.opacity = '1';
              p.style.transform = 'scale(1) translateY(0)';
            }
          }, 600 + (index * 100)); // Démarre en même temps que le titre, délai réduit
        });
      }
    }, 300); // Délai initial réduit
    
    // Animation du sous-titre avec effet de fondu caractère par caractère
    setTimeout(() => {
      if (subtitle) {
        subtitle.style.transition = 'all 1s ease-out';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'scale(1)';
        characterFadeEffect(subtitle, 'Bonjour');
      }
    }, 800); // Délai réduit
  }
  
  // Effet de lettre qui se forme pour le titre
  function letterFormationEffect(element, text) {
    element.textContent = '';
    element.style.opacity = '1';
    element.style.transform = 'scale(1)';
    
    const letters = text.split('');
    let currentIndex = 0;
    
    function formLetter() {
      if (currentIndex < letters.length) {
        const letter = letters[currentIndex];
        const letterSpan = document.createElement('span');
        letterSpan.textContent = letter;
        letterSpan.style.display = 'inline-block';
        letterSpan.style.opacity = '0';
        letterSpan.style.transform = 'scale(0) rotate(180deg)';
        letterSpan.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Durée réduite
        letterSpan.style.color = '#471f52';
        
        // Préserver les espaces
        if (letter === ' ') {
          letterSpan.style.marginRight = '0.3em';
        }
        
        element.appendChild(letterSpan);
        
        // Animation de formation de la lettre
        setTimeout(() => {
          letterSpan.style.opacity = '1';
          letterSpan.style.transform = 'scale(1) rotate(0deg)';
          
          // Effet de rebond après formation
          setTimeout(() => {
            letterSpan.style.transform = 'scale(1.1)';
            setTimeout(() => {
              letterSpan.style.transform = 'scale(1)';
            }, 100); // Délai réduit
          }, 400); // Délai réduit
        }, 50); // Délai réduit
        
        currentIndex++;
        setTimeout(formLetter, 80); // Délai entre chaque lettre réduit
      }
    }
    
    formLetter();
  }
  
  // Effet de machine à écrire amélioré inspiré de dunks1980.com
  function typewriterEffectEnhanced(element, text, speed) {
    element.textContent = '';
    let i = 0;
    
    function type() {
      if (i < text.length) {
        const char = text.charAt(i);
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = 'all 0.3s ease-out';
        element.appendChild(span);
        
        // Animation du caractère
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, 50);
        
        i++;
        setTimeout(type, speed);
      } else {
        // Effet de rebond final
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 200);
      }
    }
    
    type();
  }
  
  // Effet de fondu caractère par caractère inspiré de dunks1980.com
  function characterFadeEffect(element, text, speed = 40) {
    element.textContent = '';
    const words = text.split(' ');
    let wordIndex = 0;
    
    function animateWord() {
      if (wordIndex < words.length) {
        const word = words[wordIndex];
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.marginRight = '8px';
        wordSpan.style.opacity = '0';
        wordSpan.style.transform = 'translateY(10px)';
        wordSpan.style.transition = 'all 0.3s ease-out';
        element.appendChild(wordSpan);
        
        let charIndex = 0;
        
        function animateChar() {
          if (charIndex < word.length) {
            const char = word.charAt(charIndex);
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'translateY(15px)';
            charSpan.style.transition = 'all 0.2s ease-out';
            wordSpan.appendChild(charSpan);
            
            // Animation du caractère
            setTimeout(() => {
              charSpan.style.opacity = '1';
              charSpan.style.transform = 'translateY(0)';
            }, 30);
            
            charIndex++;
            setTimeout(animateChar, speed);
          } else {
            // Animation du mot complet
            setTimeout(() => {
              wordSpan.style.opacity = '1';
              wordSpan.style.transform = 'translateY(0)';
            }, 50);
            
            wordIndex++;
            setTimeout(animateWord, 100);
          }
        }
        
        animateChar();
      }
    }
    
    animateWord();
  }
  
  // Animation d'apparition au scroll pour les sections
  function initScrollAnimations() {
    const sections = document.querySelectorAll('.collections, .section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target;
          
          // Animation de la section
          section.style.transition = 'all 1s ease-out';
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
          
          // Animation des éléments enfants
          const children = section.querySelectorAll('h2, h3, p, .carousel-container');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.transition = 'all 0.8s ease-out';
              child.style.opacity = '1';
              child.style.transform = 'scale(1) translateY(0)';
            }, index * 200);
          });
          
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(50px)';
      observer.observe(section);
    });
  }
  
  // Initialize carousel
  function initCarousel() {
    // Réinitialiser l'index
    currentIndex = 0;
    updateCarousel();
  }
  
  // Update carousel display
  function updateCarousel() {
    carouselItems.forEach((item, index) => {
      item.classList.remove('active', 'prev', 'next');
      if (index === currentIndex) {
        item.classList.add('active');
      } else if (index === (currentIndex - 1 + totalItems) % totalItems) {
        item.classList.add('prev');
      } else if (index === (currentIndex + 1) % totalItems) {
        item.classList.add('next');
      }
    });
  
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const activeItem = carouselItems[currentIndex];
    const activeItemWidth = activeItem.offsetWidth;
    const activeItemLeft = activeItem.offsetLeft;
  
    // Récupérer la marge (droite + gauche, mais on suppose symétrique)
    const style = window.getComputedStyle(activeItem);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    const margin = (marginLeft + marginRight) / 2;
  
    // Corriger le centrage en retranchant la moitié de la marge
    const offset = containerWidth / 2 - (activeItemLeft + activeItemWidth / 2 + margin);
    carouselTrack.style.transform = `translateX(${offset}px)`;
  }
  
  
  
  // Add event listeners for carousel navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });
  }
  
  // Popup functionality
  const items = Array.from(carouselItems).map(item => {
    const image = item.getAttribute("data-image");
    return { image };
  });
  
  // Click on carousel items to open popup
  carouselItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      currentIndex = index;
      showPopup();
    });
  });
  
  // Popup navigation
  if (popupPrevBtn) {
    popupPrevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showPopup();
    });
  }
  
  if (popupNextBtn) {
    popupNextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      showPopup();
    });
  }
  
  function showPopup() {
    const item = items[currentIndex];
    if (popupImage && item) {
      popupImage.src = item.image;
      popup.style.display = "flex";
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      if (popup.style.display === 'flex') {
        // In popup mode
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showPopup();
      } else {
        // In carousel mode
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
      }
    } else if (e.key === 'ArrowRight') {
      if (popup.style.display === 'flex') {
        // In popup mode
        currentIndex = (currentIndex + 1) % totalItems;
        showPopup();
      } else {
        // In carousel mode
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
      }
    } else if (e.key === 'Escape') {
      // Close popup with Escape key
      popup.style.display = "none";
    }
  });
  
  // Touch/swipe support for mobile
  let startX = 0;
  let endX = 0;
  
  carouselTrack.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  carouselTrack.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next
        currentIndex = (currentIndex + 1) % totalItems;
      } else {
        // Swipe right - previous
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      }
      updateCarousel();
    }
  }
  
  // Initialize everything
  initCarousel();
  initAboutAnimations();
  initOrganic3D();
  initCustomCursor();

  // Bouton de thème mobile
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  if (themeToggleMobile) {
    let isDarkTheme = true;
    
    themeToggleMobile.addEventListener('click', () => {
      isDarkTheme = !isDarkTheme;
      
      if (isDarkTheme) {
        document.body.classList.remove('theme-light');
        themeToggleMobile.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.body.classList.add('theme-light');
        themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
    
    // Synchroniser avec le thème existant
    if (document.body.classList.contains('theme-light')) {
      isDarkTheme = false;
      themeToggleMobile.innerHTML = '<i class="fas fa-sun"></i>';
    }
  }

  // Animation lune/soleil sur le cercle
  const lune = document.querySelector('.lune-img');
  const soleil = document.querySelector('.soleil-img');
  if (lune && soleil) {
    function getCercleParams() {
      const cercleTop = 300;
      const cercleRayon = (window.innerWidth * 0.8 - 40) / 2;
      const cercleCentreX = window.innerWidth / 2;
      const cercleCentreY = cercleTop + cercleRayon;
      return {cercleTop, cercleRayon, cercleCentreX, cercleCentreY};
    }
    function placeAstre(img, angleRad) {
      const {cercleRayon, cercleCentreX, cercleCentreY} = getCercleParams();
      const x = cercleCentreX + cercleRayon * Math.sin(angleRad) - img.offsetWidth / 2;
      const y = cercleCentreY - cercleRayon * Math.cos(angleRad) - img.offsetHeight / 2;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
    }
    // Etat : true = lune en haut, false = soleil en haut
    let isLuneTop = true;
    // Initialisation
    placeAstre(lune, 0);
    placeAstre(soleil, Math.PI);
    lune.style.display = 'block';
    soleil.style.display = 'block';
    lune.style.pointerEvents = 'auto';
    soleil.style.pointerEvents = 'none';
    // Animation synchronisée
    function animeSwitch(toLuneTop) {
      let start = null;
      const duration = 800;
      let luneStart, luneEnd, soleilStart, soleilEnd;
      if (toLuneTop) {
        // Soleil va de 0 à PI, lune de PI à 2PI
        soleilStart = 0;
        soleilEnd = Math.PI;
        luneStart = Math.PI;
        luneEnd = 2 * Math.PI;
      } else {
        // Lune va de 0 à PI, soleil de PI à 2PI
        luneStart = 0;
        luneEnd = Math.PI;
        soleilStart = Math.PI;
        soleilEnd = 2 * Math.PI;
      }
      lune.style.pointerEvents = 'none';
      soleil.style.pointerEvents = 'none';
      function animate(ts) {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const luneAngle = luneStart + (luneEnd - luneStart) * progress;
        const soleilAngle = soleilStart + (soleilEnd - soleilStart) * progress;
        placeAstre(lune, luneAngle % (2 * Math.PI));
        placeAstre(soleil, soleilAngle % (2 * Math.PI));
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isLuneTop = toLuneTop;
          lune.style.pointerEvents = isLuneTop ? 'auto' : 'none';
          soleil.style.pointerEvents = isLuneTop ? 'none' : 'auto';
          // Correction finale pour être pile à l'opposé
          if (isLuneTop) {
            placeAstre(lune, 0);
            placeAstre(soleil, Math.PI);
          } else {
            placeAstre(lune, Math.PI);
            placeAstre(soleil, 0);
          }
          setTheme(isLuneTop);
        }
      }
      requestAnimationFrame(animate);
    }
    lune.addEventListener('click', () => {
      if (!isLuneTop) return;
      animeSwitch(false);
    });
    soleil.addEventListener('click', () => {
      if (isLuneTop) return;
      animeSwitch(true);
    });
    // Responsive
    window.addEventListener('resize', () => {
      if (isLuneTop) {
        placeAstre(lune, 0);
        placeAstre(soleil, Math.PI);
      } else {
        placeAstre(lune, Math.PI);
        placeAstre(soleil, 0);
      }
    });
  }

  // Ajout du switch de thème lors du changement d'astre
  const body = document.body;
  function setTheme(isDark) {
    if (isDark) {
      body.classList.remove('theme-light');
    } else {
      body.classList.add('theme-light');
    }
  }

  // Configuration EmailJS
  (function() {
    emailjs.init("VzaADM7iV79sbDAzS"); 
  })();

  // Gestion du formulaire de contact
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const statusElement = document.getElementById('form-status');
    
    // Désactiver le bouton pendant l'envoi
    const submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    const templateParams = {
      to_name: "Elsa",
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value,
    };

    emailjs.send('service_yk1z8ls', 'template_twdu6wr', templateParams)
      .then(function(response) {
        statusElement.textContent = 'Message envoyé avec succès !';
        statusElement.className = 'form-status success';
        document.getElementById('contact-form').reset();
      }, function(error) {
        statusElement.textContent = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
        statusElement.className = 'form-status error';
      })
      .finally(function() {
        // Réactiver le bouton
        submitButton.disabled = false;
        
        // Faire disparaître le message après 5 secondes
        setTimeout(() => {
          statusElement.className = 'form-status';
        }, 5000);
      });
  });
});
