import { useEffect, useRef } from 'react'
import {
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FLAGS } from './flags'
import { setupGUI } from './gui'

export const FlagsPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new Scene()

    const geometry = new PlaneGeometry(...FLAGS.Quebec.dimensions, 32, 32)

    const material = new ShaderMaterial({
      vertexShader: FLAGS.Quebec.vs,
      fragmentShader: FLAGS.Quebec.fs,
      side: DoubleSide,
    })

    const mesh = new Mesh(geometry, material)
    scene.add(mesh)

    const gui = setupGUI(mesh)

    const sizes = {
      width: canvas.clientWidth || 800,
      height: canvas.clientHeight || 600,
    }

    const camera = new PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100,
    )
    camera.position.set(0, 0, 1)
    scene.add(camera)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    const renderer = new WebGLRenderer({ canvas })
    const setSize = () => {
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    setSize()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    let raf = 0
    const tick = () => {
      controls.update()
      renderer.render(scene, camera)
      raf = window.requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      gui.destroy()
      controls.dispose()
      renderer.dispose()
      material.dispose()
      geometry.dispose()
    }
  }, [])

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="webgl"
        style={{ width: '100%', height: '100vh', display: 'block' }}
      />
    </div>
  )
}
