// Screen-space interference follows the film clock, including pause and loop reset.
export function createCacheGlitch(host) {
  const canvas=document.createElement('canvas')
  canvas.className='cache-glitch'
  canvas.setAttribute('aria-hidden','true')
  host.parentElement.appendChild(canvas)
  const ctx=canvas.getContext('2d')
  const buffer=document.createElement('canvas')
  const ink=buffer.getContext('2d')
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)')
  let width=0,height=0
  const python=[
    '$ python heart/cache.py --recover',
    'Traceback (most recent call last):',
    '  File "heart/cache.py", line 214',
    '    memory = cache.read("her")',
    '  File "mind/storage.py", line 87',
    '    return deserialize(payload)',
    'CacheCorruptionError:',
    '  checksum mismatch / MEMORY_07',
    '',
    '>>> cache.restore(last_good_state)',
    'CacheMissError: "us" not found',
    'recovery_attempts = exhausted',
  ]
  const terminal=[
    'root@mind:~# systemctl status cache',
    '[FAILED] memory-cache.service',
    'cache[214]: stale attachment detected',
    'cache[214]: read failed: EIO',
    'cache[214]: retry 03/03 ... FAILED',
    'FATAL: cache index corrupted',
    'ERR_CONNECTION_RESET',
    'segmentation fault (core dumped)',
    '',
    'root@mind:~# rebuild --from memories',
    'ERROR: no valid snapshot found',
    'core_process: still_running_',
  ]
  const smooth=(a,b,t)=>{const x=Math.max(0,Math.min(1,(t-a)/(b-a)));return x*x*(3-2*x)}
  function panel(x,y,w,title,lines,color,step) {
    const font=Math.max(11,Math.min(17,width/65))
    const lineHeight=font*1.65
    const h=lineHeight*(lines.length+2)+20
    ink.fillStyle='rgba(1,5,5,.86)';ink.fillRect(x,y,w,h)
    ink.strokeStyle=color;ink.lineWidth=1;ink.strokeRect(x,y,w,h)
    ink.fillStyle=color;ink.globalAlpha=.15;ink.fillRect(x,y,w,30);ink.globalAlpha=1
    ink.font=`${font}px monospace`;ink.fillText(title,x+14,y+21)
    ink.save();ink.beginPath();ink.rect(x+10,y+33,w-20,h-38);ink.clip()
    lines.forEach((line,i)=>{
      ink.fillStyle=/ERROR|Error|FAILED|FATAL|fault/.test(line)?'#ff8785':color
      ink.fillText(line,x+14,y+52+i*lineHeight)
    })
    ink.fillStyle=color
    ink.fillRect(x+14+(step%18)*font*.61,y+h-15,font*.6,2)
    ink.restore()
  }
  return {
    update(time) {
      // Hold the unobstructed fracture, then reveal interference after the downward move.
      const active=time>=23.1&&time<26.55
      canvas.style.display=active?'block':'none'
      if(!active)return
      const w=host.clientWidth,h=host.clientHeight
      if(w!==width||h!==height){width=w;height=h;canvas.width=buffer.width=w;canvas.height=buffer.height=h}
      const step=Math.floor(time*12)
      const jitter=reduced.matches?0:1
      const burst=(Math.sin(step*7.13)>.25?1:.25)*jitter
      const fade=smooth(23.1,23.8,time)*(1-smooth(25.65,26.55,time))
      const revealY=(1-smooth(23.1,23.85,time))*h*.26
      ink.clearRect(0,0,w,h);ctx.clearRect(0,0,w,h)
      ink.fillStyle='rgba(0,5,5,.20)';ink.fillRect(0,0,w,h)
      const dx=Math.sin(step*2.3)*17*burst,dy=Math.cos(step*3.1)*9*burst
      const narrow=w<700
      panel(w*.035+dx,h*.13+dy+revealY,w*(narrow?.90:.61),'PYTHON / CACHE TRACEBACK',python,'#a9d8c1',step)
      panel(w*(narrow?.12:.37)-dx,h*(narrow?.39:.43)-dy+revealY,w*(narrow?.84:.60),'TTY_07 / CACHE SERVICE LOST',terminal,'#dba99b',step)
      ink.font=`bold ${Math.min(64,w/12)}px monospace`
      ink.fillStyle='rgba(232,91,99,.28)'
      ink.fillText('CACHE_ERROR',w*.08+dx,h*.53)
      ctx.globalAlpha=fade*.87
      ctx.drawImage(buffer,0,0)
      // Displaced horizontal strips imitate lost sync without full-screen white flashes.
      if(jitter){
        for(let i=0;i<7;i++){
          const y=((step*47+i*113)%h),sh=5+(i%3)*12
          const shift=Math.sin(step+i*2)*w*.065*burst
          ctx.clearRect(0,y,w,sh)
          ctx.drawImage(buffer,0,y,w,Math.min(sh,h-y),shift,y,w,Math.min(sh,h-y))
          ctx.fillStyle=i%2?'rgba(85,205,190,.12)':'rgba(235,91,119,.12)'
          ctx.fillRect(0,y,w,2)
        }
      }
      ctx.fillStyle='rgba(0,0,0,.3)'
      for(let y=0;y<h;y+=4)ctx.fillRect(0,y,w,1)
      ctx.fillStyle='rgba(164,190,177,.12)'
      for(let i=0;i<65;i++){
        const x=(i*179+step*31)%w,y=(i*97+step*19)%h
        ctx.fillRect(x,y,2+(i%8)*3,1)
      }
      ctx.globalAlpha=1
    },
    dispose(){canvas.remove()},
  }
}
