import { useNavigate } from 'react-router-dom';

const HeroNav = ({ pos = 'fixed', top = '46.5%' }) => {
  const navigate = useNavigate();

  // Custom navigation handler to sync with TransitionPortal
  const handleNav = (e, path) => {
    e.preventDefault();
    if (path === "#" || !path) return;
    
    // Dispatch the custom event that TransitionPortal is listening for
    const navEvent = new CustomEvent('pageTransition', { 
      detail: { path } 
    });
    window.dispatchEvent(navEvent);
  };

  return (
    <div 
      id='heroNav' 
      style={{ position: pos, top: top }}
      className="w-full max-w-full h-fit flex items-center justify-between z-30 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 pointer-events-none"
    >
      {/* Left Side Links */}
      <div className="flex items-center justify-center gap-[15px] uppercase text-[0.89em] tracking-tighter mix-blend-difference text-white pointer-events-auto">
        <a 
          href="/gallery" 
          onClick={(e) => handleNav(e, '/gallery')}
          className="hover:opacity-50 transition-opacity"
        >
          GALLERY
        </a>
        <a 
          href="/artists" 
          onClick={(e) => handleNav(e, '/artists')}
          className="hover:opacity-50 transition-opacity"
        >
          ARTISTS
        </a>
        <a 
          href="#" 
          onClick={(e) => handleNav(e, '#')}
          className="hover:opacity-50 transition-opacity"
        >
          COLLECTIONS
        </a>
        <a 
          href="#" 
          onClick={(e) => handleNav(e, '#')}
          className="hover:opacity-50 transition-opacity"
        >
          INSIGHTS
        </a>
      </div>
      
      {/* Right Side Links */}
      <div className='uppercase text-[0.89em] tracking-tighter mix-blend-difference text-white pointer-events-auto'>
        <a href="#" className="hover:opacity-50 transition-opacity">EXPLORE &nbsp;</a>
        <span className="opacity-30">----</span>
        <a href="#" className="hover:opacity-50 transition-opacity">&nbsp; ENROLL</a>
      </div>
    </div>
  );
};

export default HeroNav;