import Masonry from "react-masonry-css";
import Event from "./Event";
import { EventType, Event as TypeOfEvent } from "@prisma/client";
import { trpc } from "../../utils/trpc";

interface Props {
  itemPiece?: number;
  events?: (TypeOfEvent & {
    EventType: EventType;
  })[];
}

const Events = ({ itemPiece, events }: Props) => {
  const { data: eventsByQuery } = trpc.event.getAllEvents.useQuery();

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
        : events?.map((event, i) => <Event event={event} key={i} />)}
    </Masonry>
  );
};

export default Events;
