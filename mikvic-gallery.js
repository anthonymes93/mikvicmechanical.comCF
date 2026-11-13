(()=>{'use strict';
const SELECTOR='.bwg-thumbnails a.bwg_lightbox[href], .bwg-thumbnails a.bwg-a[href]';
const containers=[...document.querySelectorAll('.bwg-thumbnails')];if(!containers.length)return;
const style=document.createElement('style');style.textContent=`
.mikvic-lightbox{position:fixed;inset:0;background:rgba(10,15,21,.95);z-index:2147483000;display:none;align-items:center;justify-content:center;padding:48px 80px;box-sizing:border-box}
.mikvic-lightbox.is-open{display:flex}
.mikvic-lightbox img{display:block;max-width:100%;max-height:calc(100dvh - 110px);width:auto;height:auto;object-fit:contain;border-radius:4px;box-shadow:0 16px 60px rgba(0,0,0,.4)}
.mikvic-lightbox button{position:absolute;z-index:2;display:grid;place-items:center;border:0;border-radius:50%;width:48px;height:48px;padding:0;color:#fff;background:rgba(255,255,255,.14);font-size:29px;font-weight:400;cursor:pointer;line-height:1;transition:background .2s}
.mikvic-lightbox button:hover,.mikvic-lightbox button:focus-visible{background:rgba(255,255,255,.3)}
.mikvic-lightbox .mikvic-prev{left:18px;top:50%;transform:translateY(-50%)}
.mikvic-lightbox .mikvic-next{right:18px;top:50%;transform:translateY(-50%)}
.mikvic-lightbox .mikvic-close{right:18px;top:18px;font-size:32px}
.mikvic-lightbox .mikvic-caption{position:absolute;bottom:15px;left:20px;right:20px;text-align:center;color:#edf0f2;font:14px/1.4 system-ui,Arial,sans-serif}
.mikvic-lightbox .mikvic-counter{position:absolute;top:23px;left:24px;color:#edf0f2;font:14px/1.3 system-ui,Arial,sans-serif}
body.mikvic-lightbox-open{overflow:hidden!important}
@media(max-width:600px){.mikvic-lightbox{padding:70px 12px 70px}.mikvic-lightbox img{max-height:calc(100dvh - 160px)}.mikvic-lightbox button{width:42px;height:42px;background:rgba(0,0,0,.55)}.mikvic-lightbox .mikvic-prev{left:8px}.mikvic-lightbox .mikvic-next{right:8px}}
`;document.head.appendChild(style);
const overlay=document.createElement('div');overlay.className='mikvic-lightbox';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Image gallery');overlay.innerHTML='<button type="button" class="mikvic-close" aria-label="Close gallery">×</button><button type="button" class="mikvic-prev" aria-label="Previous image">‹</button><img alt=""><button type="button" class="mikvic-next" aria-label="Next image">›</button><div class="mikvic-counter"></div><div class="mikvic-caption"></div>';document.body.appendChild(overlay);
const picture=overlay.querySelector('img'),counter=overlay.querySelector('.mikvic-counter'),caption=overlay.querySelector('.mikvic-caption');let images=[],index=0,lastFocus=null;
function show(i){if(!images.length)return;index=(i+images.length)%images.length;const a=images[index];picture.src=a.href;picture.alt=a.querySelector('img')?.alt||'Gallery photo';counter.textContent=(index+1)+' / '+images.length;caption.textContent=a.querySelector('img')?.alt||'';const nav=images.length>1;overlay.querySelector('.mikvic-prev').hidden=!nav;overlay.querySelector('.mikvic-next').hidden=!nav}
function close(){overlay.classList.remove('is-open');document.body.classList.remove('mikvic-lightbox-open');picture.removeAttribute('src');if(lastFocus&&lastFocus.isConnected)lastFocus.focus()}
function move(by){show(index+by)}
overlay.querySelector('.mikvic-close').addEventListener('click',close);overlay.querySelector('.mikvic-prev').addEventListener('click',()=>move(-1));overlay.querySelector('.mikvic-next').addEventListener('click',()=>move(1));overlay.addEventListener('click',e=>{if(e.target===overlay)close()});
document.addEventListener('keydown',e=>{if(!overlay.classList.contains('is-open'))return;if(e.key==='Escape'){e.preventDefault();close()}else if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}else if(e.key==='ArrowRight'){e.preventDefault();move(1)}else if(e.key==='Tab'){const buttons=[...overlay.querySelectorAll('button:not([hidden])')];const first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
for(const container of containers){container.addEventListener('click',e=>{const link=e.target.closest('a.bwg_lightbox[href], a.bwg-a[href]');if(!link||!container.contains(link))return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();images=[...container.querySelectorAll('a.bwg_lightbox[href], a.bwg-a[href]')].filter(a=>a.getAttribute('href')&&!a.getAttribute('href').startsWith('#'));if(!images.length)return;lastFocus=link;show(images.indexOf(link));overlay.classList.add('is-open');document.body.classList.add('mikvic-lightbox-open');overlay.querySelector('.mikvic-close').focus() },true)}
})();