import { useRef, useEffect } from 'react'
import './DormDemo.css'
export const powerTrackDemoUrl='https://powertrack-demo.onrender.com/login'
export default function PowerTrackDemo(){
 const modal=useRef(null),button=useRef(null),previousOverflow=useRef('')
 useEffect(()=>()=>{if(modal.current?.open)document.body.style.overflow=previousOverflow.current},[])
 function close(){modal.current.close()}
 function restore(){document.body.style.overflow=previousOverflow.current;button.current?.focus()}
 return <><button className="dorm-demo-trigger" ref={button} onClick={()=>{previousOverflow.current=document.body.style.overflow;modal.current.showModal();document.body.style.overflow='hidden'}}>Demo <span aria-hidden="true">↗</span></button>
 <dialog ref={modal} className="dorm-demo-dialog" aria-labelledby="powertrack-demo-title" aria-describedby="powertrack-demo-description" onClose={restore}>
 <span className="dorm-demo-eyebrow">POWERTRACK / LIVE DEMO</span><h2 id="powertrack-demo-title">ก่อนเข้าชม Demo</h2>
 <div id="powertrack-demo-description"><p>ลิงก์ Demo ผลงาน Deploy อยู่บน Render อาจต้องใช้เวลารอโหลด <strong>2–5 นาที</strong></p><p className="dorm-demo-expiry">ลิงก์หมดอายุวันที่ <time dateTime="2026-11-28">28/11/69 (28 พฤศจิกายน 2569)</time></p><p className="dorm-demo-domain">powertrack-demo.onrender.com/login</p></div>
 <div className="dorm-demo-actions"><button autoFocus onClick={close}>ยกเลิก</button><a href={powerTrackDemoUrl} target="_blank" rel="noopener noreferrer" onClick={close}>ยืนยัน <span aria-hidden="true">↗</span></a></div>
 </dialog></>
}

