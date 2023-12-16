import Image from "next/image";
import type { EventDetails } from "../../../../apis/Event/getEventDetails";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { useState } from "react";

type Props = {
  event: EventDetails;
  category: string;
};

function EtkinliklerInPage({ event, category }: Props) {
  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const handleMouseEnter = (item: number) => {
    setHoverIndex(item);
  };

  const handleMouseLeave = () => {
    setHoverIndex(0);
  };

  return (
    <div className="flex w-full gap-4">
      <Image
        alt="image"
        src={event.image!}
        width={500}
        height={100}
        className="sticky top-[92px] h-96 rounded-md border border-darkHelper object-cover object-center"
      />
      <div className="flex w-full flex-col justify-between rounded-md border border-darkHelper bg-darkBackground p-8">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">{event.title}</h1>
          <div className="flex items-center gap-4">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((item) => (
              <div key={item} className="relative">
                <PiHandsClappingDuotone
                  className={`${
                    item > hoverIndex ? "text-white" : "text-darkPrimary"
                  }  peer/rate cursor-pointer transition-colors duration-200 ease-in-out`}
                  size={28}
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                />
                <div className="absolute -bottom-10 left-0 flex h-7 w-7 select-none items-center justify-center rounded-full bg-darkPrimary pr-[1px] pt-[1px] text-white opacity-0 transition-all duration-200 ease-in-out after:absolute after:-top-[2px] after:h-2 after:w-2 after:rotate-45 after:rounded-[1px] after:bg-darkPrimary peer-hover/rate:opacity-100">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* event kategori düğmeleri */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center justify-center gap-2 rounded-md bg-darkPrimary px-2 py-1 text-white">
            {event.eventType.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EtkinliklerInPage;
