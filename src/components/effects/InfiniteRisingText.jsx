import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const InfiniteRisingText = ({ text = "REVEAL", className = "" }) => {
  const container = useRef();

  useGSAP(() => {
    const chars = container.current.querySelectorAll('.char');

    const tl = gsap.timeline({
      repeat: -1,
      defaults: { ease: "expo.inOut" }
    });

    // 1. Rise up to the middle (y: 0)
    tl.fromTo(chars, 
      { y: "110%" }, 
      { 
        y: "0%", 
        duration: 1.2, 
        stagger: 0.05 
      }
    )
    // 2. Pause in the middle (the "stop" effect)
    .to({}, { duration: 1.8 }) 
    // 3. Continue rising up and out (y: -110%)
    .to(chars, {
      y: "-110%",
      duration: 1.2,
      stagger: 0.05
    });

  }, { scope: container });

  return (
    <div 
      ref={container} 
      className={`flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className="relative block overflow-hidden px-[0.02em]"
          style={{ 
            height: '1.2em',     
            display: 'flex', 
            alignItems: 'center'  
          }}
        >
          <span 
            className="char inline-block will-change-transform" 
            style={{ 
              whiteSpace: char === " " ? "pre" : "normal"
            }}
          >
            {char}
          </span>
        </span>
      ))}
    </div>
  );
};

export default InfiniteRisingText;