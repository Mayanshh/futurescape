import { useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LocationMarquee from '../LocationMarquee';
import CutoutParallax from '../effects/CutOutParallax';

const Footer = () => {
  const revealContainer = useRef(null);
  const section8Ref = useRef(null);

  useGSAP(
    () => {
      // INSTANT PIN LOGIC: Pins as soon as the bottom of Section 8 is visible
      ScrollTrigger.create({
        trigger: revealContainer.current,
        start: 'bottom bottom',
        end: '+=100%',
        pin: true,
        scrub: true,
        pinSpacing: true,
      });

      gsap.to(section8Ref.current, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: revealContainer.current,
          start: 'bottom bottom',
          end: '+=100%',
          scrub: true,
        },
      });
    },
    { scope: revealContainer }
  );

  return (
    <div ref={revealContainer} className="relative w-full h-screen overflow-hidden text-white font-sans">
      
      {/* {SECTION 9} - Bottom Layer (Contact) */}
      <div
        id="contact-section"
        className="absolute inset-0 bg-black flex flex-col items-start justify-start h-screen w-full bg-[url(https://www.chdartmaker.com/media/site/9f9f39e7ec-1756982584/rick-owens-moncler-1440x-q90.webp)] bg-center bg-no-repeat bg-cover z-0"
      >
        {/* Marquee stays as is, usually self-responsive */}
        <LocationMarquee speed={1.5} />

        {/* Contact Info Row */}
        <div className="w-full h-auto md:h-[80px] flex flex-col md:flex-row items-start md:items-center justify-between leading-[1.2] md:leading-[1.15] pt-12 md:pt-[2.2em] px-4 md:px-8 gap-6 md:gap-0">
          
          {/* Address */}
          <div className="w-full md:w-[30vw] uppercase text-lg md:text-[1.67em] tracking-tighter">
            500 Rue Raymond Recouly <br /> 34070 Montpellier <br /> India
          </div>

          {/* Phone */}
          <div className="w-full md:w-[30vw] flex items-start justify-start uppercase text-lg md:text-[1.67em] tracking-tighter">
            <a href="tel:+91(0)967398835" className="hover:opacity-70 transition-opacity">
              Tel +91(0)9 67 39 88 35
            </a>
          </div>

          {/* Email */}
          <div className="w-full md:w-[30vw] uppercase text-lg md:text-[1.67em] tracking-tighter text-left md:text-right">
            <a href="mailto:contact@futurescapestudios.com" className="hover:opacity-70 transition-opacity">
              contact@futurescapestudios.com
            </a>
          </div>
        </div>

        {/* Bottom Area: Socials & Logo */}
        <div className="w-full h-auto top-[5%] lg:top-[-25%] flex-grow flex flex-col justify-end pb-8 md:pb-0 px-4 md:px-8 mt-4 md:mt-20 relative">
          
          {/* Logo Badge */}
          <div className="h-[40px] w-[40px] md:h-[47px] md:w-[47px] bg-none rounded-full mb-6 md:mb-12">
            <img
              src="/images/epv-logo.svg"
              alt="EPV Logo"
              loading="eager"
              fetchPriority="high"
              className="object-contain w-full h-full"
            />
          </div>

          {/* Social Links Container */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-[14vh] md:mb-12 z-10">
            <div className="w-full md:w-[calc(30vw*0.6)] flex flex-col md:flex-row gap-4 md:gap-4 md:justify-between items-start mb-6 md:mb-0">
              <a
                href="https://www.instagram.com/CHDARTMAKER/"
                className="tracking-tighter text-sm md:text-[0.9em] uppercase flex items-center group"
              >
                INSTAGRAM
                <ArrowDownRight className="w-4 h-4 ml-1 md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-4 md:ml-0 group-hover:-rotate-90 transition-transform duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/company/chd-art-maker/"
                className="tracking-tighter text-sm md:text-[0.9em] uppercase flex items-center group"
              >
                LINKEDIN
                <ArrowDownRight className="w-4 h-4 ml-1 md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-4 md:ml-0 group-hover:-rotate-90 transition-transform duration-300" />
              </a>
              <a
                href="https://www.facebook.com/people/CHD-ART-MAKER/100068019819843/"
                className="tracking-tighter text-sm md:text-[0.9em] uppercase flex items-center group"
              >
                FACEBOOK
                <ArrowDownRight className="w-4 h-4 ml-1 md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-4 md:ml-0 group-hover:-rotate-90 transition-transform duration-300" />
              </a>
            </div>
            
            <p className="text-xs md:text-[0.9em] tracking-tighter uppercase opacity-70 md:opacity-100">
              &copy; 2026, FUTURE-SCAPE STUDIOS, all rights reserved. Legal Notices Credits
            </p>
          </div>

          {/* Huge Background Text */}
          <h1
            id="footerHeroText"
            className="absolute top-[68%] md:top-[90%] font-bold left-1/2 -translate-x-1/2 text-[14vw] sm:text-[12vw] lg:text-[14.5vw] tracking-[5px] md:tracking-[15px] pointer-events-none opacity-20 md:opacity-100 whitespace-nowrap"
          >
            FUTURESCAPE
          </h1>
        </div>
      </div>

      {/* {SECTION 8} - Top Sliding Layer (Latest News) */}
      <div
        ref={section8Ref}
        className="absolute inset-0 w-full h-full bg-black flex flex-col items-start justify-between z-10"
      >
        <h1 className="text-white px-4 md:px-7 text-lg md:text-[1.05em] font-[500] uppercase tracking-tighter leading-[1.1] mt-6 md:mt-[4vh]">
          TRENDING ARTWORKS
        </h1>
        
        {/* Gallery Container */}
        <div className="h-[80%] md:h-[88%] w-full">
          {/* RESPONSIVE LAYOUT STRATEGY:
             Desktop: Flex row, evenly spaced.
             Mobile: Horizontal scroll (carousel) with snap points to maintain h-screen layout.
          */}
          <div className="flex flex-row overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none justify-start md:justify-between items-center md:items-start w-full h-full py-4 md:py-[5vh] px-4 md:px-7 gap-4 md:gap-4 scrollbar-hide">
            
            {/* Item 1 */}
            <div className="min-w-[85vw] md:min-w-[31.2vw] h-full snap-center">
              <CutoutParallax
                inset="0"
                src="/images/projectImages/img1.avif"
                title={`EPV Award Renewed — Excellence in French Craftsmanship - 2025`}
                width="100%"
                height="55vh" // Kept original height for desktop consistency, mobile will scale via container
                speed={18}
                className="!text-sm md:!text-[1.1rem] !text-white !indent-0 md:!indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter mt-4"
                linkStyles="!tracking-tighter !text-white text-sm"
                linkText="Read More"
              />
            </div>

            {/* Item 2 */}
            <div className="min-w-[85vw] md:min-w-[31.2vw] h-full snap-center">
              <CutoutParallax
                inset="0"
                src="/images/projectImages/img2.avif"
                title={`Paris 2024 — Olympic & Paralympic Truce Mural - Paris 2024`}
                width="100%"
                height="38vh"
                speed={16}
                className="!text-sm md:!text-[1.1rem] !text-white !indent-0 md:!indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter mt-4"
                linkStyles="!tracking-tighter !text-white text-sm"
                linkText="Read More"
              />
            </div>

            {/* Item 3 */}
            <div className="min-w-[85vw] md:min-w-[31.2vw] h-full snap-center">
              <CutoutParallax
                inset="0"
                src="/images/projectImages/img3.avif"
                title={`City of Genius, \n Rick OWENS x MONCLER - Shanghai 2024`}
                width="100%"
                height="45vh"
                speed={16}
                className="!text-sm md:!text-[1.1rem] !text-white !indent-0 md:!indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter mt-4"
                linkStyles="!tracking-tighter !text-white text-sm"
                linkText="Read More"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;