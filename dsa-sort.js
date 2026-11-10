// Fit dense source slides within the shared 1280 × 720 canvas.
(() => {
  function fitSourceContent() {
    for (const slide of document.querySelectorAll('.sort-slide')) {
      const body = slide.querySelector('.sort-body');
      if (!body || !body.querySelector('.sort-text')) continue;
      const original = slide.getAttribute('style');
      Object.assign(slide.style, {display:'block',position:'absolute',visibility:'hidden',transform:'none'});
      const text = body.querySelector('.sort-text');
      for (const child of text.children) child.style.zoom = '';
      let factor = 1;
      for (let attempt = 0; attempt < 8; attempt++) {
        const height = text.scrollHeight;
        const widest = Math.max(text.clientWidth, ...Array.from(text.querySelectorAll('pre')).map(el => el.scrollWidth));
        if (height <= body.clientHeight + 1 && widest <= text.clientWidth + 1) break;
        factor *= Math.min(.96, body.clientHeight / height, text.clientWidth / widest);
        for (const child of text.children) child.style.zoom = factor;
      }
      if (original === null) slide.removeAttribute('style'); else slide.setAttribute('style', original);
    }
  }
  if (document.fonts) document.fonts.ready.then(fitSourceContent); else fitSourceContent();
})();

// Reveal the sorted row one value at a time before advancing the deck.
(() => {
  const example = document.querySelector('.sort-slide[data-source-slide="4"]');
  const row = Array.from(example.querySelectorAll('.sort-reveal-number'))
    .sort((a, b) => Number(a.getAttribute('x')) - Number(b.getAttribute('x')));
  const sources = Array.from(example.querySelectorAll('svg text:not(.sort-reveal-number)'));
  const sourceForNumber = row.map(number => sources.find(source =>
    source.textContent.trim() === number.textContent.trim()));
  const exampleIndex = Array.from(document.querySelectorAll('.slide')).indexOf(example);
  let revealed = 0;
  let wasActive = example.classList.contains('active');
  function render() {
    row.forEach((number, index) => {
      const visible = index < revealed;
      number.setAttribute('visibility', visible ? 'visible' : 'hidden');
      number.setAttribute('aria-hidden', String(!visible));
      const source = sourceForNumber[index];
      if (source) {
        source.setAttribute('visibility', visible ? 'hidden' : 'visible');
        source.setAttribute('aria-hidden', String(visible));
      }
    });
  }
  window.presentationStep = (from, to) => {
    if (from !== exampleIndex) return false;
    if (to === from + 1 && revealed < row.length) {
      revealed++;
      render();
      return true;
    }
    if (to === from - 1 && revealed > 0) {
      revealed--;
      render();
      return true;
    }
    return false;
  };
  document.addEventListener('slidechange', () => {
    const active = example.classList.contains('active');
    if (active && !wasActive) { revealed = 0; render(); }
    wasActive = active;
  });
  render();
})();

(() => {
 const frames = [...document.querySelectorAll('iframe.sort-simulation')];
 document.addEventListener('slidechange', () => {
  for(const frame of frames)if(!frame.closest('.slide').classList.contains('active'))frame.contentWindow?.postMessage({type:'selection-pause'},location.protocol==='file:'||location.origin==='null'?'*':location.origin);
 });
 window.addEventListener('message',event=>{
  if(event.origin!==location.origin||event.data?.type!=='selection-slide'||![1,-1].includes(event.data.delta))return;
  const frame=frames.find(frame=>frame.contentWindow===event.source&&frame.closest('.slide').classList.contains('active'));
  if(frame)go(current+event.data.delta);
 });

})();
