const year = document.getElementById('year');
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('open', !expanded);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
    }
  });
}

// Home page carousel (Men/Women/Beauty)
const homeCarousel = document.getElementById('home-carousel');
if (homeCarousel) {
  const slides = homeCarousel.querySelectorAll('.carousel-slide');
  const dots = homeCarousel.querySelectorAll('.carousel-dot');
  const prevBtn = homeCarousel.querySelector('.carousel-prev');
  const nextBtn = homeCarousel.querySelector('.carousel-next');

  let activeIndex = 0;
  let timer = null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goTo = (idx) => {
    const nextIndex = ((idx % slides.length) + slides.length) % slides.length;
    slides.forEach((s) => s.classList.remove('active'));
    dots.forEach((d) => {
      d.classList.remove('active');
      d.setAttribute('aria-selected', 'false');
    });

    activeIndex = nextIndex;
    const activeSlide = slides[activeIndex];
    if (activeSlide) activeSlide.classList.add('active');

    const activeDot = dots[activeIndex];
    if (activeDot) {
      activeDot.classList.add('active');
      activeDot.setAttribute('aria-selected', 'true');
    }
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const go = Number(dot.dataset.go || 0);
      goTo(go);
      if (timer) clearInterval(timer);
      if (!prefersReducedMotion) {
        timer = setInterval(() => goTo(activeIndex + 1), 7000);
      }
    });
  });

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(activeIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(activeIndex + 1));

  if (!prefersReducedMotion) {
    timer = setInterval(() => goTo(activeIndex + 1), 7000);

    homeCarousel.addEventListener('mouseenter', () => {
      if (timer) clearInterval(timer);
      timer = null;
    });
    homeCarousel.addEventListener('mouseleave', () => {
      if (!timer) timer = setInterval(() => goTo(activeIndex + 1), 7000);
    });
  }
}

const reviewsList = document.getElementById('reviews-list');
if (reviewsList) {
  const reviewSnippets = [
    "Amazing haircut and very friendly team. The stylist really listened and delivered exactly what I wanted.",
    "Clean salon, professional service, and excellent finish. Highly recommended for both cuts and styling.",
    "Great attention to detail and fantastic customer care. One of the best salon experiences I have had.",
    "Booked by phone and got a perfect slot. Super smooth service and a sharp final look.",
    "Loved the vibe and quality of work. The team is skilled, welcoming, and very consistent."
  ];

  const reviewerNames = [
    "A. Sharma", "P. Singh", "M. Kaur", "R. Patel", "S. Verma",
    "K. Gill", "T. Arora", "N. Kumar", "D. Mehta", "J. Sandhu"
  ];

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 50; i += 1) {
    const article = document.createElement('article');
    article.className = 'card review';
    article.innerHTML = `
      <p class="stars" aria-label="5 out of 5 stars">★★★★★</p>
      <p>"${reviewSnippets[i % reviewSnippets.length]}"</p>
      <h4>${reviewerNames[i % reviewerNames.length]}</h4>
      <span>Google Review - 5.0</span>
    `;
    fragment.appendChild(article);
  }
  reviewsList.appendChild(fragment);
}

const galleryGrid = document.getElementById('gallery-grid');
const galleryCarousel = document.getElementById('gallery-carousel');
const carouselImage = document.getElementById('gallery-carousel-image');
const layoutButtons = document.querySelectorAll('.gallery-layout-btn');
const prevBtn = document.getElementById('gallery-prev');
const nextBtn = document.getElementById('gallery-next');

if (galleryGrid && galleryCarousel && carouselImage && layoutButtons.length) {
  const imageUrls = Array.from(galleryGrid.querySelectorAll('img')).map((img) => img.src);
  let currentIndex = 0;

  const setLayout = (layout) => {
    layoutButtons.forEach((btn) => {
      const active = btn.dataset.layout === layout;
      btn.classList.toggle('active', active);
    });

    galleryGrid.classList.remove('masonry');
    galleryGrid.style.display = 'grid';
    galleryCarousel.classList.remove('active');

    if (layout === 'masonry') {
      galleryGrid.classList.add('masonry');
    } else if (layout === 'carousel') {
      galleryGrid.style.display = 'none';
      galleryCarousel.classList.add('active');
    }
  };

  layoutButtons.forEach((btn) => {
    btn.addEventListener('click', () => setLayout(btn.dataset.layout));
  });

  const showImage = () => {
    carouselImage.src = imageUrls[currentIndex];
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
      showImage();
    });
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % imageUrls.length;
      showImage();
    });
  }
}

const fluffyTracks = document.querySelectorAll('.fluffy-track');
const galleryModal = document.getElementById('gallery-modal');
const galleryModalClose = document.getElementById('gallery-modal-close');
const galleryModalImage = document.getElementById('gallery-modal-image');
const galleryModalTitle = document.getElementById('gallery-modal-title');
const galleryModalText = document.getElementById('gallery-modal-text');
const galleryModalPrev = document.getElementById('gallery-modal-prev');
const galleryModalNext = document.getElementById('gallery-modal-next');

if (fluffyTracks.length) {
  fluffyTracks.forEach((track) => {
    if (!track.dataset.loopReady) {
      track.innerHTML = `${track.innerHTML}${track.innerHTML}`;
      track.dataset.loopReady = 'true';
    }
  });
}

const fluffyCards = document.querySelectorAll('.fluffy-card');

if (
  fluffyCards.length &&
  galleryModal &&
  galleryModalClose &&
  galleryModalImage &&
  galleryModalTitle &&
  galleryModalText &&
  galleryModalPrev &&
  galleryModalNext
) {
  let currentIndex = 0;

  const cardsArray = Array.from(fluffyCards);
  let lastFocusedEl = null;

  // Accessibility: make gallery cards act like buttons.
  fluffyCards.forEach((card) => {
    card.setAttribute('role', 'button');
    const title = card.querySelector('h3');
    const text = card.querySelector('p');
    const label = title ? title.textContent : 'Gallery image';
    const extra = text ? `, ${text.textContent}` : '';
    card.setAttribute('aria-label', `${label}${extra}`);
  });

  // Modal carousel should not depend on duplicated DOM nodes.
  // Build a unique list by image src so Prev/Next always works reliably.
  const uniqueCards = [];
  const srcToIndex = new Map();
  cardsArray.forEach((cardEl) => {
    const img = cardEl.querySelector('img');
    const titleEl = cardEl.querySelector('h3');
    const textEl = cardEl.querySelector('p');
    if (!img || !titleEl || !textEl) return;
    const src = img.getAttribute('src') || '';
    if (!src || srcToIndex.has(src)) return;
    srcToIndex.set(src, uniqueCards.length);
    uniqueCards.push({
      src,
      alt: img.getAttribute('alt') || '',
      title: titleEl.textContent || '',
      text: textEl.textContent || ''
    });
  });

  const setModalContent = (index) => {
    const item = uniqueCards[index];
    if (!item) return;
    galleryModalImage.alt = item.alt;
    galleryModalImage.src = '';
    galleryModalImage.getBoundingClientRect();
    galleryModalImage.src = item.src;
    galleryModalTitle.textContent = item.title;
    galleryModalText.textContent = item.text;

    window.requestAnimationFrame(() => {
      galleryModalImage.getBoundingClientRect();
    });
  };

  const openModal = (card) => {
    const img = card ? card.querySelector('img') : null;
    const src = img ? img.getAttribute('src') : '';
    if (!src || !srcToIndex.has(src)) return;
    currentIndex = srcToIndex.get(src);
    setModalContent(currentIndex);
    galleryModal.classList.add('open');
    document.body.classList.add('gallery-modal-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    lastFocusedEl = document.activeElement;
    galleryModalClose.focus();
  };

  const closeModal = () => {
    galleryModal.classList.remove('open');
    document.body.classList.remove('gallery-modal-open');
    galleryModalImage.src = '';
    galleryModal.setAttribute('aria-hidden', 'true');
    if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
  };

  document.addEventListener('click', (event) => {
    const card = event.target.closest('.fluffy-card');
    if (card) openModal(card);
  });

  document.addEventListener('keydown', (event) => {
    if (galleryModal.classList.contains('open') && event.key === 'Tab') {
      // Minimal focus management: keep tab focus inside modal controls.
      const focusables = galleryModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    const active = document.activeElement;
    if (
      active &&
      active.classList &&
      active.classList.contains('fluffy-card') &&
      (event.key === 'Enter' || event.key === ' ')
    ) {
      event.preventDefault();
      openModal(active);
    }
  });

  galleryModalPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + uniqueCards.length) % uniqueCards.length;
    setModalContent(currentIndex);
    galleryModalClose.focus();
  });

  galleryModalNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % uniqueCards.length;
    setModalContent(currentIndex);
    galleryModalClose.focus();
  });

  galleryModalClose.addEventListener('click', closeModal);
  galleryModal.addEventListener('click', (event) => {
    if (event.target === galleryModal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (galleryModal.classList.contains('open') && event.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + uniqueCards.length) % uniqueCards.length;
      setModalContent(currentIndex);
      galleryModalClose.focus();
    }
    if (galleryModal.classList.contains('open') && event.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % uniqueCards.length;
      setModalContent(currentIndex);
      galleryModalClose.focus();
    }
    if (event.key === 'Escape' && galleryModal.classList.contains('open')) {
      closeModal();
    }
  });
}
