import { createAnatomicalHeart } from './effects/anatomicalHeart'
import { createBurnMaterial, createFlames } from './effects/paperBurn'
import * as THREE from 'three'
import { createBottle } from './bottle'
import { createMedicineBottle } from './medicineBottle'
import { createCapsules } from './capsules'
import { createThoughtPanels } from './thoughtPanels'
import { createCacheGlitch } from './cacheGlitch'
const clamp=THREE.MathUtils.clamp
const ease=(a,b,t)=>{const x=clamp((t-a)/(b-a),0,1);return x*x*(3-2*x)}
const chapters=['REALITY','ENTER THE MIND','WHO I AM','THE THINGS I HOLD','HER MEMORY','SYSTEM FAILURE','SILENCE','THE LOOP']
const boundaries=[0,3,6,10,14,19,23,26]
export function createFilm(host,portrait,progress,onChapter,onComplete=()=>{}){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#020504');scene.fog=new THREE.FogExp2('#020504',.026)
 const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;host.appendChild(renderer.domElement)
 const camera=new THREE.PerspectiveCamera(52,1,.05,180)
 const textures=[];const world=new THREE.Group();scene.add(world)
 const network=new THREE.Group();world.add(network)
 const thoughts=createThoughtPanels(textures);world.add(thoughts.group)
 const cacheGlitch=createCacheGlitch(host)
 scene.add(new THREE.AmbientLight('#819b92',1.4));const light=new THREE.PointLight('#a0ffe2',50,30);light.position.set(2,4,5);scene.add(light)
 const redLight=new THREE.PointLight('#ff3a22',0,25);redLight.position.set(0,0,3);scene.add(redLight)
 function textPlane(lines,width=5,color='#9edbc0',size=28){const c=document.createElement('canvas');c.width=1024;c.height=512;const ctx=c.getContext('2d');ctx.fillStyle='rgba(2,9,7,.88)';ctx.fillRect(0,0,1024,512);ctx.strokeStyle='#34594a';ctx.strokeRect(1,1,1022,510);ctx.font=`${size}px monospace`;ctx.fillStyle=color;lines.forEach((s,i)=>ctx.fillText(s,35,60+i*48));const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;textures.push(tex);const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,width/2),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthWrite:false}));return mesh}
 const nodes=[], edges=[];let seed=19;function random(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
 const labels=['LOVE','TRUST','MEMORY','SELF','CODE','AI']
 const base=[[-2,1,0],[1.8,1.7,-1],[3,-.4,0],[0,-1.5,1],[-3,-1,-1],[.2,2.7,-2]]
 for(let i=0;i<48;i++){const p=i<6?new THREE.Vector3(...base[i]):new THREE.Vector3((random()-.5)*11,(random()-.5)*7,(random()-.5)*6);const mesh=new THREE.Mesh(new THREE.IcosahedronGeometry(i<6?.14:.045,2),new THREE.MeshStandardMaterial({color:'#a2ebcd',emissive:'#62d9ac',emissiveIntensity:2,roughness:.35}));mesh.position.copy(p);network.add(mesh);nodes.push({mesh,base:p,drift:new THREE.Vector3(random()-.5,random()-.5,random()-.5)});if(i<6){const label=textPlane([labels[i]],1.05,'#b3e5d0',70);label.position.copy(p).add(new THREE.Vector3(.5,.28,0));network.add(label);nodes[i].label=label}}
 for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++)if(nodes[i].base.distanceTo(nodes[j].base)<3.4){const geo=new THREE.BufferGeometry().setFromPoints([nodes[i].base,nodes[j].base]);const line=new THREE.Line(geo,new THREE.LineBasicMaterial({color:'#4aab8c',transparent:true,opacity:.24}));network.add(line);edges.push({line,i,j,delay:random()*3})}
 const panels=[];const normal=['user@mind:~ $ python mind.py','Initializing neural network...','Loading memories...','def remember(you):','    return memory.forever(you)','attachment.requires_grad = True','status: connected'];const errors=['Traceback (most recent call last):','  File "heart.py", line 214','    await memory.recover()','ConnectionError: connection lost','TRUST: NaN   LOSS: 0.93','MEMORY_OVERFLOW','SYSTEM UNSTABLE'];
 for(let i=0;i<8;i++){const panel=textPlane(normal,4);panel.position.set((i%2?1:-1)*(4+i*.3),((i%3)-1)*2,-2-Math.floor(i/2)*3);panel.rotation.y=i%2?-.35:.35;network.add(panel);const failure=textPlane(errors,4,'#ff675c');failure.position.copy(panel.position);failure.rotation.copy(panel.rotation);network.add(failure);panels.push({panel,failure})}
 const tunnel=new THREE.Group();scene.add(tunnel);for(let i=0;i<22;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(2.4,.008,4,64),new THREE.MeshBasicMaterial({color:'#386952',transparent:true,opacity:.38}));ring.position.z=-i*3;ring.rotation.z=i*.19;tunnel.add(ring);if(i%3===0){const code=textPlane(['$ python mind.py','Loading attachment...','ERROR: connection lost'],2);code.position.set(i%2?2:-2,.2,-i*3);tunnel.add(code)}}
 // A deliberately anonymous, volumetric memory, replaceable with a real photo.
 const memory=new THREE.Group();memory.position.set(0,.2,-30);world.add(memory)
 const memoryMaterial=createBurnMaterial()
 const photo=new THREE.Mesh(new THREE.PlaneGeometry(2.5,3.2,1,1),memoryMaterial);memory.add(photo);memory.add(createFlames(memoryMaterial))
 const memoryLabel=textPlane(['MEMORY_07 / YOU'],2.5,'#c9bcaa',55);memoryLabel.position.set(0,-1.95,0);memoryLabel.scale.y=.35;memory.add(memoryLabel)
 const textureLoader=new THREE.TextureLoader();let disposed=false
 fetch('/images/her.jpg',{method:'HEAD'}).then(r=>{if(r.ok&&r.headers.get('content-type')?.startsWith('image/'))textureLoader.load('/images/her.jpg',tex=>{if(disposed){tex.dispose();return}tex.colorSpace=THREE.SRGBColorSpace;textures.push(tex);memoryMaterial.uniforms.photo.value=tex;memoryMaterial.uniforms.hasPhoto.value=1})}).catch(()=>{})
 const anatomicalHeart=createAnatomicalHeart();const heart=anatomicalHeart.group;heart.position.set(0,-.15,-30.7);world.add(heart)
 const props=new THREE.Group();world.add(props);props.position.set(-.8,-1.8,-14);props.scale.setScalar(1.8)
 const bottle=createBottle(textures);props.add(bottle)
 const medicine=createMedicineBottle(textures);medicine.position.set(1.03,-.25,-.12);medicine.scale.setScalar(.83);props.add(medicine)
 const capsules=createCapsules();props.add(capsules.group)
 const cigarette=new THREE.Group();const paper=new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,.9,12),new THREE.MeshStandardMaterial({color:'#e0d8c1'}));cigarette.add(paper);const filter=new THREE.Mesh(new THREE.CylinderGeometry(.046,.046,.28,12),new THREE.MeshStandardMaterial({color:'#a56832'}));filter.position.y=-.57;cigarette.add(filter);const ember=new THREE.Mesh(new THREE.SphereGeometry(.048),new THREE.MeshBasicMaterial({color:'#ff6533'}));ember.position.y=.45;cigarette.add(ember);cigarette.rotation.z=-1.1;cigarette.position.set(1,-.2,.3);props.add(cigarette)
 const ashCount=850,ashPos=new Float32Array(ashCount*3),ashData=[];for(let i=0;i<ashCount;i++)ashData.push([random(),random(),random()]);const ashGeo=new THREE.BufferGeometry();ashGeo.setAttribute('position',new THREE.BufferAttribute(ashPos,3));const ash=new THREE.Points(ashGeo,new THREE.PointsMaterial({color:'#ff9b55',size:.032,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false}));world.add(ash);ash.material.onBeforeCompile=shader=>{shader.fragmentShader=shader.fragmentShader.replace("void main() {", "void main() { float spark = length(gl_PointCoord - vec2(0.5)); if(spark > 0.5) discard;").replace("#include <opaque_fragment>", "diffuseColor.a *= exp(-spark * spark * 18.0);\n#include <opaque_fragment>")}
 const dustPos=new Float32Array(1500*3);for(let i=0;i<dustPos.length;i++)dustPos[i]=(random()-.5)*70;const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(dustPos,3));const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:'#94b8ab',size:.025,transparent:true,opacity:.42}));scene.add(dust)
 const core=textPlane(['core_process: still_running'],3.4,'#b7e6ce',40);core.position.set(0,-1.2,-29);scene.add(core)
 let running=false,paused=false,time=0,last=performance.now(),raf,prevChapter=-1
 function resize(){camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)}resize();window.addEventListener('resize',resize)
 function frame(now){raf=requestAnimationFrame(frame);const dt=Math.min((now-last)/1000,.1);last=now;if(running&&!paused&&!document.hidden){time=Math.min(time+dt,30);if(time>=30){running=false;onComplete()}}const story=time;
 // Retain the effect timing while giving the objects their own camera chapter.
 const t=story<6?story:story<10?6+(story-6)*1.25:story<14?11:story<19?11+story-14:story<23?16+(story-19)*1.25:story<26?21+(story-23)*5/3:story;
 const breath=running?Math.sin(t*Math.PI*2/30):Math.sin(now*.0012);let chapter=0;boundaries.forEach((b,i)=>{if(story>=b)chapter=i});if(chapter!==prevChapter){onChapter(chapters[chapter]);prevChapter=chapter}progress.style.transform=`scaleX(${story/30})`
 const into=ease(.2,3.8,t),out=ease(26.6,30,t);const zoom=t<6?into:1-out;const scale=Math.exp(zoom*4.7);const mobile=host.clientWidth<600;const eyeX=(mobile?.58:.5)*host.clientWidth+(.79-.5)*host.clientHeight*.5625;const eyeY=.252*host.clientHeight;portrait.style.transformOrigin=`${eyeX}px ${eyeY}px`;portrait.style.transform=`translate(${(host.clientWidth/2-eyeX)*zoom}px,${(host.clientHeight/2-eyeY)*zoom}px) scale(${scale*(1+.002*breath)})`;portrait.style.opacity=String(t<6?1-ease(2.5,4,t):ease(27,28.8,t));
 world.visible=t>4&&t<27.7;dust.visible=t>2.7&&t<28;tunnel.visible=t>2.4&&t<6.5;tunnel.position.z=(t-3)*11;tunnel.children.forEach(o=>{o.material.opacity=.3*(1-ease(5,6.5,t))});
 // Each chapter occupies a different depth. The camera physically passes through
 // the network, then the floating objects, and only then reaches the memory.
 const shots=[
  [0,0,0,18,0,0,0], [6,0,.3,12,0,0,0],
  [9,1,.5,8,0,0,-3], [11.2,.3,.3,-7,0,0,-14],
  [13,0,.15,-9,0,0,-14], [15.4,0,.25,-23,0,.2,-30],
  [18.8,0,.1,-24,0,0,-30], [21.9,0,.1,-24.6,0,-.1,-31],
  [23.5,0,-2.3,-25,0,-2.5,-31], [25.65,0,-2.3,-25,0,-2.5,-31],
  [27.1,0,-1,-27,0,-1,-32], [28,0,-1,-27,0,-1,-32],
  [30,0,-1,-27,0,-1,-32],
 ];
 let shot=0;while(shot<shots.length-2&&story>shots[shot+1][0])shot++;
 const from=shots[shot],to=shots[shot+1],blend=ease(from[0],to[0],story);
 const values=from.slice(1).map((v,i)=>THREE.MathUtils.lerp(v,to[i+1],blend));
 const [cx,cy,cz,tx,ty,tz]=values;
 camera.position.set(cx,cy,cz+(mobile?Math.min(3.5,(cz-tz)*.38):0));camera.lookAt(tx,ty,tz);world.rotation.y=0;
 // Reappear around the final memory as its connections start to fail.
 network.position.z=story<14?0:-32;
 network.visible=story<12.8||story>=19;
 thoughts.update(story,camera);
 cacheGlitch.update(story);
 light.position.set(2,4,camera.position.z-2);
 redLight.position.z=-27;
 const failure=ease(16,20.7,t),silence=ease(21,23,t);light.intensity=50*(1-silence);redLight.intensity=70*failure*(1-silence)
 nodes.forEach((n,i)=>{const breakAt=16+i%6*.48;const f=ease(breakAt,breakAt+3,t);n.mesh.position.copy(n.base).addScaledVector(n.drift,f*5);n.mesh.position.y+=Math.sin(t*1.2+i)*.045;n.mesh.visible=i===3||t<22;n.mesh.material.color.set(i===3?'#c4ffe4':f>.15?'#e74549':'#a2ebcd');n.mesh.material.emissive.set(i===3?'#8de3b9':f>.15?'#d42132':'#62d9ac');n.mesh.material.emissiveIntensity=i===3?1.5+Math.sin(t*3)*.4:2*(1-silence);if(i===3){n.mesh.position.copy(n.base);n.mesh.scale.setScalar(1+ease(26,27.5,t)*6)}if(n.label){n.label.visible=t<21||i===3;n.label.position.copy(n.mesh.position).add(new THREE.Vector3(.5,.28,0));n.label.quaternion.copy(camera.quaternion)}})
 edges.forEach(e=>{const f=ease(16+e.delay,17.3+e.delay,t);e.line.visible=t<22&&f<.98;e.line.material.opacity=.24*(1-f);e.line.material.color.set(f>.05?'#ff4655':'#4aab8c');const a=e.line.geometry.attributes.position;a.setXYZ(0,...nodes[e.i].mesh.position.toArray());a.setXYZ(1,...nodes[e.j].mesh.position.toArray());a.needsUpdate=true})
 panels.forEach(({panel,failure:err},i)=>{panel.visible=t<16;err.visible=t>=16&&t<22;panel.material.opacity=.6;err.material.opacity=(.45+.4*Math.sin(t*20+i))*(1-silence)})
 memory.visible=story>=14&&t<16.9;memory.scale.setScalar(Math.max(.001,ease(11,12,t)));memory.rotation.y=Math.sin(t*.5)*.07;memoryMaterial.uniforms.burn.value=ease(13.7,16.5,t);memoryMaterial.uniforms.time.value=t
 heart.visible=t>=16&&t<26;anatomicalHeart.update(story);
 props.visible=story>=10&&story<15.2;
 const rise=ease(10,11.7,story);props.position.y=THREE.MathUtils.lerp(-3.3,-.2,rise)+Math.sin(story*1.2)*.06;
 props.rotation.y=Math.sin(story*.6)*.13;props.rotation.z=Math.sin(story*.5)*.06;
 bottle.position.y=Math.sin(story*1.4)*.06;bottle.rotation.y=-.13+Math.sin(story*.7)*.16;
 medicine.position.y=-.25+Math.sin(story*1.25+1.6)*.07;medicine.rotation.y=-.16+Math.sin(story*.65+.7)*.14;
 cigarette.position.set(1.13,.85+Math.sin(story*1.1+.8)*.10,.08);cigarette.scale.setScalar(.78);
 const propFade=ease(10,10.8,story)*(1-ease(14.2,15.2,story));
 capsules.update(story);
 props.traverse(o=>{if(o.material){o.material.transparent=true;o.material.opacity=(o.userData.baseOpacity??1)*propFade}});

 ash.visible=t>13.7&&t<21;ash.material.opacity=1-ease(19,21,t);ashData.forEach(([a,b,c],i)=>{const f=clamp((t-13.7-a*1.8)/3,0,1);ashPos[i*3]=THREE.MathUtils.lerp((a-.5)*2.5,(a-.5)*11,f)+Math.sin(f*7+b*12)*f;ashPos[i*3+1]=THREE.MathUtils.lerp((b-.5)*3.2+.2,(b-.5)*7,f);ashPos[i*3+2]=-30+(c-.5)*f*7});ashGeo.attributes.position.needsUpdate=true;dust.rotation.y=t*.008;core.visible=t>23&&t<27;core.material.opacity=ease(23,24,t)*(1-ease(26,27,t));
 renderer.render(scene,camera)
 }raf=requestAnimationFrame(frame)
 return {start(){time=0;paused=false;running=true;last=performance.now()},pause(v){paused=v},skip(){time=30;paused=false;running=true},dispose(){anatomicalHeart.dispose();cacheGlitch.dispose();disposed=true;cancelAnimationFrame(raf);window.removeEventListener('resize',resize);scene.traverse(o=>{o.geometry?.dispose();if(o.material){const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose())}});textures.forEach(t=>t.dispose());memoryMaterial.uniforms.photo.value.dispose();renderer.dispose();renderer.domElement.remove()}}
}







