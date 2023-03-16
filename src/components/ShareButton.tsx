import Image from "next/image";
import { useMediaQuery } from "../hooks/useMediaQuery";

type Props = {
  setOpen: () => void;
};

export const ShareButton = ({ setOpen }: Props) => {
  const media = useMediaQuery("(max-width: 768px)");
  return (
    <button
      onClick={setOpen}
      className="absolute bottom-2 right-2 z-50 flex h-16 w-16 items-center justify-center rounded-full border-[2px] border-white bg-[#333] text-xl text-white md:relative md:bottom-0 md:right-0 md:z-0 md:h-[48px] md:w-44 md:rounded-md md:bg-[#dd4e63]"
    >
      {media ? (
        <Image
          src={"/svg/plus.svg"}
          alt="newPost"
          width={100}
          height={100}
          className="h-14 w-14"
        ></Image>
      ) : (
        "Sen de Paylaş!"
      )}
    </button>
  );
};
