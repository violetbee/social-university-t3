import { useState } from "react";
import { usePagination } from "../../../../../../hooks/usePagination";
import { trpc } from "../../../../../../utils/trpc";
import Banner from "../../../../molecules/slider";
import Pagination from "../../../../molecules/pagination";
import SubCategory from "../../../../../subCategory";
import { MultiEvent } from "../../../../molecules/cards/Event";

const NUMBER_OF_EVENTS_RECEIVED = 9;

function Etkinlikler() {
  const pagination = usePagination(NUMBER_OF_EVENTS_RECEIVED, 5);

  const { data: eventTypes } = trpc.event.getEventTypes.useQuery();
  const [filter, setFilter] = useState<Set<string>>(new Set());

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <Banner />
      <SubCategory
        onChange={pagination.setClickedPage}
        data={eventTypes?.data}
        filter={filter}
        setFilter={setFilter}
      />
      <MultiEvent itemPiece={5} />
      <Pagination {...pagination} />
    </div>
  );
}

export default Etkinlikler;
