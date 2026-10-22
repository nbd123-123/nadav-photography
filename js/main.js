const S=[...document.querySelectorAll('.sl')],n=document.getElementById('n');let c=0;function nx(){S[c].classList.remove('on');c=(c+1)%S.length;S[c].classList.add('on');n.textContent='0'+(c+1)}setTimeout(()=>{nx();setInterval(nx,5000)},1800);
const t=document.getElementById('top');addEventListener('scroll',()=>t.classList.toggle('s',scrollY>innerHeight*.7));

// תפריט מובייל
const bur=document.getElementById('burger'),menu=document.getElementById('menu');
function setMenu(o){menu.classList.toggle('open',o);bur.setAttribute('aria-expanded',o)}
bur.onclick=()=>setMenu(!menu.classList.contains('open'));
menu.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);bur.focus()}});

// לייטבוקס
const lb=document.getElementById('lb'),li=document.getElementById('li'),lc=document.getElementById('lc'),x=document.getElementById('x'),F=[...document.querySelectorAll('.grid figure')];let cur=0,back=null;
function show(i){cur=(i+F.length)%F.length;const im=F[cur].querySelector('img');li.src=im.src;li.alt=im.alt;lc.textContent=String(cur+1).padStart(2,'0')+' / '+F.length}
function openLb(i){back=document.activeElement;show(i);lb.classList.add('on');document.body.style.overflow='hidden';x.focus()}
function closeLb(){lb.classList.remove('on');document.body.style.overflow='';if(back)back.focus()}
F.forEach((f,i)=>{f.tabIndex=0;f.setAttribute('role','button');f.setAttribute('aria-label','הגדלת תמונה '+(i+1)+': '+f.querySelector('img').alt);f.onclick=()=>openLb(i);f.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLb(i)}}});
lb.onclick=closeLb;
lb.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeLb();
  else if(e.key==='ArrowLeft')show(cur+1); // RTL: שמאלה = הבאה
  else if(e.key==='ArrowRight')show(cur-1);
  else if(e.key==='Tab'){e.preventDefault();x.focus()} // כפתור הסגירה הוא האלמנט היחיד בדיאלוג – הפוקוס נשאר בפנים
});
