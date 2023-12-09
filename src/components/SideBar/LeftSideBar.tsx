import { FC, useState } from "react";
import Link from "next/link";
import {
  IoFastFoodOutline,
  IoLocationOutline,
  IoSchoolOutline,
} from "react-icons/io5";

import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const LeftSideBar: FC = () => {
  const { theme, setTheme } = useTheme();

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <aside
      className={`sticky top-[60px] hidden h-[calc(100vh-60px)] flex-col justify-between overflow-hidden border-r border-[#444]/10 bg-[#EFEFF1] duration-200 dark:bg-darkBackground ${
        isNavOpen ? "lg:w-64 xl:flex xl:w-80" : "lg:w-12 xl:flex xl:w-16"
      }`}
    >
      <button
        onClick={() => {
          setIsNavOpen((prev) => !prev);
        }}
        className="absolute right-4 top-3 z-10 flex h-8 w-8 flex-col items-center justify-center space-y-1 rounded-md bg-darkSecondary"
      >
        <span
          className={`block h-[1px] w-4 rounded-full bg-whitish/60 transition-all duration-300 ${
            isNavOpen
              ? "translate-x-[1px] translate-y-[2px] rotate-45 transform"
              : ""
          }`}
        ></span>
        <span
          className={`block h-[1px] w-4 rounded-full bg-whitish/60 transition-all duration-300 ${
            isNavOpen && "hidden"
          }`}
        ></span>
        <span
          className={`block h-[1px] w-4 rounded-full bg-whitish/60 transition-all duration-300 ${
            isNavOpen ? "-translate-y-[3px] -rotate-45 transform" : ""
          }`}
        ></span>
      </button>
      <div
        onClick={() => {
          if (!isNavOpen) setIsNavOpen(true);
        }}
        className="mt-16 flex h-full w-full flex-col items-center"
      >
        <Link
          href="#"
          className="flex h-12 w-full items-center gap-2 px-4 pl-[18px] text-base font-medium text-whitish transition-colors duration-150 dark:hover:bg-darkSecondary"
        >
          <IoFastFoodOutline size={22} className="shrink-0" />
          {isNavOpen && (
            <span className="shrink-0 pt-1 ">Yemekhane Menüsü</span>
          )}
        </Link>
        <Link
          href="#"
          className="flex h-12 w-full items-center gap-2 px-4 pl-[18px] text-sm font-medium text-whitish transition-colors duration-150 dark:hover:bg-darkSecondary"
        >
          <IoLocationOutline size={22} className="shrink-0" />
          {isNavOpen && (
            <span className="shrink-0 pt-1 ">Üniversiteme Nasıl Giderim?</span>
          )}
        </Link>
        <Link
          href="#"
          className="flex h-12 w-full items-center gap-2 px-4 pl-[18px] text-base font-medium text-white transition-colors duration-150 dark:hover:bg-darkSecondary"
        >
          <IoSchoolOutline size={22} className="shrink-0" />
          {isNavOpen && (
            <span className="shrink-0 pt-1">Okul Kulüplerini Keşfet</span>
          )}
        </Link>
      </div>
      <button
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
        className="flex h-12 w-full items-center justify-center gap-2 px-4 text-base font-medium text-whitish transition-colors duration-150 hover:bg-whitish dark:hover:bg-darkSecondary"
      >
        {theme === "dark" ? (
          <MdDarkMode size={22} />
        ) : (
          <MdLightMode size={22} color="#333" />
        )}
      </button>

      {/* <div>
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
      </div> */}
    </aside>
  );
};

export default LeftSideBar;
