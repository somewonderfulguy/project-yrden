import { Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from 'three'

import { useCanvasEffect } from '@/hooks'

import { vertexShader, fragmentShader } from './shaders'
import { setupGUI } from './gui'

export const RagingSea = () => {
  const canvasRef = useCanvasEffect(({ add, camera, onFrame }) => {
    // Geometry
    const geometry = new PlaneGeometry(2, 2, 128, 128)

    // Material
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new Vector2(4, 1.5) },
        uTime: { value: 0 },
        uBigWavesSpeed: { value: 0.75 },
      },
    })

    // Mesh
    const water = new Mesh(geometry, material)
    water.rotation.x = -Math.PI * 0.5
    add(water)

    // Debug
    const gui = setupGUI()
    gui
      .add(material.uniforms.uBigWavesElevation, 'value')
      .min(0)
      .max(1)
      .step(0.001)
      .name('uBigWavesElevation')
    gui
      .add(material.uniforms.uBigWavesFrequency.value, 'x')
      .min(0)
      .max(10)
      .step(0.001)
      .name('uBigWavesFrequencyX')
    gui
      .add(material.uniforms.uBigWavesFrequency.value, 'y')
      .min(0)
      .max(10)
      .step(0.001)
      .name('uBigWavesFrequencyY')
    gui
      .add(material.uniforms.uBigWavesSpeed, 'value')
      .min(0)
      .max(4)
      .step(0.001)
      .name('uBigWavesSpeed')

    // Camera
    camera.position.set(1, 1, 1)

    onFrame(({ elapsed }) => {
      material.uniforms.uTime.value = elapsed
    })

    return () => {
      gui.destroy()
      material.dispose()
      geometry.dispose()
    }
  })

  return <canvas ref={canvasRef} />
}
