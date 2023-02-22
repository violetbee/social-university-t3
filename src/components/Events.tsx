import Image from "next/image";
import { useRef, useState } from "react";

type Events = "kahvalti" | "konser" | "sinema" | "gezi" | string;
type EventInfo = {
  title: string;
  time: string;
  image: string;
  body: string;
  yer: string;
};

const events: Record<Events, EventInfo> = {
  kahvalti: {
    title: "Kahvaltı",
    time: "09:00",
    yer: "Kantin",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/bfast.jpg",
  },
  konser: {
    title: "Pinhani Konseri",
    time: "10:00",
    yer: "Null AVM Merkezi",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/konser.webp",
  },
  sinema: {
    title: "Sinema",
    time: "11:00",
    yer: "Sinema Salonu",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/bfast.jpg",
  },
  gezi: {
    title: "Gezi",
    time: "12:00",
    yer: "Seul Parkı",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/bfast.jpg",
  },
  gezi1: {
    title: "Gezi",
    time: "12:00",
    yer: "Seul Parkı",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/bfast.jpg",
  },
  gezi2: {
    title: "Gezi",
    time: "12:00",
    yer: "Seul Parkı",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/bfast.jpg",
  },
  gezi3: {
    title: "Gezi",
    time: "12:00",
    yer: "Seul Parkı",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/bfast.jpg",
  },
  gezi4: {
    title: "Gezi",
    time: "12:00",
    yer: "Seul Parkı",
    body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: "/images/bfast.jpg",
  },
};

const Events = () => {
  const eventRef = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState({ top: 0, left: 0, x: 0, y: 0 });

  // const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
  //     setPos({
  //       left: eventRef.current?.offsetLeft as number,
  //       top: eventRef.current?.offsetTop as number,
  //       x: e.clientX,
  //       y: e.clientY,
  //     });
  // };

  return (
    <div className="col-span-2 space-y-3">
      <p className="text-2xl">Yaklaşan Etkinlikler</p>
      {/* Boxes for events horizontal */}
      <div
        onClick={(e) => {
          // TODO: grab element and move it
        }}
        className="flex space-x-4 overflow-x-auto py-2"
      >
        {Object.keys(events).map((event, i) => (
          <div
            className="flex h-full w-48 flex-shrink-0 flex-col justify-between rounded-md border-[1px]"
            key={i}
            ref={eventRef}
          >
            <div className="relative w-full">
              <Image
                src={events[event]?.image as string}
                alt="Picture of the author"
                className="h-24 rounded-t-md"
                width={250}
                height={150}
              />
            </div>
            <div className="p-2">
              <p className="text-xl">{events[event]?.title}</p>
              <p className="text-gray-400">
                {events[event]?.time} - {events[event]?.yer}
              </p>
              <p>{events[event]?.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
