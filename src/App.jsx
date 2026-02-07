import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Global Styles
import './index.css';

// Global Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import TransitionPortal from './components/TransitionPortal';

// Pages
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import ArtistsPage from './pages/ArtistsPage';
import ArtistProfile from './pages/ArtistProfile';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollToTop Component
 * Ensures the scroll position resets to 0 whenever the route changes.
 */
const ScrollToTop = ({ lenis }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
};

const AppContent = () => {
  const lenisRef = useRef(null);
  const mainContentRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // 1. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease
      smoothWheel: true,
      wheelMultiplier: 1.5,
    });
    
    lenisRef.current = lenis;

    // 2. Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 3. Initial Preloader Sequence
    // This only runs ONCE when the user first lands on the site
    const handleInitialLoad = () => {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        
        // Fade in the main content after preloader finishes
        gsap.to(mainContentRef.current, {
          opacity: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          onComplete: () => {
             // Refresh triggers once content is visible
             ScrollTrigger.refresh();
          }
        });
      }, 2500); // Matches your preloader duration

      return () => clearTimeout(timer);
    };

    handleInitialLoad();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-white text-black min-h-screen">
      {/* PRELOADER 
        Only visible when isInitialLoad is true. 
        Native browser refreshes (like using <a> tags) will reset this state.
      */}
      <Preloader isLoading={isInitialLoad} />

      <div 
        ref={mainContentRef} 
        className={`relative transition-opacity duration-700 ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`}
      >
        {/* TRANSITION OVERLAY 
            Handles the 'blackout' animation during route changes. 
        */}
        <TransitionPortal lenis={lenisRef.current} />
        
        {/* SHARED UI */}
        <Navbar />
        
        {/* SCROLL MANAGER */}
        <ScrollToTop lenis={lenisRef.current} />

        {/* PAGE ROUTES */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;