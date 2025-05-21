"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-black/90 border-l border-purple-500/20 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-6 space-y-6">
            <Link
              href="#about"
              className="text-lg hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="#projects"
              className="text-lg hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              PROJECTS
            </Link>
            <Link
              href="#skills"
              className="text-lg hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              SKILLS
            </Link>
            <Link
              href="#contact"
              className="text-lg hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              CONTACT
            </Link>
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
              Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 