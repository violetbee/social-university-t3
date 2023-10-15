import { FC } from "react";
import University from "../UniversityArea/University";
import Link from "next/link";
import {
  IoFastFoodOutline,
  IoLocationOutline,
  IoSchoolOutline,
} from "react-icons/io5";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";
// import { useTheme } from "next-themes";

// import University from "../UniversityArea/University";

const LeftSideBar: FC = () => {
  // const { theme, setTheme } = useTheme();

  return (
    <div className="hidden flex-col justify-between border-r border-[#444]/10 bg-[#EFEFF1] dark:bg-darkBackground lg:w-64 xl:flex xl:w-80">
      <div className="flex w-full flex-col pt-2">
        <University />
        <div className="mt-4 flex h-full w-full flex-col items-center pt-4">
          <Link
            href="#"
            className="text-whitish flex h-12 w-full items-center gap-2 px-4 text-base font-medium transition-colors duration-150 dark:hover:bg-darkSecondary"
          >
            <IoFastFoodOutline size={22} />
            <span className="pt-1">Yemekhane Menüsü</span>
          </Link>
          <Link
            href="#"
            className="text-whitish flex h-12 w-full items-center gap-2 px-4 text-sm font-medium transition-colors duration-150 dark:hover:bg-darkSecondary"
          >
            <IoLocationOutline size={22} />
            <span className="pt-1">Üniversiteme Nasıl Giderim?</span>
          </Link>
          <Link
            href="#"
            className="flex h-12 w-full items-center gap-2 px-4 text-base font-medium text-white transition-colors duration-150 dark:hover:bg-darkSecondary"
          >
            <IoSchoolOutline size={22} />
            <span className="pt-1">Okul Kulüplerini Keşfet</span>
          </Link>
        </div>

        {/* <button
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
          className="flex h-12 w-full flex-shrink-0 items-center justify-center bg-[#14151b] text-white"
        >
          Karanlık Moda Geç
        </button> */}
      </div>

      <div>
        <div className="flex items-center justify-center border-y-[1px] border-[#444]/10 bg-white py-12 text-[#111] dark:bg-[#14151b] dark:text-white">
          Bu alan reklam için ayrılmıştır.
        </div>
        <div>
          <div className="relative h-full w-full overflow-hidden">
            <div className="w-full bg-[#14151b] p-4 text-white shadow-sm">
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
            <Image
              src="/svg/share.svg"
              alt="share"
              width={10}
              height={10}
              className="absolute -bottom-10 -right-1 h-32 w-32 -rotate-45 text-white opacity-30"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
