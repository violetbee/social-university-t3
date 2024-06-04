import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setIsShareOpen } from "../../../../store/slices/app";
import { BiPlus } from "react-icons/bi";
import { type RootState } from "../../../../store/store";

export const ShareButton = () => {
  const dispatch = useDispatch();
  const isShareOpen = useSelector((state: RootState) => state.app.isShareOpen);

  const media = useMediaQuery("(max-width: 768px)");
  return (
    <button
      onClick={() => {
        dispatch(setIsShareOpen());
      }}
      className={`flex items-center justify-center gap-2 rounded-lg border  ${isShareOpen ? "dark:bg-white dark:text-darkSecondary hover:dark:bg-white/85" : "dark:bg-darkSecondary hover:dark:bg-darkBackground"} border-darkHelper bg-white px-4 duration-150  dark:shadow-md `}
    >
      <div className="mb-1 rounded-md bg-darkPrimary p-2">
        <BiPlus size={media ? 14 : 11} className="dark:text-darkSecondary" />
      </div>
      {!media && "Sen de Paylaş!"}
    </button>
  );
};
