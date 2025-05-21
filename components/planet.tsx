"use client"

import { useEffect, useRef } from "react"

export default function Planet() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = Math.min(400, window.innerWidth * 0.8)
    canvas.width = size
    canvas.height = size

    // Animation variables
    let rotation = 0
    const rotationSpeed = 0.002

    // Draw planet
    function drawPlanet() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Planet center
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = canvas.width * 0.4

      // Create planet gradient
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        0,
        centerX,
        centerY,
        radius,
      )
      gradient.addColorStop(0, "#9d4edd") // Light purple
      gradient.addColorStop(0.6, "#7b2cbf") // Medium purple
      gradient.addColorStop(1, "#5a189a") // Dark purple

      // Draw planet body
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Draw planet rings
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)
      ctx.scale(1, 0.2)

      // Outer ring
      ctx.beginPath()
      ctx.arc(0, 0, radius * 1.8, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(180, 120, 255, 0.3)"
      ctx.lineWidth = radius * 0.2
      ctx.stroke()

      // Inner ring
      ctx.beginPath()
      ctx.arc(0, 0, radius * 1.5, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(220, 180, 255, 0.4)"
      ctx.lineWidth = radius * 0.1
      ctx.stroke()

      ctx.restore()

      // Draw surface details
      for (let i = 0; i < 8; i++) {
        const angle = rotation + (i * Math.PI * 2) / 8
        const distanceFromCenter = radius * 0.6
        const spotX = centerX + Math.cos(angle) * distanceFromCenter
        const spotY = centerY + Math.sin(angle) * distanceFromCenter
        const spotSize = radius * (0.05 + Math.random() * 0.05)

        ctx.beginPath()
        ctx.arc(spotX, spotY, spotSize, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
        ctx.fill()
      }

      // Draw atmosphere glow
      const glowGradient = ctx.createRadialGradient(centerX, centerY, radius, centerX, centerY, radius * 1.2)
      glowGradient.addColorStop(0, "rgba(149, 76, 233, 0.5)")
      glowGradient.addColorStop(1, "rgba(149, 76, 233, 0)")

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
      ctx.fillStyle = glowGradient
      ctx.fill()

      // Draw a small moon
      const moonAngle = rotation * 3
      const moonDistance = radius * 1.3
      const moonX = centerX + Math.cos(moonAngle) * moonDistance
      const moonY = centerY + Math.sin(moonAngle) * moonDistance
      const moonSize = radius * 0.1

      ctx.beginPath()
      ctx.arc(moonX, moonY, moonSize, 0, Math.PI * 2)
      ctx.fillStyle = "#e2e2e2"
      ctx.fill()

      // Update rotation for animation
      rotation += rotationSpeed
      requestAnimationFrame(drawPlanet)
    }

    drawPlanet()

    return () => {
      // Cleanup
    }
  }, [])

  return (
    <div className="relative aspect-square flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-900/30 rounded-full"></div>
      <canvas ref={canvasRef} className="relative z-10 max-w-full max-h-full rounded-full" />
    </div>
  )
}
