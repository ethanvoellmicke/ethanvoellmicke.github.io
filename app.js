(() => {
"use strict";
const projects=window.PORTFOLIO_PROJECTS;
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const safeURL=s=>{try{const u=new URL(s,location.href);return ["https:","http:"].includes(u.protocol)?u.href:"";}catch{return "";}};
const imgAttrs=(url,caption)=>'data-image="'+esc(safeURL(url))+'" data-caption="'+esc(caption)+'"';
const tagHTML=p=>'<div class="tags">'+p.tags.map(t=>'<span>'+esc(t)+'</span>').join("")+'</div>';
function art(type){
 const lines={
 arm:'<path d="M115 155h125M138 155v-17h78v17M175 136l-35-48 48-33 35 35 35-12M140 88l14-12M188 55l14 5M223 90l10-5M258 78l12-13m-12 13 17 6"/><circle cx="175" cy="136" r="9"/><circle cx="140" cy="88" r="9"/><circle cx="188" cy="55" r="9"/><circle cx="223" cy="90" r="7"/>',
 drone:'<path d="M133 62l94 85m0-85-94 85M165 86h30v36h-30z"/><ellipse cx="128" cy="58" rx="38" ry="12"/><ellipse cx="232" cy="58" rx="38" ry="12"/><ellipse cx="128" cy="151" rx="38" ry="12"/><ellipse cx="232" cy="151" rx="38" ry="12"/><path d="M170 123l-9 24m29-24 9 24"/>',
 car:'<path d="M103 124l45-38 111 12 13 35-49 29-111-14zM103 124l118 14 51-5m-51 5 2 24M148 86v26l-45 12m45-12 116 14M171 106v-17h47v22"/><circle cx="134" cy="152" r="16"/><circle cx="245" cy="148" r="16"/><path d="M175 98h23m-11-8v17"/>',
 i2c:'<rect x="57" y="80" width="66" height="64" rx="4"/><rect x="166" y="80" width="66" height="64" rx="4"/><path d="M123 103h43m-43 17h43M78 80V65m13 15V65m111 15V65m13 15V65m17 40h32l16-24 23 14 16-18m-23 65h32m-16 0V96"/><circle cx="79" cy="110" r="8"/><rect x="187" y="98" width="21" height="25"/><circle cx="280" cy="81" r="6"/><circle cx="303" cy="95" r="6"/>'
 };
 return '<svg aria-hidden="true" viewBox="0 0 360 205"><defs><pattern id="grid-'+type+'" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#d5e0d5" stroke-width=".5"/></pattern></defs><rect width="360" height="205" fill="url(#grid-'+type+')"/><g fill="none" stroke="#4b7465" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'+(lines[type]||lines.arm)+'</g></svg>';
}
function renderCards(filter="all"){
 const list=projects.filter(p=>filter==="all"||p.filters.includes(filter));
 $("#project-grid").innerHTML=list.map(p=>'<button class="project-card" data-project="'+p.id+'" aria-label="Explore '+esc(p.title)+'"><div class="card-art">'+(p.image?'<img src="'+esc(p.image)+'" alt="'+esc(p.imageCaption)+'" loading="lazy">':art(p.art))+'<span class="card-no">'+p.number+' / PROJECT</span><span class="card-arrow">↗</span>'+(!p.image?'<span class="art-label">PROJECT ILLUSTRATION</span>':'')+'</div><div class="card-copy"><span class="card-type">'+esc(p.category)+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.summary)+'</p><div class="card-meta">'+esc(p.meta)+'</div></div></button>').join("");
 $("#project-count").textContent=list.length+" project"+(list.length===1?"":"s");
}
const dialog=$("#project-dialog"),lightbox=$("#image-dialog");
let active=null,lastTrigger=null,zoom=1,lightboxTrigger=null;
function tabsFor(p){return [{id:"overview",label:"Overview"},{id:"technical",label:"Engineering"},...(p.wiring?[{id:"wiring",label:"Electronics"}]:[]),{id:"media",label:"Photos & video"}];}
function videoHTML(p){
 if(!p.video)return '<div class="media-note"><h3>See the build in action.</h3><p>Demonstration footage will be added here. '+(p.id==="quadruped"?'The CAD assembly and electrical schematic are available below.':'Build photos and source files will be added as the project documentation is expanded.')+'</p></div>';
 const url=safeURL(p.video);if(!url)return "";
 return /\.(mp4|webm)(\?.*)?$/i.test(url)?'<video class="project-video" controls preload="metadata" src="'+esc(url)+'">Your browser does not support this video.</video>':'<a class="button primary" href="'+esc(url)+'" target="_blank" rel="noopener">Watch the project video ↗</a>';
}
function galleryHTML(p){
 const media=[...(p.image?[{src:p.image,caption:p.imageCaption}]:[]),...(p.photos||[]),...(p.wiring?[{src:p.wiring,caption:"Power distribution and control wiring"}]:[])];
 return media.length?'<div class="gallery" style="margin-top:24px">'+media.map(m=>'<figure><button '+imgAttrs(m.src,m.caption)+' aria-label="Expand '+esc(m.caption)+'"><img src="'+esc(safeURL(m.src))+'" alt="'+esc(m.caption)+'" loading="lazy"></button><figcaption>'+esc(m.caption)+'</figcaption></figure>').join("")+'</div>':"";
}
function panelHTML(p,tab){
 if(tab==="overview")return (p.image?'<button class="image-button" '+imgAttrs(p.image,p.imageCaption)+' aria-label="Expand project image"><img class="detail-hero" src="'+esc(p.image)+'" alt="'+esc(p.imageCaption)+'"></button>':'')+'<h3>The build</h3><p>'+esc(p.overview)+'</p><div class="detail-split"><div><h3>What I worked on</h3><ul>'+p.contributions.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul></div><div><h3>At a glance</h3><dl class="spec-list">'+p.specs.map(([k,v])=>'<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join("")+'</dl></div></div>'+(p.repo?'<a class="detail-link" href="'+esc(p.repo)+'" target="_blank" rel="noopener">Explore the project repository ↗</a>':"");
 if(tab==="technical")return '<h3>How it works</h3>'+(p.process?'<ol class="process">'+p.process.map(([t,d])=>'<li><div><strong>'+esc(t)+'</strong><p>'+esc(d)+'</p></div></li>').join("")+'</ol>':'<p>'+esc(p.overview)+'</p>')+'<h3>Current documentation</h3><p>'+esc(p.technicalNote)+'</p><h3>Next development</h3><p>'+esc(p.next)+'</p>'+(p.repo?'<a class="detail-link" href="'+esc(p.repo)+'" target="_blank" rel="noopener">View source code on GitHub ↗</a>':"");
 if(tab==="wiring")return '<h3>Power and control, together.</h3><p>The battery feeds the servo bus through an inline fuse and main switch. A converter set to 5 V powers the Nano, PCA9685 logic, and IMU through the breadboard. All share a common ground.</p><button class="image-button" '+imgAttrs(p.wiring,"Quadruped power distribution and control wiring")+' aria-label="Expand wiring schematic"><img class="wiring-image" src="'+esc(p.wiring)+'" alt="Quadruped wiring schematic with battery, fuse, switch, power buses, converter, Nano, PCA9685, IMU and servos"></button><p class="quiet">Select the drawing to enlarge it. Use + and − to inspect the connections.</p><a class="detail-link" href="'+esc(p.wiring)+'" download="quadruped-wiring.svg">Download the vector schematic ↓</a>';
 return videoHTML(p)+galleryHTML(p);
}
function selectTab(tab,focus=false){
 if(!active||!tabsFor(active).some(t=>t.id===tab))return;
 const buttons=[...$("#detail-tabs").querySelectorAll("button")];
 buttons.forEach(b=>{const selected=b.dataset.tab===tab;b.setAttribute("aria-selected",String(selected));b.tabIndex=selected?0:-1;if(selected&&focus)b.focus();});
 $("#detail-panel").setAttribute("aria-labelledby","tab-"+tab);
 $("#detail-panel").innerHTML=panelHTML(active,tab);
}
function openProject(id,trigger){
 const p=projects.find(x=>x.id===id);if(!p)return;
 lastTrigger=trigger||document.activeElement;active=p;
 $("#detail-number").textContent="PROJECT / "+p.number;
 $("#detail-head").innerHTML='<div class="detail-head"><div class="eyebrow">'+esc(p.category.toUpperCase())+'</div><h2 id="detail-title">'+esc(p.title)+'</h2><p>'+esc(p.description)+'</p>'+tagHTML(p)+'</div>';
 $("#detail-tabs").innerHTML=tabsFor(p).map((t,i)=>'<button role="tab" id="tab-'+t.id+'" data-tab="'+t.id+'" aria-controls="detail-panel" aria-selected="'+(i===0)+'" tabindex="'+(i===0?0:-1)+'">'+esc(t.label)+'</button>').join("");
 selectTab("overview");if(!dialog.open)dialog.showModal();dialog.scrollTop=0;
 if(location.hash!=="#project="+id)history.pushState(null,"","#project="+id);
}
function closeProject(){if(dialog.open)dialog.close();}
dialog.addEventListener("close",()=>{active=null;if(location.hash.startsWith("#project="))history.replaceState(null,"","#projects");lastTrigger?.focus();});
$("#close-project").addEventListener("click",closeProject);
function setZoom(value){
 zoom=Math.max(1,Math.min(4,value));
 const img=$("#lightbox-image");img.style.width=(zoom*100)+"%";img.style.maxHeight=zoom===1?"100%":"none";
 $("#zoom-out").disabled=zoom===1;$("#zoom-in").disabled=zoom===4;
}
function openImage(url,caption,trigger){
 const valid=safeURL(url);if(!valid)return;lightboxTrigger=trigger;
 const img=$("#lightbox-image");img.src=valid;img.alt=caption;$("#image-caption").textContent=caption;setZoom(1);lightbox.showModal();
}
$("#close-image").addEventListener("click",()=>lightbox.close());
lightbox.addEventListener("close",()=>lightboxTrigger?.focus());
$("#zoom-in").addEventListener("click",()=>setZoom(zoom+.5));
$("#zoom-out").addEventListener("click",()=>setZoom(zoom-.5));
$("#reset-zoom").addEventListener("click",()=>{setZoom(1);$(".image-scroll").scrollTo(0,0);});
document.addEventListener("click",e=>{
 const project=e.target.closest("[data-project]");if(project){openProject(project.dataset.project,project);return;}
 const image=e.target.closest("[data-image]");if(image){openImage(image.dataset.image,image.dataset.caption||"Project image",image);return;}
 const tab=e.target.closest("[data-tab]");if(tab){selectTab(tab.dataset.tab);return;}
 const filter=e.target.closest("[data-filter]");if(filter){document.querySelectorAll("[data-filter]").forEach(b=>{b.classList.toggle("active",b===filter);b.setAttribute("aria-pressed",String(b===filter));});renderCards(filter.dataset.filter);}
});
$("#detail-tabs").addEventListener("keydown",e=>{
 if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();
 const tabs=tabsFor(active),index=tabs.findIndex(t=>t.id===document.activeElement.dataset.tab);
 const next=e.key==="Home"?0:e.key==="End"?tabs.length-1:(index+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length;
 selectTab(tabs[next].id,true);
});
[dialog,lightbox].forEach(d=>d.addEventListener("click",e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}));
function syncHash(){const hash=location.hash;if(hash.startsWith("#project=")){openProject(decodeURIComponent(hash.slice(9)));}else if(dialog.open){dialog.close();}}
window.addEventListener("popstate",syncHash);window.addEventListener("hashchange",syncHash);
renderCards();syncHash();
})();