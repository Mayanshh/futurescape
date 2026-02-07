import React, { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = forwardRef(({ pos = 'fixed', top = '8.87%' }, ref) => {
  const navigate = useNavigate();

  /**
   * handleNav:
   * Prevents standard browser refresh and triggers the TransitionPortal
   * by dispatching a custom event that the Portal listens for.
   */
  const handleNav = (e, path) => {
    e.preventDefault();
    if (path === "#" || !path) return;
    
    // Dispatch custom event for TransitionPortal.jsx
    const navEvent = new CustomEvent('pageTransition', { 
      detail: { path } 
    });
    window.dispatchEvent(navEvent);
  };

  return (
    <nav 
      id='navElems' 
      ref={ref}
      style={{ 
        position: pos, 
        top: top,
        mixBlendMode: 'difference',
      }}
      className="fixed w-full max-w-full h-fit flex items-center justify-between z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2 px-7 transition-none text-white pointer-events-none"
    >
      {/* Container for Left Side 
        Class 'nav-content' is targeted by GSAP in Hero.jsx 
      */}
      <div className='nav-content flex flex-row w-[40%] justify-start items-center gap-[2.8em] pointer-events-auto'>
        <h1 
          id='logo' 
          className='text-[1.6em] tracking-[1] cursor-pointer'
          onClick={(e) => handleNav(e, '/')}
        >
          FSS
        </h1>
        
        <div className="flex items-center justify-center gap-[15px] uppercase text-[0.89em] tracking-tighter">     
          <a href="/gallery" onClick={(e) => handleNav(e, '/gallery')}>GALLERY</a>
          <a href="/artists" onClick={(e) => handleNav(e, '/artists')}>ARTISTS</a>
          <a href="#" onClick={(e) => handleNav(e, '#')}>COLLECTIONS</a>
          <a href="#" onClick={(e) => handleNav(e, '#')}>INSIGHTS</a>
        </div>
      </div>
      
      {/* Container for Right Side 
        Class 'nav-content' is targeted by GSAP in Hero.jsx 
      */}
      <div className='nav-content uppercase text-[0.89em] tracking-tighter pointer-events-auto'>
        <a href="#" onClick={(e) => handleNav(e, '#')}>EXPLORE &nbsp;</a>
        <span className="opacity-40">----</span>
        <a href="#" className='text-gray-300' onClick={(e) => handleNav(e, '#')}>&nbsp; ENROLL</a>
      </div>
    </nav>
  );
});

export default Navbar;