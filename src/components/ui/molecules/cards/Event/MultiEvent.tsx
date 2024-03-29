import Event from "./SingleEvent";
import { MultiEventProps } from "../../../../../types/event";
import { RootState } from "../../../../../store/store";
import { trpc } from "../../../../../utils/trpc";
import { useSelector } from "react-redux";

const Events = ({ itemPiece, columnCount = 4 }: MultiEventProps) => {
  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );

  const { data: events } = trpc.event.getAllEvents.useQuery({
    query: universityId,
  });

  return (
    <div
      className={`grid w-full grid-cols-1 gap-5 overflow-hidden sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-${columnCount}`}
    >
      {itemPiece
        ? events
            ?.slice(0, itemPiece)
            .map((event, i) => <Event event={event} key={i} />)
        : events?.map((event, i) => <Event event={event} key={i} />)}
    </div>
  );
};

export default Events;
