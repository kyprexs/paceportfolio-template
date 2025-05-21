"use client"

import { useEffect, useState } from 'react'

const phrases = [
  "Web Development",
  "Full Stack Development",
  "Cloud Architecture",
  "API Design",
  "Database Engineering",
  "DevOps Automation",
  "System Architecture",
  "UI/UX Design"
]

export default function RotatingText() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        setIsVisible(true)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`block mt-2 text-purple-400 glow-text transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {phrases[currentPhraseIndex]}
    </span>
  )
} 