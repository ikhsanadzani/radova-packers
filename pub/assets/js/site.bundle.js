// ponytail: consolidated 5 page bundles and loader.js into one deferred script
(function () {
  "use strict";

  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const langBtn = document.getElementById("lang-toggle");
  const navToggle = document.getElementById("nav-toggle");
  const headerMenu = document.getElementById("header-menu");
  const backToTopBtn = document.getElementById("back-to-top");

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  if (themeBtn) {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    themeBtn.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("radova-theme", next);
      } catch (_) {}
    });
  }

  const i18n = {
    en: {
      chip: "Packers Manual · v1.0.0.0",
      download: "Download",
      github: "GitHub Repository",
      developer: "Developer",
      version: "Latest Version",
      manualPages: "Manual Pages",
      backToTop: "Back to top",
      subtitle: "Official reference manual, command synopsis, and usage guide for Radova Packers.",
      categories: "Categories",
      tutorials: "Tutorials",
      category: "Category",
      chipTutorials: "3 tutorials",
      navigation: "Navigation",
      package: "Package",
      maintainers: "Maintainers",
      follow: "Follow on GitHub",
      forumIntro: "The packers discussion runs on GitHub Issues through utterances. Sign in with GitHub to join in."
    },
    id: {
      chip: "Manual Packers · v1.0.0.0",
      download: "Unduh",
      github: "Repositori GitHub",
      developer: "Pengembang",
      version: "Versi Terbaru",
      manualPages: "Halaman Manual",
      backToTop: "Kembali ke atas",
      subtitle: "Manual referensi resmi, sinopsis perintah, dan panduan penggunaan Radova Packers.",
      categories: "Kategori",
      tutorials: "Tutorial",
      category: "Kategori",
      chipTutorials: "3 tutorial",
      navigation: "Navigasi",
      package: "Paket",
      maintainers: "Pengelola",
      follow: "Ikuti di GitHub",
      forumIntro: "Diskusi packers berjalan di GitHub Issues lewat utterances. Masuk dengan akun GitHub untuk ikut berdiskusi."
    }
  };

  function applyLang(lang) {
    const dict = i18n[lang] || i18n.en;
    root.setAttribute("lang", lang);
    if (langBtn) {
      langBtn.textContent = lang.toUpperCase();
      langBtn.setAttribute(
        "aria-label",
        lang === "id" ? "Ganti bahasa ke Inggris" : "Switch language to Indonesian"
      );
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
  }

  if (langBtn) {
    let savedLang = "en";
    try {
      savedLang = localStorage.getItem("radova-lang") || "en";
    } catch (_) {}
    applyLang(savedLang);

    langBtn.addEventListener("click", function () {
      const next = root.getAttribute("lang") === "id" ? "en" : "id";
      applyLang(next);
      try {
        localStorage.setItem("radova-lang", next);
      } catch (_) {}
    });
  }

  if (navToggle && headerMenu) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      headerMenu.classList.toggle("is-open", !expanded);
    });
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  let commentsTheme = null;
  function syncComments() {
    const frame = document.querySelector(".utterances-frame");
    const theme = root.getAttribute("data-theme") === "dark" ? "github-dark" : "github-light";
    if (!frame || theme === commentsTheme) return;
    frame.contentWindow.postMessage({ type: "set-theme", theme: theme }, "https://utteranc.es");
    commentsTheme = theme;
  }
  if (document.querySelector(".utterances") || document.querySelector(".utterances-frame")) {
    window.addEventListener("message", function (e) {
      if (e.origin === "https://utteranc.es") syncComments();
    });
    if (themeBtn) themeBtn.addEventListener("click", syncComments);
    syncComments();
  }
})();
