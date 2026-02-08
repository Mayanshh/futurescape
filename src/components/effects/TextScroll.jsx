import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextScroll = ({ speed = 1 }) => {
  const containerRef = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        let { isDesktop } = context.conditions;

        // On mobile, we reduce the travel distance (xPercent) 
        // because the screen is narrower and text wraps less.
        const line2Move = isDesktop ? -80 : -143;
        const line3Move = isDesktop ? -171.5 : -307;

        // Line 2: Moves Left
        gsap.to(line2Ref.current, {
          xPercent: line2Move * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: `${isDesktop ? 'bottom bottom' : 'top top' }`,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Line 3: Moves Left 
        gsap.to(line3Ref.current, {
          xPercent: line3Move * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: `${isDesktop ? 'bottom bottom' : 'top top' }`,
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        // Smooth Color Transition
        gsap.to(containerRef.current.querySelectorAll('.animate-color'), {
          color: '#000000',
          ease: 'power2.inOut', 
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',   
            end: 'bottom 50%',  
            scrub: 1.5,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className="w-full flex flex-col overflow-hidden bg-white py-[5vh] lg:py-0">
      
      {/* Topmost H1 */}
      <h1 className='w-full text-gray-200 whitespace-nowrap overflow-hidden flex items-center justify-start h-[8vh] lg:h-[19vh] text-[20vw] lg:text-[10.7em] pl-6 lg:pl-[2rem] tracking-tight'>
        <span className="animate-color" style={{ color: '#e5e7eb' }}>FUTURE</span>
      </h1>

      {/* Middle H1 */}
      <h1 
        ref={line2Ref}
        className='w-full text-gray-200 whitespace-nowrap flex items-center justify-start h-[8vh] lg:h-[19vh] text-[20vw] lg:text-[10.7em] tracking-tight will-change-transform'
      >
        DESIGN&nbsp;CONCEPTION&nbsp;
        <span className="animate-color" style={{ color: '#e5e7eb' }}>SCAPE</span>
        &nbsp;ARCHITECTURE
      </h1>

      {/* Bottom H1 */}
      <h1 
        ref={line3Ref}
        className='w-full text-gray-200 whitespace-nowrap flex items-center justify-start h-[8vh] lg:h-[19vh] text-[20vw] lg:text-[10.7em] tracking-tight will-change-transform'
      >
        <span className="animate-color" style={{ color: '#e5e7eb' }}>STUDIOS</span>
        &nbsp;MANUFACTURE&nbsp;STUDY&nbsp;INSTALLATION&nbsp;
        <span className="animate-color" style={{ color: '#e5e7eb' }}>STUDIOS</span>
        &nbsp;MANUFACTURE&nbsp;STUDY&nbsp;INSTALLATION
      </h1>

    </div>
  );
};

export default TextScroll;