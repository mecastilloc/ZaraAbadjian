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

/* ================= MENÚ DESPLEGABLE ================= */

const menuBtn = document.querySelector(".menu-toggle");

menuBtn.addEventListener("click", () => {
  document.querySelectorAll(".nav-links").forEach(nav => {
    if (nav.getAttribute("data-lang") === currentLang) {
      nav.classList.toggle("show");
    } else {
      nav.classList.remove("show");
    }
  });
});

/* Cerrar menú al hacer click en un link */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links").forEach(nav => nav.classList.remove("show"));
  });
});

/* Cerrar menú al hacer scroolk */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".nav-links").forEach(nav => nav.classList.remove("show"));
  document.querySelector(".menu-toggle").classList.remove("active");
});

/* Cerrar menú al hacer click */
document.addEventListener("click", (e) => {
  const menu = document.querySelector(".nav-links.show");
  const toggle = document.querySelector(".menu-toggle");

  // Si hay menú abierto y el click NO fue en el menú ni en el botón
  if (menu && !menu.contains(e.target) && !toggle.contains(e.target)) {
    menu.classList.remove("show");
    toggle.classList.remove("active");
  }
});



// FAQ toggle
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("open"));
});

// Año dinámico
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("year-en").textContent = new Date().getFullYear();


//PDFS en la misma página modo mobil
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a[href$='.pdf']").forEach(link => {
    link.removeAttribute("target");
  });
});


/* Inicializar idioma al cargar */
updateLanguage();
