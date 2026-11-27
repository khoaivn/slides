'use strict';

{
  const example = document.querySelector('.soict-stream-example');
  const problemSlide = example.closest('.slide');
  const viewport = example.querySelector('.soict-stream-window');
  const stream = viewport.querySelector('.soict-stream-items');
  const overlay = example.querySelector('.soict-stream-overlay');
  const motion = matchMedia('screen and (prefers-reduced-motion: no-preference)');
  const pending = 'soict-stream-pending';
  const picks = [...stream.querySelectorAll('.selected-item')].map(source => ({
    source,
    target: example.querySelector(`.stream-selection > [data-tex="${source.dataset.tex}"]`),
    flight: null,
    landed: false
  }));
  let playing = false;
  let frame = 0;

  function localPoint(rect, bounds, scaleX, scaleY) {
    return { x: (rect.left - bounds.left) / scaleX, y: (rect.top - bounds.top) / scaleY };
  }

  function place(node, x, y) {
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
  }

  function advance(now) {
    const bounds = overlay.getBoundingClientRect();
    const scaleX = bounds.width / overlay.clientWidth;
    const scaleY = bounds.height / overlay.clientHeight;
    const track = viewport.getBoundingClientRect();
    const pickup = track.left + track.width * 0.72;

    for (const pick of picks) {
      if (pick.landed) continue;
      if (!pick.flight) {
        const rect = pick.source.getBoundingClientRect();
        if (rect.left + rect.width / 2 < pickup) continue;
        const token = pick.source.cloneNode(true);
        token.classList.replace('selected-item', 'soict-stream-flight');
        token.removeAttribute('data-tex');
        const start = localPoint(rect, bounds, scaleX, scaleY);
        start.x = Math.min(start.x, (pickup - bounds.left - rect.width / 2) / scaleX);
        place(token, start.x, start.y);
        overlay.append(token);
        pick.source.classList.add(pending);
        pick.flight = { token, start, time: now };
      }

      const { token, start, time } = pick.flight;
      const progress = Math.min(1, (now - time) / 650);
      const ease = progress * progress * (3 - 2 * progress);
      const end = localPoint(pick.target.getBoundingClientRect(), bounds, scaleX, scaleY);
      place(token, start.x + (end.x - start.x) * ease, start.y + (end.y - start.y) * ease);
      if (progress === 1) {
        token.remove();
        pick.target.classList.remove(pending);
        pick.landed = true;
      }
    }

    frame = picks.every(pick => pick.landed) ? 0 : requestAnimationFrame(advance);
  }

  function syncStream() {
    const active = motion.matches && problemSlide.classList.contains('active');
    if (active === playing) return;
    playing = active;
    cancelAnimationFrame(frame);
    overlay.replaceChildren();
    for (const pick of picks) {
      pick.flight = null;
      pick.landed = false;
      pick.source.classList.remove(pending);
      pick.target.classList.toggle(pending, active);
    }
    if (active) frame = requestAnimationFrame(advance);
  }

  document.addEventListener('slidechange', syncStream);
  motion.addEventListener('change', syncStream);
  syncStream();
}
