import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TransitionPortal = ({ lenis }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!lenis) return;

    const handleTransition = (e) => {
      const link = e.target.closest('[data-transition]');
      if (!link) return;

      const targetId = link.getAttribute('data-transition');
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const tl = gsap.timeline({
        onStart: () => lenis.stop(),
        onComplete: () => {
          lenis.start();
          // Reset for next click without animation
          gsap.set(overlayRef.current, { pointerEvents: "none", opacity: 0 });
        }
      });

      // 1. Initial State: Tiny capsule top-left
      // inset(top right bottom left round corners)
      const capsuleStart = "inset(2% 95% 95% 2% round 100px)";
      const screenCovered = "inset(0% 0% 0% 0% round 0px)";
      // The reveal: expand outwards so it never "returns" to the corner
      const revealExpand = "inset(-20% -20% -20% -20% round 0px)"; 

      tl.set(overlayRef.current, { 
        opacity: 1, 
        pointerEvents: "all",
        clipPath: capsuleStart,
        scale: 1
      })
      // 2. Smoothly grow to cover the whole screen
      .to(overlayRef.current, {
        clipPath: screenCovered,
        duration: 0.8,
        ease: "expo.inOut"
      })
      // 3. Perform the Jump while screen is black
      .add(() => {
        lenis.scrollTo(target, { immediate: true, force: true });
        ScrollTrigger.refresh();
      })
      // 4. Reveal: Fade and Scale out (Sleek reveal)
      .to(overlayRef.current, {
        scale: 1.1,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener('click', handleTransition, { capture: true });
    return () => window.removeEventListener('click', handleTransition);
  }, [lenis]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 w-full h-full bg-[#0a0a0a] opacity-0 pointer-events-none"
      style={{ 
        zIndex: 99999,
        willChange: "clip-path, opacity, transform"
      }}
    />
  );
};

export default TransitionPortal;