import { FC } from "react";
import { Overpass } from "@next/font/google";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const abel = Overpass({
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: true,
  subsets: ["latin"],
});

const LeftSideBar: FC = () => {
  return (
    <div className="hidden w-80 flex-col justify-between gap-6 overflow-y-auto border-r-[1px] border-black lg:flex">
      <div className="h-40 w-full p-4"></div>
      <div className="space-y-4">
        <div className="flex w-full flex-col gap-6">
          <div className="w-11/12 self-center rounded-lg bg-gradient-to-r from-primary to-accent p-4 shadow-sm">
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
        </div>
        <button className="flex h-12 w-full items-center justify-center border-t-[1px] bg-gradient-to-r from-slate-600 to-slate-800 text-white">
          Karanlık Moda Geç
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
