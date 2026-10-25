import * as THREE from 'three'

// Revolved silhouette: heavy base, straight body, rounded shoulders and a long neck.
export function createBottle(textures) {
  const bottle = new THREE.Group()
  const profile = [
    [0, -.92], [.27, -.92], [.34, -.90], [.365, -.85],
    [.37, -.76], [.37, .31], [.365, .40], [.34, .47],
    [.29, .53], [.23, .59], [.18, .64], [.155, .72],
    [.135, .96], [.13, 1.10], [.145, 1.12], [.145, 1.17], [0, 1.17],
  ]
  const lathe = points => new THREE.LatheGeometry(points.map(([r, y]) => new THREE.Vector2(r, y)), 64)
  function add(geometry, material, y = 0) {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = y
    mesh.userData.baseOpacity = material.opacity
    bottle.add(mesh)
    return mesh
  }
  const glass = new THREE.MeshPhysicalMaterial({
    color: '#e5c997', metalness: .08, roughness: .13,
    transparent: true, opacity: .24, side: THREE.FrontSide,
    clearcoat: 1, clearcoatRoughness: .06, depthWrite: false,
  })
  add(lathe(profile), glass)
  const liquid = new THREE.MeshStandardMaterial({
    color: '#954009', emissive: '#642000', emissiveIntensity: .38,
    metalness: .12, roughness: .23,
  })
  add(lathe([[0,-.84],[.30,-.84],[.335,-.8],[.34,.31],[.33,.4],
    [.28,.48],[.22,.55],[.155,.62],[.135,.73],[0,.73]]), liquid)
  const gold = new THREE.MeshStandardMaterial({ color: '#dca94d', metalness: .72, roughness: .29 })
  add(new THREE.CylinderGeometry(.15,.153,.29,48), gold, 1.20)
  for (const y of [1.055,1.075,1.31,1.345]) {
    const rim = add(new THREE.TorusGeometry(.15,.009,8,48), gold.clone(), y)
    rim.rotation.x = Math.PI / 2
  }
  for (let i = 0; i < 40; i++) {
    const angle = i / 40 * Math.PI * 2
    const ridge = add(new THREE.BoxGeometry(.007,.041,.007), gold.clone(),1.325)
    ridge.position.x = Math.sin(angle) * .151
    ridge.position.z = Math.cos(angle) * .151
    ridge.rotation.y = angle
  }
  const base = add(new THREE.TorusGeometry(.337,.022,10,64), glass.clone(),-.865)
  base.rotation.x = Math.PI / 2

  // UV sample the flat label from the user's reference sheet, keeping its artwork.
  const labelTexture = new THREE.TextureLoader().load('/images/bottle-reference.png')
  labelTexture.colorSpace = THREE.SRGBColorSpace
  labelTexture.repeat.set(165 / 1516, 209 / 1038)
  labelTexture.offset.set(1320 / 1516, 1 - 888 / 1038)
  textures.push(labelTexture)
  const paper = new THREE.MeshStandardMaterial({
    map: labelTexture, color: '#fff0d3', roughness: .84,
    emissive: '#6e5030', emissiveIntensity: .16,
  })
  add(new THREE.CylinderGeometry(.374,.374,.99,48,1,true,-1.28,2.56),paper,-.21)
  bottle.rotation.set(-.035,-.13,-.035)
  bottle.scale.setScalar(.84)
  return bottle
}
