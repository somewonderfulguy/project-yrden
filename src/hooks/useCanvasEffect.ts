import { useEffect, useEffectEvent, useRef } from 'react'
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  type Object3D,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type CanvasEffectCallback = (api: {
  canvas: HTMLCanvasElement
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  controls: OrbitControls
  size: { width: number; height: number }
  add: (...objects: Object3D[]) => void
  onFrame: (fn: (t: { elapsed: number; delta: number }) => void) => void
  onResize: (fn: (size: { width: number; height: number }) => void) => void
}) => void | (() => void)

export const useCanvasEffect = (cb: CanvasEffectCallback) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const cbEvent = useEffectEvent(() => {
    return cb
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new Scene()

    const size = {
      width: canvas.clientWidth || window.innerWidth,
      height: canvas.clientHeight || window.innerHeight,
    }

    const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 100)
    camera.position.set(0, 0, 1)
    scene.add(camera)

    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    const renderer = new WebGLRenderer({ canvas, antialias: true })

    const frameHandlers: Array<
      (t: { elapsed: number; delta: number }) => void
    > = []
    const resizeHandlers: Array<
      (s: { width: number; height: number }) => void
    > = []

    const setSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      size.width = width
      size.height = height
      resizeHandlers.forEach((fn) => fn({ width, height }))
    }
    setSize()

    const onResize = () => setSize()
    window.addEventListener('resize', onResize)

    const add = (...objects: Object3D[]) => {
      objects.forEach((o) => scene.add(o))
    }

    const onFrame = (fn: (t: { elapsed: number; delta: number }) => void) => {
      frameHandlers.push(fn)
    }

    const onResizeRegister = (
      fn: (s: { width: number; height: number }) => void,
    ) => {
      resizeHandlers.push(fn)
    }

    const clock = new Clock()
    let raf = 0
    const tick = () => {
      const delta = clock.getDelta()
      const elapsed = clock.elapsedTime
      controls.update()
      frameHandlers.forEach((fn) => fn({ elapsed, delta }))
      renderer.render(scene, camera)
      raf = window.requestAnimationFrame(tick)
    }

    const maybeCleanup = cbEvent()({
      canvas,
      scene,
      camera,
      renderer,
      controls,
      size,
      add,
      onFrame,
      onResize: onResizeRegister,
    })

    tick()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      renderer.dispose()
      if (typeof maybeCleanup === 'function') {
        maybeCleanup()
      }
    }
  }, [])

  return canvasRef
}
