import { FC } from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const LeftSideBar: FC = () => {
  return (
    <div className="hidden flex-col justify-between overflow-y-auto border-r-[1px] border-[#444]/10 lg:flex lg:w-64 xl:w-80">
      {/* <div className="w-full flex-1 overflow-y-auto">
        <div className="h-32 w-full flex-shrink-0 "></div>
      </div> */}
      <div className="w-full flex-1">
        <div className={`leftCity flex w-full flex-col `}>
          {/* Şehrini Keşfet */}

          <div className="flex w-full flex-col">
            <p className="h-full py-3 text-center text-2xl font-medium tracking-wide text-white">
              Şehrini Keşfet
            </p>
            <div className="group relative h-20 w-full cursor-pointer">
              <Image
                src="/images/pecko.jpg"
                width={400}
                height={300}
                className="h-20 object-cover"
                alt="deneme"
              />
              <div className="absolute bottom-0 left-0 h-20 w-full bg-black bg-opacity-80 duration-200 group-hover:opacity-0"></div>
              <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-center">
                <p className="text-lg font-medium text-white duration-200 group-hover:rounded-full group-hover:bg-violet-800 group-hover:px-4 group-hover:py-1 ">
                  Peçko Fırın
                </p>
              </div>
            </div>
            <div className="group relative h-20 w-full cursor-pointer">
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
            </div>
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
