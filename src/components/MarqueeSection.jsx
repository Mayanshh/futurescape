import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * @param {Array} images - Array of 6 image URLs
 * @param {number} speed - Speed multiplier (default 1)
 * @param {string} gap - Tailwind spacing class (default "gap-4")
 * @param {string} rounded - Tailwind border radius (default "rounded-xl")
 * @param {boolean} reverse - Direction toggle
 */
const ImageMarquee = ({ 
  images = [], 
  speed = 1, 
  gap = "gap-6", 
  rounded = "rounded-2xl", 
  reverse = false 
}) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    const scrollWidth = marquee.scrollWidth;
    
    // Calculate the duration based on speed prop
    // Higher speed prop = lower duration (faster movement)
    const duration = 20 / speed;

    const tl = gsap.to(marquee, {
      x: reverse ? `+=${scrollWidth / 2}` : `-=${scrollWidth / 2}`,
      duration: duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          const val = parseFloat(x);
          // Standard infinite loop logic: if it moves past half, reset to 0
          return reverse 
            ? (val % (scrollWidth / 2)) - (scrollWidth / 2) 
            : val % (scrollWidth / 2);
        })
      }
    });

    return () => tl.kill();
  }, [speed, reverse]);

  // We duplicate the images array to ensure there is no "gap" in the loop
  const displayImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-2">
      <div 
        ref={marqueeRef} 
        className={`flex ${gap} w-max will-change-transform`}
      >
        {displayImages.map((src, index) => (
          <div 
            key={index} 
            className={`flex-shrink-0 flex items-center justify-center w-[calc(100vw/6-1.5rem)] h-[150px] bg-[#ececec] ${rounded} overflow-hidden border border-gray-200/50 shadow-sm`}
          >
            <img 
              src={src} 
              loading="eager" fetchpriority="high"
              alt={`marquee-${index}`} 
              className="h-1/2"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Container Component
const MarqueeSection = () => {
  const sampleImages = [
    "https://www.chdartmaker.com/media/site/19a13ab254-1764943100/paris2024-1920x-q90.avif",
    "https://www.chdartmaker.com/media/site/edaf29f6f9-1764941277/galerie-continua-1920x-q90.avif",
    "https://www.chdartmaker.com/media/site/e76cd727b4-1764942332/frac-occitanie-1920x-q90.avif",
    "https://www.chdartmaker.com/media/site/3d4299066b-1764941350/lille3000-1920x-q90.avif",
    "https://www.chdartmaker.com/media/site/6f9628a147-1756389593/rick-owens-1440x-q90.avif",
    "https://www.chdartmaker.com/media/site/0871b63868-1764942853/chaillot-1920x-q90.avif"
  ];

  return (
    <div className="w-full flex flex-col gap-0 py-4">
      {/* Top Marquee: Moving Left */}
      <ImageMarquee 
        images={sampleImages} 
        speed={0.6} 
        reverse={false} 
        gap="gap-4"
        rounded="rounded-lg"
      />
      
      {/* Bottom Marquee: Moving Right */}
      <ImageMarquee 
        images={sampleImages} 
        speed={0.6} 
        reverse={true}
        gap="gap-4"
        rounded="rounded-lg"
      />
    </div>
  );
};

export default MarqueeSection;