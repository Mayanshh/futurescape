import React from 'react';

// Sections
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Workflow from '../components/sections/Workflow';
import Projects from '../components/sections/Projects';
import Gallery from '../components/sections/Gallery';
import Vision from '../components/sections/Vision';
import Footer from '../components/sections/Footer';
import FullScreenMenu from '../components/FullScreenMenu';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Workflow />
      <FullScreenMenu />
      <Projects />
      <Gallery />
      <Vision />
      <Footer />
    </>
  );
};

export default HomePage;