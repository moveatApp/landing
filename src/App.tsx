import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Global scroll snap for smooth experience
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative">
      {/* Global ambient background blobs — sections float over these */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] -left-40 w-[600px] h-[600px] bg-brand-orange/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-[60%] -right-40 w-[700px] h-[700px] bg-brand-green/[0.04] rounded-full blur-3xl" />
        <div className="absolute top-[80%] left-1/3 w-[500px] h-[500px] bg-brand-orange/[0.03] rounded-full blur-3xl" />
      </div>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <HowItWorks />
      <Benefits />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
