import { DoubleSide, Mesh, PlaneGeometry, ShaderMaterial } from 'three'

import { useCanvasEffect } from '@/hooks'

import { FLAGS } from './flags'
import { setupGUI } from './gui'

export const FlagsPage = () => {
  const canvasRef = useCanvasEffect(({ add, camera }) => {
    const geometry = new PlaneGeometry(...FLAGS.Quebec.dimensions, 32, 32)

    const material = new ShaderMaterial({
      vertexShader: FLAGS.Quebec.vs,
      fragmentShader: FLAGS.Quebec.fs,
      side: DoubleSide,
    })

    const mesh = new Mesh(geometry, material)
    add(mesh)

    const gui = setupGUI(mesh)

    camera.position.set(0, 0, 1)

    return () => {
      gui.destroy()
      material.dispose()
      geometry.dispose()
    }
  })

  return <canvas ref={canvasRef} />
}
