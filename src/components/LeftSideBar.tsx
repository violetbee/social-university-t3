import Link from "next/link";
import { FC } from "react";
import { Abel } from "@next/font/google";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

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
        className={`w-full space-y-2 rounded-lg bg-white text-slate-900 shadow-sm ${abel.className}`}
      >
        <h1 className="flex items-center rounded-t-lg bg-[#B21EED] ">
          <p className="py-2 px-3 text-lg font-medium tracking-wider text-white">
            Kategoriler
          </p>
        </h1>
        <ul className="inline-flex flex-wrap gap-2 px-2 pb-2">
          {data &&
            data.map((category) => (
              <Link
                href={`/category/${category.slug}`}
                key={category.id}
                className={`rounded-lg border-[1px] px-2 py-1 duration-150 hover:border-[#B21EED] hover:bg-[#B21EED] ${
                  query.category && query.category[0] === category.slug
                    ? "bg-[#B21EED] text-white"
                    : "text-slate-700"
                } hover:text-white`}
              >
                {category.name}
              </Link>
            ))}
        </ul>
      </div>
      <div
        className={`${abel.className} w-full rounded-lg bg-white p-4 shadow-sm`}
      >
        <ul className="space-y-3 font-thin  text-stone-700">
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
    </div>
  );
};

export default LeftSideBar;
