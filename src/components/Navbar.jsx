import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Navbar = forwardRef(({ pos = 'fixed', top = '8.87%' }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // GSAP Refs
  const overlayRef = useRef(null);
  const linksRef = useRef([]); // Array of refs for menu items
  const tl = useRef(null);
  const containerRef = useRef(null); // Scope for GSAP

  const menuItems = [
    { label: 'HOME', path: '/' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'ARTISTS', path: '/artists' },
    { label: 'COLLECTIONS', path: '/collections' },
    { label: 'INSIGHTS', path: '/insights' },
  ];

  // Custom Navigation Handler
  const handleNav = (e, path) => {
    e.preventDefault();
    if (path === "#" || !path) return;

    if (isOpen) {
      // If menu is open, close it first, then navigate
      toggleMenu();
      setTimeout(() => dispatchTransition(path), 600); // Wait for close animation
    } else {
      dispatchTransition(path);
    }
  };

  const dispatchTransition = (path) => {
    const navEvent = new CustomEvent('pageTransition', { 
      detail: { path } 
    });
    window.dispatchEvent(navEvent);
  };

  // GSAP Animation Setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
  // 1. Faster overlay reveal
  .to(overlayRef.current, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 0.5,          // ⬅️ was 0.8
    ease: "power4.inOut",
  })
  // 2. Links come in MUCH sooner
  .from(
    linksRef.current,
    {
      y: 60,               // ⬅️ was 100 (less travel = faster feel)
      opacity: 0,
      skewY: 3,
      duration: 0.45,      // ⬅️ was 0.8
      stagger: 0.06,       // ⬅️ tighter stagger
      ease: "power3.out",
      clearProps: "all",
    },
    "-=0.35"               // ⬅️ start almost immediately
  );


    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Sync State with Timeline
  useEffect(() => {
    if (isOpen) {
      tl.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current.reverse();
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div ref={containerRef}>
      {/* ---------------- NAVIGATION BAR ---------------- */}
      {/* z-[110] ensures it stays ON TOP of the overlay */}
      <nav 
        id='navElems' 
        ref={ref}
        style={{ 
          position: pos, 
          top: top,
        }}
        className="w-full max-w-full h-fit flex items-center justify-between z-[110] left-1/2 -translate-x-1/2 -translate-y-1/2 px-7 text-white pointer-events-none mix-blend-difference"
      >
        {/* LEFT SIDE: Logo & Desktop Links */}
        <div className='nav-content flex flex-row md:w-[40%] justify-start items-center gap-[2.8em] pointer-events-auto'>
          <h1 
            id='logo' 
            className='text-[1.6em] tracking-[1] cursor-pointer font-bold'
            onClick={(e) => handleNav(e, '/')}
          >
            FSS
          </h1>
          
          {/* DESKTOP LINKS (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center justify-center gap-[15px] uppercase text-[0.89em] tracking-tighter">
            {menuItems.map((item) => (
              <a 
                key={item.label} 
                href={item.path} 
                onClick={(e) => handleNav(e, item.path)} 
                className="hover:opacity-50 transition-opacity"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* MOBILE HAMBURGER (Visible on Mobile) */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden group flex items-center gap-2 text-[0.8em] tracking-widest uppercase focus:outline-none"
          >
            <div className="flex flex-col gap-[4px] items-end">
                <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-[2.5px]' : 'w-6'}`}></span>
                <span className={`h-[1px] bg-white transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-[2.5px]' : 'w-4 group-hover:w-6'}`}></span>
            </div>
          </button>
        </div>
        
        {/* RIGHT SIDE: Auth/Action Links */}
        <div className='nav-content uppercase text-[0.75em] md:text-[0.89em] tracking-tighter pointer-events-auto flex items-center'>
          <a href="/auth" onClick={(e) => handleNav(e, '/auth')} className="hover:opacity-50 transition-opacity">EXPLORE &nbsp;</a>
          <span className="opacity-40">----</span>
          <a href="/auth" className='hover:text-gray-300 transition-colors' onClick={(e) => handleNav(e, '/auth')}>&nbsp; ENROLL</a>
        </div>
      </nav>

      {/* ---------------- FULLSCREEN OVERLAY ---------------- */}
      {/* z-[100] sits just below the navbar text */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col justify-center px-10 pointer-events-auto"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }} // Initially hidden (wiped up)
      >
        <div className="flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <div key={item.label} className="overflow-hidden">
              <a 
                ref={el => linksRef.current[i] = el}
                href={item.path}
                onClick={(e) => handleNav(e, item.path)}
                className="text-white text-5xl sm:text-7xl font-light tracking-tighter uppercase block transition-all duration-300 hover:italic hover:translate-x-4"

              >
                {item.label}
              </a>
            </div>
          ))}
        </div>

        {/* Mobile Footer Decor */}
        <div className="absolute bottom-10 left-10 flex gap-10 opacity-30 text-white text-[0.6em] tracking-[0.3em] uppercase mix-blend-screen">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Archive 2026</span>
        </div>
      </div>
    </div>
  );
});

export default Navbar;