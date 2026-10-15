/* ═══════════════════════════════════════════════════════
   MAIN.JS — shared page behavior for every page:
   custom cursor, scroll-reveal animation, nav shrink-on-scroll.
   No page-specific content lives here on purpose.
═══════════════════════════════════════════════════════ */

/* ─── Custom cursor ─── */
(function () {
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  if (!cursor || !ring) return;

  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();
})();

/* ─── Scroll reveal ─── */
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );
  reveals.forEach((el) => observer.observe(el));
})();

/* ─── Nav shrink on scroll ─── */
(function () {
  const nav = document.querySelector("nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.style.padding = window.scrollY > 50 ? "0.9rem 2rem" : "1.25rem 2rem";
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".project-slide-item");
  const prevBtn = document.getElementById("showcasePrev");
  const nextBtn = document.getElementById("showcaseNext");
  let activeIndex = 0;
  const totalSlides = slides.length;

  function goToSlide(targetIndex) {
    slides[activeIndex].classList.remove("is-active");

    if (targetIndex < 0) {
      activeIndex = totalSlides - 1;
    } else if (targetIndex >= totalSlides) {
      activeIndex = 0;
    } else {
      activeIndex = targetIndex;
    }

    slides[activeIndex].classList.add("is-active");
  }

  prevBtn.addEventListener("click", () => goToSlide(activeIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(activeIndex + 1));
});

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Logika Slider Showcase Proyek (Work Section)
    // ==========================================
    const projectSlides = document.querySelectorAll('.project-slide-item');
    const prevBtn = document.getElementById('showcasePrev');
    const nextBtn = document.getElementById('showcaseNext');

    if (projectSlides.length > 0 && prevBtn && nextBtn) {
        let currentProjectIndex = 0;

        function showProjectSlide(index) {
            projectSlides.forEach((slide) => {
                slide.classList.remove('is-active');
            });
            projectSlides[index].classList.add('is-active');
        }

        nextBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex + 1) % projectSlides.length;
            showProjectSlide(currentProjectIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentProjectIndex = (currentProjectIndex - 1 + projectSlides.length) % projectSlides.length;
            showProjectSlide(currentProjectIndex);
        });
    }


    // ==========================================
    // 2. Logika Carousel Sertifikat (Certificates Section)
    // ==========================================
    const certTrack = document.getElementById('certTrack');
    const certPrevBtn = document.getElementById('certPrev');
    const certNextBtn = document.getElementById('certNext');
    const certItems = document.querySelectorAll('.cert-slide-item');

    if (certTrack && certPrevBtn && certNextBtn && certItems.length > 0) {
        let currentCertIndex = 0;

        function getVisibleCardsCount() {
            if (window.innerWidth <= 576) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }

        function updateCertSlider() {
            const visibleCards = getVisibleCardsCount();
            const maxIndex = certItems.length - visibleCards;
            
            if (currentCertIndex > maxIndex) currentCertIndex = maxIndex;
            if (currentCertIndex < 0) currentCertIndex = 0;

            const cardWidth = certItems[0].getBoundingClientRect().width;
            const gap = 24; // Nilai gap CSS 1.5rem
            const moveAmount = (cardWidth + gap) * currentCertIndex;

            certTrack.style.transform = `translateX(-${moveAmount}px)`;
        }

        certNextBtn.addEventListener('click', () => {
            const visibleCards = getVisibleCardsCount();
            const maxIndex = certItems.length - visibleCards;
            if (currentCertIndex < maxIndex) {
                currentCertIndex++;
            } else {
                currentCertIndex = 0; // Infinite reset ke awal
            }
            updateCertSlider();
        });

        certPrevBtn.addEventListener('click', () => {
            if (currentCertIndex > 0) {
                currentCertIndex--;
            } else {
                const visibleCards = getVisibleCardsCount();
                currentCertIndex = certItems.length - visibleCards; // Ke slide akhir
            }
            updateCertSlider();
        });

        window.addEventListener('resize', updateCertSlider);
    }

});