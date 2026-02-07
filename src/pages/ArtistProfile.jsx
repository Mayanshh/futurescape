import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Zap, Globe, Layers, Cpu, Code, Share2, MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- BACKEND DATA SIMULATION ---
// This object mimics the exact JSON structure your backend API should return.
const MOCK_PROFILE = {
  id: "artist_1",
  name: "Viktor Drago",
  handle: "@drago_visuals",
  role: "Neural Architect",
  specialty: "Brutalism & Kinetic Structures",
  bio: "Specializing in high-fidelity architectural renders and impossible geometry. My prompts focus on lighting physics and material density. Former trad-3D artist turned prompt engineer.",
  location: "Berlin, DE",
  verified: true,
  stats: {
    projects: 142,
    avgRating: 4.9,
    responseTime: "< 2hrs",
    generated: "12k+"
  },
  stack: ["Midjourney v6", "Stable Diffusion XL", "ControlNet", "Runway Gen-2"],
  // The portfolio items - essential for brands to evaluate style
  collection: Array.from({ length: 9 }).map((_, i) => ({
    id: `art_${i}`,
    url: `https://picsum.photos/seed/${i + 200}/800/1000`, // Aspect ratio varies in real app
    title: ["Neon Concrete", "Void Structure", "Solar Punk City", "Cyber Fauna"][i % 4],
    model: "MJ v6.0",
    seed: "3928410...",
    promptPreview: "Isometric view of a brutalist concrete structure, volumetric fog, neon accents..."
  }))
};

const ArtistProfile = () => {
  const { id } = useParams(); // Get ID from URL to fetch data later
  const navigate = useNavigate();
  const containerRef = useRef();
  
  // In a real app, useQuery hook here to fetch data based on 'id'
  const artist = MOCK_PROFILE; 

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Header Elements
    tl.from(".profile-header-item", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

    // 2. Stats Bar
    tl.from(".stat-item", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out"
    }, "-=0.4");

    // 3. Gallery Images (ScrollTrigger)
    const galleryItems = gsap.utils.toArray('.gallery-item');
    galleryItems.forEach(item => {
      gsap.from(item, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-20">
      
      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
          <ArrowLeft size={16} /> Back to Registry
        </button>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <Share2 size={16} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 px-6 md:px-12 border-b border-black/10 pb-16">
        <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between">
          <div className="space-y-6 md:w-2/3">
            <div className="profile-header-item inline-flex items-center gap-3 border border-black/10 px-3 py-1 rounded-full w-fit">
              <span className={`w-2 h-2 rounded-full ${artist.verified ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60">
                {artist.verified ? 'Verified Architect' : 'Artist'}
              </span>
            </div>
            
            <h1 className="profile-header-item text-6xl md:text-9xl font-bold uppercase tracking-tighter leading-[0.9]">
              {artist.name}
            </h1>
            
            <p className="profile-header-item text-lg md:text-xl font-light text-black/60 max-w-2xl leading-relaxed">
              {artist.bio}
            </p>

            {/* TECH STACK TAGS */}
            <div className="profile-header-item flex flex-wrap gap-2 pt-4">
              {artist.stack.map(tool => (
                <span key={tool} className="px-3 py-1 bg-zinc-100 border border-black/5 text-[10px] uppercase font-bold tracking-wider text-black/70">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* ACTION BOX - HIRE ME */}
          <div className="profile-header-item w-full md:w-auto flex flex-col gap-4 min-w-[280px]">
            <button className="w-full py-4 bg-black text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 group">
              <Zap size={14} className="group-hover:fill-current" />
              Initiate Contract
            </button>
            <button className="w-full py-4 border border-black/10 text-black text-xs font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2">
              <MessageSquare size={14} />
              Inquire
            </button>
          </div>
        </div>
      </header>

      {/* STATS BAR */}
      <section className="px-6 md:px-12 py-8 border-b border-black/10 bg-zinc-50/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Project Rating", value: artist.stats.avgRating, icon: Star },
            { label: "Completed", value: artist.stats.projects, icon: Layers },
            { label: "Response Time", value: artist.stats.responseTime, icon: Zap },
            { label: "Location", value: artist.location, icon: Globe },
          ].map((stat, i) => (
            <div key={i} className="stat-item space-y-2">
              <div className="flex items-center gap-2 text-black/40">
                <stat.icon size={12} />
                <span className="text-[9px] uppercase font-black tracking-widest">{stat.label}</span>
              </div>
              <p className="text-xl md:text-2xl font-mono font-medium">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK GRID - "THE BLUEPRINTS" */}
      <main className="px-6 md:px-12 py-20">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className="text-4xl font-light uppercase tracking-tighter italic">Constructs <span className="text-black/20 not-italic font-mono text-xl">/0{artist.collection.length}</span></h2>
          
          <div className="hidden md:flex gap-6 text-[10px] font-black uppercase tracking-widest text-black/40">
             <span>Model</span>
             <span>Seed</span>
             <span>Prompt Weight</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {artist.collection.map((item, idx) => (
            <div key={item.id} className="gallery-item group cursor-pointer">
              {/* IMAGE CONTAINER */}
              <div className="relative overflow-hidden aspect-[4/5] bg-zinc-100 mb-4">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* OVERLAY INFO (Appears on Hover) */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 bg-white/95 border-t border-black/10 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-black/50">Prompt Snippet</span>
                    <Code size={12} className="text-black/50" />
                  </div>
                  <p className="text-xs font-mono text-black leading-relaxed line-clamp-3">
                    "{item.promptPreview}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-black/5 flex justify-between text-[9px] uppercase font-bold tracking-widest">
                    <span>{item.model}</span>
                    <span>Unlock Full</span>
                  </div>
                </div>
              </div>

              {/* ITEM META - Always Visible */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[10px] font-mono text-black/40 mt-1">ID: {item.seed}</p>
                </div>
                <div className="flex gap-2">
                   <span className="px-2 py-1 border border-black/10 text-[9px] font-bold uppercase hover:bg-black hover:text-white transition-colors">
                     Save
                   </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ArtistProfile;