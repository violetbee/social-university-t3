import Link from "next/link";
import { FC } from "react";
import { Abel } from "@next/font/google";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const abel = Abel({
  weight: ["400"],
  preload: true,
  subsets: ["latin"],
});

const LeftSideBar: FC = () => {
  const { data } = trpc.category.getAll.useQuery();
  const { query } = useRouter();

  return (
    <div className="flex w-48 gap-6 xxs-m:flex-col sm-m:w-80 sm-m:flex-row sm-m:justify-center sm-m:gap-4 sm:w-48 sm:flex-col sm:justify-start lg:w-60">
      <Link href="/">
        <div className="z-30 hidden h-28 w-full rounded-lg bg-gradient-to-tr from-blue-700 via-purple-500 to-orange-700 p-4 shadow-sm sm:flex">
          <div className="flex h-full flex-col justify-end">
            <h1 className="text-2xl font-semibold text-slate-50">
              Sosyal Üniversite
            </h1>
            <h3
              className={`text-sm font-thin text-slate-200 ${abel.className}`}
            >
              Yaz, Öğren, Paylaş
            </h3>
          </div>
        </div>
      </Link>
      <div
        className={`w-full space-y-2 rounded-lg bg-primary text-white shadow-sm ${abel.className}`}
      >
        <h1 className="flex items-center rounded-t-lg bg-accent">
          <p className="py-2 px-3 text-lg font-medium text-white">
            Kategoriler
          </p>
        </h1>
        <ul className="inline-flex flex-wrap gap-2 px-2 pb-2">
          {data &&
            data.map((category) => (
              <Link
                href={`/${category.slug}`}
                key={category.id}
                className={`rounded-lg border-[1px] px-2 py-1 duration-150 hover:border-[#B21EED] hover:bg-[#B21EED] ${
                  query.category &&
                  query.category === category.slug &&
                  "bg-[#B21EED]"
                } hover:text-white`}
              >
                {category.name}
              </Link>
            ))}
        </ul>
      </div>
      <div
        className={`${abel.className} w-full rounded-lg bg-primary p-4 tracking-wide shadow-sm`}
      >
        <ul className="space-y-3 font-thin text-white">
          <li className="flex items-center gap-2">
            <div className=" h-2 w-2 animate-pulse rounded-full bg-blue-500" />
            Üniversite hakkında
          </li>
          <li className="flex items-center gap-2">
            <div className=" h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Üniversitem nerede?
          </li>
          <li className="flex items-center gap-2">
            <div className=" h-2 w-2 animate-pulse rounded-full bg-slate-500" />
            Nasıl ulaşırım?
          </li>
        </ul>
      </div>
      <div className="group flex w-full cursor-pointer flex-col space-y-4 rounded-lg bg-gradient-to-r from-secondary to-box p-4 shadow-sm">
        <p className="lowercase leading-4 tracking-wider text-white">
          Okul kulüplerini incelemek ve kayıt olmak için
        </p>
        <span className="-rotate-3 self-center text-2xl font-bold text-white underline decoration-pink-500 decoration-solid duration-150 group-hover:scale-110">
          Hemen Tıkla
        </span>
      </div>

      <div className="w-full rounded-lg bg-gradient-to-r from-primary to-accent p-4 shadow-sm">
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
  );
};

export default LeftSideBar;
