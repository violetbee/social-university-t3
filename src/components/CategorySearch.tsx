import { useState } from "react";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import { BiSearchAlt } from "react-icons/bi";

const CategorySearch = () => {
  const { query } = useRouter();
  const [active, setActive] = useState<string>(
    (query.category as string) ?? "all"
  );
  const { data } = trpc.category.getAll.useQuery();

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-3">
      <div className="flex items-center gap-4">
        <h1 className=" text-3xl font-semibold leading-none text-[#222]">
          {query.category
            ? data?.find((item) => item.slug === query.category)?.name
            : "Her Şey"}
        </h1>
        <label htmlFor="searchBar" className="relative h-full flex-1">
          <input
            type="text"
            className={`w-full rounded-md border-2 border-black bg-white px-8 py-2 pl-8 pr-10 text-black  outline-none placeholder:text-slate-400`}
            id="searchBar"
            placeholder="Ara"
          />
          <BiSearchAlt className="absolute top-1/2 left-2 h-full -translate-y-1/2 transform text-2xl text-black" />
        </label>
      </div>
      <div className="flex items-center">
        <Link
          href={"/dashboard"}
          onMouseEnter={() => setActive("all")}
          onMouseLeave={() => setActive(query.category as string)}
          className={`flex-shrink-0 cursor-pointer whitespace-nowrap border-[1px] px-3 py-2 align-middle leading-[1.2] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_#333] ${
            active === "all"
              ? "rounded-full border-black bg-white"
              : "border-transparent"
          }`}
        >
          Her Şey
        </Link>
        {data &&
          data.map((category) => (
            <Link
              onMouseEnter={() => setActive(category.slug)}
              onMouseLeave={() =>
                setActive((query.category as string) || "all")
              }
              href={`/gonderiler/${category.slug}`}
              key={category.id}
              className={`flex-shrink-0 cursor-pointer whitespace-nowrap border-[1px] px-3 py-2 align-middle leading-[1.2] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_#333] ${
                active === category.slug
                  ? "rounded-full border-black bg-white"
                  : "border-transparent"
              }`}
            >
              {category.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategorySearch;