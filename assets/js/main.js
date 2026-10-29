/* =========================================================
   Shared behaviour for every page
   - header colour on scroll, mobile menu
   - gentle reveal of content as it scrolls in (GSAP)
   - hero zoom, image galleries
   - enquiry form: "Product of interest" follows the brand chosen
   If GSAP fails to load, the site still works, just without motion.
   ========================================================= */
(function () {
  const doc = document.documentElement;
  doc.classList.remove("no-js");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) doc.classList.add("reduced");
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  /* ---------- Header ---------- */
  const header = document.querySelector(".site-header");
  const darkHero = document.querySelector("[data-dark-hero]");
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 40);
    if (darkHero) header.classList.toggle("on-dark", y < darkHero.offsetHeight - 80);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = header.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    header.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
      header.classList.remove("open"); document.body.style.overflow = ""; menuBtn.setAttribute("aria-expanded", false);
    }));
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- Galleries (PARÉ and others) ---------- */
  window.initGallery = function (root) {
    const imgs = root.querySelectorAll(".main img");
    const btns = root.querySelectorAll(".thumbs button");
    btns.forEach((b, i) => b.addEventListener("click", () => {
      imgs.forEach((im, j) => im.classList.toggle("out", j !== i));
      btns.forEach((x, j) => x.setAttribute("aria-pressed", j === i));
    }));
  };
  document.querySelectorAll(".gallery").forEach(window.initGallery);

  /* ---------- Enquiry form ---------- */
  const PRODUCTS = {
    "Whitelion": ["Smart touch panels", "Smart displays", "Curtain automation", "Smart locks", "Sensors", "Whole-home automation"],
    "PARÉ": ["LUXE panels", "INNOV2+ wall and ceiling", "DURA+ facade", "LVT flooring", "TOUGH laminate flooring"],
    "LUFT": ["Ceiling fans", "Wall fans", "Pedestal and table fans", "Exhaust and ventilation", "Air purifier"],
    "LMT": ["Pergolas and retractable roofs", "Awnings and blinds", "Garage doors", "Gate automation", "Custom automation"]
  };
  document.querySelectorAll("form.form").forEach(form => {
    const brand = form.querySelector("[name=brand]");
    const product = form.querySelector("[name=product]");
    function fill() {
      const list = PRODUCTS[brand.value] || Object.values(PRODUCTS).flat();
      const keep = product.value;
      product.innerHTML = '<option value="">Not sure yet</option>' + list.map(p => `<option>${p}</option>`).join("");
      if (list.includes(keep)) product.value = keep;
    }
    if (brand && product) { brand.addEventListener("change", fill); fill(); }
  });

  if (!hasGsap || reduced) {
    document.querySelectorAll(".reveal").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
    return;
  }

  /* ---------- Motion (GSAP) ---------- */
  gsap.registerPlugin(ScrollTrigger);
  const ease = "expo.out";

  // Content fades and rises once as it enters the screen
  ScrollTrigger.batch(".reveal", {
    start: "top 88%",
    once: true,
    onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1.2, ease, stagger: 0.08, overwrite: true })
  });

  // Hero: headline lines rise in, image settles from a slight zoom, then drifts on scroll
  const hero = document.querySelector(".hero");
  if (hero) {
    const img = hero.querySelector(".hero-media img");
    const tl = gsap.timeline({ defaults: { ease } });
    tl.from(img, { scale: 1.14, duration: 2.4 })
      .from(hero.querySelectorAll(".hero-line > span"), { yPercent: 110, duration: 1.4, stagger: 0.09 }, 0.25)
      .from(hero.querySelectorAll(".lede, .btn-row"), { opacity: 0, y: 18, duration: 1.2, stagger: 0.1 }, 0.7);
    gsap.to(img, { yPercent: 12, scale: 1.06, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 } });
  }

  // Brand-page hero images: gentle parallax inside their frame
  document.querySelectorAll("[data-parallax] img").forEach(img => {
    gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none",
      scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 } });
  });

  // Home story: pin the stage and switch chapters as you scroll
  const stage = document.querySelector(".story-stage");
  if (stage && window.matchMedia("(min-width: 901px)").matches) {
    const pics = stage.querySelectorAll(".story-pics img");
    const chapters = stage.querySelectorAll(".chapter");
    const dots = stage.querySelectorAll(".story-progress i");
    const n = chapters.length;
    let current = 0;
    function show(i) {
      if (i === current) return;
      gsap.to(pics[current], { opacity: 0, duration: 1.1, ease: "power2.out" });
      gsap.fromTo(pics[i], { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 1.6, ease });
      gsap.to(chapters[current], { opacity: 0, y: -24, duration: 0.6, ease: "power2.in" });
      gsap.fromTo(chapters[i], { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1.1, ease, delay: 0.25 });
      current = i;
      dots.forEach((d, j) => d.classList.toggle("on", j <= i));
    }
    dots[0] && dots[0].classList.add("on");
    gsap.set(chapters, { opacity: 0 }); gsap.set(chapters[0], { opacity: 1 });
    ScrollTrigger.create({
      trigger: stage, pin: ".story-pin", start: "top top", end: () => "+=" + window.innerHeight * (n - 0.3),
      onUpdate: self => show(Math.min(n - 1, Math.floor(self.progress * n * 0.999)))
    });
  }
})();
