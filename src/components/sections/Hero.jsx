import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import HeroNav from '../HeroNav';
import HeroFooter from '../HeroFooter';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Initialize state—will be corrected by matchMedia immediately on mount
  const [navStyle, setNavStyle] = useState({ pos: 'fixed', top: '46.5%' });

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)"
    }, (context) => {
      let { isDesktop } = context.conditions;

      // Configuration for responsive positions
      const navTopFixed = isDesktop ? '46.5%' : '120px';
      const textTopFixed = isDesktop ? '-5.8%' : '0%';
      
      // Multipliers/offsets for absolute positioning calculation
      const navOffset = isDesktop ? (window.innerHeight * 0.465) : 120;
      const textOffset = isDesktop ? (window.innerHeight * -0.058) : 0;

      // Set initial position based on current breakpoint
      setNavStyle({ pos: 'fixed', top: navTopFixed });
      gsap.set('#heroText', { position: 'fixed', top: textTopFixed });

      // 1. Pin the Hero Section
      ScrollTrigger.create({
        trigger: '.hero-sec',
        start: 'top top',
        end: () => window.innerHeight,
        pin: true,
        pinSpacing: false,
      });

      // 2. Synchronized Switch for HeroText and HeroNav
      ScrollTrigger.create({
        trigger: '#textRevealParent',
        start: 'top top',
        onEnter: () => {
          const currentScroll = window.scrollY;
          
          // Switch Text to Absolute
          gsap.set('#heroText', {
            position: 'absolute',
            top: currentScroll + textOffset,
          });

          // Switch Nav to Absolute
          setNavStyle({
            pos: 'absolute',
            top: currentScroll + navOffset + 'px',
          });
        },
        onLeaveBack: () => {
          // Reset Text to Fixed
          gsap.set('#heroText', { 
            position: 'fixed', 
            top: textTopFixed 
          });
          // Reset Nav to Fixed
          setNavStyle({ 
            pos: 'fixed', 
            top: navTopFixed 
          });
        },
      });

      // 3. Secondary Navbar (Global Nav) Reveal
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

    return () => mm.revert();
  }, []);

  return (
    <>
      <div className="hero-sec relative !h-screen w-full bg-[url(/images/mainBgImg.avif)] bg-center bg-no-repeat bg-cover z-10">
        <HeroFooter />
      </div>

      <h1
        id="heroText"
        className="fixed font-[600] !w-[100vw] lg:w-auto top-[0%] z-21 lg:top-[-5.8%] lg:left-1/2 lg:-translate-x-1/2 text-[16.5vw] lg:text-[16.35vw] tracking-[0.90] mix-blend-difference pointer-events-none text-white text-center"
      >
        FUTURESCAPE
      </h1>

      {/* Passing the dynamic style from state */}
      <HeroNav pos={navStyle.pos} top={navStyle.top} />
    </>
  );
};

export default Hero;