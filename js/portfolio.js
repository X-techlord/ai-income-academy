/* THE SENSEI EXPERIENCE — scroll-scrubbed orbit + pinned video chapters */

// ---------- helpers ----------
const clamp01 = (v) => Math.min(1, Math.max(0, v));

function trackProgress(trackEl) {
  const rect = trackEl.getBoundingClientRect();
  const total = trackEl.offsetHeight - window.innerHeight;
  return total > 0 ? clamp01(-rect.top / total) : 0;
}

// ---------- hero orbit scrub ----------
const heroTrack = document.getElementById("heroTrack");
const orbit = document.getElementById("orbitVideo");
const hudDeg = document.getElementById("hudDeg");
const hudBar = document.getElementById("hudBar");

if (heroTrack && orbit) {
  let target = 0;
  let ready = false;

  orbit.addEventListener("loadedmetadata", () => { ready = true; });
  if (orbit.readyState >= 1) ready = true; // metadata may load before the listener attaches
  // iOS/Safari: a muted play()+pause() unlocks programmatic seeking
  const unlock = () => {
    orbit.play().then(() => orbit.pause()).catch(() => {});
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("touchstart", unlock, { once: true, passive: true });

  function scrubLoop() {
    if (ready && orbit.duration) {
      const want = target * Math.max(orbit.duration - 0.08, 0);
      const diff = want - orbit.currentTime;
      if (Math.abs(diff) > 0.001) {
        // lerp toward target for buttery scrubbing
        orbit.currentTime = orbit.currentTime + diff * 0.22;
      }
    }
    requestAnimationFrame(scrubLoop);
  }
  requestAnimationFrame(scrubLoop);

  window.addEventListener(
    "scroll",
    () => {
      target = trackProgress(heroTrack);
      const deg = Math.round(target * 360);
      if (hudDeg) hudDeg.textContent = String(deg).padStart(3, "0") + "°";
      if (hudBar) hudBar.style.width = target * 100 + "%";
    },
    { passive: true }
  );
}

// ---------- pinned chapters (pillars + work) ----------
document.querySelectorAll("[data-chapter]").forEach((track) => {
  const items = track.querySelectorAll(".pillar");
  const dots = track.querySelectorAll(".chapter-dots i");
  if (!items.length) return;

  window.addEventListener(
    "scroll",
    () => {
      const p = trackProgress(track);
      // reserve the first 12% for settle-in, then split evenly
      const per = 0.88 / items.length;
      items.forEach((item, i) => {
        item.classList.toggle("on", p > 0.06 + i * per);
      });
      const active = Math.min(items.length - 1, Math.floor(Math.max(0, p - 0.06) / per));
      dots.forEach((d, i) => d.classList.toggle("on", i === active && p > 0.04));
    },
    { passive: true }
  );
});

// ---------- background videos: only play while visible ----------
const bgObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
  },
  { threshold: 0.05 }
);
document.querySelectorAll("video[data-bg]").forEach((v) => bgObserver.observe(v));

// ---------- video fallback: if a source fails, show its poster image ----------
document.querySelectorAll("video[data-fallback]").forEach((v) => {
  v.addEventListener("error", swap, true);
  function swap() {
    const img = document.createElement("img");
    img.src = v.dataset.fallback;
    img.alt = "";
    img.className = v.className;
    img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2";
    v.replaceWith(img);
  }
});
