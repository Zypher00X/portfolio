const screens=[
 ['demo-dorm-detail','รายละเอียดหอพัก','แกลเลอรี สิ่งอำนวยความสะดวก ข้อมูลติดต่อ และจุดเข้าแชท AI ของหอที่เลือก'],
 ['demo-room-detail','รายละเอียดประเภทห้อง','เปรียบเทียบประเภทห้อง ราคา และจำนวนห้องว่างก่อนส่งคำขอจอง'],
 ['demo-booking','ส่งคำขอจอง','กรอกชื่อ เบอร์โทร วันที่ต้องการเข้าอยู่ และหมายเหตุ เพื่อให้เจ้าของหอจัดการคำขอ'],
 ['demo-admin','Admin Dashboard','ผู้ดูแลตรวจบัญชีและประกาศที่รออนุมัติ พร้อมจัดการข้อมูลหอพักที่เผยแพร่'],
 ['demo-login','เข้าสู่ระบบ','หน้าเข้าสู่ระบบของเจ้าของหอพักและผู้ดูแล'],
 ['demo-register','สมัครเจ้าของหอพัก','สมัครบัญชีเจ้าของหอเพื่อเข้าสู่กระบวนการตรวจอนุมัติ'],
 ['demo-owner-form','ฟอร์มจัดการหอพัก','เพิ่มหรือแก้ไขข้อมูลหอพักและรูปภาพ'],
 ['demo-admin-review','ตรวจคำขอเจ้าของหอ','ตรวจคำขอบัญชีเจ้าของหอก่อนอนุมัติหรือปฏิเสธ'],
]
export default function DormGallery(){return <section aria-labelledby="dorm-screens-title"><h3 id="dorm-screens-title">หน้าจอเพิ่มเติมของระบบ</h3>{screens.map(([file,title,description])=><figure key={file} style={{margin:'28px 0'}}><figcaption style={{font:'500 18px/1.6 Tahoma,sans-serif',color:'#dce8df'}}>{title}</figcaption><p>{description}</p><a href={`/projects/dorm-finder/${file}.png`} target="_blank" rel="noreferrer" aria-label={`เปิดภาพขนาดเต็ม: ${title}`}><img className="project-detail-image" src={`/projects/dorm-finder/${file}.png`} alt={`ภาพสาธิต: ${title}`} loading="lazy" decoding="async"/></a></figure>)}</section>}
