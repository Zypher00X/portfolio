import { useEffect, useState } from 'react'
import './CompletedCover.css'
import PersonalIntroduction from './PersonalIntroduction'
import GitHubProfileLink from './GitHubProfileLink'
export default function CompletedCover({onReplay}){
 const [count,setCount]=useState(0)
 const title='My Portfolio',role='Backend Dev / AI Engineer'
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){const id=setTimeout(()=>setCount(title.length+role.length),0);return()=>clearTimeout(id)}const id=setInterval(()=>setCount(n=>Math.min(n+1,title.length+role.length)),70);return()=>clearInterval(id)},[])
 return <div className="completed-cover">
 <PersonalIntroduction/>
 <GitHubProfileLink/>
 <div className="intro"><span className="title" aria-label={`${title}, ${role}`}><span aria-hidden="true">{title.slice(0,count)}<br/><i className="portfolio-role">{role.slice(0,Math.max(0,count-title.length))}</i></span></span></div>
 <a className="portfolio-scroll" href="#portfolio-details">เลื่อนลงเพื่อดูผลงาน<span aria-hidden="true">↓</span></a>
 <button className="portfolio-replay" onClick={onReplay}>↻ รับชมแอนิเมชั่นอีกครั้ง</button>
 </div>
}
