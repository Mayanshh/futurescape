import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroNav from '../HeroNav';
import HeroFooter from '../HeroFooter';

const Hero = () => {
  // We use state to toggle between Fixed (middle of screen) and Absolute (stuck to the section)
  const [navStyle, setNavStyle] = useState({ pos: 'fixed', top: '46.5%' });

  useGSAP(() => {
    // 1. PIN THE HERO BACKGROUND
    ScrollTrigger.create({
      trigger: '.hero-sec',
      start: 'top top',
      end: () => window.innerHeight,
      pin: true,
      pinSpacing: false,
    });

    // 2. HERO TEXT & HERONAV HANDOFF LOGIC
    // When the next section (#textRevealParent) hits the top, 
    // we "drop" the fixed elements so they scroll away naturally.
    ScrollTrigger.create({
      trigger: '#textRevealParent',
      start: 'top top',
      onEnter: () => {
        const currentScroll = window.scrollY;
        
        // Pin Hero Text to its current visual position but in absolute terms
        gsap.set('#heroText', {
          position: 'absolute',
          top: currentScroll + (window.innerHeight * -0.058), 
        });

        // Pin Hero Nav to its current visual position
        setNavStyle({
          pos: 'absolute',
          top: currentScroll + (window.innerHeight * 0.465) + 'px',
        });
      },
      onLeaveBack: () => {
        // Return them to fixed positions when scrolling back up
        gsap.set('#heroText', { 
          position: 'fixed', 
          top: '-5.8%' 
        });
        setNavStyle({ 
          pos: 'fixed', 
          top: '46.5%' 
        });
      },
    });

    // 3. GLOBAL NAVBAR SLIDE-IN (The Shared App Navbar)
    // We target '.nav-content' which lives in your shared Navbar.jsx
    gsap.set('.nav-content', { y: '-110%', opacity: 0 });

    ScrollTrigger.create({
      trigger: '#textRevealParent',
      start: '30% top', // Starts showing the global nav slightly after scroll
      onEnter: () => {
        gsap.to('.nav-content', {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'expo.out',
        });
      },
      onLeaveBack: () => {
        gsap.to('.nav-content', {
          y: '-110%',
          opacity: 0,
          duration: 0.6,
          ease: 'expo.in',
        });
      },
    });
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="relative w-full">
      {/* BACKGROUND LAYER */}
      <div className="hero-sec relative h-screen w-full bg-[url(/images/mainBgImg.avif)] bg-center bg-no-repeat bg-cover z-10">
        <HeroFooter />
      </div>

      {/* BIG CENTER TEXT */}
      <h1
        id="heroText"
        className="fixed font-[600] z-[25] top-[-5.8%] left-1/2 -translate-x-1/2 text-[16vw] tracking-[0.90] mix-blend-difference pointer-events-none text-white uppercase"
      >
        FUTURESCAPE
      </h1>

      {/* THE CENTER NAV (Switches to absolute on scroll) */}
      <HeroNav pos={navStyle.pos} top={navStyle.top} />
    </div>
  );
};

export default Hero;