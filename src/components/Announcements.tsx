import { useRef, useState } from "react";

import Article from "./Article";

const Announcements = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (direction: "left" | "right") => {
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollBy({
          left: -500,
          behavior: "smooth",
        });
      } else {
        scrollRef.current.scrollBy({
          left: 500,
          behavior: "smooth",
        });
      }
    }
  };
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState<boolean>(true);

  return (
    <div>
      <div className="mb-3 flex items-center">
        <div className="w-2 border-t-[1px] border-black"></div>
        <span className="mx-4 flex-shrink text-2xl font-medium text-[#222]">
          Duyurular
        </span>
        <div className="flex-grow border-t-[1px] border-black"></div>
        <button className="mx-4 flex-shrink border-2 border-black bg-black py-[1px] px-8 text-lg font-medium text-white ">
          Daha Fazlasını Gör
        </button>
        <div className="w-2 border-t-[1px] border-black"></div>
        <button
          onClick={() => {
            setIsAnnouncementOpen(!isAnnouncementOpen);
          }}
          className="mx-4 w-20 flex-shrink border-2 border-black bg-white py-[1px] text-lg font-medium text-black "
        >
          {isAnnouncementOpen ? "Gizle" : "Göster"}
        </button>
        <div className="w-2 border-t-[1px] border-black"></div>
      </div>

      <div
        className={`mb-5 flex ${
          isAnnouncementOpen ? "h-44 pb-2 pt-1" : "h-0 p-0"
        } w-full justify-between border-black duration-200`}
      >
        <button
          onClick={() => {
            scrollHandler("left");
          }}
          className="flex h-full w-10 items-center bg-[#111] lg:w-24"
        >
          {/* Left Side Arrow SVG */}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="m-2 h-full w-20 cursor-pointer text-white hover:text-[#c461f2]"
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
          className="flex h-full w-10 items-center bg-[#111] lg:w-24"
        >
          {/* Right Side Arrow SVG */}
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="m-2 h-full w-20 cursor-pointer text-white hover:text-[#c461f2]"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Announcements;
