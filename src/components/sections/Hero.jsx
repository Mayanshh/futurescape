import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroNav from '../HeroNav';
import HeroFooter from '../HeroFooter';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Nav positioning state (desktop defaults preserved)
  const [navStyle, setNavStyle] = useState({
    pos: 'fixed',
    top: '46.5%',
  });

  useGSAP(() => {
    const mm = gsap.matchMedia();

    /* ---------------- DESKTOP (UNCHANGED) ---------------- */
    mm.add('(min-width: 1024px)', () => {
      // Pin hero background
      ScrollTrigger.create({
        trigger: '.hero-sec',
        start: 'top top',
        end: () => window.innerHeight,
        pin: true,
        pinSpacing: false,
      });

      // Hero text + HeroNav handoff
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
          gsap.set('#heroText', {
            position: 'fixed',
            top: '-5.8%',
          });

          setNavStyle({
            pos: 'fixed',
            top: '46.5%',
          });
        },
      });
    });

    /* ---------------- TABLET + MOBILE ---------------- */
    mm.add('(max-width: 1023px)', () => {
      // Pin hero background (shorter pin for mobile comfort)
      ScrollTrigger.create({
        trigger: '.hero-sec',
        start: 'top top',
        end: () => window.innerHeight * 0.85,
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: '#textRevealParent',
        start: 'top top',
        onEnter: () => {
          const currentScroll = window.scrollY;

          // Hero text drops earlier and lower
          gsap.set('#heroText', {
            position: 'absolute',
            top: currentScroll + window.innerHeight * 0.05,
          });

          // HeroNav slightly lower on small screens
          setNavStyle({
            pos: 'absolute',
            top: currentScroll + window.innerHeight * 0.6 + 'px',
          });
        },
        onLeaveBack: () => {
          gsap.set('#heroText', {
            position: 'fixed',
            top: '6%',
          });

          setNavStyle({
            pos: 'fixed',
            top: '60%',
          });
        },
      });
    });

    /* ---------------- GLOBAL NAVBAR SLIDE-IN ---------------- */
    gsap.set('.nav-content', { y: '-110%', opacity: 0 });

    ScrollTrigger.create({
      trigger: '#textRevealParent',
      start: '30% top',
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

    return () => mm.revert();
  }, []);

  return (
    <div className="relative w-full">
      {/* ---------------- BACKGROUND ---------------- */}
      <div className="hero-sec relative h-screen w-full bg-[url(/images/mainBgImg.avif)] bg-center bg-no-repeat bg-cover z-10">
        <HeroFooter />
      </div>

      {/* ---------------- HERO TEXT ---------------- */}
      <h1
        id="heroText"
        className="
          fixed z-[25] left-1/2 -translate-x-1/2
          font-[600] uppercase text-white mix-blend-difference pointer-events-none
          tracking-[0.90]
          text-[18vw] sm:text-[16vw] lg:text-[16vw]
          top-[6%] lg:top-[-5.8%]
        "
      >
        FUTURESCAPE
      </h1>

      {/* ---------------- HERO NAV ---------------- */}
      <HeroNav pos={navStyle.pos} top={navStyle.top} />
    </div>
  );
};

export default Hero;
