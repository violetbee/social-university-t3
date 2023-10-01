import { FC } from "react";
import Image from "next/image";
// import University from "../UniversityArea/University";

const discoverCity = [
  {
    id: 0,
    name: "Peçko Fırın",
    image: "/images/pecko.jpg",
    content: "Pastahane, Fırın, Kafe",
    rate: 4.6,
  },
  {
    id: 1,
    name: "No:75 Passage",
    image: "/images/passage.jpg",
    content: "Bar, Kafe, Restoran",
    rate: 3.8,
  },
  {
    id: 2,
    name: "Tren Samsun",
    image: "/images/tren.jpg",
    content: "Konser, Etkinlik, Kulüp",
    rate: 5,
  },
  {
    id: 3,
    name: "Tren Samsun",
    image: "/images/tren.jpg",
    content: "Konser, Etkinlik, Kulüp",
    rate: 5,
  },
  {
    id: 4,
    name: "No:75 Passage",
    image: "/images/passage.jpg",
    content: "Bar, Kafe, Restoran",
    rate: 3.8,
  },
  {
    id: 5,
    name: "Peçko Fırın",
    image: "/images/pecko.jpg",
    content: "Pastahane, Fırın, Kafe",
    rate: 4.6,
  },
];

const DiscoverYourCity: FC = () => {
  return (
    <div className="grid grid-cols-3">
      {discoverCity.map((city) => (
        <div
          key={city.id}
          className="group flex h-16 w-full cursor-pointer items-center justify-between pl-4 pr-6 hover:bg-gray-200 dark:hover:bg-darkSecondary"
        >
          <div className="flex items-center gap-3">
            <Image
              src={city.image as string}
              width={100}
              height={100}
              className="h-12 w-14 rounded-md object-fill object-center"
              alt="deneme"
            />
            <div className="flex flex-col">
              <p className="text-md group-hover:text- font-semibold text-[#222] dark:text-white">
                {city.name}
              </p>
              <p className="text-sm text-[#9d9c9c]">{city.content}</p>
            </div>
          </div>
          <p className="text-center text-lg font-bold text-white">
            {city.rate}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DiscoverYourCity;
