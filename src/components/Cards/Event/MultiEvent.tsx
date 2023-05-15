import Masonry from "react-masonry-css";
import Event from "./SingleEvent";
import { trpc } from "../../../utils/trpc";
import { MultiEventProps } from "../../../types/event";

const Events = ({ itemPiece }: MultiEventProps) => {
  const { data: universityId } = trpc.user.getUserUniversityById.useQuery();
  const { data: eventsByQuery } = trpc.event.getAllEvents.useQuery({
    query: universityId?.university?.id || "",
  });

  return (
    <Masonry
      breakpointCols={{
        default: 5,
        2450: 5,
        1854: 4,
        1565: 3,
        1223: 2,
        640: 1,
      }}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {itemPiece
        ? eventsByQuery
            ?.slice(0, itemPiece)
            .map((event, i) => <Event event={event} key={i} />)
        : eventsByQuery?.map((event, i) => <Event event={event} key={i} />)}
    </Masonry>
  );
};

export default Events;
