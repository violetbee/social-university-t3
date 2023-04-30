import withPopup from "./HoC/withPopup";
import { ShareButton } from "./ShareButton";
import ShareFormMain from "./Form/ShareFormMain";
import Categories from "./Categories";
import SearchInput from "./SearchInput";
import { IDashboardProps } from "../types/app";

const CategoryAndMenuSection = ({ params }: IDashboardProps) => {
  const ShareBt = withPopup(ShareButton, ShareFormMain);

  return (
    <div className="flex flex-col gap-4 px-5 pb-3 pt-6">
      <div className="flex items-center justify-between gap-4">
        <SearchInput />
        <ShareBt />
      </div>
      <Categories params={params} />
    </div>
  );
};

export default CategoryAndMenuSection;
