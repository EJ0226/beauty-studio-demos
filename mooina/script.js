
const nav=document.getElementById("siteNav");
const mobileNav=document.getElementById("mobileNav");
const menuButton=document.getElementById("menuButton");

window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",window.scrollY>32),{passive:true});

function goTo(id){
  const el=document.getElementById(id);
  if(el) el.scrollIntoView({behavior:"smooth",block:"start"});
  mobileNav.classList.remove("open");
  menuButton.textContent="☰";
}
document.querySelectorAll("[data-go]").forEach(el=>el.addEventListener("click",()=>goTo(el.dataset.go)));

menuButton.addEventListener("click",()=>{
  const open=mobileNav.classList.toggle("open");
  menuButton.textContent=open?"×":"☰";
});

document.querySelectorAll("[data-demo]").forEach(el=>el.addEventListener("click",()=>{
  alert(el.dataset.demo+"\n\n這是 Demo 版本，正式上線時再替換成實際連結即可。");
}));

const works=[
 {title:"SAND VEIL",color:"Sheer Nude",types:["NUDE","SIMPLE"],img:"https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=85",shape:"gallery-tall"},
 {title:"FINE LINE",color:"Warm Beige",types:["JAPANESE","DESIGN"],img:"https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85",shape:"gallery-wide"},
 {title:"ROSE SYRUP",color:"Muted Rose",types:["KOREAN","SIMPLE"],img:"https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1000&q=85",shape:"gallery-mid"},
 {title:"AURA EDGE",color:"Pearl Pink",types:["KOREAN","DESIGN"],img:"https://images.unsplash.com/photo-1604902396830-aca29e19b067?auto=format&fit=crop&w=1000&q=85",shape:"gallery-square"},
 {title:"MILK TEA",color:"Oat Beige",types:["NUDE","JAPANESE"],img:"https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85",shape:"gallery-wide"},
 {title:"SOFT BLUSH",color:"Dusty Pink",types:["KOREAN","SIMPLE"],img:"https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=1000&q=75",shape:"gallery-mid"}
];
const grid=document.getElementById("galleryGrid");
let activeFilter="ALL";

function renderGallery(){
  grid.innerHTML="";
  works.filter(w=>activeFilter==="ALL"||w.types.includes(activeFilter)).forEach((w,i)=>{
    const btn=document.createElement("button");
    btn.className=`gallery-card ${w.shape}`;
    btn.innerHTML=`<img src="${w.img}" alt="${w.title} 美甲作品示意" loading="lazy"><span class="gallery-card-info"><b>${w.title}</b><i>${w.color}</i></span><span class="gallery-card-view">VIEW ↗</span><span class="gallery-card-number">0${i+1}</span>`;
    btn.addEventListener("click",()=>openLightbox(w,i+1));
    grid.appendChild(btn);
  });
}
function openLightbox(w,num){
  const box=document.createElement("div");
  box.className="lightbox";
  box.innerHTML=`<div class="lightbox-body"><button class="lightbox-close" aria-label="關閉">×</button><div class="lightbox-image"><img src="${w.img}" alt="${w.title}"></div><div class="lightbox-detail"><p class="eyebrow">LOOK 0${num}</p><h3>${w.title}</h3><dl><div><dt>COLOR</dt><dd>${w.color}</dd></div><div><dt>STYLE</dt><dd>${w.types.join(" / ")}</dd></div></dl><p>Demo 作品圖。正式上線前可替換成店家官方實拍與對應款式資訊。</p></div></div>`;
  document.body.appendChild(box);
  const close=()=>box.remove();
  box.addEventListener("mousedown",e=>{if(e.target===box)close()});
  box.querySelector(".lightbox-close").addEventListener("click",close);
}
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{
  activeFilter=btn.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b===btn));
  renderGallery();
}));
renderGallery();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.addEventListener("keydown",e=>{if(e.key==="Escape")document.querySelector(".lightbox")?.remove()});
