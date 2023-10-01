import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useDispatch } from "react-redux";
import { setIsShareOpen } from "../../../../store/slices/app";
import { BiPlus } from "react-icons/bi";

export const ShareButton = () => {
  const dispatch = useDispatch();

  const media = useMediaQuery("(max-width: 768px)");
  return (
    <div className="relative">
      <button
        onClick={() => {
          dispatch(setIsShareOpen());
        }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#333] text-xl text-white shadow-sm peer-focus:bg-slate-500 dark:border dark:border-darkHelper dark:bg-darkSecondary dark:shadow-md md:relative md:bottom-0 md:right-0 md:z-0 md:h-[48px] md:w-44 md:bg-[#dd4e63] md:dark:bg-darkPrimary"
      >
        {media ? <BiPlus size={40} /> : "Sen de Paylaş!"}
      </button>
    </div>
  );
};
