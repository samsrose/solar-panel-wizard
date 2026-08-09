import * as THREE from "three"

/**
 * Demo stand-in for an img2threejs factory export.
 * In production this would be generated from property imagery for the
 * selected address; for now every address loads this shared house model.
 */
export function createAddressHouseModel() {
  const root = new THREE.Group()
  root.name = "AddressHouseModel"

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(6, 48),
    new THREE.MeshStandardMaterial({
      color: "#6f8f5c",
      roughness: 0.95,
    })
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = 0
  ground.receiveShadow = true
  ground.name = "ground"
  root.add(ground)

  const driveway = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.04, 3.2),
    new THREE.MeshStandardMaterial({ color: "#7a7f86", roughness: 0.9 })
  )
  driveway.position.set(0, 0.02, 3.2)
  driveway.receiveShadow = true
  driveway.name = "driveway"
  root.add(driveway)

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(3.4, 1.8, 2.6),
    new THREE.MeshStandardMaterial({
      color: "#e8e2d6",
      roughness: 0.75,
    })
  )
  body.position.y = 0.9
  body.castShadow = true
  body.receiveShadow = true
  body.name = "houseBody"
  root.add(body)

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.6, 1.2, 4),
    new THREE.MeshStandardMaterial({
      color: "#5b6570",
      roughness: 0.7,
    })
  )
  roof.position.y = 2.4
  roof.rotation.y = Math.PI / 4
  roof.castShadow = true
  roof.name = "roof"
  root.add(roof)

  const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.7, 0.35),
    new THREE.MeshStandardMaterial({ color: "#8b5a4a", roughness: 0.85 })
  )
  chimney.position.set(0.9, 2.55, -0.35)
  chimney.castShadow = true
  chimney.name = "chimney"
  root.add(chimney)

  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 1.05, 0.08),
    new THREE.MeshStandardMaterial({ color: "#3f5d4a", roughness: 0.6 })
  )
  door.position.set(0, 0.55, 1.34)
  door.name = "door"
  root.add(door)

  const windowMaterial = new THREE.MeshStandardMaterial({
    color: "#9ec9e8",
    roughness: 0.2,
    metalness: 0.1,
  })

  const leftWindow = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.45, 0.08),
    windowMaterial
  )
  leftWindow.position.set(-1, 1.15, 1.34)
  leftWindow.name = "windowLeft"
  root.add(leftWindow)

  const rightWindow = leftWindow.clone()
  rightWindow.position.x = 1
  rightWindow.name = "windowRight"
  root.add(rightWindow)

  root.userData = {
    source: "img2threejs-demo",
    sculptRuntime: {
      nodes: {
        ground,
        driveway,
        houseBody: body,
        roof,
        chimney,
        door,
        windowLeft: leftWindow,
        windowRight: rightWindow,
      },
    },
  }

  return root
}
