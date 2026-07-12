/* AI Income Academy — shared interactions */

// Scroll reveals
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Safety net: if the observer never fires (unsupported/blocked), show everything
setTimeout(() => {
  if (!document.querySelector(".reveal.in")) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
    document.querySelectorAll("[data-count]").forEach((el) => countUp(el));
  }
}, 2000);

// Count-up stats
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const dur = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 4);
    const val = Math.round(target * eased);
    el.textContent = prefix + val.toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        countUp(e.target);
        statObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => statObserver.observe(el));

// Kinetic manifesto words — light up as they cross the viewport center
const words = document.querySelectorAll(".kinetic .word");
if (words.length) {
  const wordObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.target.classList.toggle("lit", e.isIntersecting));
    },
    { rootMargin: "-35% 0px -35% 0px" }
  );
  words.forEach((w) => wordObserver.observe(w));
}

// Accordion: close siblings when one opens
document.querySelectorAll(".modules").forEach((group) => {
  group.querySelectorAll("details.module").forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) {
        group.querySelectorAll("details.module[open]").forEach((other) => {
          if (other !== d) other.open = false;
        });
      }
    });
  });
});

// Subtle hero parallax on scroll
const heroImg = document.querySelector(".hero-media img");
if (heroImg) {
  window.addEventListener(
    "scroll",
    () => {
      const y = Math.min(window.scrollY, window.innerHeight);
      heroImg.style.translate = `0 ${y * 0.12}px`;
    },
    { passive: true }
  );
}
