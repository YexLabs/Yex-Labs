"use client"

import { useEffect, useRef } from "react"
import { ditherFragmentShader } from "./ditherField.frag"
import styles from "./DitherField.module.css"

/* A single full-viewport triangle. Cheaper than a quad and needs no buffers
   beyond one position attribute. */
const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

/** 0-1 RGB, matching the React Bits prop shape. */
type Rgb = readonly [number, number, number]

type DitherFieldProps = {
  waveSpeed?: number
  waveFrequency?: number
  waveAmplitude?: number
  waveColor?: Rgb
  backgroundColor?: Rgb
  colorNum?: number
  pixelSize?: number
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error("Could not create shader")

  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(`Shader failed to compile: ${log ?? "unknown error"}`)
  }

  return shader
}

/**
 * The hero's dithered wave field, drawn straight to a canvas with WebGL.
 *
 * Deliberately dependency-free — see ditherField.frag.ts for why the React Bits
 * component could not be used directly. The shader is theirs; this is the
 * runtime around it.
 *
 * Fails quiet: if WebGL is unavailable or the shader will not compile, the
 * canvas is left blank and the hero falls back to its paper background. A
 * decorative field must never take the page down with it.
 */
export default function DitherField({
  waveSpeed = 0.028,
  waveFrequency = 2.4,
  waveAmplitude = 0.26,
  waveColor = [0.62, 0.7, 0.76],
  backgroundColor = [0.984, 0.984, 0.973],
  colorNum = 4,
  pixelSize = 3
}: DitherFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power"
    })

    if (!gl) return

    let program: WebGLProgram | null = null
    let frame = 0
    let disposed = false

    try {
      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      const fs = compile(gl, gl.FRAGMENT_SHADER, ditherFragmentShader)

      program = gl.createProgram()
      if (!program) throw new Error("Could not create program")

      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "Program failed to link")
      }

      gl.useProgram(program)

      const buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      )

      const position = gl.getAttribLocation(program, "position")
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

      const u = (name: string) => gl.getUniformLocation(program!, name)
      const uResolution = u("resolution")
      const uTime = u("time")

      gl.uniform1f(u("waveSpeed"), waveSpeed)
      gl.uniform1f(u("waveFrequency"), waveFrequency)
      gl.uniform1f(u("waveAmplitude"), waveAmplitude)
      gl.uniform3fv(u("waveColor"), waveColor as unknown as number[])
      gl.uniform3fv(u("backgroundColor"), backgroundColor as unknown as number[])
      gl.uniform1f(u("colorNum"), colorNum)
      gl.uniform1f(u("pixelSize"), pixelSize)

      /* Capped at 1.5x. The field is chunky by design, so rendering it at full
         retina density burns fill rate for pixels the dither throws away. */
      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
        const w = Math.max(1, Math.floor(canvas.clientWidth * dpr))
        const h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
        if (canvas.width === w && canvas.height === h) return
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
        gl.uniform2f(uResolution, w, h)
      }

      resize()
      window.addEventListener("resize", resize)

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")

      const draw = (t: number) => {
        if (disposed) return
        resize()
        gl.uniform1f(uTime, t * 0.001)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
        frame = requestAnimationFrame(draw)
      }

      if (reduced.matches) {
        /* One still frame. The waves are decorative; motion is not. */
        gl.uniform1f(uTime, 0)
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      } else {
        frame = requestAnimationFrame(draw)
      }

      return () => {
        disposed = true
        cancelAnimationFrame(frame)
        window.removeEventListener("resize", resize)
        gl.deleteBuffer(buffer)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
        if (program) gl.deleteProgram(program)
        gl.getExtension("WEBGL_lose_context")?.loseContext()
      }
    } catch (error) {
      /* Decorative only — leave the canvas blank and let the paper show.
         Silent in production, loud in development: a shader that will not
         compile is a bug worth seeing, not worth hiding. */
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("DitherField failed to initialise:", error)
      }
      if (program) gl.deleteProgram(program)
      return
    }
  }, [
    waveSpeed,
    waveFrequency,
    waveAmplitude,
    waveColor,
    backgroundColor,
    colorNum,
    pixelSize
  ])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
