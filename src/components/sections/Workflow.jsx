import React, { useRef } from 'react';
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
      // ARROW + IMAGE SYNC TIMELINE
      // Triggers based on #textRevealParent (About Section) ending
      const arrowTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#textRevealParent',
          start: '50% top',
          end: '+=100%',
          scrub: 1.5,
        },
      });

      arrowTl.to(lineRef.current, { width: '300px', ease: 'none' }, 0);
      arrowTl.to(imageDivRef.current, { x: '143.5%', ease: 'none' }, 0);

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
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative z-20 w-full min-h-screen bg-white flex flex-col items-start justify-start px-8"
    >
      <h3
        id="infoText2"
        className="text-[0.99em] leading-[1.45] text-black w-full tracking-tight align-left max-w-[34%] h-fit mt-[3.5%]"
      >
        Our hybrid curation strategy allows us to guide the implementation of
        machine intelligence in a vast spectrum of projects—exhibitions, brand
        campaigns, physical spaces, and architectural concepts—balancing artistic
        soul, material feasibility, and project constraints.
      </h3>

      <div className="w-full h-[4em] text-black text-[4.4em] -mt-[0.7em] font-[500] tracking-tight whitespace-nowrap flex items-center overflow-visible">
        <span className="mr-6 uppercase">From Prompts </span>
        <div className="flex items-center relative h-full">
          <hr
            ref={lineRef}
            className="border-none bg-black h-[2.5px] shrink-0"
            style={{ width: '1em', marginRight: '-2px' }}
          />
          <div className="flex items-center">
            <ChevronRight
              style={{
                width: '0.6em',
                height: '0.6em',
                marginLeft: '-0.37em',
              }}
              strokeWidth={2.8}
            />
          </div>
        </div>
        <span className="ml-6 uppercase">To Presence</span>
      </div>

      <div
        ref={imageDivRef}
        className="h-[24em] w-[37.5em] rounded-lg bg-red-200 relative bottom-[6.5em] overflow-hidden"
      >
        <img
          ref={imgTagRef}
          loading="eager"
          fetchpriority="high"
          src={images[0]}
          alt="scrolling selection"
          className="min-w-full min-h-full object-cover"
        />
      </div>

      <div className="h-fit w-[16%] absolute bottom-[1.8em] right-[1.8em] text-black">
        <a
          href="#"
          className="text-[1.2em] uppercase relative bottom-0 right-0 transform -translate-y-1/2"
        >
          MORE ON FUTURESCAPE{' '}
          <ArrowDownRight className="w-[0.68em] absolute -bottom-[0.3em] -right-4 " />
        </a>
      </div>
    </div>
  );
};

export default Workflow;