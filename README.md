CHDARTMAKER Clone
A high-performance, visually immersive web application cloned from chdartmaker.com. This project focuses on high-end transitions, smooth scrolling, and sophisticated "Artistic Engineering" aesthetics.

🎨 Project Overview
This project is a technical study in modern front-end motion design. It replicates the minimalist, luxury brand identity of CHD, specializing in art fabrication and contemporary creation.

Key Features
Custom Preloader: A sequenced loading screen featuring rapid image cycling, rising typography, and a seamless fade-out transition.

Smooth Scrolling: Integrated Lenis for inertial, buttery-smooth scrolling across all devices.

Scroll-Triggered Animations: Complex pinning, parallax image effects, and text reveals powered by GSAP (GreenSock).

Dynamic Navbar: A reactive navigation system that transitions styles based on scroll depth and section entry.

Parallax Cutouts: Deep-scrolling image containers that create a window-like effect into project photography.

Infinite Marquees: Smooth-looping text carousels for location and brand details.

🚀 Tech Stack
Framework: React.js

Animation: GSAP (ScrollTrigger, useGSAP)

Smooth Scroll: Lenis

Styling: Tailwind CSS

Icons: Lucide React

Portal Rendering: React Portals (for seamless overlay transitions)

🛠️ Installation & Setup
Clone the repository:

Bash

git clone https://github.com/Mayanshh/chdartmaker-clone.git
Install dependencies:

Bash

cd chdartmaker-clone
npm install
Run the development server:

Bash

npm run dev
Build for production:

Bash

npm run build
📐 Architecture Highlights
The Preloader Logic
The site uses a TransitionPortal and a Preloader component. The preloader ensures the main site content is hidden (opacity: 0) until the initial assets and animations are ready, preventing the "Flash of Unstyled Content" (FOUC).

Artistic Engineering Grid
The layout utilizes a strict typographic grid. Most dimensions are set using vw (viewport width) units to ensure the high-end editorial look remains consistent across different screen sizes.

Scroll Pinning
Multiple sections utilize GSAP's pin feature, allowing text to remain fixed while background images or secondary content scroll past, mimicking the "overlay" effect of the original site.


📜 License
This project is for educational/portfolio purposes only. The original design, imagery, and branding are the intellectual property of CHD Artmaker.

Created with ❤️ by Mayansh