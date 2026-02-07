import React, { forwardRef } from 'react'

const Navbar = forwardRef(({ pos = 'fixed', top = '8.87%' }, ref) => {
  return (
    <div 
      id='navElems' 
      ref={ref}
      style={{ 
        position: pos, 
        top: top,
        mixBlendMode: 'difference',
        overflow: 'hidden'
      }}
      className="fixed w-full max-w-full h-fit flex items-center justify-between z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2 px-7 transition-none text-white pointer-events-auto"
    >
      {/* Container for Left Side */}
      <div className='nav-content flex flex-row w-[40%] justify-start items-center gap-[2.8em]'>
        <h1 id='logo' className='w-[2rem] h-full text-[1.6em] tracking-[1] text-white'>
          FSS
        </h1>
        <div className="flex items-center justify-center gap-[15px] uppercase text-[0.89em] tracking-tighter text-white">     
          <a href="#" data-transition="#projects-section">GALLERY</a>
          <a href="#" data-transition="#expertise-section">ARTISTS</a>
          <a href="#" data-transition="#about-section">COLLECTIONS</a>
          <a href="#" data-transition="#contact-section">INSIGHTS</a>
        </div>
      </div>
      
      {/* Container for Right Side */}
      <div className='nav-content uppercase text-[0.89em] tracking-tighter text-white'>
        <a href="#">EXPLORE &nbsp;</a>
        ----
        <a href="#" className='text-gray-300'>&nbsp; ENROLL</a>
      </div>
    </div>
  )
})

export default Navbar