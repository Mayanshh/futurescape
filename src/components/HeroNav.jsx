import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const HeroNav = ({ pos = 'fixed', top = '46.5%' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const timeline = useRef(null);

  const handleNav = (e, path) => {
    e.preventDefault();
    toggleMenu(false);
    const navEvent = new CustomEvent('pageTransition', { detail: { path } });
    window.dispatchEvent(navEvent);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({ paused: true })
        .to(overlayRef.current, {
          autoAlpha: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.5,
          ease: 'power4.inOut',
        })
        .fromTo(linksRef.current, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power3.out' },
          "-=0.2"
        );
    });
    return () => ctx.revert();
  }, []);

  const toggleMenu = (state) => {
    setIsOpen(state);
    state ? timeline.current.play() : timeline.current.reverse();
    document.body.style.overflow = state ? 'hidden' : '';
  };

  const navLinks = [
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ARTISTS', path: '/artists' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'INSIGHTS', path: '/insights' },
  ];

  return (
    <>
      {/* 1. MOBILE OVERLAY - Separated for visibility */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[150] bg-neutral-950 flex flex-col justify-center !w-[100vw] px-2 lg:px-8 md:hidden pointer-events-none"
        style={{ clipPath: 'inset(0 0 100% 0)', visibility: 'hidden' }}
      >
        <div className={`flex flex-col gap-4 ${isOpen ? 'pointer-events-auto' : ''}`}>
          {navLinks.map((link, i) => (
            <div key={link.name} className="overflow-hidden">
              <a
                ref={(el) => (linksRef.current[i] = el)}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className="text-white text-[12vw] font-bold uppercase block leading-tight"
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 2. THE NAVBAR */}
      <nav
        id="heroNav"
        style={{ position: pos, top: top }}
        className="!w-[100vw] lg:w-full h-fit flex items-center justify-between z-[200] lg:left-1/2 lg:-translate-x-1/2 -translate-y-1/2 px-6 md:px-10 pointer-events-none transition-[top] duration-300"
      >
        {/* Left: Mobile Toggle / Desktop Links */}
        <div className="flex items-center pointer-events-auto">
          <button 
            onClick={() => toggleMenu(!isOpen)} 
            className="md:hidden text-white mix-blend-difference text-[0.75rem] font-bold tracking-[0.2em] uppercase"
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>

          <div className="hidden md:flex items-center gap-6 text-white mix-blend-difference uppercase text-[0.85rem] tracking-tighter">
            {navLinks.map((link) => (
              <a key={link.name} href={link.path} onClick={(e) => handleNav(e, link.path)} className="hover:opacity-50">
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 text-white mix-blend-difference pointer-events-auto uppercase text-[0.75rem] md:text-[0.85rem] tracking-tighter">
          <a href="/auth" onClick={(e) => handleNav(e, '/auth')}>EXPLORE</a>
          <span className="opacity-30">——</span>
          <a href="/auth" onClick={(e) => handleNav(e, '/auth')}>ENROLL</a>
        </div>
      </nav>
    </>
  );
};

export default HeroNav;