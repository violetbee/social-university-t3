import { ShareButton } from "../Buttons/ShareButton";
import Category from "./Category";
import SearchInput from "./SearchBar/SearchInput";
import { IDashboardProps } from "../../types/app";

const CategoryAndMenuSection = ({ params }: IDashboardProps) => {
  return (
    <div className="flex flex-col gap-4 px-5 pb-3 pt-6">
      <div className="flex items-center justify-between gap-4">
        <SearchInput />
        <ShareButton />
      </div>
      <Category params={params} />
    </div>
  );
};

export default CategoryAndMenuSection;
