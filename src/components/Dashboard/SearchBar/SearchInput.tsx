import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { BiSearchAlt } from "react-icons/bi";

const SearchInput = () => {
  const { query } = useRouter();
  const { data } = trpc.category.getAll.useQuery();
  return (
    <>
      <h1 className="text-xl font-semibold leading-none text-[#333] dark:text-white md:text-3xl">
        {query.category
          ? data?.find((item) => item.slug === query.category)?.name
          : "Her Şey"}
      </h1>
      <label htmlFor="searchBar" className="relative h-full flex-1">
        <input
          type="text"
          className={`w-full rounded-md border-b-[1px] border-[#888]/20 bg-white py-4 pl-10 pr-4 font-medium leading-none text-[#333] outline-none placeholder:text-slate-400`}
          placeholder="Ara"
        />
        <BiSearchAlt className="absolute left-2 top-[23px] h-full -translate-y-1/2 transform text-2xl text-slate-400" />
      </label>
    </>
  );
};

export default SearchInput;
