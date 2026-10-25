import screenshots from './powertrackGallery.json'
import './PowerTrackGallery.css'
export default function PowerTrackGallery(){
 return <section className="powertrack-gallery" aria-labelledby="powertrack-gallery-title">
  <h3 id="powertrack-gallery-title">ตัวอย่างหน้าจอและการใช้งาน</h3>
  <p>ภาพชุดสาธิตจากหน้าเว็บ PowerTrack ใช้บัญชีและข้อมูลจำลอง ไม่ใช่ข้อมูลผู้ใช้จริง คำตอบ AI และรายงานในชุดสาธิตใช้ตัวตอบจำลองเพื่อแสดงวิธีใช้งาน ส่วนภาพ “ตัวอย่างคำตอบเพิ่มเติม” มาจากผู้จัดทำตาม README และควรอ่านแยกจากชุดสาธิต หน้าตาอาจต่างจากรุ่นออนไลน์เล็กน้อย</p>
  <p className="powertrack-gallery-hint">กดภาพเพื่อเปิดดูขนาดเต็มในแท็บใหม่</p>
  {screenshots.map((shot,index)=><figure key={shot.file} className="powertrack-shot">
   <figcaption><span className="powertrack-shot-index">{String(index+1).padStart(2,'0')}</span><h4>{shot.file==='advice-response-example.png'?'ตัวอย่างคำตอบเพิ่มเติมจากผู้จัดทำ':shot.caption}</h4></figcaption>
   <p>{shot.description}</p>
   <a href={`/projects/powertrack/screenshots/${shot.file}`} target="_blank" rel="noreferrer" aria-label={`ดูภาพขนาดเต็ม: ${shot.caption}`}><img className="project-detail-image" src={`/projects/powertrack/screenshots/${shot.file}`} alt={shot.caption} loading="lazy" decoding="async"/></a>
  </figure>)}
 </section>
}
