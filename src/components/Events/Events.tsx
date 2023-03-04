import Masonry from "react-masonry-css";
import Event from "./Event";

interface Props {
  itemPiece?: number;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const Events = ({ itemPiece, isExpanded }: Props) => {
  return (
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
            <Event isOpen={isExpanded} key={i} />
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
  );
};

export default Events;
