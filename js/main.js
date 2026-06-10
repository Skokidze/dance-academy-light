/* Академия Танца — light edition · mobile-first interactions */
(function () {
  "use strict";
  const nav = document.getElementById("nav");
  const burger = document.getElementById("burger");
  const scrim = document.getElementById("scrim");
  const actionbar = document.getElementById("actionbar");

  /* sticky nav state */
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 20);
    // show bottom action bar after leaving hero
    if (actionbar) actionbar.classList.toggle("show", window.scrollY > 480);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile menu */
  const closeMenu = () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
  const toggleMenu = () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", toggleMenu);
  scrim.addEventListener("click", closeMenu);
  document.querySelectorAll("#menu a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* animated counters */
  const counters = document.querySelectorAll("[data-count]");
  const run = (el) => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || "", dur = 1400, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach((el) => (el.textContent = el.dataset.count + (el.dataset.suffix || "")));
  }

  /* trial form (demo) */
  const form = document.getElementById("trialForm");
  const btn = document.getElementById("trialBtn");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.name.value.trim() || !form.phone.value.trim()) {
      btn.textContent = "Заполните имя и телефон";
      setTimeout(() => (btn.textContent = "Записаться на пробное"), 2200);
      return;
    }
    btn.textContent = "Заявка отправлена ✦";
    form.reset();
    setTimeout(() => (btn.textContent = "Записаться на пробное"), 3500);
  });
})();
