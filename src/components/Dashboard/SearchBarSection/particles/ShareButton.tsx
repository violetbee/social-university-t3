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
      className="flex h-full shrink-0 items-center justify-center rounded-lg border border-darkHelper bg-[#333] text-xl text-white duration-150 peer-focus:bg-slate-500 dark:border dark:border-darkHelper dark:bg-darkSecondary dark:shadow-md dark:hover:bg-darkBackground dark:hover:shadow-none"
    >
      <div className="mb-1 mr-2 rounded-md bg-darkPrimary p-1">
        <BiPlus size={11} className="dark:text-darkSecondary" />
      </div>
      {media ? "" : "Sen de Paylaş!"}
    </button>
  );
};
