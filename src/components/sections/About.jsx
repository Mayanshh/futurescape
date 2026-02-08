import SmoothReveal from '../effects/SmoothReveal';

const About = () => {
  return (
    <div id="about-section" className='!overflow-x-hidden'>
      <div
        id="textRevealParent"
        className="relative z-20 w-full min-h-screen bg-white flex flex-col justify-end"
      >
        {/* ---------------- MAIN STATEMENT ---------------- */}
        <div
          className="
            px-6 sm:px-8
            w-full lg:w-[83%]
            absolute bottom-[25%] lg:absolute
            lg:bottom-[2.25%]
            lg:left-0
            lg:-translate-y-1/2
          "
        >
          <SmoothReveal
            text=" &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Driven by algorithmic innovation, we empower creators, technologists, visionaries, and global brands in the ideation, generation, and physical materialization of AI-driven media, cinematic environments, digital artifacts, and future-ready prototypes."
            className="
              text-black uppercase tracking-tight align-left
              text-[1.25em] sm:text-[1.6em] lg:text-[2.1em]
              leading-[0.90] lg:leading-[0.92]
            "
          />
        </div>

        {/* ---------------- SUPPORTING INFO ---------------- */}
        <h3
          id="infoText"
          className="
            mt-6 lg:mt-0
            px-6 sm:px-8
            w-full lg:max-w-[34%]
            absolute bottom-[5%] lg:absolute
            lg:bottom-[-2.25%]
            lg:left-0
            text-black tracking-tight align-left
            text-[1em] sm:text-[0.95em] lg:text-[0.99em]
            leading-[1.25] lg:leading-[1.45]
          "
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
