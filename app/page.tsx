"use client"
import Link from "next/link"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillBadge from "@/components/skill-badge"
import Planet from "@/components/planet"
import StarTrail from "@/components/star-trail"
import MobileMenu from "@/components/mobile-menu"
import RotatingText from "@/components/rotating-text"
import Image from "next/image"
import { useEffect, useState } from "react"

const navLinks = [
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "CONTACT" },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      const offsets = navLinks.map(link => {
        const el = document.getElementById(link.id)
        if (!el) return { id: link.id, top: Infinity }
        const rect = el.getBoundingClientRect()
        return { id: link.id, top: Math.abs(rect.top) }
      })
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b))
      setActiveSection(closest.id)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <StarTrail />

      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/30">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="text-xl font-bold tracking-wider">
            <span className="text-purple-400">COSMIC</span>DEV
          </Link>
          <nav className="hidden space-x-6 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm hover:text-purple-400 transition-colors ${activeSection === link.id ? "text-purple-400 font-bold" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="block">Exploring The Universe Of</span>
            <RotatingText />
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300">
            Full-stack developer crafting stellar digital experiences that are out of this world
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <a href="#projects">
                View Projects <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20">
              <a href="#contact">
                Contact Me
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center pt-1">
              <div className="w-1 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
            <span className="text-purple-400">About</span> Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="relative order-2 md:order-1">
              <Planet />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500 rounded-full blur-3xl opacity-30"></div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Cosmic Explorer</h3>
              <p className="text-gray-300 mb-6">
                I'm a passionate full-stack developer with a love for creating immersive digital experiences. With over
                5 years of experience navigating the vast universe of web development, I specialize in building
                responsive, accessible, and performant applications.
              </p>
              <p className="text-gray-300 mb-6">
                When I'm not coding, you can find me stargazing, exploring new technologies, or contributing to
                open-source projects that push the boundaries of what's possible on the web.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
            <span className="text-purple-400">My</span> Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <ProjectCard
              title="Nebula Dashboard"
              description="A real-time analytics dashboard with cosmic-themed data visualizations"
              image="/images/space.jpg"
              tags={["React", "D3.js", "Firebase"]}
            />
            <ProjectCard
              title="Orbital CMS"
              description="A content management system that revolves around your needs"
              image="/images/space.jpg"
              tags={["Next.js", "GraphQL", "Tailwind"]}
            />
            <ProjectCard
              title="Stellar E-commerce"
              description="An out-of-this-world shopping experience with seamless checkout"
              image="/images/space.jpg"
              tags={["Vue", "Node.js", "Stripe"]}
            />
          </div>
          <div className="mt-10 sm:mt-12 text-center">
            <Button className="bg-purple-600 hover:bg-purple-700">
              View All Projects <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-16 sm:py-20 px-4 bg-gradient-to-b from-transparent to-purple-900/20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
            <span className="text-purple-400">Technical</span> Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <SkillBadge name="JavaScript" icon="⚡" />
            <SkillBadge name="React" icon="⚛️" />
            <SkillBadge name="Next.js" icon="▲" />
            <SkillBadge name="Node.js" icon="🟢" />
            <SkillBadge name="TypeScript" icon="📘" />
            <SkillBadge name="Tailwind CSS" icon="🌊" />
            <SkillBadge name="GraphQL" icon="◼️" />
            <SkillBadge name="MongoDB" icon="🍃" />
            <SkillBadge name="PostgreSQL" icon="🐘" />
            <SkillBadge name="Docker" icon="🐳" />
            <SkillBadge name="AWS" icon="☁️" />
            <SkillBadge name="Git" icon="🔄" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">
            <span className="text-purple-400">Contact</span> Me
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-purple-500/20 text-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25"></div>
                <div className="relative bg-black/60 backdrop-blur-sm px-6 sm:px-8 py-8 sm:py-10 rounded-lg border border-purple-500/30">
                  <Mail className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-lg sm:text-xl font-medium mb-4">Get In Touch</h3>
                  <p className="text-gray-300 mb-6">
                    Have a project in mind or want to discuss opportunities? Feel free to reach out!
                  </p>
                  <a
                    href="mailto:your.email@example.com"
                    className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                  >
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    your.email@example.com
                  </a>
                  <p className="mt-6 text-sm text-gray-400">I'll respond to your message as soon as possible!</p>
                </div>
              </div>

              <div className="flex justify-center space-x-6">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                  <Linkedin className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 px-4 border-t border-white/10 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold tracking-wider">
                <span className="text-purple-400">COSMIC</span>DEV
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} CosmicDev. All rights reserved. Crafted with ❤️ in the cosmos.
          </div>
        </div>
      </footer>
    </div>
  )
}
