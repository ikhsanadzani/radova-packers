(function () {
  "use strict";

  let loaded = false;

  function loadBundle() {
    if (loaded) return;
    loaded = true;
    const script = document.createElement("script");
    script.src = "/assets/js/mans.bundle.js";
    script.defer = true;
    document.body.appendChild(script);
  }

  let savedTheme = null;
  let savedLang = null;
  try {
    savedTheme = localStorage.getItem("radova-theme");
    savedLang = localStorage.getItem("radova-lang");
  } catch (_) {}

  if (savedTheme === "dark" || savedLang === "id") {
    loadBundle();
  } else {
    ["pointerdown", "keydown", "touchstart", "focusin"].forEach(function (evt) {
      window.addEventListener(evt, loadBundle, { once: true, passive: true });
    });
    window.addEventListener("load", function () {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadBundle, { timeout: 2500 });
      } else {
        setTimeout(loadBundle, 1200);
      }
    }, { once: true });
  }
})();
