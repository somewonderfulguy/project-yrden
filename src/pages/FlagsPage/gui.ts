import GUI from 'lil-gui'
import * as THREE from 'three'
import { FLAGS, type Flag, flagOptions } from './flags'

export const setupGUI = (
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>,
) => {
  const gui = new GUI()
  const params: { flag: Flag } = { flag: 'Quebec' }

  const applyFlag = (flag: Flag) => {
    const entry = FLAGS[flag]
    mesh.material.vertexShader = entry.vs
    mesh.material.fragmentShader = entry.fs

    const newGeometry = new THREE.PlaneGeometry(...entry.dimensions, 32, 32)
    mesh.geometry.setAttribute('position', newGeometry.getAttribute('position'))

    mesh.material.needsUpdate = true
  }

  applyFlag(params.flag)

  gui
    .add(params, 'flag', flagOptions)
    .name('Flag')
    .onChange((v: Flag) => applyFlag(v))

  return gui
}
