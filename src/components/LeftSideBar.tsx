import { FC, useEffect, useMemo } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { setSlider } from "../store/slices/app";

const discoverCity = [
  {
    id: 0,
    name: "Peçko Fırın",
    image: "/images/pecko.jpg",
  },
  {
    id: 1,
    name: "No:75 Passage",
    image: "/images/passage.jpg",
  },
  {
    id: 2,
    name: "Tren Samsun",
    image: "/images/tren.jpg",
  },
];

const LeftSideBar: FC = () => {
  const { currentSlider } = useSelector((state: any) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(
        setSlider(
          currentSlider === discoverCity.length - 1 ? 0 : currentSlider + 1
        )
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch, currentSlider]);

  const memoizedSlider = useMemo(() => {
    return discoverCity[currentSlider];
  }, [currentSlider]);

  return (
    <div className="hidden flex-col justify-between overflow-y-auto border-r-[1px] border-[#444]/10 bg-[#EFEFF1] lg:flex lg:w-64 xl:w-80">
      {/* <div className="w-full flex-1 overflow-y-auto">
        <div className="h-32 w-full flex-shrink-0 "></div>
      </div> */}
      <div className="w-full flex-1">
        <div className={`flex w-full flex-col `}>
          {/* Şehrini Keşfet */}

          <div className="flex w-full flex-col">
            <div className="flex justify-between px-1 py-4">
              <p className="text-2xl/none font-bold text-[#222]">
                Şehrini Keşfet
              </p>
              <div className="flex items-center gap-2">
                {/* Collapse left icon */}
                <button className="flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#444]/10 focus:outline-none">
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
            <div className="group relative h-40 w-full cursor-pointer">
              <Image
                src={memoizedSlider?.image as string}
                width={400}
                height={400}
                className="h-40 object-cover"
                alt="deneme"
              />
              <div className="absolute bottom-0 left-0 h-40 w-full bg-black bg-opacity-80 duration-200 group-hover:opacity-0"></div>
              <div className="absolute bottom-0 left-0 flex h-40 w-full items-center justify-center">
                <p className="text-lg font-medium text-white duration-200 group-hover:rounded-full group-hover:bg-violet-800 group-hover:px-4 group-hover:py-1 ">
                  {memoizedSlider?.name}
                </p>
              </div>
            </div>

            {/* <div className="group relative h-20 w-full cursor-pointer">
              <Image
                src="/images/passage.jpg"
                width={400}
                height={300}
                className="h-20 object-cover object-top"
                alt="deneme"
              />
              <div className="absolute bottom-0 left-0 h-20 w-full bg-black bg-opacity-80 duration-200 group-hover:opacity-0"></div>
              <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-center">
                <p className="text-lg font-medium text-white duration-200 group-hover:rounded-full group-hover:bg-violet-800 group-hover:px-4 group-hover:py-1 ">
                  No:75 Passage
                </p>
              </div>
            </div>
            <div className="group relative h-20 w-full cursor-pointer">
              <Image
                src="/images/tren.jpg"
                width={400}
                height={300}
                className="h-20 object-cover "
                alt="deneme"
              />
              <div className="absolute bottom-0 left-0 h-20 w-full bg-black bg-opacity-80 duration-200 group-hover:opacity-0"></div>
              <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-center">
                <p className="text-lg font-medium text-white duration-200 group-hover:rounded-full group-hover:bg-violet-800 group-hover:px-4 group-hover:py-1 ">
                  Tren Samsun
                </p>
              </div>
            </div> */}
          </div>
          {/* Şehrini Keşfet Son */}
          <div className="flex w-full flex-col"></div>
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
