import './TechStack.css'
const categories=[
 {title:'Front-end',number:'01',items:[['HTML','html'],['CSS','css'],['JavaScript','javascript'],['React','react'],['Bootstrap','bootstrap'],['Tailwind CSS','tailwindcss'],['Figma','figma']]},
 {title:'Backend',number:'02',items:[['FastAPI','fastapi'],['Python','python'],['Node.js','nodejs'],['C#','csharp'],['ASP.NET','dotnet'],['PHP','php'],['Flask','flask'],['Redis','redis']]},
 {title:'Database',number:'03',items:[['SQL','sql'],['PostgreSQL','postgresql'],['Vector Database','vector'],['Firebase','firebase'],['Google Sheets','sheets']]},
 {title:'DevSecOps & QA',number:'04',items:[['pytest','pytest'],['Node.js Test Runner','nodejs'],['k6','k6'],['DeepEval','deepeval'],['OWASP ZAP','zap'],['Bandit','bandit.png'],['pip-audit',null,'PA'],['Trivy','trivy'],['Gitleaks',null,'GL'],['Ruff','ruff'],['Docker / Docker Compose','docker'],['NGINX','nginx']]},
 {title:'Linux',number:'05',items:[['Linux','linux'],['Ubuntu','ubuntu'],['Kali Linux (basic)','kalilinux']]},
 {title:'Git',number:'06',items:[['GitHub','github'],['Git','git']]},
 {title:'Cloud & Deploy',number:'07',items:[['Google Cloud','google-cloud'],['Render','render']]},
 {title:'Machine Learning & Computer Vision',number:'08',items:[['Python','python'],['Hugging Face','hugging-face'],['NVIDIA CUDA','nvidia'],['ONNX Runtime','onnxruntime.png'],['ONNX','onnx'],['PyTorch','pytorch'],['Torchvision','torchvision'],['InsightFace','insightface.png'],['OpenCV','opencv'],['NumPy','numpy'],['Batch',null,'BAT']]},
 {title:'Code Editor',number:'09',items:[['Visual Studio Code','vscode'],['Visual Studio','visual-studio'],['Codespaces','codespaces']]},
 {title:'AI Coding Agent',number:'10',items:[['Codex','codex'],['GitHub Copilot Workspace','github-copilot']]},
]
export default function TechStack(){
 return <section id="portfolio-details" className="tech-stack" aria-labelledby="tech-stack-title">
  <div className="tech-stack__heading"><span className="tech-stack__eyebrow">THE TOOLS BEHIND MY WORK</span><h2 id="tech-stack-title">Tech <em>Stack.</em></h2><span className="tech-stack__index">10 CATEGORIES / 55 TOOLS</span></div>
  <div className="tech-stack__columns">{categories.map(category=><section className="tech-stack__category" key={category.title} aria-label={category.title}>
   <div className="tech-stack__category-heading"><span aria-hidden="true">{category.number}</span><h3>{category.title}</h3></div>
   <ul>{category.items.map(([name,logo,initials])=><li key={name}><span className="tech-stack__icon">{logo?<img src={`/logos/${logo.includes('.')?logo:`${logo}.svg`}`} alt="" width="34" height="34" loading="lazy"/>:<span className="tech-stack__monogram" aria-hidden="true">{initials}</span>}</span><span>{name}</span></li>)}</ul>
  </section>)}</div>
  <details className="tech-stack__sources"><summary>แหล่งที่มาของโลโก้</summary><p className="tech-stack__logo-note">SQL / SQL Server icon · Vector Database / Qdrant icon · โลโก้จาก SVGL, Simple Icons และโครงการต้นทาง · pip-audit, Gitleaks และ Batch ใช้ชื่อย่อ · Torchvision ใช้ตรา PyTorch · Copilot Workspace ใช้ตรา GitHub Copilot · Codespaces ใช้ไอคอน GitHub Primer</p>
  <a className="tech-stack__credit" href="https://svgl.app/" target="_blank" rel="noreferrer">Technology logos / SVGL ↗</a></details>
 </section>
}




