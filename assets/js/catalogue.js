/* =========================================================
   Builds the product sections from the files in /data.
   You never edit this to add products: edit data/*.js instead.
   ========================================================= */
(function () {
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- A reusable sheet (dialog) ---------- */
  const sheet = document.querySelector("dialog.sheet");
  function openSheet(title, html) {
    if (!sheet) return;
    sheet.querySelector(".sheet-head h2").textContent = title;
    sheet.querySelector(".sheet-body").innerHTML = html;
    sheet.querySelector(".sheet-inner").scrollTop = 0;
    sheet.showModal();
    if (window.gsap && !reduced) {
      gsap.fromTo(sheet.querySelector(".sheet-inner"), { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out" });
      gsap.from(sheet.querySelectorAll(".product, .fan-detail > *, .sheet-foot"), { opacity: 0, y: 24, duration: 0.9, ease: "expo.out", stagger: 0.06, delay: 0.1 });
    }
  }
  function closeSheet() {
    if (!sheet || !sheet.open) return;
    const done = () => sheet.close();
    if (window.gsap && !reduced) gsap.to(sheet.querySelector(".sheet-inner"), { opacity: 0, y: 24, duration: 0.35, ease: "power2.in", onComplete: done });
    else done();
  }
  if (sheet) {
    sheet.querySelector(".close").addEventListener("click", closeSheet);
    sheet.addEventListener("cancel", e => { e.preventDefault(); closeSheet(); });
    sheet.addEventListener("click", e => { if (e.target === sheet) closeSheet(); });
  }

  /* ---------- WHITELION: series → products ---------- */
  const WL = window.WHITELION, wlGrid = document.getElementById("wl-series");
  if (WL && wlGrid) {
    wlGrid.innerHTML = WL.series.map(s => `
      <button class="series-card reveal" data-tone="${s.tone}" data-series="${s.id}" aria-haspopup="dialog">
        <span class="count">${s.products.length} ${s.products.length === 1 ? "product" : "products"}</span>
        <span class="pic"><img src="${s.image}" alt="" loading="lazy"></span>
        <span class="meta"><span class="kind">${esc(s.kind)}</span><h3>${esc(s.name)}</h3><p>${esc(s.line)}</p></span>
      </button>`).join("");
    wlGrid.addEventListener("click", e => {
      const card = e.target.closest("[data-series]"); if (!card) return;
      const s = WL.series.find(x => x.id === card.dataset.series);
      openSheet(s.name, `
        <p class="lede" style="margin-bottom:22px">${esc(s.line)}</p>
        <div class="product-list">${s.products.map(p => `
          <article class="product">
            <div class="pic"><img src="${p.image}" alt="${esc(p.name)}" loading="lazy"></div>
            <div>
              <h3>${esc(p.name)}</h3>
              <p class="tagline">${esc(p.tagline)}</p>
              <p>${esc(p.text)}</p>
              <div class="label">Features</div>
              <ul>${p.features.map(f => `<li>${esc(f)}</li>`).join("")}</ul>
              <div class="row"><b>What it controls</b><span class="tags">${p.controls.map(c => `<span class="tag">${esc(c)}</span>`).join("")}</span></div>
              ${p.finishes ? `<div class="row" style="margin-top:8px"><b>Finishes</b><span>${p.finishes.join(", ")}</span></div>` : ""}
            </div>
          </article>`).join("")}
        </div>
        <div class="sheet-foot">
          <div style="display:flex;gap:16px;align-items:center"><img src="${WL.warranty.image}" alt="AirCare+ seven-year warranty badge"><div><strong>${WL.warranty.years}-year ${WL.warranty.name} warranty</strong><br><span style="opacity:.8">Installed and set up by Whitelion-trained technicians.</span></div></div>
          <a class="btn btn-light" href="#enquire" data-close>Ask about ${esc(s.name)}</a>
        </div>`);
    });
    sheet && sheet.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeSheet(); });
  }

  /* ---------- PARÉ: tabs per series ---------- */
  const PA = window.PARE, paRoot = document.getElementById("pare-series");
  if (PA && paRoot) {
    const tabs = PA.series.map((s, i) => `<button class="tab" role="tab" id="tab-${s.id}" aria-controls="panel-${s.id}" aria-selected="${i === 0}">${esc(s.name)}</button>`).join("");
    const panels = PA.series.map((s, i) => `
      <div class="series-panel" role="tabpanel" id="panel-${s.id}" aria-labelledby="tab-${s.id}" ${i ? "hidden" : ""}>
        <div class="gallery">
          <div class="main">${s.images.map((src, j) => `<img src="${src}" alt="PARÉ ${esc(s.name)} installation ${j + 1}" class="${j ? "out" : ""}" ${j ? 'loading="lazy"' : ""}>`).join("")}</div>
          <div class="thumbs">${s.images.map((src, j) => `<button aria-pressed="${j === 0}" aria-label="Show image ${j + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join("")}</div>
        </div>
        <div class="panel-copy">
          <h3>${esc(s.name)}</h3>
          <p class="kind">${esc(s.kind)}</p>
          ${s.warranty ? `<span class="warranty-pill">${esc(s.warranty)}</span>` : `<span class="warranty-pill unknown">Warranty: ask us</span>`}
          <p>${esc(s.text)}</p>
          <div class="label">Range</div>
          <ul class="list-plain">${s.products.map(p => `<li><b>${esc(p.name)}</b><span>${esc(p.detail)}</span></li>`).join("")}</ul>
          ${s.shades.length ? `<div class="label">Shades</div><div class="shades">${s.shades.map(c => `<span class="shade"><i style="background-color:${c.hex}"></i>${esc(c.name)}</span>`).join("")}</div>` : ""}
          <div class="label">Features</div>
          <div class="tags" style="margin-bottom:26px">${s.features.map(f => `<span class="tag">${esc(f)}</span>`).join("")}</div>
          <div class="label">Specifications</div>
          <ul class="list-plain">${s.specs.map(([k, v]) => `<li><b>${esc(k)}</b><span>${esc(v)}</span></li>`).join("")}</ul>
          ${s.install ? `<div class="label">Installation</div><ol style="padding-left:20px;color:var(--muted)">${s.install.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
        </div>
      </div>`).join("");
    paRoot.innerHTML = `<div class="tabs" role="tablist" aria-label="PARÉ collections">${tabs}</div>${panels}`;
    paRoot.querySelectorAll(".gallery").forEach(g => window.initGallery && window.initGallery(g));
    const tabEls = [...paRoot.querySelectorAll(".tab")];
    function select(t) {
      tabEls.forEach(x => x.setAttribute("aria-selected", x === t));
      paRoot.querySelectorAll(".series-panel").forEach(p => p.hidden = p.id !== t.getAttribute("aria-controls"));
      const shown = document.getElementById(t.getAttribute("aria-controls"));
      if (window.gsap && !reduced) gsap.fromTo(shown.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 });
      history.replaceState(null, "", "#" + t.id.replace("tab-", ""));
    }
    tabEls.forEach((t, i) => {
      t.addEventListener("click", () => select(t));
      t.addEventListener("keydown", e => {
        const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (d) { const n = tabEls[(i + d + tabEls.length) % tabEls.length]; n.focus(); select(n); }
      });
    });
    const fromHash = tabEls.find(t => "#" + t.id.replace("tab-", "") === location.hash);
    if (fromHash) select(fromHash);
  }

  /* ---------- LUFT: fan finder ---------- */
  const LU = window.LUFT, grid = document.getElementById("fan-grid");
  if (LU && grid) {
    const filters = { category: "all", motor: "all", mount: "all", size: "all" };
    const sizeOf = f => { const m = String(f.size).match(/\d+/g); return m ? Math.max(...m.map(Number)) : 0; };
    const inSize = (f, s) => { if (s === "all") return true; const v = sizeOf(f); if (f.size.includes("cm") || f.size.includes("mm")) return s === "small"; return s === "small" ? v <= 36 : s === "medium" ? v > 36 && v <= 52 : v > 52; };
    function list() {
      return LU.products.filter(f =>
        (filters.category === "all" || f.category === filters.category) &&
        (filters.motor === "all" || f.motor === filters.motor) &&
        (filters.mount === "all" || f.mount === filters.mount) && inSize(f, filters.size));
    }
    function draw() {
      const items = list();
      document.getElementById("fan-count").textContent = `${items.length} of ${LU.products.length} fans`;
      grid.innerHTML = items.length ? items.map(f => `
        <button class="fan-card" data-slug="${f.slug}" aria-haspopup="dialog">
          <span class="pic ${f.img ? "" : "photo"}"><img src="${f.img || f.room}" alt="" loading="lazy"></span>
          <span class="meta"><h3>${esc(f.name)}</h3><span class="spec">${esc(f.size)} · ${esc(f.motor)} motor${f.airflow ? " · " + esc(f.airflow) : ""}</span></span>
        </button>`).join("") : `<p class="empty">No fan matches all of these. Clear a filter to see more.</p>`;
      if (window.gsap && !reduced) gsap.from(grid.children, { opacity: 0, y: 16, duration: 0.6, ease: "expo.out", stagger: { amount: 0.3 } });
    }
    document.querySelectorAll(".filters .chip").forEach(chip => chip.addEventListener("click", () => {
      const key = chip.dataset.key;
      filters[key] = chip.dataset.value;
      document.querySelectorAll(`.filters .chip[data-key="${key}"]`).forEach(c => c.setAttribute("aria-pressed", c === chip));
      draw();
    }));
    grid.addEventListener("click", e => {
      const c = e.target.closest("[data-slug]"); if (!c) return;
      const f = LU.products.find(x => x.slug === c.dataset.slug);
      openSheet(f.name, `
        <div class="fan-detail">
          ${f.img ? `<div class="pic"><img src="${f.img}" alt="LUFT ${esc(f.name)} fan"></div>` : ""}
          ${f.room ? `<div class="room-pic"><img src="${f.room}" alt="LUFT ${esc(f.name)} in a room setting"></div>` : ""}
        </div>
        <table class="spec-table">
          <tr><th>Type</th><td>${esc(f.category)}</td></tr>
          <tr><th>Size</th><td>${esc(f.size)}</td></tr>
          <tr><th>Motor</th><td>${f.motor === "DC" ? "DC (energy-efficient, quiet)" : "AC"}</td></tr>
          ${f.airflow ? `<tr><th>Airflow</th><td>${esc(f.airflow)}</td></tr>` : ""}
          <tr><th>Mounting</th><td>${esc(f.mount)}</td></tr>
          <tr><th>Remote</th><td>${f.remote ? "Included" : "Not included"}</td></tr>
          ${f.waterproof ? `<tr><th>Use</th><td>Waterproof, for verandahs and outdoor spaces</td></tr>` : ""}
        </table>
        <div class="sheet-foot"><span>Manufacturer's warranty. Installation by our trained team keeps it valid.</span><a class="btn btn-light" href="#enquire" data-close>Ask about ${esc(f.name)}</a></div>`);
    });
    sheet && sheet.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeSheet(); });
    draw();
  }

  /* ---------- LMT: what we implement ---------- */
  const LM = window.LMT, lmRoot = document.getElementById("lmt-groups");
  if (LM && lmRoot) {
    lmRoot.innerHTML = LM.groups.map(g => `
      <section class="lmt-group" id="${g.id}">
        <div class="wrap">
          <div class="lmt-head"><h2 class="display h-m reveal">${esc(g.name)}</h2><p class="lede reveal">${esc(g.line)}</p></div>
          <div class="lmt-items">${g.items.map(it => it.image ? `
            <article class="lmt-item reveal"><div class="media"><img src="${it.image}" alt="LMT ${esc(it.name)}" loading="lazy"></div><h3>${esc(it.name)}</h3><p>${esc(it.detail)}</p></article>` : `
            <article class="lmt-item text-only reveal"><h3>${esc(it.name)}</h3><p>${esc(it.detail)}</p></article>`).join("")}
          </div>
        </div>
      </section>`).join("");
  }
})();
