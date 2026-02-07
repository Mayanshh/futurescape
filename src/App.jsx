import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import './index.css';

// Global Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import TransitionPortal from './components/TransitionPortal';

// Pages
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage'; // The page we discussed earlier

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);
  const mainContentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 2.6,
    });
    lenisRef.current = lenis;
    lenis.stop(); // Lock scroll for preloader

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        lenis.start();
        gsap.to(mainContentRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
        });
      }, 2500);
    };

    if (document.readyState === 'complete') handleLoad();
    else window.addEventListener('load', handleLoad);

    return () => {
      lenis.destroy();
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <Router>
      <div className="w-full bg-black text-white">
        <Preloader isLoading={isLoading} />

        <div ref={mainContentRef} className="opacity-0">
          {/* Shared UI elements across pages */}
          <Navbar />
          <TransitionPortal lenis={lenisRef.current} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;