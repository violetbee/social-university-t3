import { FC } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import University from "./University";

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
];

const LeftSideBar: FC = () => {
  return (
    <div className="hidden flex-col justify-between overflow-y-auto border-r-[1px] border-[#444]/10 bg-[#EFEFF1] lg:flex lg:w-64 xl:w-80">
      <div className="w-full flex-1">
        <div className="flex w-full flex-col">
          {/* Üniversite Gez Başlangıç */}
          <div className="mt-2 flex items-center justify-between pl-3 pr-2">
            <p className="text-lg/none font-medium text-[#222]">
              Üniversite Gez
            </p>
            <div className="flex items-center gap-2">
              <button className="flex items-center justify-center rounded-md hover:bg-gray-300 ">
                <svg
                  className="h-6 w-6 text-[#222]"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <polyline points="15 6 9 12 15 18"></polyline>
                </svg>
              </button>
            </div>
          </div>
          <University />
          {/* Üniversite Gez Son */}
          {/* Şehrini Keşfet Başlangıç */}
          <div className="mt-2 flex space-x-1 border-t-[1px] pl-3 pr-2 pt-3">
            <p className="text-lg/none font-semibold text-rose-900">Samsun</p>
            <p className="text-lg/none font-medium text-[#222]">
              Şehrini Keşfet
            </p>
          </div>
          {discoverCity.map((city) => (
            <div
              key={city.id}
              className="flex h-16 w-full cursor-pointer items-center justify-between pl-3 pr-4 hover:bg-gray-200"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={city.image as string}
                  width={100}
                  height={100}
                  className="h-12 w-14 rounded-md object-fill"
                  alt="deneme"
                />
                <div className="flex flex-col">
                  <p className="text-md font-medium text-[#333] duration-200 group-hover:rounded-full group-hover:bg-violet-800 group-hover:px-4 group-hover:py-1 ">
                    {city.name}
                  </p>
                  <p className="text-sm text-[#666]">{city.content}</p>
                </div>
              </div>
              {/* How many stars get */}
              <div className="flex flex-1 justify-end">
                <svg
                  className="h-6 w-6 text-orange-600"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <polyline points="12 8 8 4 12 0 16 4 12 8"></polyline>
                  <path
                    d="M8 12v6l4-2l4 2v-6"
                    transform="translate(0 2)"
                  ></path>
                </svg>
                <p className=" w-3 text-end font-light">{city.rate}</p>
              </div>
            </div>
          ))}

          {/* Şehrini Keşfet Son */}
        </div>
      </div>

      <div className="h-40 w-full">
        <div className="flex h-full items-center justify-center border-y-[1px] border-[#444]/10 bg-white text-[#111]">
          Bu alan reklam için ayrılmıştır.
        </div>
      </div>
      <div>
        <div className="relative flex w-full flex-col gap-6 overflow-hidden">
          <div className="w-full self-center bg-violet-800 p-4 text-white shadow-sm">
            <h1 className="text-lg font-medium text-white">Sosyal Medya</h1>
            <ul className="mt-2 flex gap-2">
              <li className="flex h-8 w-8 items-center justify-center">
                <FaTwitter className="text-white" size={32} />
              </li>
              <li className="flex h-8 w-8 items-center justify-center">
                <FaFacebook className="text-white" size={32} />
              </li>
              <li className="flex h-8 w-8 items-center justify-center">
                <FaInstagram className="text-white" size={32} />
              </li>
              <li className="flex h-8 w-8 items-center justify-center">
                <FaGithub className="text-white" size={32} />
              </li>
            </ul>
          </div>
          <div className="absolute -bottom-10 -right-1">
            <Image
              src="/svg/share.svg"
              alt="share"
              width={10}
              height={10}
              className="h-32 w-32 -rotate-45 text-white opacity-30"
            />
          </div>
        </div>
        <button className="flex h-12 w-full flex-shrink-0 items-center justify-center bg-[#222] text-white">
          Karanlık Moda Geç
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
