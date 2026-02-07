import CutoutParallax from '../effects/CutOutParallax';

const Projects = () => {
  return (
    <div
      id="projects-section"
      className="relative z-20 w-full h-[320vh] bg-white px-8 pt-[10vh]"
    >
      <div className="flex flex-col items-center justify-start">
        <div className="flex justify-between items-start w-full h-[100vh] pt-[10vh]">
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img1.avif"
            title=" Katharina Grosse, Splinter, 2022 Paris "
            width="48vw"
            height="80vh"
            speed={15}
          />
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img2.avif"
            title=" Rick Owens, Sleeping Pod, Art of Genius, Moncler, 2023 London"
            width="48%"
            height="40vh"
            speed={15}
          />
        </div>
        <div className="flex justify-between items-start w-full h-[100vh] pt-[10vh] pl-[7.5em] pr-[3.5em]">
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img3.avif"
            title=" Rick Owens, Ski Hut, City of Genius, Moncler x Shanghaï, 2024 Shanghai "
            width="45vw"
            height="52vh"
            speed={15}
          />
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img4.avif"
            title=" Paris 2024, Olympic and Paralympic Truce Mural, 2024 Paris "
            width="36.5vw"
            height="66vh"
            speed={15}
          />
        </div>
        <div className="flex justify-between items-start w-full h-[100vh] pt-[10vh]">
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img5.avif"
            title=" Subodh Gupta, Very Hungry God, 2006 Paris "
            width="45vw"
            height="50vh"
            speed={15}
          />
          <CutoutParallax
            inset="0"
            src="/images/parallaxImages/img6.avif"
            title=" Agence R&Sie(n), Snake, 2002 Paris "
            width="48vw"
            height="80vh"
            speed={15}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;