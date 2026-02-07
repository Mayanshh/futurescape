import React from 'react'
import InfiniteRisingText from './effects/InfiniteRisingText';
import { ArrowDownRight } from 'lucide-react';

const heroFooter = () => {
  return (
    <div className='w-full max-w-full h-[80px] flex items-center justify-between absolute z-1 bottom-[1.85%] leading-[1.15] left-1/2 -translate-x-1/2 px-[1.9em] text-white'>
      <div className='w-[20em] h-full uppercase text-[1.025em] indent-17 tracking-tighter'>Digital-atelier fusing machine intelligence with human craft <br /> 
      <a href="#" className='text-[0.87em] uppercase relative top-2 transform -translate-y-1/2'>LEARN MORE <ArrowDownRight className="w-[0.8em] absolute -bottom-[0.3em] -right-4 " /></a> 
      </div> 
      <div className='w-[100px] h-full flex items-center justify-center'>
        <InfiniteRisingText 
          text="SCROLL" 
          className="text-md font-bold text-white tracking-tighter uppercase" 
        />
      </div>
      <div className='w-[18em] h-full uppercase text-[1.025em] tracking-tighter text-right'>Innovation-hub pioneering the next revolution in creative art <br /> <a href="#" className='text-[0.87em] uppercase relative right-4 top-2 transform -translate-y-1/2'>FIND OUT YOURSELF <ArrowDownRight className="w-[0.8em] absolute -bottom-[0.3em] -right-4 " /></a> </div> 
    </div>
  )
}

export default heroFooter
