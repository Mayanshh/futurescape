import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const TransitionPortal = ({ lenis }) => {
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTransition = (e) => {
      const targetPath = e.detail.path;
      
      const tl = gsap.timeline({
        onStart: () => lenis?.stop(),
        onComplete: () => {
          lenis?.start();
          gsap.set(overlayRef.current, { pointerEvents: "none", opacity: 0 });
        }
      });

      const capsuleStart = "inset(2% 95% 95% 2% round 100px)";
      const screenCovered = "inset(0% 0% 0% 0% round 0px)";

      tl.set(overlayRef.current, { 
        opacity: 1, 
        pointerEvents: "all",
        clipPath: capsuleStart,
        scale: 1
      })
      .to(overlayRef.current, {
        clipPath: screenCovered,
        duration: 0.7,
        ease: "expo.inOut"
      })
      // THE KEY: Change the route while the screen is black
      .add(() => {
        navigate(targetPath);
        window.scrollTo(0, 0); // Reset scroll position
      })
      .to(overlayRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2 // Small pause to let the new page load
      });
    };

    window.addEventListener('pageTransition', handleTransition);
    return () => window.removeEventListener('pageTransition', handleTransition);
  }, [lenis, navigate]);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 w-full h-full bg-[#0a0a0a] opacity-0 pointer-events-none"
      style={{ zIndex: 99999 }}
    />
  );
};

export default TransitionPortal;