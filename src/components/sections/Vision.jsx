import MarqueeSection from '../MarqueeSection';

const Vision = () => {
  return (
    <div className="relative z-20 w-full h-[80vh] bg-white flex flex-col items-start justify-start">
      <h1 className="text-black px-8 text-[1.65em] indent-25 uppercase tracking-tight leading-[1.1] mt-[8vh] mb-[5vh]">
        A new era of innovation <br /> collaboration and vision.
      </h1>
      <MarqueeSection />
    </div>
  );
};

export default Vision;