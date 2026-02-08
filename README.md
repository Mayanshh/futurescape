# FSS / ARCHIVE [V.2.06]

> **"SHAPE THE SYNTHETIC FRONTIER."**

![Project Status](https://img.shields.io/badge/Status-Experimental-black?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-black?style=for-the-badge)
![Framework](https://img.shields.io/badge/React-18-black?style=for-the-badge)

##  ✺ THE MANIFESTO

**FSS (Future Systems / Synthetic)** is a curated digital marketplace and archive for high-fidelity AI-generated artifacts. It bridges the gap between algorithmic logic and human curation.

Designed with a **Brutalist / Architectural** aesthetic, this project prioritizes kinetic typography, micro-interactions, and performance. It abandons standard e-commerce tropes in favor of an immersive, gallery-like experience using **Bento Grids**, **Ghost Hovers**, and **Cinematic Transitions**.

---

## ⚡ CORE TECH STACK

This project is built on a modern, performance-obsessed stack:

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Component architecture and state management. |
| **Vite** | Blazing fast build tool and HMR. |
| **Tailwind CSS** | Utility-first styling for architectural layouts. |
| **GSAP (GreenSock)** | Complex timeline animations and staggered reveals. |
| **Lenis Scroll** | Butter-smooth inertial scrolling. |
| **Lucide React** | Minimalist, stroke-based iconography. |
| **React Portal** | DOM teleportation for high-performance Modals. |

---

## 💎 KEY FEATURES & UX "SPECIAL TOUCHES"

### 1. The Dynamic Bento Gallery
* **Grid-Flow-Dense:** A non-linear grid that automatically packs images of different aspect ratios (Wide, Tall, Standard) into a seamless masonry layout.
* **Dual-Layer Hover:** Cards feature a "shutter" effect where information slides in from opposing axes.

### 2. The "Ghost" Artist List
* **Interactive Inversion:** Artist rows invert colors (White → Black) on interaction.
* **Floating Preview:** A cursor-following "Ghost Image" reveals the artist's top work only when hovering, keeping the UI clean until engaged.
* **Staggered Entrance:** List items cascade in using `GSAP Stagger` for a premium feel.

### 3. Bulletproof Modals
* **React Portals:** Modals are rendered outside the DOM hierarchy (attached to `body`) to prevent Z-index fighting and `insertBefore` crashes.
* **Safety Layers:** Includes `e.stopPropagation` handling and `?.` optional chaining to prevent "Blank Screen" errors on rapid clicking.

### 4. Cinematic Navigation
* **Full-Screen Overlay:** A custom GSAP timeline animates a full-screen menu with a "wipe" effect.
* **Custom Event Routing:** Dispatches `pageTransition` events to ensure smooth exits before changing routes.

---

## 🛠 INSTALLATION & SETUP

**Prerequisites:** Node.js (v16+)

1.  **Clone the Archive:**
    ```bash
    git clone [https://github.com/Mayanshh/futurescape](https://github.com/Mayanshh/futurescape)
    cd fss-archive
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Ignite Local Server:**
    ```bash
    npm run dev
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    ```

---

