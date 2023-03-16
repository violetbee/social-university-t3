import withPopup from "./HoC/withPopup";
import { ShareButton } from "./ShareButton";
import ShareFormMain from "./Form/ShareFormMain";
import Categories from "./Categories";
import SearchInput from "./SearchInput";

const CategoryAndMenuSection = () => {
  const ShareBt = withPopup(ShareButton, ShareFormMain);

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-3">
      <div className="flex items-center justify-between gap-4">
        <SearchInput />
        <ShareBt />
      </div>
      <Categories />
    </div>
  );
};

export default CategoryAndMenuSection;
