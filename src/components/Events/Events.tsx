import Masonry from "react-masonry-css";
import Event from "./Event";
import { EventType, Event as TypeOfEvent } from "@prisma/client";
import { trpc } from "../../utils/trpc";

interface Props {
  itemPiece?: number;
  events?: (TypeOfEvent & {
    eventType: EventType;
  })[];
}

const Events = ({ itemPiece }: Props) => {
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
