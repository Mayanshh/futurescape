import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import gsap from 'gsap';

const images = [
  './images/loadingImages/loading_img1.avif', 
  './images/loadingImages/loading_img2.avif', 
  './images/loadingImages/loading_img3.avif', 
  './images/loadingImages/loading_img4.avif', 
  './images/loadingImages/loading_img5.avif', 
  './images/loadingImages/loading_img6.avif', 
  './images/loadingImages/loading_img7.avif'
];

const Preloader = ({ isLoading }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const bgImageRef = useRef(null);
  const [index, setIndex] = useState(0);
  const tl = useRef(null); // Ref to store the text timeline

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Initial State
      gsap.set(bgImageRef.current, { opacity: 0 });

      // 2. Image Cycling
      const interval = setInterval(() => {
        setIndex(prev => (prev + 1) % images.length);
      }, 150);

      // 3. Rising Text Animation 
      const chars = textRef.current.querySelectorAll('.char');
      tl.current = gsap.timeline();
      
      tl.current.fromTo(chars, 
        { y: "115%", opacity: 0 },
        { 
          y: "0%", 
          opacity: 1, 
          duration: 1.2, 
          ease: "power4.out", 
          stagger: 0.08,
        }
      );

      // 4. Background Reveal
      gsap.to(bgImageRef.current, {
        opacity: 0.4,
        duration: 1.2,
        delay: 0.5,
        ease: "power2.inOut"
      });

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 5. Exit Sequence: Faster disappear
  useLayoutEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.4, 
          ease: "power2.in",
          onComplete: () => {
            if (containerRef.current) containerRef.current.style.display = 'none';
          }
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isLoading]);

  return ReactDOM.createPortal(
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden h-screen w-full top-0 left-0"
    >
      <div ref={bgImageRef} className="absolute inset-0 z-0">
         <img 
           src={images[index]} 
           alt="preloader" 
           className="w-full h-full object-cover"
         />
      </div>

      <div ref={textRef} className="relative z-10 flex overflow-hidden">
        {"CHD".split("").map((char, i) => (
          <div key={i} className="overflow-hidden px-1">
            <span id='loading_txt' className="char inline-block text-[6vw] text-white leading-none">
              {char}
            </span>
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default Preloader;