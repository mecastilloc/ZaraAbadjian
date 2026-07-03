/* ================= IDIOMA ================= */

const langBtn = document.getElementById("lang-toggle");
let currentLang = "es";

function updateLanguage() {
  document.querySelectorAll("[data-lang]").forEach(el => {
    const lang = el.getAttribute("data-lang");

    if (lang === currentLang) {
      el.style.visibility = "visible";
      el.style.position = "relative";
      el.style.height = "auto";
      el.style.opacity = "1";
      el.style.pointerEvents = "auto";
    } else {
      el.style.visibility = "hidden";
      el.style.position = "absolute";
      el.style.height = "0";
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
    }
  });

  langBtn.textContent = currentLang === "es" ? "EN" : "ES";
}

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  updateLanguage();

  const homeId = currentLang === "es" ? "home-es" : "home-en";
  const el = document.getElementById(homeId);
  if (el) {
    el.scrollIntoView({
      behavior: "auto",
      block: "start"
    });
  }
});


/* ================= SCROLL FIABLE ================= */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;

  window.scrollTo({
    top: y,
    behavior: "auto"
  });
}


/* ============================================================
   CARRUSELES — FUNCIONAR EN ES Y EN
   ============================================================ */

function initCarousels() {
  document.querySelectorAll(".carousel").forEach(carousel => {

    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    let index = 0;

    function updateCarousel() {
      const width = slides[0].offsetWidth;
      track.style.transform = `translateX(-${index * width}px)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    // Ajustar al cargar
    updateCarousel();
    window.addEventListener("resize", updateCarousel);
  });
}

initCarousels();



// FAQ toggle
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("open"));
});

// Año dinámico
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("year-en").textContent = new Date().getFullYear();


/* Inicializar idioma al cargar */
updateLanguage();