from pathlib import Path
from fontTools.t1Lib import T1Font
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.agl import toUnicode
out=Path(__file__).resolve().parent
for source,style,weight,italic in [('vnss10','Regular',400,False),('vnssbx10','Bold',700,False),('vnssi10','Italic',400,True)]:
 f=T1Font('/usr/local/texlive/2024/texmf-dist/fonts/type1/vntex/vnr/'+source+'.pfb');f.parse();gs=f.getGlyphSet();order=list(gs)
 cmap={};cs={};metrics={}
 for name in order:
  glyph=gs[name];bp=BoundsPen(gs);glyph.draw(bp);width=round(glyph.width)
  pen=T2CharStringPen(width,gs);glyph.draw(pen);cs[name]=pen.getCharString()
  metrics[name]=(width,round(bp.bounds[0]) if bp.bounds else 0)
  u=toUnicode(name)
  if len(u)==1:cmap[ord(u)]=name
 fb=FontBuilder(1000,isTTF=False);fb.setupGlyphOrder(order);fb.setupCharacterMap(cmap)
 ps='VnCMSansWeb-'+style
 fb.setupCFF(ps,{'FullName':'Vn Computer Modern Sans Serif '+style,'FamilyName':'Vn Computer Modern Sans Serif','Weight':style,'ItalicAngle':-12 if italic else 0,'Notice':'Derived from '+source+'; Copyright 2002-2005 Han The Thanh; LPPL 1.3 or later.'},cs,{})
 fb.setupHorizontalMetrics(metrics);fb.setupHorizontalHeader(ascent=1000,descent=-300)
 fb.setupNameTable({'familyName':'Vn Computer Modern Sans Serif','styleName':style,'uniqueFontIdentifier':ps+'-1.0','fullName':'Vn Computer Modern Sans Serif '+style,'psName':ps,'version':'Version 1.0','copyright':'Original outlines Copyright 2002-2005 Han The Thanh. LPPL 1.3 or later. Web conversion with Unicode cmap.'})
 fb.setupOS2(sTypoAscender=1000,sTypoDescender=-300,usWinAscent=1100,usWinDescent=300,usWeightClass=weight,fsSelection=1 if italic else 32 if weight==700 else 64)
 fb.setupHead(macStyle=2 if italic else 1 if weight==700 else 0);fb.setupPost(italicAngle=-12 if italic else 0);fb.font.flavor='woff2';fb.save(out/(ps+'.woff2'))
 print(source,len(cmap),'glyphs, Vietnamese:',all(ord(c) in cmap for c in 'Tiếng Việt'))
