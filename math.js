'use strict';
// MathML Core uses Unicode for these alphabets instead of mathvariant.
const mathAlphabets={
 'script':[...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'],
 'double-struck':[...'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ']
};
// Render explicit TeX expressions only; never parse code snippets or speaker notes.
window.renderPresentationMath=function(root=document){
 if(!window.katex)return;
 const output=document.body.dataset.mathOutput==='mathml'?'mathml':'htmlAndMathml';
 const nodes=root.matches?.('[data-tex]')?[root]:[...root.querySelectorAll('[data-tex]')];
 for(const node of nodes){
  node.classList.add('math');
  try{
   katex.render(node.dataset.tex,node,{throwOnError:true,strict:'error',trust:false,output});
   if(output==='mathml'){
    for(const token of node.querySelectorAll('mi[mathvariant="script"],mi[mathvariant="double-struck"]')){
     const letter=token.textContent;
     if(!/^[A-Z]$/.test(letter))continue;
     token.textContent=mathAlphabets[token.getAttribute('mathvariant')][letter.charCodeAt(0)-65];
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
