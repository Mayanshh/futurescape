import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LocationMarquee = ({ speed = 1 }) => {
  const marqueeRef = useRef(null);

  const locations = [
    { city: 'PARIS', country: 'fr' },
    { city: 'SHANGHAI', country: 'cn' },
    { city: 'LONDON', country: 'uk' },
    { city: 'NEWYORK', country: 'usa' },
    { city: 'VENICE', country: 'it' },
    { city: 'MTP', country: 'fr' },
  ];

  useEffect(() => {
    const marquee = marqueeRef.current;
    const scrollWidth = marquee.scrollWidth;
    
    // Smooth infinite loop logic
    const duration = 40 / speed;

    const tl = gsap.to(marquee, {
      x: `-=${scrollWidth / 2}`,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % (scrollWidth / 2))
      }
    });

    return () => tl.kill();
  }, [speed]);

  // Duplicate list for seamless loop
  const displayList = [...locations, ...locations];

  return (
    <div className="w-full overflow-hidden h-[22vh] mt-[9.9vh]">
      <div 
        ref={marqueeRef} 
        className="flex whitespace-nowrap w-max will-change-transform items-center"
      >
        {displayList.map((item, index) => (
          <div key={index} className="flex items-center">
            {/* City Name */}
            <span  className="text-[6.2em] font-[600] tracking-tighter uppercase text-white px-4 marqueeTxt">
              {item.city}
            </span>
            
            {/* Country Code*/}
            <div className="flex items-center justify-center">
                <span className=" marqueeTxt text-[0.9em] uppercase font-bold text-white py-0.5 rounded-sm tracking-widest">
                {item.country}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationMarquee;