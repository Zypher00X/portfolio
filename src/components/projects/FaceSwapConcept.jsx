import './FaceSwapConcept.css'

const techniques = [
  ['Face Detection, Landmarks และ Identity Embedding', <>ใช้ InsightFace ตรวจใบหน้า หาจุดอ้างอิง และสกัดเวกเตอร์ ArcFace 512 มิติจาก A เพื่อส่งให้ HyperSwap 1a สร้างใบหน้าที่ความละเอียด native 256×256 โดยรับท่าศีรษะและสีหน้าจาก B</>],
  ['Similarity Alignment และ Anti-aliasing', <>จัดแนวใบหน้าด้วย similarity transform ก่อนเข้าโมเดล เมื่อย่อภาพในโหมด <code>area</code> จะใช้ supersampling 4 เท่าแล้วลดขนาดด้วย <code>INTER_AREA</code> พร้อมชดเชยตำแหน่งศูนย์กลางพิกเซล เพื่อลด alias โดยรักษาพิกัดให้ตรงกัน</>],
  ['Semantic Segmentation และ Glasses-aware Mask', <>ใช้ BiSeNet–ResNet18 แยกส่วนใบหน้า แล้วใช้ morphological erosion/dilation ประมาณแนวกรอบแว่นเพื่อช่วยรักษาแว่นจาก B โดย mask นี้เป็นการประมาณและยังมีข้อจำกัดกับกรอบบางหรือแสงสะท้อน</>],
  ['Skin-only LAB Color Matching', <>ปรับสีใน LAB ด้วย median และ interquartile range ของบริเวณผิว แล้วจำกัดการปรับไว้เฉพาะผิว เพื่อลดผลกระทบต่อสีตา ฟัน และริมฝีปาก</>],
  ['Smoothstep Feathering และ Direct Compositing', <>ใช้ distance transform และ smoothstep ทำขอบ mask ให้นุ่ม ก่อนนำภาพ native256 กลับไปผสานกับ B โดยตรงเพื่อลดการ resample ซ้ำ</>],
  ['Diagnostics และการประเมินผล', <>บันทึก config, model hash, mask และภาพระหว่างขั้นตอน พร้อมคำนวณ cosine similarity ของ face embedding และตรวจท่าศีรษะ/landmarks โดยแยกคะแนนอัตโนมัติออกจากการยอมรับคุณภาพภาพด้วยตา</>],
]

export default function FaceSwapConcept() {
  return <section className="face-swap-concept" aria-labelledby="face-swap-concept-title">
    <div className="face-swap-concept__intro">
      <span className="face-swap-concept__eyebrow">CONCEPT & ALGORITHMS</span>
      <h3 id="face-swap-concept-title">แนวคิดและสิ่งที่พัฒนา</h3>
      <p>โปรเจคนี้พัฒนาต่อยอดจาก <a href="https://github.com/KwaiVGI/LivePortrait" target="_blank" rel="noreferrer">LivePortrait ของ Kuaishou / KwaiVGI</a> โดยเพิ่ม GUI โทนดำ, HyperSwap backend, การลด alias จากการย่อภาพ, การผสานแบบคำนึงถึงแว่น/สีผิว และข้อมูลตรวจสอบผล โดยใช้ Algorithm และเทคนิคหลักดังนี้:</p>
    </div>
    <ol className="face-swap-concept__grid">
      {techniques.map(([title, description], index) => <li key={title} className="face-swap-concept__card">
        <span className="face-swap-concept__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h4>{title}</h4><p>{description}</p>
      </li>)}
    </ol>
    <p className="face-swap-concept__credit">โค้ดส่วนต่อยอดดูแลโดย <a href="https://github.com/Zypher00X" target="_blank" rel="noreferrer">Zypher00X</a> โมเดล pretrained เป็นผลงานของเจ้าของโมเดล</p>
  </section>
}
