import React, { useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, Copy, Zap, Cpu, Palette, Check, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from '../components/Navbar';
import Footer from '../components/sections/Footer';

// --- DATA ---
const CATEGORIES = ["All", "Cinematic", "Architectural", "Abstract", "Fashion", "Surrealism"];

const MOCK_ARTWORKS = Array.from({ length: 14 }).map((_, i) => ({
  id: `art_${i}`,
  title: ["Vortex", "Symmetry", "Ghost Shell", "Neon Noir", "Ethereal", "Kinesis", "Static"][i % 7] + ` 0${i + 1}`,
  artist: ["Alex Rivera", "Sarah Chen", "Marcus V", "Elena D."][i % 4],
  category: CATEGORIES[1 + (i % 5)],
  image: `https://picsum.photos/seed/${i + 77}/1000/1200`,
  model: "Stable Diffusion XL",
  prompt: "Hyper-realistic render, cinematic lighting, intricate mechanical details, deep shadows, 8k octane render, brutalist composition.",
  // Define bento spans based on index patterns
  size: i === 0 || i === 7 ? 'large' : i === 3 || i === 8 ? 'wide' : i === 5 ? 'tall' : 'standard'
}));

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArt, setSelectedArt] = useState(null);

  const filteredArtworks = useMemo(() => {
    return MOCK_ARTWORKS.filter(art => {
      const matchesCategory = activeCategory === "All" || art.category === activeCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      {/* 1. TYPOGRAPHIC HEADER */}
      <header className="px-6 md:px-12 pt-40 pb-20 border-b border-black/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-[14vw] leading-[0.75] font-medium uppercase tracking-tighter">
                Visual<br/>Archive
            </h1>
            <div className="max-w-xs space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] leading-relaxed opacity-60">
                    A curated selection of machine-generated artifacts. Each piece is a unique synthesis of algorithmic logic and human prompt engineering.
                </p>
                <div className="h-px w-full bg-black/10"></div>
                <div className="flex justify-between text-[10px] font-bold">
                    <span>V.2.06</span>
                    <span>{filteredArtworks.length} ITEMS</span>
                </div>
            </div>
        </div>
      </header>

      {/* 2. MINIMALIST CONTROLS */}
      <section className="sticky top-0 z-[50] bg-white/90 backdrop-blur-xl px-6 md:px-12 py-6 border-b border-black/5 flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex gap-6 overflow-x-auto no-scrollbar w-full lg:w-auto">
          {CATEGORIES.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative pb-1 ${
                activeCategory === cat ? 'text-black' : 'text-black/30 hover:text-black'
              }`}
            >
              {cat}
              {activeCategory === cat && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></div>}
            </button>
          ))}
        </div>
        
        <div className="relative w-full lg:w-96 group">
          <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity" />
          <input 
            type="text" 
            placeholder="Search the archive..." 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-2 pl-6 text-[10px] uppercase outline-none border-b border-black/10 focus:border-black transition-all" 
          />
        </div>
      </section>

      {/* 3. THE BENTO GRID */}
      <main className="p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-dense gap-6">
          {filteredArtworks.map((art) => (
            <BentoItem 
              key={art.id} 
              art={art} 
              onOpen={() => setSelectedArt(art)} 
            />
          ))}
        </div>
      </main>

      {/* 4. THE PORTAL MODAL */}
      {selectedArt && createPortal(
        <SpecModal art={selectedArt} onClose={() => setSelectedArt(null)} />,
        document.body
      )}

      <Footer />
    </div>
  );
};

// --- BENTO ITEM COMPONENT ---
const BentoItem = ({ art, onOpen }) => {
  // Logic to determine grid spans
  const spanClass = {
    large: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
    wide: "md:col-span-2 aspect-[16/9]",
    tall: "md:row-span-2 aspect-[3/4] md:aspect-auto",
    standard: "aspect-[4/5]"
  }[art.size];

  return (
    <div 
      className={`group relative overflow-hidden bg-zinc-100 border border-black/5 transition-all duration-700 ${spanClass}`}
    >
      <img 
        src={art.image} 
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
        alt="" 
      />
      
      {/* Dynamic Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-6 backdrop-blur-[2px]">
        <div className="flex justify-between items-start translate-y-[-10px] group-hover:translate-y-0 transition-transform duration-500">
            <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest">{art.category}</span>
            <ArrowUpRight size={20} className="text-white"/>
        </div>

        <div className="translate-y-[20px] group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-white text-xl font-bold uppercase tracking-tighter mb-4">{art.title}</h3>
            <button 
              onClick={(e) => { e.stopPropagation(); onOpen(); }}
              className="w-full bg-white text-black py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors"
            >
              View Specs
            </button>
        </div>
      </div>
    </div>
  );
};

// --- SPEC MODAL (PORTAL READY) ---
const SpecModal = ({ art, onClose }) => {
  const modalRef = useRef();

  useGSAP(() => {
    gsap.fromTo(modalRef.current, 
        { opacity: 0, y: 30, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power4.out" }
    );
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-10" onClick={onClose}>
      <div 
        ref={modalRef}
        className="bg-white text-black w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col lg:flex-row relative"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-4 bg-white hover:bg-black hover:text-white transition-all">
            <X size={20}/>
        </button>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 bg-zinc-200">
            <img src={art.image} className="w-full h-full object-cover" alt="" />
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto">
            <div className="mb-12">
                <span className="text-[10px] font-black tracking-[0.4em] opacity-30 uppercase block mb-2">{art.category}</span>
                <h2 className="text-6xl font-medium uppercase tracking-tighter leading-none">{art.title}</h2>
                <p className="mt-4 text-xs font-bold opacity-50 uppercase tracking-widest">Architect: {art.artist}</p>
            </div>

            <div className="space-y-10">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest opacity-30">
                        <Palette size={14}/> 
                        PROMPT BLUEPRINT
                    </div>
                    <div className="bg-zinc-50 p-6 border border-black/5 text-xs md:text-sm font-mono leading-relaxed group relative">
                        {art.prompt}
                        <button className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => navigator.clipboard.writeText(art.prompt)}>
                            <Copy size={14}/>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-black/10">
                        <p className="text-[9px] font-black opacity-30 mb-2 uppercase">Core Model</p>
                        <p className="text-xs font-bold uppercase">{art.model}</p>
                    </div>
                    <div className="p-4 border border-black/10">
                        <p className="text-[9px] font-black opacity-30 mb-2 uppercase">Render Mode</p>
                        <p className="text-xs font-bold uppercase">Raw - 4000px</p>
                    </div>
                </div>

                <button className="w-full bg-black text-white py-6 text-[11px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-4 group">
                    License Artwork
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;