function highlightPseudocode(text){
 const keywords=new Set(['for','if','else','while','return','and','or','do','break','đến','xuống']);
 const literals=new Set(['true','false','null']);
 return Array.from(text.matchAll(/\s+|[\p{L}_][\p{L}\p{N}_]*|\d+(?:\.\d+)?|[<>=!≤≥≠+−*/]+|./gu),match=>{
  const token=match[0];
  let kind=keywords.has(token)?'keyword':literals.has(token)?'literal':/^\d/.test(token)?'number':/^[<>=!≤≥≠+−*/]+$/.test(token)?'operator':/^[\p{L}_]/u.test(token)?(text.slice(match.index+token.length).trimStart().startsWith('(')?'function':'variable'):null;
  if(!kind)return document.createTextNode(token);
  const span=document.createElement('span');span.className='syntax-'+kind;span.textContent=token;return span;
 });
}

const $=id=>document.getElementById(id);let arr=[],mid,steps=[],position=0,timer=null;
mergeCode.forEach((text,i)=>{const row=document.createElement('div');row.className='line';const n=document.createElement('span');n.className='number';n.textContent=i+1;row.append(n,...highlightPseudocode(text));$('code').append(row);});
function stop(){clearTimeout(timer);timer=null;$('play').textContent='▶ Chạy mô phỏng';}
function cells(target,values,s,source){target.replaceChildren(...values.map((value,k)=>{const el=document.createElement('div');el.className='cell'+(source?(k<=mid?' left':' right'):'');const pointer=source?(k===s.i&&s.i<=mid?'i':'')+(k===s.j&&s.j<arr.length?'j':''):(k===s.v?'v':'');if(pointer)el.classList.add('current');const p=document.createElement('div');p.className='pointer';p.textContent=pointer;const v=document.createElement('div');v.className='value';v.textContent=value??'·';const index=document.createElement('div');index.className='index';index.textContent=k;el.append(p,v,index);return el;}));}
function render(){const s=steps[position];cells($('arr'),arr,s,true);cells($('out'),s.c,s,false);$('vars').textContent=`l=0  mid=${mid}  r=${arr.length-1}  i=${s.i??'—'}  j=${s.j??'—'}  v=${s.v??'—'}`;$('message').textContent=s.message;$('count').textContent=`${position} / ${steps.length-1}`;$('timeline').value=position;$('prev').disabled=position===0;$('next').disabled=position===steps.length-1;document.querySelectorAll('.line').forEach((el,i)=>el.classList.toggle('active',i===s.line));}
function apply(){stop();const parse=id=>$(id).value.trim().split(/[\s,]+/).map(Number);const l=parse('leftInput'),r=parse('rightInput');if([l,r].some(a=>!a.length||a.length>10||a.some(x=>!Number.isFinite(x))||a.some((x,i)=>i&&x<a[i-1]))){$('error').textContent='Mỗi đoạn cần 1–10 số theo thứ tự tăng dần.';return;}$('error').textContent='';arr=l.concat(r);mid=l.length-1;steps=mergeSteps(arr,0,mid,arr.length-1);position=0;$('timeline').max=steps.length-1;render();}
function move(delta){stop();position=Math.max(0,Math.min(steps.length-1,position+delta));render();}
function tick(){if(position<steps.length-1){position++;render();}if(position===steps.length-1){stop();return;}timer=setTimeout(tick,700/Number($('speed').value));}
function play(){if(timer){stop();return;}if(position===steps.length-1){position=0;render();}$('play').textContent='Ⅱ Tạm dừng';timer=setTimeout(tick,700/Number($('speed').value));}
$('play').onclick=play;$('prev').onclick=()=>move(-1);$('next').onclick=()=>move(1);$('reset').onclick=()=>{stop();position=0;render();};$('apply').onclick=apply;$('timeline').oninput=()=>{stop();position=Number($('timeline').value);render();};
document.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;if(['ArrowUp','ArrowDown',' '].includes(e.key)){e.preventDefault();if(e.key===' ')play();else move(e.key==='ArrowUp'?-1:1);}});
window.addEventListener('message',e=>{if(e.source!==parent)return;const local=location.protocol==='file:'&&['null','file://'].includes(e.origin);if(e.origin!==location.origin&&!local)return;if(e.data?.type==='selection-pause')stop();if(e.data?.type==='selection-play')play();if(e.data?.type==='selection-step'&&[1,-1].includes(e.data.delta))move(e.data.delta);if(e.data?.type==='selection-speed'&&[1,-1].includes(e.data.delta))$('speed').selectedIndex=Math.max(0,Math.min(3,$('speed').selectedIndex+e.data.delta));});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});apply();
