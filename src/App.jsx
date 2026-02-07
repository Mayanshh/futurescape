import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import './index.css';

// Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import FullScreenMenu from './components/FullScreenMenu';
import TransitionPortal from './components/TransitionPortal';

// Sections
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Workflow from './components/sections/Workflow';
import Projects from './components/sections/Projects';
import Gallery from './components/sections/Gallery';
import Vision from './components/sections/Vision';
import Footer from './components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);
  const secondaryNavRef = useRef(null);
  const mainContentRef = useRef(null);

  // Loading State
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 2.6,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    // LOCK SCROLL INITIALLY
    lenis.stop();

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // HANDLE WINDOW LOAD
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        lenis.start(); // Unlock scroll

        // Reveal the main content
        gsap.to(mainContentRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }, 2500); // 2.5s minimum load time
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="w-full bg-black text-white">
      <Preloader isLoading={isLoading} />

      <div ref={mainContentRef} className="opacity-0">
        <Hero />
        <About />
        <Workflow />
        <FullScreenMenu />
        <Projects />
        <Gallery />
        <Vision />
        <Footer />
        <Navbar ref={secondaryNavRef} />
        <TransitionPortal lenis={lenisRef.current} />
      </div>
    </div>
  );
};

export default App;