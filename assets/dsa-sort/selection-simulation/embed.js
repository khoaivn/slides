// Stop playback when the containing presentation leaves this slide.
window.addEventListener('message', event => {
  if (event.source === window.parent && event.data?.type === 'selection-pause') pause();
});
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

const pseudocodeToggle = document.getElementById('pseudocodeToggle');
const pseudocode = document.getElementById('code');
pseudocodeToggle.addEventListener('click', () => {
  pseudocode.hidden = !pseudocode.hidden;
  pseudocodeToggle.setAttribute('aria-expanded', String(!pseudocode.hidden));
});

// Mở sẵn mã giả khi slide yêu cầu.
if (new URLSearchParams(location.search).get('pseudocode') === 'open') {
  pseudocode.hidden = false;
  pseudocodeToggle.setAttribute('aria-expanded', 'true');
}

window.addEventListener('message', event => {
 const localFile=location.protocol==='file:'&&['null','file://'].includes(event.origin);
 if(event.source!==window.parent||(event.origin!==location.origin&&!localFile))return;
 if(event.data?.type==='selection-play')play();
 if(event.data?.type==='selection-speed'&&[1,-1].includes(event.data.delta))changeSpeed(event.data.delta);
 if(event.data?.type==='selection-step'&&[1,-1].includes(event.data.delta))move(event.data.delta);
});
