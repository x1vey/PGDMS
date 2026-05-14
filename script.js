/* PDGMS Leadership Portfolio — simplified interactions */

(function () {
  'use strict';

  // ---------- Score counter animation ----------
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    if (Number.isNaN(target)) return;
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
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
      // bouncy stagger
      setTimeout(() => { 
        fill.style.transition = 'width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        fill.style.width = target; 
      }, 200 + i * 120);
    });
  }

  // ---------- Init on load ----------
  function init() {
    document.querySelectorAll('[data-counter]').forEach(animateCounter);
    animateBars();
    
    // Add mouse-move interaction to cards for "Fun"
    const cards = document.querySelectorAll('.breakthrough, .capability, .kpi, .reality, .trajectory, .signal');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
