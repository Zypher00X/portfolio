import PortfolioNav from './components/portfolio/PortfolioNav'
import PortfolioBoundary from './components/portfolio/PortfolioBoundary'
import Projects from './components/projects/Projects'
import TechStack from './components/portfolio/TechStack'
import CompletedCover from './components/cover/CompletedCover'
import PersonalIntroduction from './components/cover/PersonalIntroduction'
import SkipAnimation from './components/cover/SkipAnimation'
import { useEffect, useRef, useState } from 'react'
import { createFilm } from './film'
import './index.css'
import StoryInvitation from './components/cover/StoryInvitation'
export default function App() {
 const host=useRef(null), portrait=useRef(null), progress=useRef(null), film=useRef(null)
 const [started,setStarted]=useState(false),[completed,setCompleted]=useState(false),[paused,setPaused]=useState(false),[error,setError]=useState('')
 useEffect(()=>{try{film.current=createFilm(host.current,portrait.current,progress.current,()=>{},()=>{setCompleted(true);setPaused(false)})}catch{queueMicrotask(()=>setError('This experience needs WebGL. Enable hardware acceleration in your browser.'))}return()=>film.current?.dispose()},[])
 function begin(){if(!film.current||started)return;film.current.start();setStarted(true)}
 return <>{completed&&<PortfolioNav/>}<main id="home" className={`experience ${started?'playing':''}`}>
 <div ref={host} className="world"/><div ref={portrait} className="portrait"><img src="/images/portrait.png" alt="Portrait at the entrance to the mind"/></div><div className="vignette"/><div className="grain"/>
 {!started&&!error&&<><div className="opening-introduction"><PersonalIntroduction/></div><button className="enter" onClick={begin} aria-label="แตะหน้าจอหนึ่งครั้งเพื่อชม Portfolio"><span className="intro"><span className="title">My Portfolio<br/><i className="portfolio-role">Backend Dev / AI Engineer</i></span></span><StoryInvitation /></button></>}
 {completed&&<CompletedCover onReplay={()=>{film.current.start();setCompleted(false);setPaused(false)}}/>}
 {started&&!completed&&<SkipAnimation onSkip={()=>film.current?.skip()}/>}
 {error&&<div className="error" role="alert">{error}</div>}
 <footer><div className="controls">{started&&!completed&&<><button onClick={()=>{film.current.pause(!paused);setPaused(!paused)}}>{paused?'PLAY':'PAUSE'}</button></>}<button aria-label="Toggle fullscreen" onClick={()=>{if(document.fullscreenElement)document.exitFullscreen?.();else document.documentElement.requestFullscreen?.().catch(()=>{})}}>⛶</button></div></footer><div className="progress"><div ref={progress}/></div>
 </main>{completed&&<><PortfolioBoundary><TechStack/></PortfolioBoundary><PortfolioBoundary><Projects/></PortfolioBoundary></>}</>
}







