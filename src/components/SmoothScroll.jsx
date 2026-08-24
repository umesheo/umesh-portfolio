import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance = null;
const NAV_OFFSET = -80;

export function scrollTo(target, opts = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: NAV_OFFSET,
      duration: 1.0,
      ...opts,
    });
    return;
  }

  let top = 0;
  if (typeof target === "number") {
    top = target;
  } else if (target && typeof target.getBoundingClientRect === "function") {
    top = window.scrollY + target.getBoundingClientRect().top + NAV_OFFSET;
  } else if (typeof target === "string") {
    const el = document.querySelector(target);
    if (el) top = window.scrollY + el.getBoundingClientRect().top + NAV_OFFSET;
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
}

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Native scrolling is smoother/cheaper on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      syncTouch: false,
      autoRaf: true,
    });
    lenisInstance = lenis;

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return children;
}
