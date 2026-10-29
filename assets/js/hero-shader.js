/* =========================================================
   Home hero: a slow, flowing mesh gradient drawn with WebGL.
   No libraries. Colours are set in COLORS below (walnut, brass, stone).
   - Pauses when the hero is off-screen (saves battery)
   - Shows a still frame for visitors who prefer reduced motion
   - Falls back to the CSS gradient if WebGL is unavailable
   ========================================================= */
(function () {
  const canvas = document.querySelector(".hero-shader");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false, powerPreference: "low-power" });
  if (!gl) return; // CSS gradient behind the canvas stays visible

  // Five colours that drift around the screen and blend into each other
  const COLORS = ["#14100D", "#4A3729", "#B8925A", "#8C7F71", "#2A211B"];
  const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);

  const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
  const frag = `
    precision highp float;
    uniform vec2 res; uniform float t; uniform vec3 c[5]; uniform float wire;
    // smooth value noise for gentle warping
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
      return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
    void main(){
      vec2 uv = gl_FragCoord.xy / res;
      vec2 q = uv; q.x *= res.x / res.y;
      // warp space slowly, like silk
      vec2 w = q + 0.35 * vec2(n(q*1.6 + t*0.07), n(q*1.6 - t*0.06 + 4.0)) - 0.17;
      vec3 col = vec3(0.0); float tot = 0.0;
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        vec2 pos = vec2(0.5 + 0.42*sin(t*0.11*(1.0+fi*0.23) + fi*1.7), 0.5 + 0.38*cos(t*0.09*(1.0+fi*0.31) + fi*2.3));
        pos.x *= res.x / res.y;
        float d = distance(w, pos);
        float wt = 1.0 / pow(d + 0.08, 2.4);
        col += c[i] * wt; tot += wt;
      }
      col /= tot;
      // faint wireframe: a warped grid catching the light
      vec2 g = w * 9.0;
      vec2 gl2 = abs(fract(g) - 0.5) / fwidth(g);
      float line = 1.0 - min(min(gl2.x, gl2.y), 1.0);
      col += vec3(0.86, 0.74, 0.55) * line * wire * (0.35 + 0.65 * n(w*2.0 + t*0.05));
      // vignette + fine grain so it reads as material, not a screen
      col *= 0.78 + 0.22 * smoothstep(1.25, 0.25, distance(uv, vec2(0.5, 0.55)));
      col += (h(gl_FragCoord.xy + t) - 0.5) * 0.025;
      gl_FragColor = vec4(col, 1.0);
    }`;

  gl.getExtension("OES_standard_derivatives");
  const fragSrc = "#extension GL_OES_standard_derivatives : enable\n" + frag;
  function sh(type, src) { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; }
  const vs = sh(gl.VERTEX_SHADER, vert), fs = sh(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return;
  const prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, "res"), uT = gl.getUniformLocation(prog, "t"), uWire = gl.getUniformLocation(prog, "wire");
  gl.uniform3fv(gl.getUniformLocation(prog, "c"), new Float32Array(COLORS.flatMap(rgb)));
  gl.uniform1f(uWire, 0.13);

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75; // a soft gradient doesn't need full resolution
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h); }
  }
  window.addEventListener("resize", resize);
  resize();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let visible = true, start = performance.now(), raf;
  // Hovering the hero gently speeds the flow, like the original component's "active" state
  let speed = 1, target = 1, t = 20;
  const hero = canvas.closest(".hero");
  hero.addEventListener("pointerenter", () => target = 1.8);
  hero.addEventListener("pointerleave", () => target = 1);

  function frame(now) {
    const dt = Math.min(0.05, (now - start) / 1000); start = now;
    speed += (target - speed) * dt * 2;
    t += dt * speed;
    resize();
    gl.uniform1f(uT, t);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    canvas.classList.add("ready");
    if (visible && !reduced) raf = requestAnimationFrame(frame);
  }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !reduced) { cancelAnimationFrame(raf); start = performance.now(); raf = requestAnimationFrame(frame); }
  }).observe(hero);
  raf = requestAnimationFrame(frame);
})();
