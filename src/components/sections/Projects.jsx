import React from 'react';
import CutoutParallax from '../effects/CutOutParallax';
import { useState, useEffect } from 'react';

// Efficient Hook for responsive logic
const useIsMobile = (breakpoint = 1024) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < breakpoint);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [breakpoint]);
  return isMobile;
};

const Projects = () => {
  const isMobile = useIsMobile();

  return (
    <div
      id="projects-section"
      className="relative z-20 w-full h-auto lg:h-[320vh] bg-white px-4 lg:px-8 pt-[5vh] lg:pt-[10vh]"
    >
      <div className="flex flex-col items-center justify-start gap-10 lg:gap-0">
        
        {/* Row 1 */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full h-auto lg:h-[100vh] pt-[5vh] lg:pt-[10vh] gap-10 lg:gap-0">
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img1.avif"
            title=" Katharina Grosse, Splinter, 2022 Paris "
            width={isMobile ? "90vw" : "48vw"}
            height={isMobile ? "50vh" : "80vh"}
            speed={isMobile ? 5 : 15}
          />
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img2.avif"
            title=" Rick Owens, Sleeping Pod, Art of Genius, Moncler, 2023 London"
            width={isMobile ? "90vw" : "48%"}
            height={isMobile ? "40vh" : "40vh"}
            speed={isMobile ? 5 : 15}
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full h-auto lg:h-[100vh] pt-[5vh] lg:pt-[10vh] lg:pl-[7.5em] lg:pr-[3.5em] gap-10 lg:gap-0">
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img3.avif"
            title=" Rick Owens, Ski Hut, City of Genius, Moncler x Shanghaï, 2024 Shanghai "
            width={isMobile ? "90vw" : "45vw"}
            height={isMobile ? "45vh" : "52vh"}
            speed={isMobile ? 5 : 15}
          />
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img4.avif"
            title=" Paris 2024, Olympic and Paralympic Truce Mural, 2024 Paris "
            width={isMobile ? "90vw" : "36.5vw"}
            height={isMobile ? "50vh" : "66vh"}
            speed={isMobile ? 5 : 15}
          />
        </div>

        {/* Row 3 */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full h-auto lg:h-[100vh] pt-[5vh] lg:pt-[10vh] gap-10 lg:gap-0">
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img5.avif"
            title=" Subodh Gupta, Very Hungry God, 2006 Paris "
            width={isMobile ? "90vw" : "45vw"}
            height={isMobile ? "40vh" : "50vh"}
            speed={isMobile ? 5 : 15}
          />
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img6.avif"
            title=" Agence R&Sie(n), Snake, 2002 Paris "
            width={isMobile ? "90vw" : "48vw"}
            height={isMobile ? "60vh" : "80vh"}
            speed={isMobile ? 5 : 15}
          />
        </div>

      </div>
    </div>
  );
};

export default Projects;