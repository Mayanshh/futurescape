import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SmoothReveal = ({ text, className = "", stagger = 0.03 }) => {
  const container = useRef();

  useGSAP(() => {
    const words = container.current.querySelectorAll(".word-inner");

    gsap.fromTo(
      words,
      {
        y: "110%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: stagger,
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: container });

  const renderContent = () => {
    // 1. Handle the initial spaces/indentation separately
    const indentMatch = text.match(/^(&nbsp;|\s)+/);
    const indentation = indentMatch ? indentMatch[0] : "";
    const remainingText = text.replace(/^(&nbsp;|\s)+/, "");

    // 2. Split by <br /> 
    return (
      <>
        {/* Render the indentation first as raw HTML */}
        <span dangerouslySetInnerHTML={{ __html: indentation }} />
        
        {remainingText.split("<br />").map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {/* Split each line into words */}
            {line.split(/\s+/).map((word, wordIndex) => (
              word.length > 0 && (
                <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em] py-1">
                  <span className="word-inner inline-block will-change-transform opacity-0">
                    {word}
                  </span>
                </span>
              )
            ))}
            {/* If there are more lines, insert a real <br /> */}
            {lineIndex < remainingText.split("<br />").length - 1 && <br />}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <div ref={container} className={`${className}`}>
      <p className="w-full">
        {renderContent()}
      </p>
    </div>
  );
};

export default SmoothReveal;