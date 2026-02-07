import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Filter, ArrowRight, ArrowLeft, ChevronDown, SlidersHorizontal, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Reuse your existing components where possible
import Navbar from '../components/Navbar'; 
import Footer from '../components/sections/Footer'; // Assuming Footer is modularized as discussed

// --- MOCK DATA (Backend Ready Structure) ---
const CATEGORIES = ["All", "Cinematic", "Architectural", "Abstract", "Fashion", "Character", "Surrealism"];

const MOCK_ARTWORKS = Array.from({ length: 12 }).map((_, i) => ({
  id: `art_${i}`,
  title: [
    "Neon Genesis Tokyo", "Velvet Entropy", "Cybernetic Solitude", 
    "Orbital Decay", "Silicon Dreams", "Quantum Flora"
  ][i % 6] + ` #${i + 1}`,
  artist: ["Alex Rivera", "Sarah Chen", "Marcus V", "Elena D."][i % 4],
  artistHandle: "@" + ["arivera", "schen_art", "mv_visuals", "elena_ai"][i % 4],
  category: CATEGORIES[1 + (i % 6)], // Random category skipping "All"
  image: i % 2 === 0 
    ? "https://images.unsplash.com/photo-1620641788421-7f1c338e420a?q=80&w=1000&auto=format&fit=crop" 
    : "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000&auto=format&fit=crop", // Replace with your local ./images/
  model: ["Midjourney v6", "Stable Diffusion XL", "DALL-E 3"][i % 3],
  prompt: "A futuristic cityscape bathed in neon rain, volumetric lighting, 8k resolution, cinematic composition...",
  likes: 120 + i * 5,
}));

const GalleryPage = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  
  // --- STATE MANAGEMENT ---
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // --- FILTERING LOGIC (Efficient) ---
  const filteredArtworks = useMemo(() => {
    return MOCK_ARTWORKS.filter(art => {
      const matchesCategory = activeCategory === "All" || art.category === activeCategory;
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            art.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.model.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const currentArtworks = filteredArtworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    // 1. Header Reveal
    const tl = gsap.timeline();
    tl.fromTo(".gallery-title-char", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 1, ease: "power4.out" }
    )
    .fromTo(".gallery-filters", 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.5"
    );

  }, { scope: containerRef });

  // Re-trigger grid animation when data changes
  useGSAP(() => {
    if(gridRef.current) {
        gsap.fromTo(gridRef.current.children, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out", clearProps: "all" }
        );
    }
  }, [currentPage, activeCategory, searchQuery]);

  // --- HANDLERS ---
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      window.scrollTo({ top: window.innerHeight * 0.4, behavior: 'smooth' });
      setCurrentPage(newPage);
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* 1. NAVBAR PLACEHOLDER (Or import your Navbar component) */}
      <div className="fixed top-0 w-full z-50 text-white p-8 flex justify-between items-center">
         <Navbar /> 
      </div>

      {/* 2. HEADER SECTION */}
      <header className="w-full h-[60vh] flex flex-col justify-end px-6 md:px-12 pb-12 border-b border-black/10">
        <div className="overflow-hidden">
          <h1 className="text-[12vw] leading-[0.8] tracking-tighter font-medium uppercase">
            {"GALLERY".split("").map((char, i) => (
              <span key={i} className="gallery-title-char inline-block">{char}</span>
            ))}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-end mt-8 w-full">
            <p className="gallery-filters text-sm md:text-lg max-w-md uppercase tracking-tight leading-snug">
              Curated algorithmic masterpieces. <br/>
              Where human intent meets machine precision.
            </p>
            <div className="gallery-filters hidden md:flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
               <span>Live Database</span>
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
        </div>
      </header>

      {/* 3. CONTROLS SECTION (Search & Filter) */}
      <section className="relative top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5 px-6 md:px-12 py-4">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center w-full">
            
            {/* Categories Scroll */}
            <div className="w-full md:w-auto overflow-x-auto no-scrollbar flex items-center gap-2 pb-2 md:pb-0">
               <SlidersHorizontal size={18} className="mr-4 shrink-0 opacity-50" />
               {CATEGORIES.map((cat) => (
                 <button 
                   key={cat}
                   onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                   className={`px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 border ${
                     activeCategory === cat 
                       ? "bg-black text-white border-black" 
                       : "bg-transparent text-black border-black/20 hover:border-black"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-[300px]">
                <input 
                  type="text" 
                  placeholder="Search artist, prompt, model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f4f4f4] text-black px-4 py-3 pl-10 rounded-none focus:outline-none text-sm tracking-wide uppercase placeholder:text-black/40 transition-colors focus:bg-[#ebebeb]"
                />
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
            </div>
        </div>
      </section>

      {/* 4. ARTWORK GRID */}
      <main className="w-full min-h-screen px-6 md:px-12 py-12">
        {currentArtworks.length > 0 ? (
           <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {currentArtworks.map((art) => (
                <ArtCard key={art.id} data={art} />
              ))}
           </div>
        ) : (
            <div className="w-full h-[40vh] flex flex-col items-center justify-center opacity-50">
                <Sparkles size={48} strokeWidth={1} className="mb-4"/>
                <p className="uppercase tracking-widest text-lg">No Artifacts Found</p>
            </div>
        )}

        {/* 5. PAGINATION */}
        <div className="w-full flex justify-between items-center mt-24 pt-8 border-t border-black/10">
             <button 
               disabled={currentPage === 1}
               onClick={() => handlePageChange(currentPage - 1)}
               className="group flex items-center gap-2 uppercase text-sm tracking-widest disabled:opacity-30 transition-all hover:-translate-x-2"
             >
                <ArrowLeft size={16} /> Previous
             </button>
             
             <div className="flex gap-2">
                {Array.from({length: totalPages}).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all ${currentPage === i + 1 ? 'bg-black scale-125' : 'bg-black/20'}`}
                    />
                ))}
             </div>

             <button 
               disabled={currentPage === totalPages}
               onClick={() => handlePageChange(currentPage + 1)}
               className="group flex items-center gap-2 uppercase text-sm tracking-widest disabled:opacity-30 transition-all hover:translate-x-2"
             >
                Next <ArrowRight size={16} />
             </button>
        </div>
      </main>

      {/* 6. FOOTER */}
      <Footer /> 
    </div>
  );
};

// --- SUB-COMPONENT: ART CARD ---
const ArtCard = ({ data }) => {
    return (
        <div className="group relative w-full cursor-pointer">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-gray-100">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 z-10" />
                
                <img 
                   src={data.image} 
                   alt={data.title} 
                   loading="lazy"
                   className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay: Technical Details */}
                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white">
                    <div className="space-y-4">
                        <div>
                            <p className="text-[0.65rem] uppercase tracking-widest opacity-70 mb-1">Prompt Snippet</p>
                            <p className="text-xs leading-relaxed line-clamp-3 font-light border-l-2 border-white/50 pl-3">
                                "{data.prompt}"
                            </p>
                        </div>
                        <div className="flex items-center justify-between border-t border-white/20 pt-3">
                            <div>
                                <p className="text-[0.65rem] uppercase tracking-widest opacity-70">Model</p>
                                <p className="text-xs font-medium">{data.model}</p>
                            </div>
                            <button className="bg-white text-black text-[0.65rem] uppercase font-bold px-4 py-2 hover:bg-white/90 transition-colors">
                                View Specs
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Always Visible Info */}
            <div className="mt-4 flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium uppercase tracking-tight leading-none group-hover:text-gray-600 transition-colors">
                        {data.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">
                        By <span className="text-black">{data.artist}</span>
                    </p>
                </div>
                <div className="text-right">
                     <span className="text-[0.65rem] border border-black/20 px-2 py-1 rounded uppercase tracking-wider">
                        {data.category}
                     </span>
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;