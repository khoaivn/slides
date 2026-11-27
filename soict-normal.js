'use strict';

{
  const curve = document.getElementById('normal-density');
  const slide = curve.closest('.slide');
  const shade = document.getElementById('normal-center');
  const guides = document.getElementById('normal-guides');
  const lowerLabel = document.getElementById('normal-lower');
  const upperLabel = document.getElementById('normal-upper');
  const motion = matchMedia('screen and (prefers-reduced-motion: no-preference)');
  const mean = 380;
  const baseline = 230;
  const minSpread = 85;
  const maxSpread = 115;
  const period = 8000;
  let frame = 0;
  let startedAt;

  function draw(spread) {
    // With a fixed vertical scale, the height of the density is proportional to 1/σ.
    const peak = 193 * minSpread / spread;
    const densityY = x => baseline - peak * Math.exp(-0.5 * ((x - mean) / spread) ** 2);
    const lower = mean - spread;
    const upper = mean + spread;
    const edgeY = densityY(upper).toFixed(2);
    const point = x => `${x.toFixed(2)} ${densityY(x).toFixed(2)}`;
    const samples = (from, to, segments) => Array.from(
      { length: segments + 1 },
      (_, i) => point(from + (to - from) * i / segments)
    ).join(' L ');
    curve.setAttribute('d', `M ${samples(40, 720, 170)}`);
    shade.setAttribute('d', `M ${lower} ${baseline} L ${samples(lower, upper, 64)} L ${upper} ${baseline} Z`);
    guides.setAttribute('d', `M 40 ${baseline} H 720 M ${mean} ${baseline - peak} V ${baseline} M ${lower} ${edgeY} V ${baseline} M ${upper} ${edgeY} V ${baseline}`);
    lowerLabel.setAttribute('x', lower);
    upperLabel.setAttribute('x', upper);
  }

  function advanceNormal(now) {
    startedAt ??= now;
    const phase = (now - startedAt) / period;
    const fraction = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    draw(minSpread + (maxSpread - minSpread) * fraction);
    frame = requestAnimationFrame(advanceNormal);
  }

  function syncNormal() {
    if (motion.matches && slide.classList.contains('active')) {
      if (!frame) frame = requestAnimationFrame(advanceNormal);
    } else if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      startedAt = undefined;
      draw(minSpread);
    }
  }

  document.addEventListener('slidechange', syncNormal);
  motion.addEventListener('change', syncNormal);
  syncNormal();
}
