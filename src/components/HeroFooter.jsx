import React from 'react'
import InfiniteRisingText from './effects/InfiniteRisingText';
import { ArrowDownRight } from 'lucide-react';

const HeroFooter = () => {
  return (
    <div className='sm:w-[100vw] lg:w-full max-w-[100vw] h-auto lg:h-[80px] flex items-end lg:items-center justify-between absolute z-10 bottom-[8%] md:bottom-[10%] lg:bottom-[1.85%] left-1/2 -translate-x-1/2 px-4 md:px-8 lg:px-[1.9em] text-white pointer-events-none'>
      
      {/* Left Content - Wider on mobile now that center is hidden */}
      <div className='!w-[48vw] lg:w-[20em] uppercase text-[0.8rem] md:text-[0.8rem] lg:text-[1.025em] leading-tight lg:leading-[1.15] tracking-tighter pointer-events-auto'>
        <p className="indent-4 md:indent-8 lg:indent-12">
          Digital-atelier fusing machine intelligence with human craft
        </p>
        <a href="#" className='inline-flex items-center gap-1 mt-2 text-[0.87em] hover:opacity-70 transition-opacity'>
          LEARN MORE <ArrowDownRight className="w-[1em] h-[1em]" />
        </a> 
      </div> 

      {/* Center - Hidden on mobile/tablet, flex on desktop */}
      <div className='hidden lg:flex lg:w-[90vw] items-center justify-center pointer-events-auto'>
        <InfiniteRisingText 
          text="SCROLL" 
          className="lg:text-md font-bold text-white tracking-tighter uppercase" 
        />
      </div>

      {/* Right Content - Wider on mobile */}
      <div className='!w-[48vw] lg:w-[18em] uppercase text-[0.8rem] md:text-[0.8rem] lg:text-[1.025em] leading-tight lg:leading-[1.15] tracking-tighter text-right pointer-events-auto'>
        <p>Innovation-hub pioneering the next revolution in creative art</p>
        <a href="#" className='inline-flex items-center gap-1 mt-2 text-[0.87em] float-right hover:opacity-70 transition-opacity'>
          FIND OUT YOURSELF <ArrowDownRight className="w-[1em] h-[1em]" />
        </a> 
      </div> 

    </div>
  )
}

export default HeroFooter;