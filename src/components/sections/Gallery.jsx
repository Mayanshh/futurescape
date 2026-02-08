import { ChevronRight, ArrowDownRight } from 'lucide-react';
import TextScroll from '../effects/TextScroll';

const Gallery = () => {
  return (
    <div className="relative z-20 w-full min-h-screen bg-white flex flex-col justify-between">
      
      {/* ---------------- TOP CTA ---------------- */}
      <div
        className="
          w-full
          mt-[1.5em]
          flex items-center
          justify-end lg:justify-end
          px-4 sm:px-6 lg:pr-[1.8em]
          text-black
        "
      >
        <a
          href="#"
          className="
            inline-flex items-center gap-1
            uppercase tracking-tighter
            text-[1em] sm:text-[1.15em] lg:text-[1.25em]
          "
        >
          <span>Explore Full Gallery</span>
          <ArrowDownRight className="w-[0.7em] h-[0.7em]" />
        </a>
      </div>

      {/* ---------------- SCROLLING TEXT ---------------- */}
      <div className="w-full flex-1 flex items-center">
        <TextScroll speed={1.35} />
      </div>

      {/* ---------------- BOTTOM DIVIDER ---------------- */}
      <div
        className="
          w-full
          flex flex-row items-center 
          gap-3 sm:gap-0
          px-4 sm:px-6 lg:px-[1.8em]
          text-black
          pb-4 sm:pb-0
        "
      >
        <h4 className="uppercase tracking-tight text-sm sm:text-base">
          Vision
        </h4>

        {/* LINE + CHEVRON */}
        <div className="flex items-center w-full relative h-full px-1 sm:px-3">
          <hr
            className="
              border-none bg-black
              h-[0.8px]
              w-full
            "
          />
          <ChevronRight
            className="
              absolute right-2 lg:right-4
              translate-x-1/2
              w-[1.6em] h-[1.6em]
            "
            strokeWidth={0.8}
          />
        </div>

        <h4 className="uppercase tracking-tight text-sm sm:text-base">
          Fabrication
        </h4>
      </div>
    </div>
  );
};

export default Gallery;
