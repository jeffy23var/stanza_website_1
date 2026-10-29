/* =========================================================
   "Live the Whitelion home" — the interactive living room.
   The panel (right) and the room (left) share one "state".
   Change a value → render() updates the room smoothly.
   ========================================================= */
(function () {
  const room = document.querySelector(".room svg");
  const panel = document.querySelector(".panel");
  if (!room || !panel) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Everything the room can be
  const state = { lights: 70, curtains: 100, tv: false, fan: 1, time: "night", scene: null };
  let lastLights = 70;

  const SCENES = {
    morning: { lights: 15, curtains: 100, tv: false, fan: 1, time: "day" },
    movie:   { lights: 6,  curtains: 0,   tv: true,  fan: 1 },
    dinner:  { lights: 75, curtains: 45,  tv: false, fan: 2 },
    night:   { lights: 0,  curtains: 0,   tv: false, fan: 1 }
  };

  // Elements in the room
  const dark = $("#dark", room), lights = $("#lights", room), shaft = $("#shaft", room);
  const tvglow = $("#tvglow", room), tvscreen = $("#tvscreen", room), moon = $("#moon", room);
  const drapeL = $("#drapeL", room), drapeR = $("#drapeR", room), rotor = $("#rotor", room);
  const nightSky = room.querySelectorAll(".night-only");

  // Elements in the panel
  const tiles = {
    lights: $('[data-tile="lights"]', panel), curtains: $('[data-tile="curtains"]', panel),
    tv: $('[data-tile="tv"]', panel), fan: $('[data-tile="fan"]', panel)
  };
  const bright = $("#bright", panel), curt = $("#curt", panel);
  const speedBtns = panel.querySelectorAll(".fan-speeds button");
  const sceneBtns = panel.querySelectorAll(".scene");
  const timeBtns = document.querySelectorAll(".daynight button");
  const status = $("#roomStatus");

  // Smooth transitions are plain CSS, so they work without any library
  const slow = reduced ? "none" : "opacity 1.4s cubic-bezier(.22,1,.36,1)";
  [dark, lights, shaft, tvglow, tvscreen, moon, ...nightSky].forEach(el => el.style.transition = slow);
  [drapeL, drapeR].forEach(el => el.style.transition = reduced ? "none" : "transform 2.8s cubic-bezier(.45,0,.2,1)");

  function render() {
    const day = state.time === "day";
    const open = state.curtains / 100;
    const lamp = state.lights / 100;

    // How dark is the room? Daylight through open curtains + lamps + TV
    let d = 0.86 - (day ? open * 0.74 : 0) - lamp * 0.6 - (state.tv ? 0.05 : 0);
    d = Math.min(0.86, Math.max(0.03, d));
    dark.setAttribute("opacity", d.toFixed(3));
    nightSky.forEach(el => el.setAttribute("opacity", day ? 0 : 1));

    lights.setAttribute("opacity", (lamp * (0.55 + d * 0.6)).toFixed(3));
    shaft.setAttribute("opacity", day ? (open * 0.9).toFixed(2) : 0);
    moon.setAttribute("opacity", !day && open > 0.6 ? 1 : 0);
    tvscreen.setAttribute("opacity", state.tv ? 1 : 0);
    tvglow.setAttribute("opacity", state.tv ? (0.3 + d * 0.8).toFixed(2) : 0);

    // Curtains: fully open leaves 16% of each drape gathered at the sides
    const s = 1 - open * 0.84;
    drapeL.style.transform = `scaleX(${s})`;
    drapeR.style.transform = `scaleX(${s})`;

    // Panel
    tiles.lights.classList.toggle("on", state.lights > 0);
    tiles.lights.setAttribute("aria-pressed", state.lights > 0);
    tiles.lights.querySelector(".t-state").textContent = state.lights > 0 ? state.lights + "%" : "Off";
    tiles.curtains.classList.toggle("on", state.curtains > 0);
    tiles.curtains.setAttribute("aria-pressed", state.curtains > 0);
    tiles.curtains.querySelector(".t-state").textContent = state.curtains === 0 ? "Closed" : state.curtains === 100 ? "Open" : state.curtains + "% open";
    tiles.tv.classList.toggle("on", state.tv);
    tiles.tv.setAttribute("aria-pressed", state.tv);
    tiles.tv.querySelector(".t-state").textContent = state.tv ? "On" : "Off";
    tiles.fan.classList.toggle("on", state.fan > 0);
    tiles.fan.setAttribute("aria-pressed", state.fan > 0);
    tiles.fan.querySelector(".t-state").textContent = state.fan > 0 ? "Speed " + state.fan : "Off";
    bright.value = state.lights; bright.style.setProperty("--v", state.lights + "%");
    curt.value = state.curtains; curt.style.setProperty("--v", state.curtains + "%");
    speedBtns.forEach(b => b.setAttribute("aria-pressed", +b.dataset.speed === state.fan));
    sceneBtns.forEach(b => b.setAttribute("aria-pressed", b.dataset.scene === state.scene));
    timeBtns.forEach(b => b.setAttribute("aria-pressed", b.dataset.time === state.time));
  }

  function say(msg) { if (status) status.textContent = msg; }
  function set(changes, manual = true) {
    Object.assign(state, changes);
    if (manual) state.scene = null;
    if (state.lights > 0) lastLights = state.lights;
    render();
  }

  // Tiles
  tiles.lights.addEventListener("click", () => { set({ lights: state.lights > 0 ? 0 : lastLights || 70 }); say(state.lights ? "Lights on" : "Lights off"); });
  tiles.curtains.addEventListener("click", () => { set({ curtains: state.curtains > 0 ? 0 : 100 }); say(state.curtains ? "Opening curtains" : "Closing curtains"); });
  tiles.tv.addEventListener("click", () => { set({ tv: !state.tv }); say(state.tv ? "TV on" : "TV off"); });
  tiles.fan.addEventListener("click", () => { set({ fan: state.fan > 0 ? 0 : 2 }); say(state.fan ? "Fan on" : "Fan off"); });
  bright.addEventListener("input", () => set({ lights: +bright.value }));
  curt.addEventListener("input", () => set({ curtains: +curt.value }));
  speedBtns.forEach(b => b.addEventListener("click", () => { set({ fan: +b.dataset.speed }); say(state.fan ? "Fan speed " + state.fan : "Fan off"); }));
  sceneBtns.forEach(b => b.addEventListener("click", () => {
    set(SCENES[b.dataset.scene], false); state.scene = b.dataset.scene; render(); say(b.textContent + " scene on");
  }));
  timeBtns.forEach(b => b.addEventListener("click", () => set({ time: b.dataset.time }, false)));

  // Click the room itself
  room.querySelectorAll(".hot").forEach(h => {
    const act = () => {
      const k = h.dataset.hot;
      if (k === "fan") set({ fan: (state.fan + 1) % 4 });
      else tiles[k].click();
    };
    h.addEventListener("click", act);
    h.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
  });

  // Fan blades: spin speed eases towards the chosen speed
  let angle = 0, speed = 0, last = performance.now();
  const target = () => [0, 220, 480, 820][state.fan]; // degrees per second
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    speed += (target() - speed) * Math.min(1, dt * 1.6);
    angle = (angle + speed * dt) % 360;
    if (!reduced) rotor.setAttribute("transform", `rotate(${angle.toFixed(2)})`);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Live clock on the display
  const clock = $(".screen-time", panel);
  function time() { clock.textContent = new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }); }
  time(); setInterval(time, 15000);

  render();
})();
