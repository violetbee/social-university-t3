import { useState } from "react";
import { usePagination } from "../../../../hooks/usePagination";
import { trpc } from "../../../../utils/trpc";
import { MultiEvent } from "../../../ui/Cards/Event";
import Banner from "../../../banner";
import Pagination from "../../../ui/pagination";
import SubCategory from "../../../subCategory";

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
