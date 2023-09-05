import Event from "./SingleEvent";
import { trpc } from "../../../utils/trpc";
import { MultiEventProps } from "../../../types/event";

const Events = ({ itemPiece }: MultiEventProps) => {
  const { data: universityId } = trpc.user.getUserUniversityById.useQuery();
  const { data: eventsByQuery } = trpc.event.getAllEvents.useQuery({
    query: universityId?.university?.id || "",
  });

  return (
    <>
      {itemPiece
        ? eventsByQuery
            ?.slice(0, itemPiece)
            .map((event, i) => <Event event={event} key={i} />)
        : eventsByQuery?.map((event, i) => <Event event={event} key={i} />)}
    </>
  );
};

export default Events;
