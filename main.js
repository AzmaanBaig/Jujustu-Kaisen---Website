/* =============================================================
JUJUTSU KAISEN — The Strongest
main.js

NOTE: Unicorn Studio animation is initialised by the
self-bootstrapping inline script in index.html via the
data-us-project attribute. No addScene() call needed here.
   ============================================================= */

/* ── 1. HERO SCENE — responsive scale so Gojo stays centered ── */
(function initHeroScale() {
    var scene = document.querySelector('.hero-scene');
    var NATIVE_W = 1440; /* Unicorn project native width  */
    var NATIVE_H = 900; /* Unicorn project native height */

    function setScale() {
        if (!scene) return;
        var vw = window.innerWidth;
        var vh = window.innerHeight;
        /* "cover" behaviour — fills the viewport so character is never
           cropped; translate(-50%,-50%) keeps it perfectly centered */
        var scale = Math.max(vw / NATIVE_W, vh / NATIVE_H);
        scene.style.transform = 'translate(-50%, -50%) scale(' + scale + ')';
    }

    setScale();
    window.addEventListener('resize', setScale, { passive: true });
}());


/* ── 2. NAV — deepen background opacity on scroll ───────────── */
(function initNavScroll() {
    var nav = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        var progress = Math.min(window.scrollY / 180, 1);
        nav.style.background = 'rgba(5,5,5,' + (0.5 + 0.45 * progress) + ')';
    }, { passive: true });
}());


/* ── 3. HERO TEXT — subtle upward parallax on scroll ────────── */
(function initHeroParallax() {
    var heroText = document.querySelector('.hero-text');

    window.addEventListener('scroll', function() {
        var y = window.scrollY;
        if (!heroText) return;
        heroText.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        heroText.style.opacity = Math.max(0, 1 - y / 480).toFixed(3);
    }, { passive: true });
}());


/* ── 4. SCROLL REVEAL — IntersectionObserver ────────────────── */
(function initScrollReveal() {
    var selector = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    var elements = document.querySelectorAll(selector);

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px',
    });

    elements.forEach(function(el) { observer.observe(el); });
}());