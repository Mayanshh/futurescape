import React, { useRef, memo } from 'react';
import gsap from 'gsap';
import SmoothReveal from './effects/SmoothReveal';

const MenuRow = memo(({ title, description, index, onHover, onLeave }) => {
  const container = useRef(null);
  const mainH1 = useRef(null);
  const topH1 = useRef(null);
  const bottomH1 = useRef(null);
  const infoText = useRef(null);

  const handleMouseEnter = (e) => {
    onHover(index); 
    const { clientY } = e;
    const { top, height } = container.current.getBoundingClientRect();
    const middle = top + height / 2;
    const fromTop = clientY < middle;

    // Set the incoming H1 position based on enter direction
    gsap.set(fromTop ? topH1.current : bottomH1.current, { 
      yPercent: fromTop ? -100 : 100, 
      opacity: 0 
    });

    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "expo.out", overwrite: "auto" } });
    
    // Slide current H1 out
    tl.to([mainH1.current, topH1.current, bottomH1.current], { 
      yPercent: fromTop ? 100 : -100, 
      opacity: 0 
    }, 0);
    
    // Slide new H1 in
    const incoming = fromTop ? topH1.current : bottomH1.current;
    tl.to(incoming, { 
      yPercent: 0, 
      opacity: 1,
      onComplete: () => {
        gsap.set([bottomH1.current, topH1.current, mainH1.current], { opacity: 0 });
        gsap.set(incoming, { opacity: 1 });
      }
    }, 0);

    // Fade in description
    gsap.fromTo(infoText.current, 
      { opacity: 0, x: 20, visibility: "hidden" }, 
      { 
        opacity: 1, 
        x: 0, 
        visibility: "visible", 
        duration: 0.4, 
        ease: "power2.out" 
      }
    );
  };

  const handleMouseLeave = () => {
    onLeave();
    gsap.to(infoText.current, { 
      opacity: 0, 
      x: 10, 
      visibility: "hidden", 
      duration: 0.3 
    });
  };

  return (
    <div 
      ref={container} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className='h-[8.5em] w-full relative overflow-hidden flex flex-row items-center justify-between border-b-[0.1em] border-white cursor-pointer z-30'
    >
      <div className="absolute inset-0 pointer-events-none flex items-center">
        <h1 ref={mainH1} className='uppercase text-[6em] text-white tracking-tight leading-none absolute will-change-transform'>
          {title}
        </h1>
        <h1 ref={topH1} className='uppercase text-[6em] text-white tracking-tight leading-none absolute opacity-0 will-change-transform'>
          {title}
        </h1>
        <h1 ref={bottomH1} className='uppercase text-[6em] text-white tracking-tight leading-none absolute opacity-0 will-change-transform'>
          {title}
        </h1>
      </div>
      
      <p 
        ref={infoText} 
        className='invisible w-[22em] flex items-center justify-end h-full uppercase text-[1.025em] leading-[0.9] tracking-tighter text-right absolute right-0 z-10 pointer-events-none'
      >
        {description}
      </p>
    </div>
  );
});

const FullScreenMenu = () => {
  const menuImages = [
    '../menuImages/base.avif', 
    '../menuImages/img1.avif', 
    '../menuImages/img2.avif', 
    '../menuImages/img3.avif', 
    '../menuImages/img4.avif'
  ];

  const bgContainerRef = useRef(null);
  const lastHoverTime = useRef(0);

  const changeBackground = (index) => {
    const now = Date.now();
    const timeDiff = now - lastHoverTime.current;
    lastHoverTime.current = now;

    // Adaptive timing
    const duration = timeDiff < 150 ? 0.6 : 1.2;

    const newLayer = document.createElement('div');
    newLayer.style.position = 'absolute';
    newLayer.style.inset = '0';
    
    // Ensure darkness is only applied if it's the base image (index 0)
    const overlay = index === 0 ? 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), ' : '';
    
    newLayer.style.backgroundImage = `${overlay}url(${menuImages[index]})`;
    newLayer.style.backgroundSize = 'cover';
    newLayer.style.backgroundPosition = 'center';
    newLayer.style.clipPath = 'inset(50% 50% 50% 50%)';
    newLayer.style.zIndex = bgContainerRef.current.children.length;

    bgContainerRef.current.appendChild(newLayer);

    gsap.fromTo(newLayer, 
      { clipPath: 'inset(50% 50% 50% 50%)', scale: 1.1 },
      { 
        clipPath: 'inset(0% 0% 0% 0%)', 
        scale: 1, 
        duration: duration, 
        ease: "expo.inOut",
        onComplete: () => {
          // Clean up layers behind to prevent memory leaks, keep the current one active
          while (bgContainerRef.current.children.length > 2) {
            bgContainerRef.current.removeChild(bgContainerRef.current.firstChild);
          }
        }
      }
    );
  };

  return (
    <div id='expertise-section' className='min-h-[150vh] relative flex items-center justify-start flex-col w-full h-[150vh] bg-black overflow-hidden'>
      
      {/* BACKGROUND MANAGER */}
      <div ref={bgContainerRef} className="absolute inset-0 z-0">
        <div 
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${menuImages[0]})` }}
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        />
      </div>

      {/* HEADER SECTION */}
      <div className="relative z-20 w-full min-h-[32.5%] text-white pointer-events-none">
        <div className='okomito-bold w-[47%] h-fit absolute top-[2.25em] left-0 px-8'>
          <SmoothReveal 
            text=" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  FUTURESCAPE STUDIOS is both a digital lab and a creative foundry dedicated to generative innovation."
            className="text-[1.7em] leading-[0.8] font-[500] text-white w-full tracking-tight uppercase"
          />
        </div>
      </div>

      {/* MENU ROWS */}
      <div className='relative z-20 min-h-[67.5%] bg-transparent w-full flex flex-col items-start justify-start px-8'>
        {['CURATE', 'DESIGN', 'PROTOTYPE', 'EXHIBIT'].map((title, i) => (
          <MenuRow 
            key={title}
            index={i + 1}
            onHover={(idx) => changeBackground(idx)}
            onLeave={() => changeBackground(0)}
            title={title} 
            description={
                i === 0 ? <>DIALOGUE WITH ARTIST / BRAND OWNER <br /> AESTHETIC & THEMATIC ANALYSIS <br /> ARTIST MATCHING & CONCEPTUAL SYNERGY</> :
                i === 1 ? <>PROMPT ENGINEERING & WORKFLOWS <br /> MULTI-MODEL RENDERINGS & ITERATIONS <br /> COMPOSITION & VISUAL ARCHITECTURE</> :
                i === 2 ? <>VIRTUAL TWIN & STRESS TESTING <br /> MATERIAL EXPERIMENTS & 3D MOCKUPS <br /> REFINEMENT & QUALITY BENCHMARKING</> :
                          <>INSTALLATION & SPATIAL INTEGRATION <br /> IMMERSIVE TECHNOLOGY & MEDIA PLACEMENT <br /> GLOBAL PREMIERE & AUDIENCE ENGAGEMENT</>
            } 
          />
        ))}
      </div>
    </div>
  );
};

export default FullScreenMenu;