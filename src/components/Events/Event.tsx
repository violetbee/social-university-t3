import { Event, EventType } from "@prisma/client";
import Image from "next/image";

const Event = ({ event }: { event: Event & { eventType: EventType } }) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  return (
    <div className={`mx-auto mb-3 h-[350px] px-2 pt-1 duration-200 md:mb-5`}>
      <div
        className={`flex flex-col rounded-lg border-[1px] border-[#333] bg-white duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-0.25rem_0.25rem_#333]`}
      >
        <Image
          src="/images/konser.webp"
          alt=""
          width={200}
          height={200}
          className={`h-24 w-full rounded-t-md object-cover`}
        />
        <h1 className="px-3 py-2 text-lg font-semibold leading-6 tracking-wider">
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
        <div className="flex justify-between">
          <span className="px-3 font-medium">Konum:</span>
          <span className="px-3 text-end">{event.location}</span>
        </div>

        <div
          className={`flex h-10 w-full items-center justify-center border-y-[1px] ${
            "file" === "file" ? "bgFile" : "bgNormal"
          }`}
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
        <div className="flex items-center justify-between px-3 pb-2 pt-2">
          <button className="seeMore flex w-full items-center justify-center">
            {/* <svg
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
            </svg> */}
            Etkinliği İncele
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;
