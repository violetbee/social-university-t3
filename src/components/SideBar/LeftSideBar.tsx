import { FC } from "react";
import University from "../UniversityArea/University";
import Link from "next/link";
import {
  IoFastFoodOutline,
  IoLocationOutline,
  IoSchoolOutline,
} from "react-icons/io5";

// import University from "../UniversityArea/University";

const LeftSideBar: FC = () => {
  return (
    <div className="hidden justify-between overflow-y-auto border-r border-[#444]/10 bg-[#EFEFF1] dark:bg-darkBackground lg:w-64 xl:flex xl:w-80">
      <div className="flex w-full flex-col divide-y pt-2 dark:divide-darkHelper">
        <University />
        <div className="mt-4 flex h-full w-full flex-col items-center pt-4">
          <Link
            href="#"
            className="flex h-12 w-full items-center gap-2 px-4 text-base font-medium text-white transition-colors duration-150 dark:hover:bg-darkSecondary"
          >
            <IoFastFoodOutline size={22} />
            <span className="pt-1">Yemekhane Menüsü</span>
          </Link>
          <Link
            href="#"
            className="flex h-12 w-full items-center gap-2 px-4 text-sm font-medium text-white transition-colors duration-150 dark:hover:bg-darkSecondary"
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
      </div>
    </div>
  );
};

export default LeftSideBar;
