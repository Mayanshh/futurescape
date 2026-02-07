import SmoothReveal from '../effects/SmoothReveal';

const About = () => {
  return (
    <div id="about-section">
      <div
        id="textRevealParent"
        className="relative z-20 w-full min-h-screen bg-white"
      >
        <div className="w-[83%] h-fit absolute bottom-[2.25%] transform -translate-y-1/2 left-0 px-8">
          <SmoothReveal
            text=" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Driven by algorithmic innovation, we empower creators, technologists, visionaries, and global brands in the ideation, generation, and physical materialization of AI-driven media, cinematic environments, digital artifacts, and future-ready prototypes."
            className="text-[2.1em] leading-[0.92] text-black w-full tracking-tight uppercase align-left"
          />
        </div>
        <h3
          id="infoText"
          className="text-[0.99em] leading-[1.45] text-black w-full tracking-tight align-left max-w-[34%] h-fit absolute bottom-[-2.25%] left-0 px-8"
        >
          Built on a foundation of digital innovation (2020–2026), we bridge
          algorithmic precision and human emotion for global visionaries.
          Specializing in AI film, concept art, luxury branding, and immersive
          media, we provide a curated methodology that links prompt engineering,
          technical workflows
        </h3>
      </div>
    </div>
  );
};

export default About;