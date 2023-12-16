import Image from "next/image";
import { EventIncludedTypeOfEvent } from "../../../types/event";
import Link from "next/link";

const Event = ({ event }: { event: EventIncludedTypeOfEvent }) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <div className={`w-full pt-1 duration-200`}>
      <div
        className={`flex flex-col rounded-lg border border-darkHelper bg-darkSecondary shadow-md duration-200 dark:text-white`}
      >
        <Image
          src={event.image || ""}
          alt="event"
          width={500}
          height={300}
          className="h-52 w-full rounded-t-lg object-cover object-center"
        />
        <h1 className="h-20 px-3 py-2 pt-4 text-lg font-semibold leading-6 tracking-wider">
          {event.title}
        </h1>
        <div className="flex justify-between">
          <span className="px-3 font-medium">Başlangıç Tarihi:</span>
          <span className="px-3">{startDate.toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="px-3 font-medium">Bitiş Tarihi:</span>
          <span className="px-3">{endDate.toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="px-3 font-medium">Etkinlik Türü:</span>
          <span className="px-3">{event.eventType.name}</span>
        </div>
        <div className="flex justify-between pb-3">
          <span className="px-3 font-medium">Konum:</span>
          <span className="px-3 text-end">{event.location}</span>
        </div>

        <div
          className={`flex h-10 w-full items-center justify-center border-y border-darkHelper bg-darkBackground`}
        >
          <div className="text-xl font-bold text-white">
            Ücret:{" "}
            {event.price ? (
              <span className="text-red-400">{event.price} ₺</span>
            ) : (
              <span className="text-green-400">YOK</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href={`/etkinlikler/${event.slug || ""}`}
            className="seeMore flex w-full items-center justify-center !bg-darkBackground dark:hover:!bg-darkPrimary dark:hover:text-white"
          >
            Etkinliği İncele
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
