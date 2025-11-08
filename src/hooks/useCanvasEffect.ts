import { useEffect, useRef } from 'react'
import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

type Vec3Tuple = [number, number, number]

export type CanvasEffectContext = {
  canvas: HTMLCanvasElement
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  controls?: OrbitControls
  sizes: { width: number; height: number }
  clock: Clock
  setSize: (w?: number, h?: number) => void
}

type ControlsOption =
  | boolean
  | {
      enableDamping?: boolean
    }

export type UseCanvasEffectOptions = {
  init?: (ctx: CanvasEffectContext) => void | (() => void)
  tick?: (ctx: CanvasEffectContext, elapsed: number, delta: number) => void
  resize?: (
    ctx: CanvasEffectContext,
    size: { width: number; height: number },
  ) => void
  controls?: ControlsOption
  camera?: {
    fov?: number
    near?: number
    far?: number
    position?: Vec3Tuple
  }
  renderer?: {
    antialias?: boolean
    alpha?: boolean
    pixelRatio?: number
  }
  manualRender?: boolean
}

export const useCanvasEffect = (options: UseCanvasEffectOptions = {}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const a = 'hello'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    console.log(a)

    const scene = new Scene()

    const sizes = {
      width: canvas.clientWidth || window.innerWidth,
      height: canvas.clientHeight || window.innerHeight,
    }

    const camera = new PerspectiveCamera(
      options.camera?.fov ?? 75,
      sizes.width / sizes.height,
      options.camera?.near ?? 0.1,
      options.camera?.far ?? 100,
    )
    if (options.camera?.position) {
      const [x, y, z] = options.camera.position
      camera.position.set(x, y, z)
    } else {
      camera.position.set(0, 0, 1)
    }
    scene.add(camera)

    const renderer = new WebGLRenderer({
      canvas,
      antialias: options.renderer?.antialias,
      alpha: options.renderer?.alpha,
    })

    const setSize = (w?: number, h?: number) => {
      const width = w ?? (canvas.clientWidth || window.innerWidth)
      const height = h ?? (canvas.clientHeight || window.innerHeight)
      renderer.setSize(width, height)
      const desiredPR =
        options.renderer?.pixelRatio ?? Math.min(window.devicePixelRatio, 2)
      renderer.setPixelRatio(desiredPR)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      sizes.width = width
      sizes.height = height
    }
    setSize()

    const controlsEnabled = options.controls !== false
    const controls = controlsEnabled
      ? new OrbitControls(camera, canvas)
      : undefined
    if (controls) {
      const enableDamping =
        typeof options.controls === 'object'
          ? (options.controls.enableDamping ?? true)
          : true
      controls.enableDamping = enableDamping
    }

    const clock = new Clock()

    const ctx: CanvasEffectContext = {
      canvas,
      scene,
      camera,
      renderer,
      controls,
      sizes,
      clock,
      setSize,
    }

    const userCleanup = options.init ? options.init(ctx) : undefined

    const onResize = () => {
      setSize()
      options.resize?.(ctx, { width: sizes.width, height: sizes.height })
    }
    window.addEventListener('resize', onResize)

    let raf = 0
    const tick = () => {
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()
      if (controls) controls.update()
      options.tick?.(ctx, elapsed, delta)
      if (!options.manualRender) {
        renderer.render(scene, camera)
      }
      raf = window.requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      userCleanup?.()
      controls?.dispose()
      renderer.dispose()
    }
  }, [])

  return canvasRef
}
