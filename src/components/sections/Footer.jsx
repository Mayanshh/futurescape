import React, { useRef } from 'react';
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
    <div ref={revealContainer} className="relative w-full h-screen overflow-hidden">
      
      {/* {SECTION 9} - Bottom Layer (Contact) */}
      <div
        id="contact-section"
        className="absolute inset-0 bg-black flex flex-col items-start justify-start h-screen w-full bg-[url(https://www.chdartmaker.com/media/site/9f9f39e7ec-1756982584/rick-owens-moncler-1440x-q90.webp)] bg-center bg-no-repeat bg-cover z-0"
      >
        <LocationMarquee speed={1.5} />
        <div className="w-full max-w-full h-[80px] flex items-center justify-between leading-[1.15] pt-[2.2em] px-8">
          <div className="w-[30vw] h-full uppercase text-[1.67em] tracking-tighter">
            {' '}
            500 Rue Raymond Recouly <br /> 34070 Montpellier <br /> India
          </div>
          <div className="w-[30vw] h-full flex items-start justify-start uppercase text-[1.67em] tracking-tighter">
            <a href="tel:+91(0)9 67 39 88 35">Tel +91(0)9 67 39 88 35</a>
          </div>
          <div className="w-[30vw] h-full  uppercase text-[1.67em] tracking-tighter text-right">
            {' '}
            <a href="mailto:contact@chdartmaker.com">
              {' '}
              contact@futurescapestudios.com
            </a>{' '}
          </div>
        </div>

        <div className="w-full h-[14vh] mt-20 px-8 flex flex-col items-start justify-between">
          <div className="h-[47px] w-[47px] bg-none rounded-full">
            <img
              src="/images/epv-logo.svg"
              alt="EPV Logo"
              loading="eager"
              fetchpriority="high"
              className="object-contain"
            />
          </div>
          <div className="w-full pl-3 h-[30%] flex flex-row justify-between items-start text-white">
            <div className="w-[calc(30vw*0.6)] flex flex-row justify-between items-start">
              <a
                href="https://www.instagram.com/CHDARTMAKER/"
                className=" tracking-tighter text-[0.9em] uppercase relative top-2 transform -translate-y-1/2"
              >
                INSTAGRAM{' '}
                <ArrowDownRight className="w-[0.8em] absolute top-1/2 -translate-y-1/2 -left-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/company/chd-art-maker/"
                className=" tracking-tighter text-[0.9em] uppercase relative top-2 transform -translate-y-1/2"
              >
                LINKEDIN{' '}
                <ArrowDownRight className="w-[0.8em] absolute top-1/2 -translate-y-1/2 -left-3.5" />
              </a>
              <a
                href="https://www.facebook.com/people/CHD-ART-MAKER/100068019819843/"
                className=" tracking-tighter text-[0.9em] uppercase relative top-2 transform -translate-y-1/2"
              >
                FACEBOOK{' '}
                <ArrowDownRight className="w-[0.8em] absolute top-1/2 -translate-y-1/2 -left-3.5" />
              </a>
            </div>
            <p className="text-[0.9em] tracking-tighter uppercase relative top-2 transform -translate-y-1/2">
              &copy; 2026, FUTURE-SCAPE STUDIOS,all rights reserved.Legal
              Notices Credits
            </p>
          </div>
          <h1
            id="footerHeroText"
            className="absolute bottom-[-18%] left-1/2 -translate-x-1/2 text-[15vw] tracking-[15px] pointer-events-none text-white"
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
        <h1 className="text-white px-7 text-[1.05em] font-[500] uppercase tracking-tighter leading-[1.1] mt-[4vh]">
          LATEST NEWS
        </h1>
        <div className="!h-[88%] w-full">
          <div className="flex flex-row justify-between items-start w-full h-full py-[5vh] px-7">
            <CutoutParallax
              inset="0"
              src="/images/projectImages/img1.avif"
              title={`EPV Award Renewed — Excellence in French Craftsmanship - 2025`}
              width="31.2vw"
              height="55vh"
              speed={18}
              className="!text-[1.1rem] !text-white !indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter"
              linkStyles="!tracking-tighter !text-white"
              linkText="Read More"
            />
            <CutoutParallax
              inset="0"
              src="/images/projectImages/img2.avif"
              title={`Paris 2024 — Olympic & Paralympic Truce Mural - Paris 2024`}
              width="31.2vw"
              height="38vh"
              speed={16}
              className="!text-[1.1rem] !text-white !indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter"
              linkStyles="!tracking-tighter !text-white"
              linkText="Read More"
            />
            <CutoutParallax
              inset="0"
              src="/images/projectImages/img3.avif"
              title={`City of Genius, \n Rick OWENS x MONCLER - Shanghai 2024`}
              width="31.2vw"
              height="45vh"
              speed={16}
              className="!text-[1.1rem] !text-white !indent-10 whitespace-pre-line !block !leading-tighter !tracking-tighter"
              linkStyles="!tracking-tighter !text-white"
              linkText="Read More"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;