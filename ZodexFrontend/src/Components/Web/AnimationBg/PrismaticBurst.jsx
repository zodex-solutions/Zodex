// PrismaticBurst.optimized.jsx
import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";

// ====================== SHADERS ======================
const vertexShader = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `#version 300 es
precision highp float;
precision highp int;

out vec4 fragColor;

uniform vec2  uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform int   uAnimType;
uniform vec2  uMouse;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;
uniform int   uMaxSteps; // NEW: limit number of loop iterations

// ... keep all helper functions (hash21, rot30, layeredNoise, etc.) unchanged ...
// I omitted the helper functions here for brevity; copy them from your original shader.

float hash21(vec2 p){
    p = floor(p);
    float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005)));
    return fract(f);
}

mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }

float layeredNoise(vec2 fragPx){
    vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
    vec2 q = rot30() * p;
    float n = 0.0;
    n += 0.40 * hash21(q);
    n += 0.25 * hash21(q * 2.0 + 17.0);
    n += 0.20 * hash21(q * 4.0 + 47.0);
    n += 0.10 * hash21(q * 8.0 + 113.0);
    n += 0.05 * hash21(q * 16.0 + 191.0);
    return n;
}

// ... rest of helpers (rotX/rotY/rotZ/sampleGradient/rot2/bendAngle/edgeFade/rayDir) ...
// copy exactly from your original shader

vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
    float focal = res.y * max(dist, 1e-3);
    return normalize(vec3(2.0 * (frag - offset) - res, focal));
}

float edgeFade(vec2 frag, vec2 res, vec2 offset){
    vec2 toC = frag - 0.5 * res - offset;
    float r = length(toC) / (0.5 * min(res.x, res.y));
    float x = clamp(r, 0.0, 1.0);
    float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
    float s = q * 0.5;
    s = pow(s, 1.5);
    float tail = 1.0 - pow(1.0 - s, 2.0);
    s = mix(s, tail, 0.2);
    float dn = (layeredNoise(frag * 0.15) - 0.5) * 0.0015 * s;
    return clamp(s + dn, 0.0, 1.0);
}

mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }

vec3 sampleGradient(float t){
    t = clamp(t, 0.0, 1.0);
    return texture(uGradient, vec2(t, 0.5)).rgb;
}

vec2 rot2(vec2 v, float a){
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c) * v;
}

float bendAngle(vec3 q, float t){
    float a = 0.8 * sin(q.x * 0.55 + t * 0.6)
            + 0.7 * sin(q.y * 0.50 - t * 0.5)
            + 0.6 * sin(q.z * 0.60 + t * 0.7);
    return a;
}

void main(){
    vec2 frag = gl_FragCoord.xy;
    float t = uTime * uSpeed;
    float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
    vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
    float marchT = 0.0;
    vec3 col = vec3(0.0);
    float n = layeredNoise(frag);
    vec4 c = cos(t * 0.2 + vec4(0.0, 33.0, 11.0, 0.0));
    mat2 M2 = mat2(c.x, c.y, c.z, c.w);
    float amp = clamp(uDistort, 0.0, 50.0) * 0.15;

    mat3 rot3dMat = mat3(1.0);
    if(uAnimType == 1){
      vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
      rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
    }
    mat3 hoverMat = mat3(1.0);
    if(uAnimType == 2){
      vec2 m = uMouse * 2.0 - 1.0;
      vec3 ang = vec3(m.y * 0.6, m.x * 0.6, 0.0);
      hoverMat = rotY(ang.y) * rotX(ang.x);
    }

    for (int i = 0; i < 44; ++i) {
        // EARLY EXIT w/ uniform (cheap)
        if(i >= uMaxSteps) break;

        vec3 P = marchT * dir;
        P.z -= 2.0;
        float rad = length(P);
        vec3 Pl = P * (10.0 / max(rad, 1e-6));

        if(uAnimType == 0){
            Pl.xz *= M2;
        } else if(uAnimType == 1){
          Pl = rot3dMat * Pl;
        } else {
          Pl = hoverMat * Pl;
        }

        float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;

        float grow = smoothstep(0.35, 3.0, marchT);
        float a1 = amp * grow * bendAngle(Pl * 0.6, t);
        float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
        vec3 Pb = Pl;
        Pb.xz = rot2(Pb.xz, a1);
        Pb.xy = rot2(Pb.xy, a2);

        float rayPattern = smoothstep(
            0.5, 0.7,
            sin(Pb.x + cos(Pb.y) * cos(Pb.z)) *
            sin(Pb.z + sin(Pb.y) * cos(Pb.x + t))
        );

        if (uRayCount > 0) {
            float ang = atan(Pb.y, Pb.x);
            float comb = 0.5 + 0.5 * cos(float(uRayCount) * ang);
            comb = pow(comb, 3.0);
            rayPattern *= smoothstep(0.15, 0.95, comb);
        }

        vec3 spectralDefault = 1.0 + vec3(
            cos(marchT * 3.0 + 0.0),
            cos(marchT * 3.0 + 1.0),
            cos(marchT * 3.0 + 2.0)
        );

        float saw = fract(marchT * 0.25);
        float tRay = saw * saw * (3.0 - 2.0 * saw);
        vec3 userGradient = 2.0 * sampleGradient(tRay);
        vec3 spectral = (uColorCount > 0) ? userGradient : spectralDefault;
        vec3 base = (0.05 / (0.4 + stepLen))
                  * smoothstep(5.0, 0.0, rad)
                  * spectral;

        col += base * rayPattern;
        marchT += stepLen;
    }

    col *= edgeFade(frag, uResolution, uOffset);
    col *= uIntensity;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

// ====================== HELPERS ======================
const hexToRgb01 = (hex) => {
  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const intVal = parseInt(h, 16);
  if (isNaN(intVal) || (h.length !== 6 && h.length !== 8)) return [1, 1, 1];
  return [
    ((intVal >> 16) & 255) / 255,
    ((intVal >> 8) & 255) / 255,
    (intVal & 255) / 255,
  ];
};

const toPx = (v) =>
  v == null
    ? 0
    : typeof v === "number"
    ? v
    : parseFloat(String(v).replace("px", "")) || 0;

// ====================== COMPONENT ======================
const PrismaticBurst = ({
  intensity = 2,
  speed = 0.5,
  animationType = "rotate3d",
  colors,
  distort = 0,
  paused = false,
  offset = { x: 0, y: 0 },
  hoverDampness = 0,
  rayCount,
  mixBlendMode = "lighten",
  // tuning props (optional for consumer)
  targetFPS = 45, // desired smooth target FPS (lower = less work)
  minSteps = 10, // floor iterations in shader
  maxSteps = 44, // ceiling iterations in shader
}) => {
  const containerRef = useRef(null);
  const programRef = useRef(null);
  const rendererRef = useRef(null);
  const gradTexRef = useRef(null);

  const mouseTarget = useRef(new Float32Array([0.5, 0.5]));
  const mouseSmooth = useRef(new Float32Array([0.5, 0.5]));
  const pausedRef = useRef(paused);
  const hoverDampRef = useRef(hoverDampness);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  useEffect(() => {
    hoverDampRef.current = hoverDampness;
  }, [hoverDampness]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Adaptive DPR baseline (start conservative)
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const renderer = new Renderer({ dpr, alpha: false, antialias: false });
    rendererRef.current = renderer;
    const gl = renderer.gl;

    Object.assign(gl.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      mixBlendMode: mixBlendMode !== "none" ? mixBlendMode : "",
      imageRendering: "auto", // leave browser to upscale
    });
    container.appendChild(gl.canvas);

    // gradient texture (1x1 fallback)
    const gradientTex = new Texture(gl, {
      image: new Uint8Array([255, 255, 255, 255]),
      width: 1,
      height: 1,
      generateMipmaps: false,
      flipY: false,
    });
    gradientTex.minFilter = gl.LINEAR;
    gradientTex.magFilter = gl.LINEAR;
    gradTexRef.current = gradientTex;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uResolution: { value: new Float32Array([1, 1]) },
        uTime: { value: 0 },
        uIntensity: { value: intensity },
        uSpeed: { value: speed },
        uAnimType: { value: 0 },
        uMouse: { value: mouseSmooth.current },
        uColorCount: { value: 0 },
        uDistort: { value: distort },
        uOffset: { value: new Float32Array([toPx(offset.x), toPx(offset.y)]) },
        uGradient: { value: gradientTex },
        uNoiseAmount: { value: 0.8 },
        uRayCount: { value: Math.max(0, Math.floor(rayCount || 0)) },
        uMaxSteps: { value: maxSteps }, // NEW uniform
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    // resize (with DPR scaling)
    const resize = () => {
      const w = Math.max(container.clientWidth || 1, 1);
      const h = Math.max(container.clientHeight || 1, 1);
      // set renderer size using dynamic dpr
      renderer.setSize(w, h);
      program.uniforms.uResolution.value[0] = gl.drawingBufferWidth;
      program.uniforms.uResolution.value[1] = gl.drawingBufferHeight;
    };
    let resizeRaf;
    const resizeObs = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(resize);
    });
    resizeObs.observe(container);
    resize();

    // pointer
    const onPointer = (e) => {
      const rect = container.getBoundingClientRect();
      mouseTarget.current[0] =
        (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouseTarget.current[1] =
        (e.clientY - rect.top) / Math.max(rect.height, 1);
    };
    container.addEventListener("pointermove", onPointer, { passive: true });

    // intersection observer
    const io = new IntersectionObserver(
      (entries) => (isVisibleRef.current = entries[0]?.isIntersecting || false),
      { threshold: 0.01 }
    );
    io.observe(container);

    // adaptive rendering variables
    let raf;
    let last = performance.now();
    let accumTime = 0;
    let frameCount = 0;
    let frameSkip = 0; // how many RAF frames to skip between renders
    let lastGoodAdjust = performance.now();
    let avgFrameMs = 16.67;
    let targetFrameMs = 1000 / targetFPS;

    // function to adjust quality adaptively
    const adapt = (frameMs) => {
      // exponential moving average
      avgFrameMs = avgFrameMs * 0.9 + frameMs * 0.1;

      // If frame time too high, reduce work
      if (avgFrameMs > targetFrameMs * 1.15) {
        // increase skipping first
        frameSkip = Math.min(4, frameSkip + 1);
        // reduce shader steps
        const cur = program.uniforms.uMaxSteps.value;
        const newSteps = Math.max(minSteps, Math.floor(cur * 0.85));
        program.uniforms.uMaxSteps.value = newSteps;
        // drop DPR a bit (recreate renderer might be heavy, so we only reduce up to 1.0)
        if (renderer.dpr > 1.0 && performance.now() - lastGoodAdjust > 400) {
          renderer.dpr = Math.max(1.0, renderer.dpr - 0.2);
          lastGoodAdjust = performance.now();
          resize();
        }
      } else if (avgFrameMs < targetFrameMs * 0.85) {
        // increase quality gradually
        frameSkip = Math.max(0, frameSkip - 1);
        const cur = program.uniforms.uMaxSteps.value;
        program.uniforms.uMaxSteps.value = Math.min(
          maxSteps,
          Math.floor(cur * 1.1) || maxSteps
        );
        if (
          renderer.dpr < Math.min(window.devicePixelRatio || 1, 1.5) &&
          performance.now() - lastGoodAdjust > 400
        ) {
          renderer.dpr = Math.min(
            Math.min(window.devicePixelRatio || 1, 1.5),
            renderer.dpr + 0.2
          );
          lastGoodAdjust = performance.now();
          resize();
        }
      }
    };

    // animation loop with frame skipping
    let skipCounter = 0;
    const animate = (now) => {
      const dt = (now - last) * 0.001;
      last = now;

      // update frame time and adapt occasionally
      const frameMs = dt * 1000;
      adapt(frameMs);

      if (!pausedRef.current) accumTime += dt;

      // skip frames to save GPU if needed
      if (skipCounter < frameSkip) {
        skipCounter++;
      } else {
        skipCounter = 0;
        if (isVisibleRef.current && !document.hidden) {
          const tau = 0.02 + Math.min(1, hoverDampRef.current) * 0.5;
          const alpha = 1 - Math.exp(-dt / tau);
          const tgt = mouseTarget.current,
            sm = mouseSmooth.current;
          sm[0] += (tgt[0] - sm[0]) * alpha;
          sm[1] += (tgt[1] - sm[1]) * alpha;

          program.uniforms.uTime.value = accumTime;
          // VERY IMPORTANT: update uMouse typed array by reference (no reallocation)
          // mouseSmooth is a Float32Array already passed as value to the uniform
          renderer.render({ scene: mesh });
        }
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      resizeObs.disconnect();
      container.removeEventListener("pointermove", onPointer);
      io.disconnect();
      try {
        container.removeChild(gl.canvas);
      } catch {}
      program.remove();
      mesh.remove();
      gradientTex?.texture && gl.deleteTexture(gradientTex.texture);
    };
  }, []); // only run once

  // update uniforms when props change
  useEffect(() => {
    const program = programRef.current,
      gradTex = gradTexRef.current,
      renderer = rendererRef.current;
    if (!program || !gradTex || !renderer) return;

    program.uniforms.uIntensity.value = intensity;
    program.uniforms.uSpeed.value = speed;
    program.uniforms.uDistort.value = distort;
    program.uniforms.uOffset.value[0] = toPx(offset.x);
    program.uniforms.uOffset.value[1] = toPx(offset.y);
    program.uniforms.uRayCount.value = Math.max(0, Math.floor(rayCount || 0));

    const animTypeMap = { rotate: 0, rotate3d: 1, hover: 2 };
    program.uniforms.uAnimType.value = animTypeMap[animationType] ?? 0;

    // update gradient
    let count = 0;
    if (Array.isArray(colors) && colors.length > 0) {
      const gl = renderer.gl;
      const capped = colors.slice(0, 64);
      count = capped.length;
      const data = new Uint8Array(count * 4);
      for (let i = 0; i < count; i++) {
        const [r, g, b] = hexToRgb01(capped[i]);
        data.set(
          [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 255],
          i * 4
        );
      }
      gradTex.image = data;
      gradTex.width = count;
      gradTex.height = 1;
      gradTex.needsUpdate = true;
    }
    program.uniforms.uColorCount.value = count;
  }, [intensity, speed, animationType, colors, distort, offset, rayCount]);

  return (
    <div
      className="w-full h-full relative overflow-hidden"
      ref={containerRef}
    />
  );
};

export default PrismaticBurst;
