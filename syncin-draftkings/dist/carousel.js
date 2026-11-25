/* Homepage background carousel. Foreground content remains stationary. */
function createVenueCarousel({slides,buttons,toggle,onChange,isMotionPaused,reducedMotion,documentRef=document,clock=window}) {
 let index=0, timer=null, userPaused=false, hovered=false, visible=true;
 const canPlay=()=>!userPaused&&!hovered&&visible&&!documentRef.hidden&&!isMotionPaused()&&!reducedMotion();
 function schedule(){if(timer!==null)clock.clearInterval(timer);timer=null;if(canPlay())timer=clock.setInterval(()=>show((index+1)%slides.length),3000);toggle.textContent=(userPaused||isMotionPaused()||reducedMotion())?'▶ Play backgrounds':'Ⅱ Pause backgrounds';toggle.setAttribute('aria-pressed',String(userPaused||isMotionPaused()||reducedMotion()));}
 function show(next){if(next===index)return;const old=slides[index],incoming=slides[next];const animate=!isMotionPaused()&&!reducedMotion();slides.forEach((s,i)=>{if(i!==index){s.style.transition='none';s.style.transform='translateX(100%)';s.style.zIndex='0'}});incoming.style.transition='none';incoming.style.transform='translateX(100%)';incoming.style.zIndex='2';void incoming.offsetWidth;incoming.style.transition=animate?'transform 1000ms cubic-bezier(.22,.61,.36,1)':'none';old.style.transition=incoming.style.transition;old.style.transform='translateX(-100%)';incoming.style.transform='translateX(0)';index=next;buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));onChange(buttons[index].dataset.sport);}
 slides.forEach((s,i)=>{s.style.transform=i?'translateX(100%)':'translateX(0)'});
 buttons.forEach((b,i)=>b.onclick=()=>{show(i);schedule()});toggle.onclick=()=>{userPaused=!userPaused;schedule()};
 documentRef.addEventListener('visibilitychange',schedule);
 schedule();
 return {refresh:schedule,setHovered(v){hovered=v;schedule()},setVisible(v){visible=v;schedule()},pauseForFocus(){userPaused=true;schedule()},getIndex:()=>index,destroy(){if(timer!==null)clock.clearInterval(timer);documentRef.removeEventListener('visibilitychange',schedule)}};
}
if(typeof module!=='undefined')module.exports={createVenueCarousel};
