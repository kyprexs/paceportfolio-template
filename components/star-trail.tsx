"use client"

import { useEffect, useState, useRef } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  color: string
}

export default function StarTrail() {
  const [stars, setStars] = useState<Star[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const nextIdRef = useRef(0)
  const frameRef = useRef<number>()
  const lastStarTimeRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      // Add new star when mouse moves
      const now = Date.now()
      if (now - lastStarTimeRef.current > 50) {
        // Only add star every 50ms to control density
        const newStar: Star = {
          id: nextIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1, // Random size between 1-4px
          opacity: 0.7,
          color: getRandomStarColor(),
        }

        setStars((prevStars) => [...prevStars, newStar])
        lastStarTimeRef.current = now
      }
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Animation loop to fade out stars
    const animateStars = () => {
      setStars(
        (prevStars) =>
          prevStars
            .map((star) => ({
              ...star,
              opacity: star.opacity - 0.02, // Gradually fade out
            }))
            .filter((star) => star.opacity > 0), // Remove completely faded stars
      )

      frameRef.current = requestAnimationFrame(animateStars)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    frameRef.current = requestAnimationFrame(animateStars)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isVisible])

  // Generate random star colors in purple/blue hues
  const getRandomStarColor = () => {
    const colors = [
      "#9d4edd", // Purple
      "#c77dff", // Light purple
      "#e0aaff", // Very light purple
      "#7b2cbf", // Deep purple
      "#5a189a", // Dark purple
      "#3c096c", // Very dark purple
      "#a2d2ff", // Light blue
      "#bde0fe", // Very light blue
      "#ffffff", // White
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            opacity: star.opacity,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
