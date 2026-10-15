/* ═══════════════════════════════════════════════════════
   STARFIELD.JS — animated star canvas background.
   Shared by every page. Requires <canvas id="starfield">
   to exist in the HTML. Planets are pure CSS (see style.css)
   and need no JS.
═══════════════════════════════════════════════════════ */
(function () {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const STAR_COUNT = 220;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.2,
    speed: Math.random() * 0.25 + 0.05,
    opacity: Math.random() * 0.7 + 0.2,
    twinkleSpeed: Math.random() * 0.008 + 0.003,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));

  let tick = 0;
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tick += 0.016;
    stars.forEach((s) => {
      const tw = Math.sin(tick * s.twinkleSpeed * 60 + s.twinkleOffset) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240,244,255,${s.opacity * tw})`;
      ctx.fill();
      s.y += s.speed;
      if (s.y > canvas.height) {
        s.y = 0;
        s.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
})();
