import { useRef } from 'react';
import { ChevronRight, ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Workflow = () => {
  const images = [
    './images/img1.avif',
    './images/img2.avif',
    './images/img3.avif',
    './images/img4.avif',
    './images/img5.avif',
    './images/img6.avif',
    './images/img7.avif',
  ];

  const container = useRef(null);
  const lineRef = useRef(null);
  const imageDivRef = useRef(null);
  const imgTagRef = useRef(null);

  useGSAP(
    () => {
      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        let { isDesktop } = context.conditions;

        // ARROW + IMAGE SYNC TIMELINE
        const arrowTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#textRevealParent',
            start: '150% top',
            end: '+=80%',
            scrub: 1.5,
          },
        });

        // Responsive values
        // On mobile, the line is shorter and the image moves less to stay within viewport
        arrowTl.to(lineRef.current, { 
          width: isDesktop ? '300px' : '80px', 
          ease: 'none' 
        }, 0);

        arrowTl.to(imageDivRef.current, { 
          x: isDesktop ? '143.5%' : '15%', 
          ease: 'none' 
        }, 0);

        const obj = { prop: 0 };
        arrowTl.to(
          obj,
          {
            prop: images.length - 1,
            ease: `steps(${images.length - 1})`,
            onUpdate: () => {
              const index = Math.round(obj.prop);
              if (imgTagRef.current) {
                imgTagRef.current.src = images[index];
              }
            },
          },
          0
        );
      });

      return () => mm.revert(); // Cleanup
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative z-20 w-full min-h-screen bg-white flex flex-col items-start justify-start px-6 lg:px-8 py-20 lg:py-0"
    >
      {/* Description Text */}
      <h3
        id="infoText2"
        className="text-[1rem] lg:text-[0.99em] leading-[1.4] lg:leading-[1.45] text-black w-full tracking-tight max-w-full lg:max-w-[34%] h-auto lg:mt-[3.5%]"
      >
        Our hybrid curation strategy allows us to guide the implementation of
        machine intelligence in a vast spectrum of projects—exhibitions, brand
        campaigns, physical spaces, and architectural concepts—balancing artistic
        soul, material feasibility, and project constraints.
      </h3>

      {/* Animated Headline */}
      <div className="w-full h-fit py-10 lg:h-[4em] text-black text-[3.8vw] lg:text-[4.4em] lg:-mt-[0.7em] font-[500] tracking-tight whitespace-nowrap flex items-center overflow-visible">
        <span className="mr-3 lg:mr-6 uppercase">From Prompts</span>
        <div className="flex items-center relative h-full">
          <hr
            ref={lineRef}
            className="border-none bg-black h-[1.5px] lg:h-[2.5px] shrink-0"
            style={{ width: '1em', marginRight: '-2px' }}
          />
          <div className="flex items-center">
            <ChevronRight
              className="w-[0.5em] h-[0.5em] lg:w-[0.6em] lg:h-[0.6em] -ml-[0.3em] lg:-ml-[0.37em]"
              strokeWidth={2.8}
            />
          </div>
        </div>
        <span className="ml-3 lg:ml-6 uppercase">To Presence</span>
      </div>

      {/* Sliding Image Container */}
      <div
        ref={imageDivRef}
        className="h-[30vh] w-[75vw] lg:h-[24em] lg:w-[37.5em] rounded-lg bg-neutral-100 relative lg:bottom-[6.5em] overflow-hidden shadow-2xl"
      >
        <img
          ref={imgTagRef}
          loading="eager"
          src={images[0]}
          alt="scrolling selection"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Link */}
      <div className="h-fit w-full lg:w-[16%] relative lg:absolute mt-10 lg:mt-0 lg:bottom-[1.8em] lg:right-[1.8em] text-black">
        <a
          href="#"
          className="text-[1rem] lg:text-[1.2em] uppercase flex items-center gap-2 group"
        >
          MORE ON FUTURESCAPE
          <ArrowDownRight className="w-[1.2em] h-[1.2em] lg:w-[0.68em] lg:h-[0.68em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </div>
  );
};

export default Workflow;