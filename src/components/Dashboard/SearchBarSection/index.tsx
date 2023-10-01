import { ShareButton } from "./particles/ShareButton";
import SearchInput from "./particles/SearchInput";

const CategoryAndMenuSection = () => {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <SearchInput />
        <ShareButton />
      </div>
    </div>
  );
};

export default CategoryAndMenuSection;
