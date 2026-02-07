import { ChevronRight, ArrowDownRight } from 'lucide-react';
import TextScroll from '../effects/TextScroll';

const Gallery = () => {
  return (
    <div className="relative z-20 w-full min-h-screen bg-white flex flex-col items-start justify-between">
      <div className="w-full mt-[1.5em] inline-flex items-center justify-end h-[3.5em] tracking-tighter text-right pr-[1.8em] text-black">
        <a
          href="#"
          className="inline-flex items-center gap-1 text-[1.25em] uppercase"
        >
          <span>Explore Full Gallery</span>
          <ArrowDownRight className="w-[0.65em] h-[0.65em]" />
        </a>
      </div>
      <TextScroll speed={1.35} />
      <div className="h-[3em] w-full  flex items-center justify-between px-[1.8em] text-black">
        <h4 className="uppercase tracking-tight">Vision</h4>
        <div className="flex items-center w-full pl-3 relative h-full">
          <hr
            className="border-none bg-black h-[0.8px] shrink-0"
            style={{ width: '98.5%', marginRight: '-2px' }}
          />
          <div className="flex items-center">
            <ChevronRight
              style={{ width: '1.8em', height: '1.8em', marginLeft: '-0.9em' }}
              strokeWidth={0.8}
            />
          </div>
        </div>
        <h4 className="uppercase tracking-tight">Fabrication</h4>
      </div>
    </div>
  );
};

export default Gallery;