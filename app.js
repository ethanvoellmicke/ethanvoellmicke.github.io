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
function tabsFor(p){return [{id:"overview",label:"Overview"},{id:"technical",label:"Engineering"},...(p.wiring?[{id:"wiring",label:"Electronics"}]:[]),{id:"media",label:p.mediaTabLabel||"Photos & video"}];}
function videoHTML(p){
 if(p.videos?.length)return '<section class="video-section" aria-label="Project demonstrations"><h3>See it in motion</h3><div class="video-grid'+(p.videos.length===1?' video-grid-single':'')+'">'+p.videos.map(v=>'<figure class="video-card"><video controls playsinline preload="metadata" aria-label="'+esc(v.title)+' demonstration"'+(v.poster?' poster="'+esc(safeURL(v.poster))+'"':'')+'><source src="'+esc(safeURL(v.src))+'" type="video/mp4">Your browser does not support inline video. <a href="'+esc(safeURL(v.src))+'">Open video</a></video><figcaption><h4>'+esc(v.title)+'</h4><p>'+esc(v.caption)+'</p></figcaption></figure>').join("")+'</div></section>';
 if(!p.video&&p.mediaIntro)return "";
 if(!p.video)return '<div class="media-note"><h3>See the build in action.</h3><p>Demonstration footage will be added here. '+(p.id==="quadruped"?'The CAD assembly and electrical schematic are available below.':'Build photos and source files will be added as the project documentation is expanded.')+'</p></div>';
 const url=safeURL(p.video);if(!url)return "";
 return /\.(mp4|webm)(\?.*)?$/i.test(url)?'<video class="project-video" controls preload="metadata" src="'+esc(url)+'">Your browser does not support this video.</video>':'<a class="button primary" href="'+esc(url)+'" target="_blank" rel="noopener">Watch the project video ↗</a>';
}
function galleryHTML(p){
 const media=[...(p.image?[{src:p.image,caption:p.imageCaption}]:[]),...(p.photos||[]),...(p.wiring?[{src:p.wiring,caption:"Power distribution and control wiring"}]:[])];
 return media.length?'<div class="gallery'+(p.id==="microneedle-actuator"?' research-gallery':'')+'" style="margin-top:24px">'+media.map(m=>'<figure><button '+imgAttrs(m.src,m.caption)+' aria-label="Expand '+esc(m.caption)+'"><img src="'+esc(safeURL(m.src))+'" alt="'+esc(m.caption)+'" loading="lazy"></button><figcaption>'+esc(m.caption)+'</figcaption></figure>').join("")+'</div>':"";
}
function plotsHTML(p){
 if(!p.plots?.length)return "";
 const modes=[...new Set(p.plots.map(plot=>plot.mode||"all"))];
 const labels=Object.fromEntries(p.plots.map(plot=>[plot.mode||"all",plot.modeLabel||"Tracking"]));
 const groups=modes.map((mode,index)=>'<div class="plot-mode-group" data-plot-group="'+esc(mode)+'"'+(index?' hidden':'')+'><div class="tracking-grid">'+p.plots.filter(plot=>(plot.mode||"all")===mode).map(plot=>'<figure class="tracking-figure"><div class="plot-heading"><span class="plot-index">'+esc(plot.modeLabel||"TRACKING RESPONSE")+'</span><h4>'+esc(plot.title)+'</h4><span class="plot-error">Reported avg. error <strong>'+esc(plot.error||"—")+'</strong></span></div><button class="plot-image-button" '+imgAttrs(plot.src,(plot.modeLabel||"Tracking")+" — "+plot.title)+' aria-label="Enlarge '+esc((plot.modeLabel||"Tracking")+" — "+plot.title)+'"><img class="plot-image" src="'+esc(safeURL(plot.src))+'" alt="'+esc(plot.alt||plot.title)+'" loading="lazy"></button><figcaption>'+esc(plot.caption)+'<span class="plot-expand-hint">Select plot to enlarge ↗</span></figcaption></figure>').join("")+'</div></div>').join("");
 return '<section class="tracking-plots" aria-label="Joint tracking plots"><h3>Tracking response</h3><p class="plot-intro">Compare both arms across the three operating modes. Blue is the reference angle; red is the measured motor position.</p><div class="plot-mode-controls" role="group" aria-label="Choose plot operating mode">'+modes.map((mode,index)=>'<button type="button" data-plot-mode="'+esc(mode)+'" aria-pressed="'+(!index)+'">'+esc(labels[mode])+'</button>').join("")+'</div>'+groups+'</section>';
}
function designFiguresHTML(p){
 if(!p.figures?.length)return "";
 return '<section class="design-figures" aria-label="Drone design studies"><h3>Design studies</h3>'+galleryHTML({photos:p.figures})+'</section>';
}
function resultsHTML(p){
 if(!p.results)return "";
 const r=p.results;
 return '<section class="results-section" aria-label="Reported test results"><h3>Measured results</h3><div class="results-scroll"><table class="results-table"><caption>'+esc(r.caption)+'</caption><thead><tr>'+r.headers.map(h=>'<th scope="col">'+esc(h)+'</th>').join("")+'</tr></thead><tbody>'+r.rows.map(row=>'<tr><th scope="row">'+esc(row[0])+'</th>'+row.slice(1).map(v=>'<td>'+esc(v)+'</td>').join("")+'</tr>').join("")+'</tbody></table></div><p class="quiet">'+esc(r.note)+'</p></section>';
}
function awardHTML(p){
 if(!p.award)return "";
 const a=p.award;
 return '<aside class="project-award" aria-label="'+esc(a.ariaLabel||"Competition result")+'"><strong class="award-rank">'+esc(a.title)+'</strong><div class="award-copy"><span class="eyebrow">'+esc(a.label||"COMPETITION RESULT")+'</span><h3>'+esc(a.event)+'</h3><p>'+esc(a.detail)+'</p></div><button class="award-image-link" '+imgAttrs(a.src,a.caption)+' aria-label="'+esc(a.linkAria||"View second-place trophy")+'">'+esc(a.linkLabel||"View trophy")+' ↗</button></aside>';
}
function panelHTML(p,tab){
 if(tab==="overview")return awardHTML(p)+(p.image?'<button class="image-button" '+imgAttrs(p.image,p.imageCaption)+' aria-label="Expand project image"><img class="detail-hero'+((p.id==="i2c-arm"||p.id==="robotic-arm"||p.id==="drone"||p.id==="senior-design"||p.id==="robotic-car"||p.id==="microneedle-actuator"||p.id==="lightweight-bridge")?' detail-hero-portrait':'')+'" src="'+esc(p.image)+'" alt="'+esc(p.imageCaption)+'"></button>':'')+'<h3>'+esc(p.overviewHeading||'The build')+'</h3><p>'+esc(p.overview)+'</p><div class="detail-split"><div><h3>'+esc(p.contributionHeading||'What I worked on')+'</h3><ul>'+p.contributions.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul></div><div><h3>At a glance</h3><dl class="spec-list">'+p.specs.map(([k,v])=>'<dt>'+esc(k)+'</dt><dd>'+esc(v)+'</dd>').join("")+'</dl></div></div>'+(p.id==="senior-design"?'<section class="senior-design-overview-gallery" aria-label="Senior Design project gallery"><h3>CAD, manufactured valve & engineering drawings</h3><p class="quiet">Explore my SOLIDWORKS work, exploded assembly, transparent cutaways, CNC-machined valve assembly, component drawings and showcase poster. Select any image to enlarge.</p>'+galleryHTML(p)+'</section>':'')+(p.repo?'<a class="detail-link" href="'+esc(p.repo)+'" target="_blank" rel="noopener">Explore the project repository ↗</a>':"");
 if(tab==="technical")return '<h3>How it works</h3>'+(p.process?'<ol class="process">'+p.process.map(([t,d])=>'<li><div><strong>'+esc(t)+'</strong><p>'+esc(d)+'</p></div></li>').join("")+'</ol>':'<p>'+esc(p.overview)+'</p>')+'<h3>Current documentation</h3><p>'+esc(p.technicalNote)+'</p>'+designFiguresHTML(p)+resultsHTML(p)+plotsHTML(p)+'<h3>Next development</h3><p>'+esc(p.next)+'</p>'+(p.resources?.length?'<h3>Project files</h3><ul>'+p.resources.map(r=>'<li><a class="detail-link" href="'+esc(safeURL(r.url))+'" target="_blank" rel="noopener">'+esc(r.label)+' ↗</a></li>').join('')+'</ul>':'')+(p.repo?'<a class="detail-link" href="'+esc(p.repo)+'" target="_blank" rel="noopener">View source code on GitHub ↗</a>':"");
 if(tab==="wiring")return '<h3>Power and control, together.</h3><p>The battery feeds the servo bus through an inline fuse and main switch. A converter set to 5 V powers the Nano, PCA9685 logic, and IMU through the breadboard. All share a common ground.</p><button class="image-button" '+imgAttrs(p.wiring,"Quadruped power distribution and control wiring")+' aria-label="Expand wiring schematic"><img class="wiring-image" src="'+esc(p.wiring)+'" alt="Quadruped wiring schematic with battery, fuse, switch, power buses, converter, Nano, PCA9685, IMU and servos"></button><p class="quiet">Select the drawing to enlarge it. Use + and − to inspect the connections.</p><a class="detail-link" href="'+esc(p.wiring)+'" download="quadruped-wiring.svg">Download the vector schematic ↓</a>';
 return videoHTML(p)+(p.mediaHeading?'<h3>'+esc(p.mediaHeading)+'</h3>':'')+(p.mediaIntro?'<p>'+esc(p.mediaIntro)+'</p>':'')+galleryHTML(p);
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
dialog.addEventListener("close",()=>{document.querySelectorAll("#detail-panel video").forEach(v=>v.pause());active=null;if(location.hash.startsWith("#project="))history.replaceState(null,"","#projects");lastTrigger?.focus();});
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
document.addEventListener("play",e=>{if(e.target.tagName!=="VIDEO")return;document.querySelectorAll("#detail-panel video").forEach(v=>{if(v!==e.target)v.pause();});},true);
document.addEventListener("click",e=>{
 const mode=e.target.closest("[data-plot-mode]");
 if(mode){
  const section=mode.closest(".tracking-plots");
  section.querySelectorAll("[data-plot-mode]").forEach(button=>button.setAttribute("aria-pressed",String(button===mode)));
  section.querySelectorAll("[data-plot-group]").forEach(group=>{group.hidden=group.dataset.plotGroup!==mode.dataset.plotMode;});
  return;
 }

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