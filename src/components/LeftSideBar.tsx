import Link from "next/link";
import { FC } from "react";
import { Overpass } from "@next/font/google";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const abel = Overpass({
  weight: ["400", "500", "600", "700", "800", "900"],
  preload: true,
  subsets: ["latin"],
});

const LeftSideBar: FC = () => {
  const { data } = trpc.category.getAll.useQuery();
  const { query } = useRouter();

  return (
    <div className="flex w-80 flex-col justify-between gap-6 overflow-y-auto border-r-[1px]">
      <div className="flex w-full flex-col gap-6">
        <div className={`w-full ${abel.className} mt-2`}>
          <ul className="flex flex-col gap-2">
            {data &&
              data.map((category) => (
                <Link
                  href={`/gonderiler/${category.slug}`}
                  key={category.id}
                  className={`font-light tracking-wider text-[#333] duration-150 hover:bg-[#ed7b1e] ${
                    query.category &&
                    query.category === category.slug &&
                    "bg-[#B21EED] !text-white"
                  } py-2 px-3 hover:text-white`}
                >
                  {category.name}
                </Link>
              ))}
          </ul>
        </div>
        <div className={`${abel.className} w-full tracking-wide`}>
          <ul className="space-y-3 font-thin text-[#333]">
            <li className="flex cursor-pointer items-center gap-2 p-2 duration-150 hover:bg-[#ed7b1e] hover:text-white">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500 " />
              <p className={`font-light tracking-wider `}>
                Üniversite hakkında
              </p>
            </li>
            <li className="flex cursor-pointer items-center gap-2 p-2 duration-150 hover:bg-[#ed7b1e] hover:text-white">
              <div className=" h-2 w-2 animate-pulse rounded-full bg-red-500" />
              Üniversitem nerede?
            </li>
            <li className="flex cursor-pointer items-center gap-2 p-2 duration-150 hover:bg-[#ed7b1e] hover:text-white">
              <div className=" h-2 w-2 animate-pulse rounded-full bg-slate-500" />
              Nasıl ulaşırım?
            </li>
          </ul>
        </div>
        <div className="group flex w-11/12 cursor-pointer flex-col space-y-4 self-center rounded-lg bg-gradient-to-r from-orange-500 to-orange-700 p-4 shadow-sm">
          <p className="lowercase leading-4 tracking-wider text-white">
            Okul kulüplerini incelemek ve kayıt olmak için
          </p>
          <span className="-rotate-3 self-center text-2xl font-bold text-white underline decoration-yellow-300 decoration-solid duration-150 group-hover:scale-110">
            Hemen Tıkla
          </span>
        </div>

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
  );
};

export default LeftSideBar;
