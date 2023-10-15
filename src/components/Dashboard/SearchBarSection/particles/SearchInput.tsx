import { BiSearchAlt } from "react-icons/bi";

const SearchInput = () => {
  return (
    <label
      htmlFor="searchBar"
      className="flex h-full flex-1 items-center justify-center"
    >
      <div className="relative w-1/3">
        <input
          type="text"
          className={`w-full border-b border-b-white/20 bg-transparent py-2 pl-8 pr-4 font-medium leading-none text-white outline-none placeholder:text-white/20`}
          placeholder="Ara"
        />
        <BiSearchAlt className="absolute left-0 top-1/2 h-full -translate-y-1/2 transform text-2xl text-white/20" />
      </div>
    </label>
  );
};

export default SearchInput;
