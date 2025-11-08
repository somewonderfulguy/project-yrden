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

import { setupGUI } from './gui'

export const RagingSea = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new Scene()

    const gui = setupGUI()

    return () => {
      gui.destroy()
    }
  }, [])

  return <canvas ref={canvasRef} />
}
