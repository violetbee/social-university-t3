import { FC } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
// import University from "../UniversityArea/University";
import { useTheme } from "next-themes";

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

const RightSideBar: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="hidden flex-col justify-between overflow-y-auto border-l-[1px] border-[#444]/10 bg-[#EFEFF1] dark:bg-darkBackground lg:w-64 xl:flex xl:w-80">
      <div className="w-full flex-1">
        <div className="flex w-full flex-col">
          {/* Üniversite Gez Başlangıç */}
          {/* <div className="mt-2 flex items-center justify-between pl-3 pr-2">
            <p className="text-base/none font-medium text-[#222]">
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
          <University /> */}
          {/* Üniversite Gez Son */}
          {/* Şehrini Keşfet Başlangıç */}
          <div className="mb-3 mt-4 flex space-x-1 pl-4 pr-2 pt-3">
            <p className="text-base/none font-semibold text-rose-900 dark:text-green-400">
              Samsun
            </p>
            <p className="text-base/none font-medium text-[#222] dark:text-white">
              Şehrini Keşfet
            </p>
          </div>
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
          {/* Şehrini Keşfet Son */}
        </div>
      </div>

      <div className="h-40 w-full">
        <div className="flex h-full items-center justify-center border-y-[1px] border-[#444]/10 bg-white text-[#111] dark:bg-[#14151b] dark:text-white">
          Bu alan reklam için ayrılmıştır.
        </div>
      </div>
      <div>
        <div className="relative flex w-full flex-col gap-6 overflow-hidden">
          <div className="w-full self-center bg-violet-900 p-4 text-white shadow-sm">
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
        <button
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
          className="flex h-12 w-full flex-shrink-0 items-center justify-center bg-[#222] text-white"
        >
          Karanlık Moda Geç
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
