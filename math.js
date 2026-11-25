'use strict';
// MathML Core uses Unicode for these alphabets instead of mathvariant.
const mathAlphabets={
 'script':[...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'],
 'double-struck':[...'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ'],
 bold:[...'𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳']
};
// Render explicit TeX expressions only; never parse code snippets or speaker notes.
window.renderPresentationMath=function(root=document){
 if(!window.katex)return;
 const nativeMath=document.body.dataset.mathOutput==='mathml';
 const nodes=root.matches?.('[data-tex]')?[root]:[...root.querySelectorAll('[data-tex]')];
 for(const node of nodes){
  const output=nativeMath&&!node.closest('.pseudocode')?'mathml':'htmlAndMathml';
  node.classList.add('math');
  try{
   katex.render(node.dataset.tex,node,{throwOnError:true,strict:'error',trust:false,output});
   if(output==='mathml'){
    for(const token of node.querySelectorAll('mi[mathvariant]')){
     const alphabet=mathAlphabets[token.getAttribute('mathvariant')];
     const letters=token.textContent;
     if(!alphabet||!/^[A-Za-z]+$/.test(letters))continue;
     const glyphs=Array.from(letters,letter=>{
      const code=letter.charCodeAt(0);
      return alphabet[code<97?code-65:code-97+26];
     });
     if(glyphs.some(glyph=>!glyph))continue;
     token.textContent=glyphs.join('');
     token.removeAttribute('mathvariant');
    }
   }
  }
  catch(error){console.error('Cannot render presentation formula:',node.dataset.tex,error);}
 }
};
window.renderPresentationMath();
// Font metrics may change after the slide's initial scale was calculated.
document.fonts.ready.then(()=>window.dispatchEvent(new Event('resize')));
