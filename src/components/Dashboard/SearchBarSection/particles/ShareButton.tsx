import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useDispatch } from "react-redux";
import { setIsShareOpen } from "../../../../store/slices/app";
import { BiPlus } from "react-icons/bi";

export const ShareButton = () => {
  const dispatch = useDispatch();

  const media = useMediaQuery("(max-width: 768px)");
  return (
    <button
      onClick={() => {
        dispatch(setIsShareOpen());
      }}
      className="flex items-center justify-center gap-2 rounded-lg border border-darkHelper bg-white px-4 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground"
    >
      <div className="mb-1 rounded-md bg-darkPrimary p-2">
        <BiPlus size={media ? 14 : 11} className="dark:text-darkSecondary" />
      </div>
      {!media && "Sen de Paylaş!"}
    </button>
  );
};
