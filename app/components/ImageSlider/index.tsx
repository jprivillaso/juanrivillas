"use client";

import { ReactNode } from "react";

type ImageSliderProps = {
  children: ReactNode[];
};

export const ImageSlider = ({ children }: ImageSliderProps) => {
  return (
    <section className="slider w-[500px] text-center overflow-hidden">
      {children.map((c, idx) => (
        <a
          href={`#slide-${idx + 1}`}
          className="inline-flex mr-2 w-6 h-6 bg-white no-underline	items-center justify-center rounded-full mb-2 relative hover:bg-black hover:text-white"
        >
          {idx + 1}
        </a>
      ))}

      <div className="slides flex overflow-x-auto snap-x scroll-smooth">
        {children.map((c, idx) => (
          <div
            className="snap-start shrink-0 bg-[#eee] w-[500px] h-[500px] mr-[50px] rounded-xl origin-center scale-100	transition transform delay-500 flex relative justify-center items-center	"
            id={`slide-${idx + 1}`}
          >
            {c}
          </div>
        ))}
      </div>
    </section>
  );
};
