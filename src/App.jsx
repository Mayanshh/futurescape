import React, { useRef, useEffect, useState } from 'react'
import { ChevronRight, ArrowDownRight } from 'lucide-react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

import './index.css'

import HeroNav from './components/HeroNav'
import HeroFooter from './components/HeroFooter'
import SmoothReveal from './components/effects/SmoothReveal'
import Navbar from './components/Navbar' 
import FullScreenMenu from './components/FullScreenMenu';
import CutoutParallax from './components/effects/CutOutParallax';
import TextScroll from './components/effects/TextScroll';
import MarqueeSection from './components/MarqueeSection';
import LocationMarquee from './components/LocationMarquee';
import TransitionPortal from './components/TransitionPortal';

import Preloader from './components/Preloader'; 

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const images = [
    './images/img1.avif',
    './images/img2.avif',
    './images/img3.avif',
    './images/img4.avif',
    './images/img5.avif',
    './images/img6.avif',
    './images/img7.avif'
  ];

  const container = useRef(null)
  const secondaryNavRef = useRef(null) 
  const lineRef = useRef(null)
  const chevronRef = useRef(null)
  const imageDivRef = useRef(null)
  const imgTagRef = useRef(null)
  const lenisRef = useRef(null); 
  const [lenisReady, setLenisReady] = useState(false);
  const mainContentRef = useRef(null);
  
  // 1.Reveal Effect Refs
  const revealContainer = useRef(null)
  const section8Ref = useRef(null)

  const [navStyle, setNavStyle] = useState({ pos: 'fixed', top: '46.5%' });

  // 2. ADD LOADING STATE
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 2.6, 
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis;
    setLenisReady(true);

    // 3. LOCK SCROLL INITIALLY
    lenis.stop(); 

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value, { immediate: true })
          : lenis.scroll
      },
      getBoundingClientRect() {
        return {
          top: 0, left: 0, width: window.innerWidth, height: window.innerHeight,
        }
      },
    })

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf)
    
    // 4. HANDLE WINDOW LOAD
    const handleLoad = () => {
        // Added a small delay 
        setTimeout(() => {
            setIsLoading(false);
            lenis.start(); // Unlock scroll when loading is done
            
            // Reveal the main content once loading is triggered to close
            gsap.to(mainContentRef.current, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.inOut"
            });
        }, 2500); // 2.5s minimum load time
    };

    if (document.readyState === 'complete') {
        handleLoad();
    } else {
        window.addEventListener('load', handleLoad);
    }

    ScrollTrigger.refresh()
    
    return () => {
        lenis.destroy();
        window.removeEventListener('load', handleLoad);
    }
  }, [])

  useGSAP(() => {
    // INSTANT PIN LOGIC: Pins as soon as the bottom of Section 8 is visible
    ScrollTrigger.create({
      trigger: revealContainer.current,
      start: "bottom bottom", 
      end: "+=100%", 
      pin: true,
      scrub: true,
      pinSpacing: true,
    });

    gsap.to(section8Ref.current, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: revealContainer.current,
        start: "bottom bottom",
        end: "+=100%",
        scrub: true,
      }
    });

    // 1. Pin the Hero Section
    ScrollTrigger.create({
      trigger: '.hero-sec',
      start: 'top top',
      end: () => window.innerHeight,
      pin: true,
      pinSpacing: false,
    })

    // 2. Synchronized Switch for HeroText and HeroNav
    ScrollTrigger.create({
      trigger: '#textRevealParent',
      start: 'top top',
      onEnter: () => {
        const currentScroll = window.scrollY;
        gsap.set('#heroText', { 
          position: 'absolute', 
          top: currentScroll + (window.innerHeight * -0.058) 
        });
        setNavStyle({
          pos: 'absolute',
          top: (currentScroll + (window.innerHeight * 0.465)) + 'px'
        });
      },
      onLeaveBack: () => {
        gsap.set('#heroText', { position: 'fixed', top: '-5.8%' });
        setNavStyle({ pos: 'fixed', top: '46.5%' });
      }
    })

    // 3. SECONDARY NAVBAR SLIDE LOGIC
    gsap.set(".nav-content", { y: "-100%", opacity: 0 });
    ScrollTrigger.create({
      trigger: '#textRevealParent',
      start: '50% top', 
      onEnter: () => {
        gsap.to(".nav-content", { y: "0%", opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.05 });
      },
      onLeaveBack: () => {
        gsap.to(".nav-content", { y: "-100%", opacity: 0, duration: 0.5, ease: "power3.in" });
      }
    })

    // 4. ARROW + IMAGE SYNC TIMELINE
    const arrowTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#textRevealParent',
        start: '50% top', 
        end: '+=100%', 
        scrub: 1.5,
      }
    });

    arrowTl.to(lineRef.current, { width: "300px", ease: "none" }, 0);
    arrowTl.to(imageDivRef.current, { x: "143.5%", ease: "none" }, 0);

    const obj = { prop: 0 };
    arrowTl.to(obj, {
      prop: images.length - 1,
      ease: `steps(${images.length - 1})`,
      onUpdate: () => {
        const index = Math.round(obj.prop);
        if (imgTagRef.current) {
          imgTagRef.current.src = images[index];
        }
      }
    }, 0);

  }, { scope: container })

  return (
    <div ref={container} className="w-full bg-black text-white">
      
      {/* 5. PRELOADER ON TOP */}
      <Preloader isLoading={isLoading} />

      {/* 6. WRAPED CONTENT IN REF AND OPACITY STARTS AT 0 */}
      <div ref={mainContentRef} className="opacity-0">

        {/* {SECTION 1} */}
        <div className="hero-sec relative h-screen w-full bg-[url(/images/mainBgImg.avif)] bg-center bg-no-repeat bg-cover z-10">
          <HeroFooter />
        </div>

        <h1 id="heroText" className="fixed font-[600] z-21 top-[-5.8%] left-1/2 -translate-x-1/2 text-[16vw] tracking-[0.90] mix-blend-difference pointer-events-none text-white">
          FUTURESCAPE
        </h1>
        
        <HeroNav pos={navStyle.pos} top={navStyle.top} />


        {/* SECTION 2 */}
        <div  id='about-section'>
        <div  id='textRevealParent' className="relative z-20 w-full min-h-screen bg-white">
            <div className='w-[83%] h-fit absolute bottom-[2.25%] transform -translate-y-1/2 left-0 px-8'>
              <SmoothReveal 
                text=" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Driven by algorithmic innovation, we empower creators, technologists, visionaries, and global brands in the ideation, generation, and physical materialization of AI-driven media, cinematic environments, digital artifacts, and future-ready prototypes."
                className="text-[2.1em] leading-[0.92] text-black w-full tracking-tight uppercase align-left"
              />
            </div>
            <h3 id='infoText' className="text-[0.99em] leading-[1.45] text-black w-full tracking-tight align-left max-w-[34%] h-fit absolute bottom-[-2.25%] left-0 px-8">
              Built on a foundation of digital innovation (2020–2026), we bridge algorithmic precision and human emotion for global visionaries. Specializing in AI film, concept art, luxury branding, and immersive media, we provide a curated methodology that links prompt engineering, technical workflows
            </h3>
        </div> 
        </ div>

        {/* SECTION 3 */}
        <div className="relative z-20 w-full min-h-screen bg-white flex flex-col items-start justify-start px-8">
          <h3 id='infoText2' className="text-[0.99em] leading-[1.45] text-black w-full tracking-tight align-left max-w-[34%] h-fit mt-[3.5%]">
            Our hybrid curation strategy allows us to guide the implementation of machine intelligence in a vast spectrum of projects—exhibitions, brand campaigns, physical spaces, and architectural concepts—balancing artistic soul, material feasibility, and project constraints.         
          </h3>

          <div className='w-full h-[4em] text-black text-[4.4em] -mt-[0.7em] font-[500] tracking-tight whitespace-nowrap flex items-center overflow-visible'>
            <span className='mr-6 uppercase'>From Prompts </span> 
            <div className="flex items-center relative h-full">
               <hr ref={lineRef} className="border-none bg-black h-[2.5px] shrink-0" style={{ width: '1em', marginRight: '-2px' }}/>
               <div ref={chevronRef} className="flex items-center">
                 <ChevronRight style={{ width: '0.6em', height: '0.6em', marginLeft: '-0.37em' }} strokeWidth={2.8} /> 
               </div>
            </div>
            <span className="ml-6 uppercase">To Presence</span>
          </div>

          <div ref={imageDivRef} className='h-[24em] w-[37.5em] rounded-lg bg-red-200 relative bottom-[6.5em] overflow-hidden'>
            <img ref={imgTagRef} loading="eager" fetchpriority="high" src={images[0]} alt="scrolling selection" className='min-w-full min-h-full object-cover'/>
          </div>

          <div className='h-fit w-[16%] absolute bottom-[1.8em] right-[1.8em] text-black'>
              <a href="#" className='text-[1.2em] uppercase relative bottom-0 right-0 transform -translate-y-1/2'>MORE ON FUTURESCAPE <ArrowDownRight className="w-[0.68em] absolute -bottom-[0.3em] -right-4 " /></a> 
          </div>
        </div>

        <FullScreenMenu />

        {/* SECTION 5 */}
        <div id="projects-section" className="relative z-20 w-full h-[320vh] bg-white px-8 pt-[10vh]">
          <div className="flex flex-col items-center justify-start">
            <div className="flex justify-between items-start w-full h-[100vh] pt-[10vh]">
              <CutoutParallax inset='0' src="/images/parallaxImages/img1.avif" title=" Katharina Grosse, Splinter, 2022 Paris " width="48vw" height="80vh" speed={15}/>
              <CutoutParallax inset='0' src="/images/parallaxImages/img2.avif" title=" Rick Owens, Sleeping Pod, Art of Genius, Moncler, 2023 London" width="48%" height="40vh" speed={15}/>
            </div>
            <div className="flex justify-between items-start w-full h-[100vh] pt-[10vh] pl-[7.5em] pr-[3.5em]">
              <CutoutParallax inset='0' src="/images/parallaxImages/img3.avif" title=" Rick Owens, Ski Hut, City of Genius, Moncler x Shanghaï, 2024 Shanghai " width="45vw" height="52vh" speed={15}/>
              <CutoutParallax inset='0' src="/images/parallaxImages/img4.avif" title=" Paris 2024, Olympic and Paralympic Truce Mural, 2024 Paris " width="36.5vw" height="66vh" speed={15}/>
            </div>
            <div className="flex justify-between items-start w-full h-[100vh] pt-[10vh]">
              <CutoutParallax inset='0' src="/images/parallaxImages/img5.avif" title=" Subodh Gupta, Very Hungry God, 2006 Paris " width="45vw" height="50vh" speed={15}/>
              <CutoutParallax inset='0' src="/images/parallaxImages/img6.avif" title=" Agence R&Sie(n), Snake, 2002 Paris " width="48vw" height="80vh" speed={15}/>
            </div>
          </div>
        </div>

        {/* {SECTION 6} */}
        <div className='relative z-20 w-full min-h-screen bg-white flex flex-col items-start justify-between'>
          <div className='w-full mt-[1.5em] inline-flex items-center justify-end h-[3.5em] tracking-tighter text-right pr-[1.8em] text-black'>
            <a href="#" className="inline-flex items-center gap-1 text-[1.25em] uppercase">
              <span>Explore Full Gallery</span>
              <ArrowDownRight className="w-[0.65em] h-[0.65em]" />
            </a>
          </div>
           <TextScroll speed={1.35} />
           <div className='h-[3em] w-full  flex items-center justify-between px-[1.8em] text-black'>
              <h4 className='uppercase tracking-tight'>Vision</h4>
              <div className="flex items-center w-full pl-3 relative h-full">
               <hr className="border-none bg-black h-[0.8px] shrink-0" style={{ width: '98.5%', marginRight: '-2px' }}/>
               <div className="flex items-center">
                 <ChevronRight style={{ width: '1.8em', height: '1.8em', marginLeft: '-0.9em' }} strokeWidth={0.8} /> 
               </div>
            </div>
              <h4 className='uppercase tracking-tight'>Fabrication</h4>
           </div>
        </div>

        {/* {SECTION 7} */}
        <div className='relative z-20 w-full h-[80vh] bg-white flex flex-col items-start justify-start'>
            <h1 className='text-black px-8 text-[1.65em] indent-25 uppercase tracking-tight leading-[1.1] mt-[8vh] mb-[5vh]'>
              A new era of innovation <br /> collaboration and vision.
            </h1>
            <MarqueeSection />
        </div>

        {/* REVEAL CONTAINER FOR SECTION 8 & 9 */}
        <div ref={revealContainer} className="relative w-full h-screen overflow-hidden">
          
          {/* {SECTION 9} - Bottom Layer */}
          <div id="contact-section" className='absolute inset-0 bg-black flex flex-col items-start justify-start h-screen w-full bg-[url(https://www.chdartmaker.com/media/site/9f9f39e7ec-1756982584/rick-owens-moncler-1440x-q90.webp)] bg-center bg-no-repeat bg-cover z-0'>
            <LocationMarquee speed={1.5} />
            <div className='w-full max-w-full h-[80px] flex items-center justify-between leading-[1.15] pt-[2.2em] px-8'>
              <div className='w-[30vw] h-full uppercase text-[1.67em] tracking-tighter'> 500 Rue Raymond Recouly <br /> 34070 Montpellier <br /> India</div> 
              <div className='w-[30vw] h-full flex items-start justify-start uppercase text-[1.67em] tracking-tighter'>
               <a href="tel:+91(0)9 67 39 88 35">Tel +91(0)9 67 39 88 35</a>
            </div>
        <div className='w-[30vw] h-full  uppercase text-[1.67em] tracking-tighter text-right'> <a href="mailto:contact@chdartmaker.com"> contact@futurescapestudios.com</a> </div> 
            </div>

            <div className='w-full h-[14vh] mt-20 px-8 flex flex-col items-start justify-between'>
                <div className='h-[47px] w-[47px] bg-none rounded-full'>
                  <img 
                 src="/images/epv-logo.svg" 
                 alt="EPV Logo" 
                 loading="eager" fetchpriority="high"
                 className='object-contain' 
               />    
                </div>
                <div className='w-full pl-3 h-[30%] flex flex-row justify-between items-start text-white'>
                    <div className='w-[calc(30vw*0.6)] flex flex-row justify-between items-start'>
                      <a href="https://www.instagram.com/CHDARTMAKER/" className=' tracking-tighter text-[0.9em] uppercase relative top-2 transform -translate-y-1/2'>INSTAGRAM <ArrowDownRight className="w-[0.8em] absolute top-1/2 -translate-y-1/2 -left-3.5" /></a>
                      <a href="https://www.linkedin.com/company/chd-art-maker/" className=' tracking-tighter text-[0.9em] uppercase relative top-2 transform -translate-y-1/2'>LINKEDIN <ArrowDownRight className="w-[0.8em] absolute top-1/2 -translate-y-1/2 -left-3.5" /></a> 
                      <a href="https://www.facebook.com/people/CHD-ART-MAKER/100068019819843/" className=' tracking-tighter text-[0.9em] uppercase relative top-2 transform -translate-y-1/2'>FACEBOOK <ArrowDownRight className="w-[0.8em] absolute top-1/2 -translate-y-1/2 -left-3.5" /></a>  
                    </div>
                    <p className='text-[0.9em] tracking-tighter uppercase relative top-2 transform -translate-y-1/2'>
                      &copy; 2026, FUTURE-SCAPE STUDIOS,all rights reserved.Legal Notices Credits
                    </p>
                </div>
                <h1 id='footerHeroText' className="absolute bottom-[-18%] left-1/2 -translate-x-1/2 text-[15vw] tracking-[15px] pointer-events-none text-white">
                  FUTURESCAPE
                </h1>  
            </div>
          </div>

          {/* {SECTION 8} - Top Sliding Layer */}
          <div ref={section8Ref} className='absolute inset-0 w-full h-full bg-black flex flex-col items-start justify-between z-10'>
              <h1 className='text-white px-7 text-[1.05em] font-[500] uppercase tracking-tighter leading-[1.1] mt-[4vh]'>
                LATEST NEWS
              </h1>
              <div className='!h-[88%] w-full'>
                <div className="flex flex-row justify-between items-start w-full h-full py-[5vh] px-7">
                  <CutoutParallax
                    inset='0'
                    src="/images/projectImages/img1.avif"
                    title={`EPV Award Renewed — Excellence in French Craftsmanship - 2025`}
                    width="31.2vw"
                    height="55vh"
                    speed={18}
                    className="!text-[1.1rem] !text-white !indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter"
                    linkStyles='!tracking-tighter !text-white'
                    linkText='Read More'
                  />
                  <CutoutParallax
                    inset='0'
                    src="/images/projectImages/img2.avif"
                    title={`Paris 2024 — Olympic & Paralympic Truce Mural - Paris 2024`}
                    width="31.2vw"
                    height="38vh"
                    speed={16}
                    className="!text-[1.1rem] !text-white !indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter"
                    linkStyles='!tracking-tighter !text-white'
                    linkText='Read More'
                  />
                  <CutoutParallax
                    inset='0'
                    src="/images/projectImages/img3.avif"
                    title={`City of Genius, \n Rick OWENS x MONCLER - Shanghai 2024`}
                    width="31.2vw"
                    height="45vh"
                    speed={16}
                    className="!text-[1.1rem] !text-white !indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter"
                    linkStyles='!tracking-tighter !text-white'
                    linkText='Read More'
                  />
                </div>
              </div>
          </div>
        </div>

        <Navbar ref={secondaryNavRef} />
        <TransitionPortal lenis={lenisRef.current} />
      </div>
    </div>
  )
}

export default App;