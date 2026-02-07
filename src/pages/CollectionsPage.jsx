import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Layers, Cpu, Compass } from 'lucide-react';
import Footer from '../components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const MOCK_COLLECTIONS = [
  {
    id: "col_1",
    title: "Neural Brutalism",
    count: 42,
    concept: "The intersection of raw concrete and algorithmic precision.",
    image: "https://picsum.photos/seed/concrete/1200/1600",
    color: "#f4f4f4"
  },
  {
    id: "col_2",
    title: "Void Structures",
    count: 28,
    concept: "Architectural explorations of negative space and anti-matter.",
    image: "https://picsum.photos/seed/void/1200/1600",
    color: "#0a0a0a"
  },
  {
    id: "col_3",
    title: "Synthetic Fauna",
    count: 15,
    concept: "Evolved biological forms generated through diffusion models.",
    image: "https://picsum.photos/seed/nature/1200/1600",
    color: "#e2e2e2"
  },
  {
    id: "col_4",
    title: "Solar Punk 2099",
    count: 56,
    concept: "Utopian urbanism where light physics dictates city layout.",
    image: "https://picsum.photos/seed/solar/1200/1600",
    color: "#ffffff"
  }
];

const CollectionsPage = () => {
  const containerRef = useRef();
  const horizontalRef = useRef();

  useGSAP(() => {
    // 1. Force Navbar Visibility (Consistent with previous fixes)
    gsap.to('.nav-content', { y: '0%', opacity: 1, duration: 0.5 });

    // 2. Horizontal Scroll Logic
    const sections = gsap.utils.toArray('.collection-card');
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: horizontalRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + horizontalRef.current.offsetWidth,
      }
    });

    // 3. Image Skew Effect on Scroll
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".skew-img", "skewX", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

  }, { scope: containerRef });

  const handleNavigate = (path) => {
    const navEvent = new CustomEvent('pageTransition', { detail: { path } });
    window.dispatchEvent(navEvent);
  };

  return (
    <div ref={containerRef} className="bg-white text-black overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <section className="h-[60vh] flex flex-col justify-end px-6 md:px-12 pb-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-10">
          <h1 className="text-[12vw] leading-[0.8] font-medium uppercase tracking-tighter italic">
            Theme<br/>Clusters
          </h1>
          <div className="max-w-sm pb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-40">Registry Overview</p>
            <p className="text-lg leading-snug font-light italic">
              Each collection aggregates artworks around a shared neural theme, exploring the limits of model consistency and stylistic cohesion.
            </p>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL AREA */}
      <div ref={horizontalRef} className="relative h-screen w-[400vw] flex overflow-hidden bg-zinc-900">
        {MOCK_COLLECTIONS.map((col, idx) => (
          <section 
            key={col.id} 
            className="collection-card relative w-screen h-screen flex-shrink-0 flex items-center justify-center p-10 md:p-24"
          >
            {/* Background Index Number */}
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-bold text-white/[0.03] pointer-events-none">
              0{idx + 1}
            </span>

            <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              {/* Info Column */}
              <div className="md:col-span-5 text-white">
                <div className="flex items-center gap-4 mb-8">
                  <span className="w-12 h-px bg-white/20"></span>
                  <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-60">Series {idx + 1}</span>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-medium uppercase tracking-tighter mb-8 leading-none">
                  {col.title}
                </h2>
                
                <p className="text-xl md:text-2xl font-light text-white/50 mb-12 max-w-md italic">
                  "{col.concept}"
                </p>

                <div className="flex gap-8 mb-12">
                   <StatBlock icon={Layers} label="Artifacts" value={col.count} />
                   <StatBlock icon={Cpu} label="Processing" value="High" />
                </div>

                <button 
                  onClick={() => handleNavigate(`/gallery?col=${col.id}`)}
                  className="group flex items-center gap-6 py-6 px-10 border border-white/10 hover:bg-white hover:text-black transition-all duration-500"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Enter Archive</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* Image Column */}
              <div className="md:col-span-7 flex justify-center">
                <div className="relative w-full max-w-lg aspect-[3/4] overflow-hidden skew-img border-[20px] border-white/5 shadow-2xl">
                  <img 
                    src={col.image} 
                    alt={col.title}
                    className="w-full h-full object-cover scale-110" 
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CALL TO ACTION */}
      <section className="h-[80vh] flex items-center justify-center text-center px-6">
        <div className="space-y-10">
           <Compass size={48} className="mx-auto opacity-20" />
           <h3 className="text-4xl md:text-6xl font-light uppercase tracking-tighter italic max-w-4xl">
             Explore the latent space through curated logic and systematic prompt engineering.
           </h3>
           <button 
             onClick={() => handleNavigate('/gallery')}
             className="text-[11px] font-black uppercase tracking-[0.5em] border-b-2 border-black pb-2 hover:opacity-50 transition-opacity"
           >
             View All Works
           </button>
        </div>
      </section>
    </div>
  );
};

// Sub-component for clean stats
const StatBlock = ({ icon: Icon, label, value }) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 opacity-30">
      <Icon size={12} />
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-2xl font-mono">{value}</p>
  </div>
);

export default CollectionsPage;