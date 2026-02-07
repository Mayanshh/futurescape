import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { User, Building2, ArrowRight, Eye, EyeOff, Hexagon, Fingerprint } from 'lucide-react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('artist'); // 'artist' | 'brand'
  const containerRef = useRef(null);
  const brandPanelRef = useRef(null);
  const brandContentRef = useRef(null);
  const artistContentRef = useRef(null);

  // --- ANIMATION CONTEXT ---
  useGSAP(() => {
    // 1. Initial Load: Stagger in the Artist side (Default)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(".artist-element", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1 }
    );

    // 2. Grain Animation (Subtle movement)
    gsap.to(".noise-overlay", {
      x: "-10%",
      y: "-10%",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "steps(10)"
    });

  }, { scope: containerRef });

  // --- HANDLE SWITCH ANIMATION ---
  const switchTab = (tab) => {
    if (activeTab === tab) return;
    setActiveTab(tab);

    const isBrand = tab === 'brand';
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut", duration: 1.2 } });

    if (isBrand) {
      // REVEAL BRAND (Clip Path Wipe Right to Left)
      tl.to(brandPanelRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }, 0)
      // Parallax Content Movement
      .fromTo(brandContentRef.current, 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, 0.2
      )
      .to(artistContentRef.current, { x: -100, opacity: 0.5, duration: 1 }, 0);
    } else {
      // HIDE BRAND (Clip Path Wipe Left to Right)
      tl.to(brandPanelRef.current, {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      }, 0)
      .to(brandContentRef.current, { x: 100, opacity: 0, duration: 1 }, 0)
      .to(artistContentRef.current, { x: 0, opacity: 1, duration: 1.2 }, 0);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#F2F2F2] text-black font-sans selection:bg-black selection:text-white">
      
      {/* GLOBAL NOISE OVERLAY */}
      <div className="noise-overlay fixed inset-[-50%] w-[200%] h-[200%] opacity-[0.04] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* --- LAYER 1: ARTIST (Base Layer - White/Grey) --- */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center lg:justify-start lg:pl-32">
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
         </div>

         {/* Artist Content */}
         <div ref={artistContentRef} className="artist-wrapper relative z-10 w-full max-w-md p-8 lg:p-0">
             <AuthForm type="artist" isActive={activeTab === 'artist'} />
         </div>

         {/* Decorative Big Text (Artist) */}
         <h1 className="artist-element absolute right-[-10%] top-1/2 -translate-y-1/2 text-[20vh] font-black opacity-[0.03] pointer-events-none select-none hidden lg:block rotate-90">
            CREATOR
         </h1>
      </div>

      {/* --- LAYER 2: BRAND (Overlay Layer - Black) --- */}
      <div 
        ref={brandPanelRef}
        className="absolute inset-0 w-full h-full bg-[#0a0a0a] text-white z-20 flex items-center justify-center lg:justify-end lg:pr-32"
        style={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }} // Initially Hidden
      >
        {/* Abstract Shapes */}
        <div className="absolute left-[-100px] top-[-100px] w-[500px] h-[500px] bg-zinc-800/20 rounded-full blur-[100px]"></div>

        {/* Brand Content */}
        <div ref={brandContentRef} className="relative z-10 w-full max-w-md p-8 lg:p-0">
           <AuthForm type="brand" isActive={activeTab === 'brand'} />
        </div>

         {/* Decorative Big Text (Brand) */}
         <h1 className="absolute left-[5%] top-1/2 -translate-y-1/2 text-[20vh] font-black text-white opacity-[0.09] pointer-events-none select-none hidden lg:block -rotate-90">
            AGENCY
         </h1>
      </div>

      {/* --- CONTROLS: BOTTOM TOGGLE --- */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-0 bg-white/10 backdrop-blur-md p-1 rounded-full border border-black/5 shadow-2xl">
        <button 
          onClick={() => switchTab('artist')}
          className={`relative px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === 'artist' ? 'bg-black text-white shadow-lg' : 'text-zinc-500 hover:text-black'}`}
        >
          Artist
        </button>
        <button 
          onClick={() => switchTab('brand')}
          className={`relative px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${activeTab === 'brand' ? 'bg-white text-black shadow-lg' : 'text-zinc-500 hover:text-white'}`}
        >
          Brand
        </button>
      </div>

      {/* --- DECORATIVE HEADER --- */}
      <div className="absolute top-0 left-0 w-full p-8 z-40 flex justify-between items-start pointer-events-none mix-blend-difference text-white">
         <div className="flex flex-col">
            <span className="text-xs font-bold tracking-widest uppercase">FutureScape Studios</span>
            <span className="text-[10px] opacity-60 font-mono mt-1">SHAPE THE SYNTHETIC FRONTIER - 04 / 88</span>
         </div>
         <Fingerprint className="opacity-50" />
      </div>

    </div>
  );
};

// --- SOPHISTICATED FORM COMPONENT ---
const AuthForm = ({ type, isActive }) => {
  const [isLogin, setIsLogin] = useState(true);
  const formRef = useRef();

  return (
    <div ref={formRef} className="w-full">
      {/* Header */}
      <div className={`mb-12 transition-all duration-700 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex items-center gap-3 mb-6 opacity-60">
           {type === 'artist' ? <Hexagon size={14} className="animate-spin-slow" /> : <Building2 size={14} />}
           <span className="text-[10px] font-mono uppercase tracking-[0.2em]">{type === 'artist' ? 'Neural Architect' : 'Corporate Entity'}</span>
        </div>
        <h2 className="text-5xl lg:text-7xl font-medium tracking-tighter uppercase leading-[0.9]">
          {isLogin ? 'Access' : 'Join'} <br/>
          <span className="italic font-serif opacity-50">{type === 'artist' ? 'The Grid.' : 'The Protocol.'}</span>
        </h2>
      </div>

      {/* Inputs */}
      <form className={`space-y-8 transition-all duration-700 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {!isLogin && (
           <div className="group relative">
             <input type="text" required className="peer w-full bg-transparent border-b border-current py-4 text-sm font-mono focus:outline-none focus:border-opacity-100 border-opacity-20 transition-all placeholder-transparent" placeholder="Name" />
             <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest opacity-40 transition-all peer-focus:-top-2 peer-focus:opacity-100 peer-placeholder-shown:top-4 peer-placeholder-shown:opacity-40">
                Identity Name
             </label>
           </div>
        )}

        <div className="group relative">
           <input type="email" required className="peer w-full bg-transparent border-b border-current py-4 text-sm font-mono focus:outline-none focus:border-opacity-100 border-opacity-20 transition-all placeholder-transparent" placeholder="Email" />
           <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest opacity-40 transition-all peer-focus:-top-2 peer-focus:opacity-100 peer-placeholder-shown:top-4 peer-placeholder-shown:opacity-40">
              Signal Frequency (Email)
           </label>
        </div>

        <div className="group relative">
           <input type="password" required className="peer w-full bg-transparent border-b border-current py-4 text-sm font-mono focus:outline-none focus:border-opacity-100 border-opacity-20 transition-all placeholder-transparent" placeholder="Password" />
           <label className="absolute left-0 top-4 text-[10px] uppercase tracking-widest opacity-40 transition-all peer-focus:-top-2 peer-focus:opacity-100 peer-placeholder-shown:top-4 peer-placeholder-shown:opacity-40">
              Access Key
           </label>
        </div>

        {/* Action Button */}
        <button className={`w-full py-6 mt-4 flex items-center justify-between group border-b border-current transition-all hover:pl-4`}>
           <span className="text-xs font-black uppercase tracking-[0.3em] group-hover:opacity-50 transition-opacity">
             {isLogin ? 'Initialize' : 'Register'}
           </span>
           <div className="relative overflow-hidden w-6 h-6">
              <ArrowRight className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" size={20} />
              <ArrowRight className="absolute inset-0 transform translate-x-0 group-hover:translate-x-full transition-transform duration-300" size={20} />
           </div>
        </button>
      </form>

      {/* Footer Toggle */}
      <div className={`mt-10 flex items-center gap-4 transition-all duration-700 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent hover:border-current pb-1 transition-all opacity-50 hover:opacity-100"
        >
          {isLogin ? 'Request New Identity' : 'Existing User Login'}
        </button>
      </div>

    </div>
  );
}

export default AuthPage;