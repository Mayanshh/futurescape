import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroNav from '../HeroNav';
import HeroFooter from '../HeroFooter';

const Hero = () => {
  const [navStyle, setNavStyle] = useState({ pos: 'fixed', top: '46.5%' });

  useGSAP(() => {
    // 1. Pin the Hero Section
    ScrollTrigger.create({
      trigger: '.hero-sec',
      start: 'top top',
      end: () => window.innerHeight,
      pin: true,
      pinSpacing: false,
    });

    // 2. Synchronized Switch for HeroText and HeroNav
    // Note: Triggers based on #textRevealParent which is in the About section
    ScrollTrigger.create({
      trigger: '#textRevealParent',
      start: 'top top',
      onEnter: () => {
        const currentScroll = window.scrollY;
        gsap.set('#heroText', {
          position: 'absolute',
          top: currentScroll + window.innerHeight * -0.058,
        });
        setNavStyle({
          pos: 'absolute',
          top: currentScroll + window.innerHeight * 0.465 + 'px',
        });
      },
      onLeaveBack: () => {
        gsap.set('#heroText', { position: 'fixed', top: '-5.8%' });
        setNavStyle({ pos: 'fixed', top: '46.5%' });
      },
    });

    // 3. Secondary Navbar Slide Logic (Global Nav)
    gsap.set('.nav-content', { y: '-100%', opacity: 0 });
    ScrollTrigger.create({
      trigger: '#textRevealParent',
      start: '50% top',
      onEnter: () => {
        gsap.to('.nav-content', {
          y: '0%',
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.05,
        });
      },
      onLeaveBack: () => {
        gsap.to('.nav-content', {
          y: '-100%',
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
        });
      },
    });
  });

  return (
    <>
      <div className="hero-sec relative h-screen w-full bg-[url(/images/mainBgImg.avif)] bg-center bg-no-repeat bg-cover z-10">
        <HeroFooter />
      </div>

      <h1
        id="heroText"
        className="fixed font-[600] z-21 top-[-5.8%] left-1/2 -translate-x-1/2 text-[16vw] tracking-[0.90] mix-blend-difference pointer-events-none text-white"
      >
        FUTURESCAPE
      </h1>

      <HeroNav pos={navStyle.pos} top={navStyle.top} />
    </>
  );
};

export default Hero;