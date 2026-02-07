import React from 'react'

const HeroNav = ({ pos = 'fixed', top = '46.5%' }) => {
  return (
    <div 
      id='navElems' 
      style={{ position: pos, top: top }}
      className="w-full max-w-full h-fit flex items-center justify-between z-21 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 transition-none"
    >
      <div className="flex items-center justify-center gap-[15px] uppercase text-[0.89em] tracking-tighter mix-blend-difference text-white">
        <a href="#" data-transition="#projects-section">GALLERY</a>
          <a href="#" data-transition="#expertise-section">ARTISTS</a>
          <a href="#" data-transition="#about-section">COLLECTIONS</a>
          <a href="#" data-transition="#contact-section">INSIGHTS</a>
      </div>
      
      <div className='uppercase text-[0.89em] tracking-tighter mix-blend-difference text-white'>
        <a href="#">EXPLORE &nbsp;</a>
        ----
        <a href="#">&nbsp; ENROLL</a>
      </div>
    </div>
  )
}

export default HeroNav