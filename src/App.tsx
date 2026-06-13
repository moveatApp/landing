import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Problem from "./components/Problem"
import Solution from "./components/Solution"
import HowItWorks from "./components/HowItWorks"
import Benefits from "./components/Benefits"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import FloatingOrbs from "./components/FloatingOrbs"

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
   const mainRef = useRef<HTMLDivElement>(null)

   useGSAP(
      () => {
         // Global scroll snap for smooth experience
         ScrollTrigger.defaults({
            toggleActions: "play none none reverse",
         })
      },
      { scope: mainRef },
   )

   return (
      <div ref={mainRef} className="relative">
          {/* Global ambient floating orbs */}
          <FloatingOrbs />
         <Navbar />
         <Hero />
         <Problem />
         <Solution />
         <HowItWorks />
         <Benefits />
         <CTA />
         <Footer />
      </div>
   )
}

export default App
