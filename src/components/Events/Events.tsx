import Masonry from "react-masonry-css";
import Event from "./Event";
import { useState } from "react";

interface Props {
  itemPiece?: number;
}

const Events = ({ itemPiece }: Props) => {
  const [isEventOpen, setisEventOpen] = useState<boolean>(true);

  return (
    <div className="h-full">
      <div className="flex items-center pb-3">
        <div className="w-2 border-t-[1px] border-black"></div>
        <span className="mx-4 flex-shrink text-2xl font-medium text-[#222]">
          Etkinlikler
        </span>
        <div className="flex-grow border-t-[1px] border-black"></div>
        <button className="mx-1 flex-shrink border-2 border-black bg-black py-[1px] px-4 text-lg font-medium text-white md:mx-4 md:px-8 ">
          {/* Sort Events SVG */}
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="w-2 border-t-[1px] border-black"></div>

        <button className="mx-1 flex-shrink border-2 border-black bg-black py-[1px] px-4 text-lg font-medium text-white after:content-['>'] md:mx-4 md:px-8 md:after:content-['Daha_Fazlasını_Gör'] "></button>
        <div className="w-2 border-t-[1px] border-black"></div>
        <button
          onClick={() => {
            setisEventOpen(!isEventOpen);
          }}
          className="mx-1 w-16 flex-shrink border-2 border-black bg-white py-[1px] text-lg font-medium text-black md:mx-4 md:w-20"
        >
          {isEventOpen ? "Gizle" : "Göster"}
        </button>
        <div className="w-2 border-t-[1px] border-black"></div>
      </div>
      <Masonry
        breakpointCols={{
          default: 5,
          2450: 5,
          1854: 4,
          1565: 3,
          1223: 2,
          700: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {itemPiece
          ? [...Array(itemPiece)].map((_, i) => (
              <Event isOpen={isEventOpen} key={i} />
            ))
          : [...Array(12)].map((_, i) => <Event key={i} />)}

        {/* <div className="group mb-5 w-72">
            <div className="w-full rounded-lg bg-[#222] shadow-sm">
              <div className="flex -translate-y-1 translate-x-1 flex-col rounded-lg border-[1px] border-[#222] bg-white shadow-sm duration-200 group-hover:translate-y-0 group-hover:translate-x-0">
                <h1 className="px-3 py-2 text-lg font-medium leading-6 tracking-wider">
                  Harika bir gönderi!
                </h1>
                <p className="px-3 pb-1 text-sm ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta quasi aliquid laboriosam quibusdam quo corporis vel,
                  odit quos in explicabo et consequuntur tenetur facilis
                  laudantium assumenda reiciendis dolor molestias est!
                </p>
                <button className="seeMore mx-3 my-4 flex items-center justify-center self-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div> */}
      </Masonry>
    </div>
  );
};

export default Events;
