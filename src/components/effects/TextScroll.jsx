import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * @param {number} speed - Base intensity of the scroll movement
 */
const TextScroll = ({ speed = 1 }) => {
  const containerRef = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line 2: Moves Left
      gsap.to(line2Ref.current, {
        xPercent: -81 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // Start when container enters screen
          end: 'bottom bottom',   // End when container leaves screen
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Line 3: Moves Left 
      gsap.to(line3Ref.current, {
        xPercent: -173 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
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
          start: 'top bottom',   // Start color change slightly after it appears
          end: 'bottom 50%',  // COMPLETE color change before it leaves the viewport center
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className="w-full flex flex-col overflow-hidden bg-white">
      
      {/* Topmost H1: Static movement, Color Animates */}
      <h1 className='w-full text-gray-200 whitespace-nowrap overflow-hidden flex items-center justify-start h-[19vh] text-[10.7em] pl-[2rem] tracking-tight'>
        <span className="animate-color" style={{ color: '#e5e7eb' }}>FUTURE</span>
      </h1>

      {/* Middle H1: Moves Left + Color Animates */}
      <h1 
        ref={line2Ref}
        className='w-full text-gray-200 whitespace-nowrap flex items-center justify-start h-[19vh] text-[10.7em] tracking-tight will-change-transform'
      >
        DESIGN&nbsp;CONCEPTION&nbsp;
        <span className="animate-color" style={{ color: '#e5e7eb' }}>SCAPE</span>
        &nbsp;ARCHITECTURE
      </h1>

      {/* Bottom H1: Moves Left (Faster) + Color Animates */}
      <h1 
        ref={line3Ref}
        className='w-full text-gray-200 whitespace-nowrap flex items-center justify-start h-[19vh] text-[10.7em] tracking-tight will-change-transform'
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