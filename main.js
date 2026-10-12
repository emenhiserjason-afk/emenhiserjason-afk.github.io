(() => {
 const dialog=document.querySelector('#lightbox');
 if(!dialog || typeof dialog.showModal!=='function') return;
 const image=document.querySelector('#lightbox-image'),caption=document.querySelector('#lightbox-caption');
 const all=JSON.parse(document.querySelector('#gallery-data').textContent);
 const close=document.querySelector('#close-lightbox'),count=document.querySelector('#image-count'),size=document.querySelector('#image-size');
 const scroll=document.querySelector('.lightbox-scroll');
 let trigger=null,items=[],index=0;
 function render(){const m=items[index];image.src=m.url;image.alt=m.caption;caption.textContent=m.caption;count.textContent=`${m.title} · ${index+1} of ${items.length}`;scroll.scrollTop=0;scroll.scrollLeft=0;}
 function open(link,project,file){trigger=link;items=all.filter(m=>m.project===project);if(!items.length)return;index=Math.max(0,items.findIndex(m=>m.file===file));dialog.classList.remove('actual-size');size.setAttribute('aria-pressed','false');size.textContent='Actual size';render();dialog.showModal();document.body.classList.add('modal-open');}
 document.querySelectorAll('[data-lightbox],[data-gallery]').forEach(link=>link.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;event.preventDefault();open(link,link.dataset.project||link.dataset.gallery,link.dataset.file);}));
 function move(delta){index=(index+delta+items.length)%items.length;render();}
 document.querySelector('#previous-image').addEventListener('click',()=>move(-1));
 document.querySelector('#next-image').addEventListener('click',()=>move(1));
 size.addEventListener('click',()=>{const actual=dialog.classList.toggle('actual-size');size.setAttribute('aria-pressed',String(actual));size.textContent=actual?'Fit image':'Actual size';});
 close.addEventListener('click',()=>dialog.close());
 dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
  if(event.key==='Tab'){const buttons=[...dialog.querySelectorAll('button:not([disabled])')];const i=buttons.indexOf(document.activeElement);if(event.shiftKey&&i<=0){event.preventDefault();buttons.at(-1).focus();}else if(!event.shiftKey&&(i===buttons.length-1||i===-1)){event.preventDefault();buttons[0].focus();}}
 });
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');image.removeAttribute('src');trigger?.focus();});
})();
