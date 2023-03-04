import { useRef } from "react";
import Article from "./Article";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface Props {
  isExpanded: boolean;
}

const Announcements = ({ isExpanded }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const scrollHandler = (direction: "left" | "right") => {
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollBy({
          left: isMobile ? -300 : -500,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: isMobile ? 300 : 500,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      className={`flex ${
        isExpanded ? "mb-5 h-44 pb-2 pt-1" : "h-0 p-0"
      } w-full justify-between border-black duration-200`}
    >
      <button
        onClick={() => {
          scrollHandler("left");
        }}
        className="flex h-full w-10 items-center lg:w-20"
      >
        {/* Left Side Arrow SVG */}
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="m-2 h-full w-20 cursor-pointer text-black"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <div ref={scrollRef} className="flex w-[10px] flex-1 overflow-hidden">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </div>
      <button
        onClick={() => {
          scrollHandler("right");
        }}
        className="flex h-full w-10 items-center lg:w-20"
      >
        {/* Right Side Arrow SVG */}
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="m-2 h-full w-20 cursor-pointer text-black duration-200"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Announcements;
