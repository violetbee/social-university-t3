import { EventIncludedTypeOfEvent } from "../../../types/event";

const Event = ({ event }: { event: EventIncludedTypeOfEvent }) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <div className={`w-full pt-1 duration-200`}>
      <div
        className={`flex flex-col rounded-lg border border-darkHelper bg-darkSecondary shadow-md duration-200 dark:text-white`}
      >
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
          <button className="seeMore flex w-full items-center justify-center dark:hover:bg-darkPrimary dark:hover:text-white">
            Etkinliği İncele
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
