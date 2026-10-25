import FaceSwapConcept from './FaceSwapConcept'
import PowerTrackProject from './PowerTrackProject'
import DormProject from './DormProject'
import { useRef, useEffect } from 'react'
import './Projects.css'
const repository='https://github.com/Zypher00X/ml-engineer-face-swap'
const image=name=>`/projects/face-swap/${name}.png`
export default function Projects(){
 const dialog=useRef(null),trigger=useRef(null),rail=useRef(null)
 useEffect(()=>{const modal=dialog.current;const restore=()=>{document.body.style.overflow='';trigger.current?.focus()};modal.addEventListener('close',restore);return()=>{modal.removeEventListener('close',restore);document.body.style.overflow=''}},[])
 function open(){dialog.current.showModal();document.body.style.overflow='hidden'}
 return <section id="projects" className="projects" aria-labelledby="projects-title">
  <div className="projects-heading"><span className="projects-eyebrow">SELECTED WORK / 03</span><h2 id="projects-title">Built with <em>purpose.</em></h2><p>ผลงานที่นำเทคโนโลยีมาสร้างเป็นโปรแกรมที่ใช้งานได้จริง</p></div>
  <div className="projects-navigation"><span>เลื่อนเพื่อดูผลงานถัดไป</span><button aria-label="ผลงานก่อนหน้า" onClick={()=>rail.current.scrollBy({left:-rail.current.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>←</button><button aria-label="ผลงานถัดไป" onClick={()=>rail.current.scrollBy({left:rail.current.clientWidth,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>→</button></div>
 <div className="projects-rail" ref={rail} role="region" aria-label="ผลงาน เลื่อนแนวนอน" tabIndex={0}>
  <article className="project-card">
   <div className="project-card-image"><img src={image('gui')} alt="หน้าจอโปรแกรม Face Swap ภาษาไทยบน Windows" loading="lazy"/><span>01 / MACHINE LEARNING</span></div>
   <div className="project-card-body"><div className="project-tags"><span>Computer Vision</span><span>Windows GUI</span></div><h3>ML Engineer<br/><em>Face Swap</em></h3><p>โปรแกรมสลับใบหน้าผ่าน GUI ภาษาไทยด้วย HyperSwap 256 เลือกภาพต้นฉบับและเป้าหมาย ดูผลลัพธ์ และบันทึก PNG ได้ในหน้าจอเดียว</p><div className="project-tech">Python · PySide6 · ONNX Runtime · PyTorch</div><div className="project-actions"><button ref={trigger} onClick={open}>ดูรายละเอียด <span aria-hidden="true">↗</span></button><a href={repository} target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
  </article><DormProject/><PowerTrackProject/></div>
  <dialog ref={dialog} className="project-dialog" aria-labelledby="project-detail-title" onClick={e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.current.close()}}}>
   <div className="project-dialog-top"><span>PROJECT / 01</span><button autoFocus onClick={()=>dialog.current.close()} aria-label="ปิดรายละเอียดผลงาน">ปิด ×</button></div>
   <div className="project-detail"><span className="projects-eyebrow">MACHINE LEARNING / COMPUTER VISION</span><h2 id="project-detail-title">ML Engineer Face Swap</h2><p className="project-lead">GUI ภาษาไทยบน Windows สำหรับสลับใบหน้าด้วย HyperSwap 256</p><img className="project-detail-image" src={image('gui')} alt="หน้าตาโปรแกรมจริงพร้อมช่องภาพต้นฉบับ เป้าหมาย และผลลัพธ์"/>
   <FaceSwapConcept/>
   <h3>การใช้งาน</h3><ol><li>เลือกภาพ A เป็นตัวตน และภาพ B เป็นท่าศีรษะ สีหน้า และองค์ประกอบภาพ</li><li>ตรวจใบหน้า จัดแนว และสร้างหน้าด้วย HyperSwap 256</li><li>สร้าง semantic mask ประมาณกรอบแว่น ปรับสีผิว และผสานกลับเข้าภาพ B</li><li>ตรวจผล เปิดภาพเต็ม ซูม และบันทึก PNG</li></ol><img className="project-detail-image" src={image('user_flow')} alt="แผนภาพขั้นตอนใช้งาน Face Swap" loading="lazy"/>
   <h3>ผลลัพธ์จากการทดลอง</h3><p>ภาพด้านล่างเรียงจากต้นฉบับ A → เป้าหมาย B → ผล HyperSwap 256 เป็นผลการรันจริงตาม README โดยไม่ใช้ face restoration เพิ่มความคม</p><img className="project-detail-image" src={image('showcase_glasses')} alt="เปรียบเทียบต้นฉบับ เป้าหมายสวมแว่น และผลสลับใบหน้า" loading="lazy"/>
   <h3>เทคโนโลยีและสถาปัตยกรรม</h3><p>Python, PySide6 / Qt Widgets และ QProcess + JSON Lines แยก GUI ออกจาก worker เพื่อให้หน้าจอยังตอบสนอง ใช้ InsightFace, OpenCV, NumPy และ scikit-image ใน pipeline</p><p>HyperSwap, detection, landmarks และ recognition ใช้ ONNX Runtime บน CPU ส่วน BiSeNet ใช้ PyTorch CUDA เมื่อพร้อม และ fallback เป็น CPU</p><img className="project-detail-image" src={image('system_architecture')} alt="สถาปัตยกรรม GUI worker และ HyperSwap256" loading="lazy"/>
   <h3>การทดสอบและขอบเขต</h3><p>README ระบุผล ณ 24 ต.ค. 2026: unit/regression 25/25, GUI integration 49/49 และ GUI ตรงกับ CLI ใน 3 คู่ภาพที่ทดสอบ ตัวเลขนี้ยืนยันการทำงานของโปรแกรม ไม่ใช่การรับรองความแม่นยำของทุกภาพ</p><p>ยังมีข้อจำกัดเรื่องกรอบแว่นบาง แสงสะท้อน และรายละเอียดตา/ปาก ปัจจุบันเลือกใบหน้าที่ใหญ่ที่สุดและยังไม่รองรับเลือกคนจากภาพหลายคน โปรแกรมต้องเตรียม Python environment และน้ำหนักโมเดลแยก ยังไม่ใช่ standalone EXE</p>
   <div className="project-source"><p>รายละเอียด ภาพ เครดิตโมเดล และเงื่อนไขการใช้งานอ้างอิงจาก README ของโปรเจกต์ ใช้ภาพโดยได้รับความยินยอมและระบุว่าเป็นภาพสลับใบหน้าเมื่อเผยแพร่</p><a href={repository} target="_blank" rel="noreferrer">ดูโค้ดและ README บน GitHub ↗</a></div>
   </div>
  </dialog>
 </section>
}

