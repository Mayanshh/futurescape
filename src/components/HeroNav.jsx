import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const HeroNav = ({ pos = 'fixed', top = '46.5%' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // GSAP Refs
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const timeline = useRef(null);

  // Custom navigation handler
  const handleNav = (e, path) => {
    e.preventDefault();
    if (!path || path === '#') return;

    // Close menu immediately
    toggleMenu(false);

    const navEvent = new CustomEvent('pageTransition', {
      detail: { path },
    });
    window.dispatchEvent(navEvent);
  };

  // GSAP Timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      timeline.current = gsap.timeline({ paused: true })
        // Overlay reveal (FAST)
        .to(overlayRef.current, {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.45,
          ease: 'power4.out',
        })
        // Links reveal (early + tight)
        .from(
          linksRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'power3.out',
            clearProps: 'all',
          },
          '-=0.3'
        );
    });

    return () => ctx.revert();
  }, []);

  // Toggle Menu
  const toggleMenu = (state) => {
    setIsOpen(state);

    if (state) {
      timeline.current.timeScale(1).play();
      document.body.style.overflow = 'hidden';
    } else {
      timeline.current.timeScale(1.2).reverse(); // Faster close
      document.body.style.overflow = '';
    }
  };

  const navLinks = [
    { name: 'GALLERY', path: '/gallery' },
    { name: 'ARTISTS', path: '/artists' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'INSIGHTS', path: '/insights' },
  ];

  return (
    <>
      {/* ---------------- HERO NAV BAR ---------------- */}
      <div
        id="heroNav"
        style={{ position: pos, top }}
        className="w-full max-w-full h-fit flex items-center justify-between z-[100] left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 md:px-10 pointer-events-none"
      >
        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-[15px] uppercase text-[0.89em] tracking-tighter mix-blend-difference text-white pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNav(e, link.path)}
              className="hover:opacity-50 transition-opacity"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden flex items-center mix-blend-difference text-white pointer-events-auto">
          <button
            onClick={() => toggleMenu(!isOpen)}
            className="text-[0.8em] tracking-[0.2em] uppercase font-medium focus:outline-none"
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="uppercase text-[0.75em] md:text-[0.89em] tracking-tighter mix-blend-difference text-white pointer-events-auto flex items-center">
          <a
            href="/auth"
            onClick={(e) => handleNav(e, '/auth')}
            className="hover:opacity-50 transition-opacity"
          >
            EXPLORE&nbsp;
          </a>
          <span className="opacity-30">----</span>
          <a
            href="/auth"
            onClick={(e) => handleNav(e, '/auth')}
            className="hover:opacity-50 transition-opacity"
          >
            &nbsp;ENROLL
          </a>
        </div>
      </div>

      {/* ---------------- MOBILE OVERLAY ---------------- */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-black flex flex-col justify-center px-8 md:hidden"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        <div className="flex flex-col gap-4">
          {navLinks.map((link, i) => (
            <div key={link.name} className="overflow-hidden">
              <a
                ref={(el) => (linksRef.current[i] = el)}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className="text-white text-6xl font-light tracking-tighter uppercase block hover:italic transition-all duration-300"
              >
                {link.name}
              </a>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-12 left-8 flex flex-col gap-2 opacity-40 text-white text-[0.6em] tracking-widest uppercase">
          <span>Architectural Identity</span>
          <span>© 2026 Collective</span>
        </div>
      </div>
    </>
  );
};

export default HeroNav;
