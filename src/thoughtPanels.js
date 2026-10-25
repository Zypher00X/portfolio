import * as THREE from 'three'

// Nine individual diagrams from the supplied reference, placed along the flight path.
export function createThoughtPanels(textures) {
  const group=new THREE.Group()
  const source=new THREE.TextureLoader().load('/images/mind-diagrams.png')
  source.colorSpace=THREE.SRGBColorSpace
  textures.push(source)
  const columns=[0,.339,.664,1]
  const rows=[0,.364,.685,1]
  const placements=[
    [-3.3,1.6,2.0], [3.3,1.5,1.0],
    [-3.2,-1.5,-.5], [3.1,-1.4,-1.8],
    [-2.8,1.4,-3.0], [2.8,1.5,-4.3],
    [-2.7,-1.3,-5.3], [2.7,-1.2,-6.3], [0,2.7,-7.5],
  ]
  const panels=placements.map((p,i)=>{
    const col=i%3,row=Math.floor(i/3)
    const map=source.clone()
    map.repeat.set(columns[col+1]-columns[col]-.006,rows[row+1]-rows[row]-.006)
    map.offset.set(columns[col]+.003,1-rows[row+1]+.003)
    textures.push(map)
    const material=new THREE.MeshBasicMaterial({map,color:'#b8e3d1',
      transparent:true,opacity:0,blending:THREE.AdditiveBlending,
      depthWrite:false,side:THREE.DoubleSide,toneMapped:false})
    const width=i===8?3.0:3.4
    const height=width*((rows[row+1]-rows[row])*1024)/((columns[col+1]-columns[col])*1536)
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,height),material)
    mesh.position.set(...p)
    mesh.rotation.y=p[0]<0?.18:-.18
    group.add(mesh)
    return {mesh,base:new THREE.Vector3(...p),tilt:mesh.rotation.y}
  })
  const smooth=(a,b,t)=>{const x=THREE.MathUtils.clamp((t-a)/(b-a),0,1);return x*x*(3-2*x)}
  return {group,update(time,camera){
    group.visible=time>5.5&&time<11.2
    const fade=smooth(5.5,6.8,time)*(1-smooth(10.1,11.2,time))
    panels.forEach(({mesh,base,tilt},i)=>{
      mesh.position.copy(base)
      mesh.position.y+=Math.sin(time*.65+i)*.10
      mesh.position.x+=Math.sin(time*.4+i*1.7)*.08
      mesh.rotation.y=tilt+Math.sin(time*.35+i)*.035
      // Fade before crossing the lens rather than flashing a reversed diagram.
      const distance=camera.position.z-mesh.position.z
      mesh.material.opacity=fade*smooth(.5,2.4,distance)*.86
    })
  }}
}
