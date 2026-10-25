import * as THREE from 'three'

export function createMedicineBottle(textures) {
  const bottle = new THREE.Group()
  const lathe = points => new THREE.LatheGeometry(points.map(([r,y]) => new THREE.Vector2(r,y)),64)
  function add(geometry,material,y=0) {
    const mesh = new THREE.Mesh(geometry,material)
    mesh.position.y=y
    mesh.userData.baseOpacity=material.opacity
    bottle.add(mesh)
    return mesh
  }
  const amber=new THREE.MeshPhysicalMaterial({
    color:'#743008',emissive:'#361304',emissiveIntensity:.28,
    roughness:.16,metalness:.12,clearcoat:1,clearcoatRoughness:.08,
  })
  add(lathe([[0,-.66],[.24,-.66],[.29,-.64],[.305,-.59],
    [.31,-.5],[.31,.22],[.30,.31],[.27,.4],[.22,.47],
    [.17,.54],[.15,.62],[.15,.73],[0,.73]]),amber)
  const blue=new THREE.MeshPhysicalMaterial({
    color:'#647fe4',emissive:'#243a88',emissiveIntensity:.25,
    roughness:.3,metalness:.24,clearcoat:.65,
  })
  add(new THREE.CylinderGeometry(.17,.18,.21,64),blue,.765)
  for(const y of [.665,.697,.742,.85]) {
    const ring=add(new THREE.TorusGeometry(.176,.011,10,64),blue.clone(),y)
    ring.rotation.x=Math.PI/2
  }
  for(let i=0;i<48;i++) {
    const a=i/48*Math.PI*2
    const ridge=add(new THREE.BoxGeometry(.006,.065,.009),blue.clone(),.845)
    ridge.position.x=Math.sin(a)*.171
    ridge.position.z=Math.cos(a)*.171
    ridge.rotation.y=a
  }
  const base=add(new THREE.TorusGeometry(.274,.016,10,64),
    new THREE.MeshPhysicalMaterial({color:'#b06822',metalness:.25,roughness:.14,clearcoat:1}),-.624)
  base.rotation.x=Math.PI/2
  // Read the flat front-label region from the supplied texture sheet using UVs.
  const label=new THREE.TextureLoader().load('/images/medicine-reference.png')
  label.colorSpace=THREE.SRGBColorSpace
  label.repeat.set(102/1516,113/1038)
  label.offset.set(882/1516,1-910/1038)
  textures.push(label)
  add(new THREE.CylinderGeometry(.314,.314,.72,48,1,true,-1.35,2.7),
    new THREE.MeshStandardMaterial({map:label,color:'#ffffff',roughness:.72,
      emissive:'#22416c',emissiveIntensity:.22}),-.12)
  bottle.rotation.set(.04,-.16,.075)
  return bottle
}
