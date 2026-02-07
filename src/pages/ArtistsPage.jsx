import React, { useState, useMemo, useRef } from 'react';
import { Search, ArrowUpRight, MapPin, Layers } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // 1. Import ScrollTrigger
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';
import { useNavigate } from 'react-router-dom';

// 2. Register the plugin
gsap.registerPlugin(ScrollTrigger);

const ROLES = ["All", "Prompt Engineers", "Creative Directors", "3D Artists", "Neural Architects"];

const MOCK_ARTISTS = Array.from({ length: 12 }).map((_, i) => ({ // Increased count to demonstrate scroll
  id: `artist_${i}`,
  name: ["Sarah Chen", "Viktor Drago", "Elena Sol", "Marcus V", "Aiko Sato", "Julian G.", "Ray K.", "Lara C.", "Mike R.", "Nina P.", "Omari T.", "Zoe L."][i % 12],
  role: ROLES[1 + (i % 4)],
  location: ["Berlin", "Tokyo", "London", "Remote", "NYC"][i % 5],
  artifacts: 12 + (i * 3),
  specialty: ["Hyper-realism", "Brutalism", "Surreal Engine", "Cyber-Flora"][i % 4],
  topWork: `https://picsum.photos/seed/${i + 99}/600/800`,
  avatar: `https://i.pravatar.cc/400?u=art${i}`
}));

const ArtistsPage = () => {
  const [activeRole, setActiveRole] = useState("All");
  const [query, setQuery] = useState("");
  const containerRef = useRef();

  const filtered = useMemo(() => {
    return MOCK_ARTISTS.filter(a => 
      (activeRole === "All" || a.role === activeRole) && 
      a.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [activeRole, query]);

  // 3. Updated Animation Logic
  useGSAP(() => {
    const rows = gsap.utils.toArray('.artist-row');

    rows.forEach((row) => {
      gsap.fromTo(row, 
        { 
          opacity: 0.1, // Start very faint
          y: 50,        // Start slightly lower
          scale: 0.98   // Slight scale down for depth
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%", // Start animating when top of card hits 85% of viewport
            end: "bottom 60%", // End animation when bottom of card hits 60%
            toggleActions: "play none none reverse", // Reverses animation on scroll up
            // markers: true // Uncomment to debug trigger points
          }
        }
      );
    });
  }, { scope: containerRef, dependencies: [filtered] }); // Re-run when filter changes

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white" ref={containerRef}>
      <Navbar />

      <header className="px-6 md:px-12 pt-40 pb-20 border-b border-black/10">
        <div className="flex flex-col md:flex-row justify-between items-baseline">
          <h1 className="text-[14vw] leading-[0.8] font-medium uppercase tracking-tighter italic">Architects</h1>
          <div className="text-right hidden md:block">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] block text-black/40">Resource Archive</span>
            <span className="text-4xl font-light font-mono text-black">/0{filtered.length}</span>
          </div>
        </div>
      </header>

      {/* STICKY CONTROLS */}
      <section className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl px-6 md:px-12 py-6 border-b border-black/10 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 overflow-x-auto no-scrollbar w-full lg:w-auto">
          {ROLES.map(r => (
            <button 
              key={r} 
              onClick={() => setActiveRole(r)} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all whitespace-nowrap ${
                activeRole === r ? 'text-black underline underline-offset-8 decoration-2' : 'text-black/40 hover:text-black'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        
        <div className="relative w-full lg:w-96">
          <input 
            type="text" 
            placeholder="Search by name..." 
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-100/50 py-3 px-4 text-[10px] uppercase outline-none border border-black/5 focus:border-black transition-all font-bold" 
          />
          <Search size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40" />
        </div>
      </section>

      <main className="flex flex-col min-h-screen">
        {filtered.length > 0 ? (
          filtered.map((artist, idx) => (
            <ArtistRow key={artist.id} artist={artist} index={idx} />
          ))
        ) : (
          <div className="py-20 text-center text-black/40 uppercase tracking-widest text-xs">No architects found</div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const ArtistRow = ({ artist, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="artist-row group relative border-b border-black/10 px-6 md:px-12 py-10 md:py-14 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300 hover:bg-black"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Identity */}
      <div className="flex items-center gap-6 md:gap-10 md:w-2/5 z-10">
        <span className="hidden md:block font-mono text-xs text-black/20 group-hover:text-white/30">(0{index + 1})</span>
        <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full border border-black/5">
          <img 
            src={artist.avatar} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
            alt={artist.name} 
          />
        </div>
        <div className="group-hover:text-white transition-colors duration-300">
          <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-none">{artist.name}</h3>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40 group-hover:text-white/50 mt-2 italic">
            {artist.role} — {artist.specialty}
          </p>
        </div>
      </div>

      {/* 2. Metadata */}
      <div className="flex gap-10 mt-8 md:mt-0 z-10">
        <div className="space-y-1">
          <span className="text-[9px] uppercase tracking-widest text-black/40 group-hover:text-white/40 font-bold flex items-center gap-2">
            <Layers size={10}/> Artifacts
          </span>
          <p className="text-sm font-bold font-mono group-hover:text-white">{artist.artifacts}</p>
        </div>
        <div className="space-y-1">
          <span className="text-[9px] uppercase tracking-widest text-black/40 group-hover:text-white/40 font-bold flex items-center gap-2">
            <MapPin size={10}/> Hub
          </span>
          <p className="text-sm font-bold group-hover:text-white">{artist.location}</p>
        </div>
      </div>

      {/* 3. Action Button */}
      <div className="mt-8 md:mt-0 z-10">
        <button 
      onClick={() => navigate(`/artist/${artist.id}`)} // Redirects to dynamic route
      className="flex items-center justify-center w-14 h-14 rounded-full border border-black/10 text-black group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300"
    >
          <ArrowUpRight size={24} />
        </button>
      </div>

      {/* HOVER PREVIEW */}
      <div className={`fixed pointer-events-none z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[440px] transition-all duration-500 ease-out ${
        isHovered ? 'opacity-100 translate-x-[15%] rotate-2 scale-100 invisible md:visible' : 'opacity-0 translate-x-[30%] rotate-6 scale-95'
      }`}>
        <img 
          src={artist.topWork} 
          className="w-full h-full object-cover shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-[10px] border-white"
          alt="Work Preview"
        />
      </div>
    </div>
  );
};

export default ArtistsPage;