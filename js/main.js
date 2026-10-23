const S=[...document.querySelectorAll('.sl')],n=document.getElementById('n');let c=0;function nx(){S[c].classList.remove('on');c=(c+1)%S.length;S[c].classList.add('on');n.textContent='0'+(c+1)}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)setTimeout(()=>{nx();setInterval(nx,5000)},1800);
const t=document.getElementById('top');addEventListener('scroll',()=>t.classList.toggle('s',scrollY>innerHeight*.7));

// תפריט מובייל
const bur=document.getElementById('burger'),menu=document.getElementById('menu');
function setMenu(o){menu.classList.toggle('open',o);bur.setAttribute('aria-expanded',o)}
bur.onclick=()=>setMenu(!menu.classList.contains('open'));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);bur.focus()}});

// לייטבוקס – כל פרק (גלריה אישית / מירקה / Playground) הוא קבוצה נפרדת
const lb=document.getElementById('lb'),li=document.getElementById('li'),lc=document.getElementById('lc'),x=document.getElementById('x'),pv=document.getElementById('pv'),nxt=document.getElementById('nx');let F=[],cur=0,back=null;
const G={art:[...document.querySelectorAll('.grid figure')]};document.querySelectorAll('[data-lb]').forEach(f=>(G[f.dataset.lb]=G[f.dataset.lb]||[]).push(f));
function show(i){cur=(i+F.length)%F.length;const im=F[cur].querySelector('img');li.src=im.src;li.alt=im.alt;lc.textContent=String(cur+1).padStart(2,'0')+' / '+F.length}
function openLb(g,i){F=g;back=document.activeElement;show(i);lb.classList.add('on');document.body.style.overflow='hidden';x.focus()}
function closeLb(){lb.classList.remove('on');document.body.style.overflow='';if(back)back.focus()}
Object.values(G).forEach(g=>g.forEach((f,i)=>{f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label','הגדלת תמונה '+(i+1)+': '+f.querySelector('img').alt);f.onclick=()=>openLb(g,i);f.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(g,i)}}}));
lb.onclick=closeLb;
pv.onclick=e=>{e.stopPropagation();show(cur-1)};
nxt.onclick=e=>{e.stopPropagation();show(cur+1)};
lb.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeLb();
  else if(e.key==='ArrowLeft')show(cur+1); // RTL: שמאלה = הבאה
  else if(e.key==='ArrowRight')show(cur-1);
  else if(e.key==='Tab'){e.preventDefault();const B=[x,pv,nxt];B[(B.indexOf(document.activeElement)+(e.shiftKey?2:1))%3].focus()} // הפוקוס מסתובב בין שלושת הכפתורים ונשאר בדיאלוג
});
// החלקה בטלפון – RTL: החלקה ימינה = הבאה, כמו החץ השמאלי
let sx=0;
lb.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d>0?1:-1))});
