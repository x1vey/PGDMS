/* PDGMS Leadership Portfolio — minimal interactions */

(function () {
  'use strict';

  // ---------- Score counter animation ----------
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (Number.isNaN(target)) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toString();
    }
    requestAnimationFrame(tick);
  }

  // ---------- Capability bars: animate from 0 to target ----------
  function animateBars() {
    const fills = document.querySelectorAll('.bar__fill');
    fills.forEach((fill, i) => {
      const target = fill.style.getPropertyValue('--target') || '0%';
      fill.style.width = '0%';
      // stagger
      setTimeout(() => { fill.style.width = target; }, 200 + i * 90);
    });
  }

  // ---------- Init on load ----------
  function init() {
    document.querySelectorAll('[data-counter]').forEach(animateCounter);
    // small delay so the layout settles
    requestAnimationFrame(() => requestAnimationFrame(animateBars));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
