import * as THREE from 'three'
import gsap from 'gsap'

export function createAnatomicalHeart(){
 const group=new THREE.Group(),halves=[new THREE.Group(),new THREE.Group()]
 group.add(...halves)
 const muscle=new THREE.MeshPhysicalMaterial({color:'#9b2429',roughness:.34,metalness:.06,clearcoat:.65,clearcoatRoughness:.23,emissive:'#350507',emissiveIntensity:.13})
 const vessel=muscle.clone();vessel.color.set('#b3443c')
 const vein=new THREE.MeshStandardMaterial({color:'#52171c',roughness:.46})
 const shape=new THREE.SphereGeometry(1,64,48).toNonIndexed()
 const a=shape.attributes.position
 for(let i=0;i<a.count;i++){
  const y=a.getY(i),x=a.getX(i),z=a.getZ(i)
  const taper=.62+.32*(y+1)/2
  a.setXYZ(i,x*taper-.16*(1-y*y),y*.97,z*.55*(.8+.2*(y+1)/2))
 }
 shape.computeVertexNormals()
 for(let side=0;side<2;side++){
  const positions=[],normals=[]
  for(let i=0;i<a.count;i+=3){const x=(a.getX(i)+a.getX(i+1)+a.getX(i+2))/3,y=(a.getY(i)+a.getY(i+1)+a.getY(i+2))/3
   if((x>Math.sin(y*14)*.035?1:0)!==side)continue
   for(let j=0;j<3;j++){positions.push(a.getX(i+j),a.getY(i+j),a.getZ(i+j));normals.push(shape.attributes.normal.getX(i+j),shape.attributes.normal.getY(i+j),shape.attributes.normal.getZ(i+j))}
  }
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(normals,3))
  halves[side].add(new THREE.Mesh(geo,muscle))
 }
 shape.dispose()
 function tube(points,r,material,side,open=false){
  const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)))
  const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,36,r,12,false),material);halves[side].add(mesh)
  if(open){const end=curve.getPoint(1),direction=curve.getTangent(1);const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.018,8,24),material);rim.position.copy(end);rim.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),direction);halves[side].add(rim);const hole=new THREE.Mesh(new THREE.CircleGeometry(r*.85,24),new THREE.MeshBasicMaterial({color:'#250307',side:THREE.DoubleSide}));hole.position.copy(end).addScaledVector(direction,-.012);hole.quaternion.copy(rim.quaternion);halves[side].add(hole)}
 }
 // Major vessels: aortic arch, vena cava and branching pulmonary arteries.
 tube([[.22,.35,.03],[.46,.88,.04],[.36,1.27,.02],[.04,1.36,.02],[-.12,1.13,.05]],.15,vessel,1,true)
 tube([[-.48,.28,-.02],[-.60,.76,0],[-.54,1.36,.01]],.14,vessel,0,true)
 tube([[.01,.35,.39],[.18,.73,.39],[.52,.83,.31],[.76,.72,.24]],.125,vessel,1,true)
 for(let i=0;i<3;i++)tube([[.13+i*.10,1.14,0],[.12+i*.13,1.43+i*.025,0]],.06,vessel,1,true)
 for(let side=0;side<2;side++){
 const x=side?1:-1
 tube([[x*.13,.61,.43],[x*.29,.24,.53],[x*.25,-.15,.51],[x*.12,-.69,.30]],.019,vein,side)
 for(let i=0;i<5;i++){const y=.43-i*.19;tube([[x*.23,y,.52],[x*.40,y-.12,.46],[x*.52,y-.25,.33]],.009,vein,side)}
 }
 const motion={split:0};const timeline=gsap.timeline({paused:true}).to(motion,{split:1,duration:1.6,ease:'power2.inOut'},19.65)
 return {group,update(time){
 timeline.time(time,false)
 const phase=((time-19)*1.3%1+1)%1
 const beat=Math.exp(-Math.pow((phase-.12)/.065,2))*.045+Math.exp(-Math.pow((phase-.31)/.085,2))*.025
 const pulse=beat*(1-motion.split)
 group.scale.set(1+pulse,1-pulse*.6,1+pulse*.7)
 group.rotation.set(-.08,.12+Math.sin(time*.6)*.035,-.12)
 halves.forEach((half,i)=>{const sign=i?1:-1;half.position.set(sign*motion.split*.55,-motion.split*(i?.08:.01),0);half.rotation.set(sign*motion.split*.10,sign*motion.split*.19,-sign*motion.split*.18)})
 },dispose(){timeline.kill()}}
}
