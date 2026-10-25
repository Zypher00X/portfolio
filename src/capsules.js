import * as THREE from "three";

export function createCapsules() {
  const group = new THREE.Group();
  const radius = 0.055;
  // One closed half-shell, mirrored for the other colour.
  const profile = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(radius, 0),
    new THREE.Vector2(radius, 0.08),
  ];
  for (let i = 1; i <= 12; i++) {
    const angle = ((i / 12) * Math.PI) / 2;
    profile.push(
      new THREE.Vector2(
        radius * Math.cos(angle),
        0.08 + radius * Math.sin(angle),
      ),
    );
  }
  const shell = new THREE.LatheGeometry(profile, 24);
  const yellow = new THREE.MeshPhysicalMaterial({
    color: "#ffc51c",
    roughness: 0.22,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    emissive: "#624000",
    emissiveIntensity: 0.22,
  });
  const green = new THREE.MeshPhysicalMaterial({
    color: "#07562d",
    roughness: 0.2,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
    emissive: "#06371b",
    emissiveIntensity: 0.22,
  });
  const seamGeometry = new THREE.TorusGeometry(radius + 0.001, 0.002, 6, 24);
  const seamMaterial = new THREE.MeshStandardMaterial({
    color: "#bca657",
    roughness: 0.38,
  });
  // Stable positions keep each loop identical and leave both labels unobstructed.
  const positions = [
    [-0.62, -0.65, 0.2],
    [-0.65, -0.15, -0.3],
    [-0.56, 0.43, 0.1],
    [-0.45, 1.08, -0.5],
    [0.4, -0.87, 0.25],
    [0.74, -0.95, -0.15],
    [1.2, -0.96, 0.1],
    [1.53, -0.62, 0.12],
    [1.61, -0.13, -0.25],
    [1.51, 0.42, 0.05],
    [0.51, 0.3, -0.55],
    [0.63, 0.69, -0.35],
    [-0.29, -1.02, -0.1],
    [0.07, -1.08, 0.3],
    [1.7, 0.75, -0.45],
    [0.38, 1.29, -0.6],
    [-0.89, 0.05, -0.6],
    [1.77, -0.85, -0.4],
  ];
  const pills = positions.map((position, i) => {
    const pill = new THREE.Group();
    const top = new THREE.Mesh(shell, yellow);
    const bottom = new THREE.Mesh(shell, green);
    bottom.rotation.z = Math.PI;
    const seam = new THREE.Mesh(seamGeometry, seamMaterial);
    seam.rotation.x = Math.PI / 2;
    pill.add(top, bottom, seam);
    pill.scale.setScalar(0.8 + (i % 4) * 0.12);
    group.add(pill);
    return { pill, position: new THREE.Vector3(...position), phase: i * 2.399 };
  });
  return {
    group,
    update(time) {
      for (const { pill, position, phase } of pills) {
        pill.position.copy(position);
        pill.position.y += Math.sin(time * 0.85 + phase) * 0.055;
        pill.position.x += Math.cos(time * 0.6 + phase) * 0.025;
        pill.rotation.set(
          phase + time * 0.19,
          phase * 0.7 + time * 0.23,
          phase + time * 0.16,
        );
      }
    },
  };
}
