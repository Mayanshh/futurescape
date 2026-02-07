import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, BookOpen, Clock, Hash } from 'lucide-react';
import Footer from '../components/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    id: "01",
    tag: "ETHICS",
    title: "The Ghost in the Latent Space",
    excerpt: "Exploring the residual human subconscious within diffusion-based architectural models.",
    date: "FEB 2026",
    readTime: "8 MIN",
    image: "https://picsum.photos/seed/ghost/800/1000"
  },
  {
    id: "02",
    tag: "PROCESS",
    title: "Brutalist Algorithms",
    excerpt: "Why raw machine logic favors the heavy geometry of mid-century concrete structures.",
    date: "JAN 2026",
    readTime: "12 MIN",
    image: "https://picsum.photos/seed/concrete/800/1000"
  },
  {
    id: "03",
    tag: "FUTURE",
    title: "Post-Human Urbanism",
    excerpt: "Designing cities for an era where the primary residents are server clusters and automated logistics.",
    date: "JAN 2026",
    readTime: "15 MIN",
    image: "https://picsum.photos/seed/city/800/1000"
  }
];

const InsightsPage = () => {
  const containerRef = useRef();
  const cursorImageRef = useRef();
  const [activeImage, setActiveImage] = useState(ARTICLES[0].image);

  useGSAP(() => {
    // 1. Force Navbar Visibility
    gsap.to('.nav-content', { y: '0%', opacity: 1, duration: 0.5 });

    // 2. Heading Reveal (Split-text simulation)
    const tl = gsap.timeline();
    tl.from(".reveal-text", {
      y: 100,
      rotate: 5,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "expo.out"
    });

    // 3. Floating Image Follow Logic
    const moveImage = (e) => {
      gsap.to(cursorImageRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    window.addEventListener('mousemove', moveImage);
    return () => window.removeEventListener('mousemove', moveImage);
  }, { scope: containerRef });

  const handleNavigate = (path) => {
    const navEvent = new CustomEvent('pageTransition', { detail: { path } });
    window.dispatchEvent(navEvent);
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="px-6 md:px-12 pt-40 pb-20 border-b border-white/10">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden">
            <h1 className="reveal-text text-[15vw] leading-[0.8] font-medium uppercase tracking-tighter italic">
              Latent
            </h1>
          </div>
          <div className="overflow-hidden flex justify-end">
            <h1 className="reveal-text text-[15vw] leading-[0.8] font-medium uppercase tracking-tighter">
              /Log
            </h1>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-6">
            <p className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">Intelligence Registry</p>
            <p className="text-xl font-light leading-relaxed">
              Diving deep into the synthetics of creativity. Our research focuses on the friction between human intent and algorithmic output.
            </p>
          </div>
        </div>
      </header>

      {/* 2. FLOATING IMAGE PORTAL (The "Special Touch") */}
      <div 
        ref={cursorImageRef}
        className="fixed top-0 left-0 w-64 h-80 pointer-events-none z-[60] overflow-hidden opacity-0 scale-50 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <img 
          src={activeImage} 
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          alt="Preview"
        />
      </div>

      {/* 3. ARTICLE LIST */}
      <main className="group"> {/* Group triggers the floating image visibility */}
        {ARTICLES.map((article) => (
          <article 
            key={article.id}
            onMouseEnter={() => setActiveImage(article.image)}
            onClick={() => handleNavigate(`/insights/${article.id}`)}
            className="px-6 md:px-12 py-16 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer group/item transition-colors hover:bg-white hover:text-black"
          >
            <div className="flex items-center gap-10 md:w-1/2">
              <span className="text-sm font-mono opacity-40 group-hover/item:opacity-100">{article.id}</span>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Hash size={12} className="opacity-40" />
                  <span className="text-[10px] font-black tracking-widest uppercase">{article.tag}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter leading-none">
                  {article.title}
                </h2>
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:w-1/3 space-y-4">
              <p className="text-sm opacity-60 group-hover/item:opacity-100 transition-opacity">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em]">
                <div className="flex items-center gap-2"><Clock size={12}/> {article.readTime}</div>
                <div>{article.date}</div>
              </div>
            </div>

            <ArrowUpRight 
              size={32} 
              className="hidden md:block opacity-0 group-hover/item:opacity-100 -translate-x-10 group-hover/item:translate-x-0 transition-all duration-500" 
            />
          </article>
        ))}
      </main>

      {/* 4. NEWSLETTER ARCHITECT */}
      <section className="py-40 px-6 md:px-12 flex flex-col items-center text-center">
        <div className="w-full h-px bg-white/10 mb-20" />
        <BookOpen size={40} className="mb-10 opacity-20" />
        <h3 className="text-4xl md:text-7xl font-medium uppercase tracking-tighter mb-12 max-w-4xl">
          Subscribe to the Latent Stream.
        </h3>
        <div className="w-full max-w-2xl relative">
          <input 
            type="email" 
            placeholder="ENVELOPE@LOG.FSS" 
            className="w-full bg-transparent border-b border-white/20 py-6 text-center text-xl uppercase outline-none focus:border-white transition-colors"
          />
          <button className="mt-10 text-[11px] font-black uppercase tracking-[0.5em] hover:opacity-50 transition-opacity">
            Register for Updates
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InsightsPage;