import { ShareButton } from "../Buttons/ShareButton";
import SearchInput from "./SearchBar/SearchInput";

const CategoryAndMenuSection = () => {
  return (
    <div className="flex flex-col gap-4 px-5 pt-6">
      <div className="flex items-center justify-between gap-4">
        <SearchInput />
        <ShareButton />
      </div>
    </div>
  );
};

export default CategoryAndMenuSection;
