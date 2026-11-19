const $=id=>document.getElementById(id);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
try{qrcode.stringToBytes=qrcode.stringToBytesFuncs['UTF-8']}catch(e){}
const esc=s=>s.replace(/([\\;,:"])/g,'\\$1');
const T={
url:{l:'URL',f:[['u','Website address','yourcompany.com/welcome']],v:d=>{const s=d.u.trim();return s&&!/^[a-z][a-z0-9+.-]*:/i.test(s)?'https://'+s:s}},
text:{l:'Text',f:[['t','Message','Type or paste any text','area']],v:d=>d.t},
wifi:{l:'Wi-Fi',f:[['s','Network name','Office-5G'],['p','Password','Required for secured networks'],['k','Security','','sel']],v:d=>d.s?'WIFI:T:'+d.k+';S:'+esc(d.s)+';'+(d.k!=='nopass'?'P:'+esc(d.p||'')+';':'')+';':''},
mail:{l:'Email',f:[['a','Email address','hello@yourcompany.com'],['j','Subject','Optional']],v:d=>d.a.trim()?'mailto:'+d.a.trim()+(d.j?'?subject='+encodeURIComponent(d.j):''):''}
};
const D={url:{u:'yourcompany.com/welcome'},text:{t:''},wifi:{s:'',p:'',k:'WPA'},mail:{a:'',j:''}};
const S={tab:'url',shape:'hz',ecc:'M',f:'#111110',b:'#ffffff'};
const SH=[['sq','Square'],['px','Pixel'],['hz','Lines'],['vt','Columns'],['rd','Rounded'],['dot','Dots']];
const FR={sq:0,px:0,hz:0,vt:0,rd:.22,dot:.34};
const PRE=[['Mono','#111110','#ffffff'],['Cobalt','#1228c8','#ffffff'],['Safety','#111110','#ffd60a'],['Forest','#0b5d3b','#f2f2ec']];
const EH={L:'Low: recovers about 7% damage.',M:'Medium: recovers about 15%. A solid default.',Q:'Quartile: recovers about 25%. Good for print.',H:'High: recovers about 30%. Best for stylized patterns.'};
let M=null,U=[],ver=0,len=0,p=1,raf=0;

const FIN=(r,c,n)=>(r<7&&c<7)||(r<7&&c>=n-7)||(r>=n-7&&c<7);
const ez=t=>t<=0?0:t>=1?1:1-Math.pow(1-t,3);
const lum=h=>{const n=parseInt(h.slice(1),16),f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(n>>16)+.7152*f((n>>8)&255)+.0722*f(n&255)};
const RR=(x,a,b,w,h,r)=>{x.beginPath();x.roundRect&&r?x.roundRect(a,b,w,h,r):x.rect(a,b,w,h);x.fill()};

function units(m,sh,skip){
  const n=m.length,U=[],on=(r,c)=>m[r][c]&&!(skip&&FIN(r,c,n)),add=(x,y,w,h,rx)=>U.push({x,y,w,h,rx});
  if(sh==='hz'){for(let r=0;r<n;r++){let c=0;while(c<n){if(!on(r,c)){c++;continue}const s=c;while(c<n&&on(r,c))c++;add(s,r+.18,c-s,.64,0)}}}
  else if(sh==='vt'){for(let c=0;c<n;c++){let r=0;while(r<n){if(!on(r,c)){r++;continue}const s=r;while(r<n&&on(r,c))r++;add(c+.18,s,.64,r-s,0)}}}
  else for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(on(r,c)){
    if(sh==='px')add(c+.1,r+.1,.8,.8,0);else if(sh==='dot')add(c+.06,r+.06,.88,.88,.44);else if(sh==='rd')add(c,r,1,1,.3);else add(c,r,1,1,0);
  }
  return U;
}
function paint(x,Z,p){
  x.fillStyle=S.b;x.fillRect(0,0,Z,Z);
  if(!M)return;
  const n=M.length,u=Z/(n+8),h=n/2,mx=Math.hypot(h,h);
  x.fillStyle=S.f;
  U.forEach(q=>{
    const cx=q.x+q.w/2,cy=q.y+q.h/2,k=ez((p-Math.hypot(cx-h,cy-h)/mx*.55)/.45);if(!k)return;
    const w=q.w*k*u,hh=q.h*k*u,a=(cx+4)*u-w/2,b=(cy+4)*u-hh/2;
    if(q.rx)RR(x,a,b,w,hh,q.rx*k*u);else x.fillRect(a,b,w+.5,hh+.5);
  });
  const kk=ez(p*1.6-.1);
  if(kk>0)[[0,0],[0,n-7],[n-7,0]].forEach(([r,c])=>{
    const cx=(c+7.5)*u,cy=(r+7.5)*u;
    [[7,S.f],[5,S.b],[3,S.f]].forEach(([s,col])=>{const w=s*u*kk;x.fillStyle=col;RR(x,cx-w/2,cy-w/2,w,w,FR[S.shape]*w)});
  });
}
function svgText(){
  const n=M.length,s=n+8,fr=FR[S.shape];let e='';
  U.forEach(q=>{e+='<rect x="'+(q.x+4)+'" y="'+(q.y+4)+'" width="'+q.w+'" height="'+q.h+'"'+(q.rx?' rx="'+q.rx+'"':'')+'/>'});
  [[0,0],[0,n-7],[n-7,0]].forEach(([r,c])=>{
    const x=c+4,y=r+4;
    e+='<rect x="'+x+'" y="'+y+'" width="7" height="7" rx="'+fr*7+'"/><rect x="'+(x+1)+'" y="'+(y+1)+'" width="5" height="5" rx="'+fr*5+'" fill="'+S.b+'"/><rect x="'+(x+2)+'" y="'+(y+2)+'" width="3" height="3" rx="'+fr*3+'"/>';
  });
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+s+' '+s+'"'+(S.shape==='rd'||S.shape==='dot'?'':' shape-rendering="crispEdges"')+'><rect width="'+s+'" height="'+s+'" fill="'+S.b+'"/><g fill="'+S.f+'">'+e+'</g></svg>';
}
function draw(){const cv=$('cv');paint(cv.getContext('2d'),cv.width,p)}
function play(){
  cancelAnimationFrame(raf);const t0=performance.now(),dur=RM?1:950;
  (function f(t){p=Math.min(1,(t-t0)/dur);draw();if(p<1)raf=requestAnimationFrame(f)})(t0);
}
function build(m){
  const v=T[S.tab].v(D[S.tab]);let err='';M=null;U=[];
  if(v){
    try{
      const q=qrcode(0,S.ecc);q.addData(v);q.make();
      const n=q.getModuleCount();M=[];
      for(let r=0;r<n;r++){M.push([]);for(let c=0;c<n;c++)M[r].push(q.isDark(r,c))}
      ver=(n-17)/4;len=v.length;U=units(M,S.shape,true);
    }catch(e){err='Too much data'}
  }else err='Waiting';
  $('st').classList.toggle('er',!!err);$('stt').textContent=err||'Ready';
  $('png').disabled=$('svg').disabled=!M;
  $('m1').textContent=M?'Ver '+ver:'';$('m2').textContent=M?M.length+' × '+M.length+' modules':'—';$('m3').textContent=M?len+' chr':'';$('m4').textContent=M?'ECC '+S.ecc:'';
  const a=lum(S.f),b=lum(S.b);
  $('ch').textContent=(Math.max(a,b)+.05)/(Math.min(a,b)+.05)<3?'Low contrast: may not scan.':'';
  $('eh').textContent=EH[S.ecc];
  if(m==='wave')play();
  else{cancelAnimationFrame(raf);p=1;draw();if(m==='pulse'){const c=$('cv');c.classList.add('pu');setTimeout(()=>c.classList.remove('pu'),110)}}
}
async function put(name,blob){
  let dl=null;
  try{dl=window.claude&&await claude.use('downloads')}catch(e){}
  if(dl)return dl.save({filename:name,data:blob});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;
  document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
async function save(k){
  if(!M)return;
  const note=t=>$('sv').textContent=t;
  try{
    if(k==='png'){
      const o=document.createElement('canvas');o.width=o.height=1024;paint(o.getContext('2d'),1024,1);
      await put('quadra-qr.png',await new Promise(r=>o.toBlob(r,'image/png')));
    }else await put('quadra-qr.svg',new Blob([svgText()],{type:'image/svg+xml'}));
    note('Saved.');
  }catch(e){note(e&&e.code==='declined'?'':'Could not save the file.')}
}
function seg(id,items,val,cb){
  const el=$(id);el.innerHTML='<i></i>';el.style.setProperty('--n',items.length);
  const bs=items.map(([k,l],i)=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.onclick=()=>{set(i);cb(k)};el.append(b);return b});
  function set(i){el.style.setProperty('--i',i);bs.forEach((b,j)=>b.classList.toggle('on',j===i))}
  set(items.findIndex(a=>a[0]===val));
}
function rf(){
  const el=$('fields');el.innerHTML='';
  T[S.tab].f.forEach(([id,lb,ph,ty],i)=>{
    const d=document.createElement('div');d.className='fd';d.style.animationDelay=i*70+'ms';
    const l=document.createElement('label');l.textContent=lb;l.htmlFor='x'+id;
    let e;
    if(ty==='area')e=document.createElement('textarea');
    else if(ty==='sel'){e=document.createElement('select');['WPA','WEP','nopass'].forEach(o=>e.add(new Option(o==='nopass'?'None':o,o)))}
    else{e=document.createElement('input');e.autocomplete='off';e.spellcheck=false}
    e.id='x'+id;if(ph)e.placeholder=ph;e.value=D[S.tab][id]||'';
    e.addEventListener('input',()=>{D[S.tab][id]=e.value;build('pulse')});
    d.append(l,e);el.append(d);
  });
}
const IC=[[1,0,1,1,0],[1,1,0,1,1],[0,1,1,0,1],[1,0,1,1,1],[1,1,0,1,0]].map(r=>r.map(Boolean));
function tiles(){
  const el=$('shape');el.innerHTML='';
  SH.forEach(([k,l])=>{
    const b=document.createElement('button');b.type='button';b.className='tl'+(k===S.shape?' on':'');
    b.innerHTML='<svg viewBox="0 0 5 5" width="30" height="30" fill="currentColor">'+units(IC,k,false).map(q=>'<rect x="'+q.x+'" y="'+q.y+'" width="'+q.w+'" height="'+q.h+'" rx="'+q.rx+'"/>').join('')+'</svg>'+l;
    b.onclick=()=>{S.shape=k;[...el.children].forEach(c=>c.classList.toggle('on',c===b));build('wave')};
    el.append(b);
  });
}
seg('tabs',Object.keys(T).map(k=>[k,T[k].l]),S.tab,k=>{S.tab=k;rf();build('wave')});
seg('ecc',['L','M','Q','H'].map(k=>[k,k]),S.ecc,k=>{S.ecc=k;build('wave')});
tiles();
[['f','fh'],['b','bh']].forEach(([id,h])=>$(id).addEventListener('input',e=>{S[id]=e.target.value;$(h).textContent=e.target.value.toUpperCase();build('none')}));
PRE.forEach(([n,f,b])=>{
  const el=document.createElement('button');el.type='button';el.className='pz';
  el.innerHTML='<span><i style="background:'+f+'"></i><i style="background:'+b+'"></i></span>'+n;
  el.onclick=()=>{S.f=f;S.b=b;$('f').value=f;$('b').value=b;$('fh').textContent=f.toUpperCase();$('bh').textContent=b.toUpperCase();build('none')};
  $('pre').append(el);
});
$('png').onclick=()=>save('png');$('svg').onclick=()=>save('svg');
$('tk').innerHTML=(['Static codes','No expiry','Vector export','Six patterns','No sign-up'].map(t=>'<span>'+t+'</span>').join('<span>✕</span>')+'<span>✕</span>').repeat(2);
rf();build('wave');
(()=>{
  const all=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){all.forEach(e=>e.classList.add('on'));return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}}),{threshold:.15});
  all.forEach(e=>io.observe(e));
})();
(()=>{
  const cv=$('bg'),x=cv.getContext('2d');let mx=-999,my=-999,col='17,17,16',tc=0,act=0,st=0;
  const rs=()=>{const d=devicePixelRatio||1;cv.width=innerWidth*d;cv.height=innerHeight*d;x.setTransform(d,0,0,d,0,0);x.lineWidth=1.2};
  addEventListener('resize',rs);rs();
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;act=1});
  ['pointerup','pointercancel'].forEach(n=>addEventListener(n,e=>{if(e.pointerType!=='mouse')act=0}));
  document.addEventListener('mouseleave',()=>{act=0});
  function f(t){
    if(!(tc++%60))col=getComputedStyle(document.documentElement).getPropertyValue('--rgb').trim()||col;
    st+=(act-st)*.07;x.clearRect(0,0,innerWidth,innerHeight);
    for(let i=18;i<innerWidth;i+=36)for(let j=18;j<innerHeight;j+=36){
      const k=Math.max(0,1-Math.hypot(i-mx,j-my)/180)*st,w=Math.sin(t/1200+i*.011+j*.008),L=2.6+w*.6+k*6,a=k*Math.PI/4,c=Math.cos(a)*L,s=Math.sin(a)*L;
      x.strokeStyle='rgba('+col+','+(.13+w*.04+k*.6)+')';
      x.beginPath();x.moveTo(i-c,j-s);x.lineTo(i+c,j+s);x.moveTo(i+s,j-c);x.lineTo(i-s,j+c);x.stroke();
    }
    if(!RM)requestAnimationFrame(f);
  }
  requestAnimationFrame(f);
})();
