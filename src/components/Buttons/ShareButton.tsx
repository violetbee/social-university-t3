import Image from "next/image";
import { useMediaQuery } from "../../hooks/useMediaQuery";
// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsShareOpen } from "../../store/slices/app";
import { IPostSlicer } from "../../types/post";

export const ShareButton = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: IPostSlicer) => state.app.isShareOpen);

  const media = useMediaQuery("(max-width: 768px)");
  return (
    <div className="relative">
      <button
        onClick={() => {
          dispatch(setIsShareOpen());
        }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#333] text-xl text-white shadow-sm peer-focus:bg-slate-500 md:relative md:bottom-0 md:right-0 md:z-0 md:h-[48px] md:w-44 md:rounded-md md:bg-[#dd4e63]"
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
      {/* <ul
        className={`absolute ${
          isOpen ? "block" : "hidden"
        } top-14 w-full divide-y-[1px] rounded-md border-[1px] border-[#dbdbdb] bg-white shadow-sm`}
      >
        <li className="relative flex cursor-pointer items-center justify-end overflow-hidden px-2 py-3 hover:bg-[#f0f0f0] hover:bg-opacity-20">
          <p className="text-md pt-1 tracking-wider text-[#333]">
            Gönderi Paylaş
          </p>
          <Image
            src={"/svg/flame.svg"}
            alt="newPost"
            width={10}
            height={10}
            className="absolute -left-7 top-1 h-16 w-16 opacity-20"
          ></Image>
        </li>
        <li className="relative flex cursor-pointer items-center justify-end overflow-hidden px-2 py-3 hover:bg-[#f0f0f0] hover:bg-opacity-20">
          <p className="text-md pt-1 tracking-wider text-[#333]">
            Dosya Paylaş
          </p>
          <Image
            src={"/svg/pen.svg"}
            alt="newPost"
            width={10}
            height={10}
            className="absolute -left-7 top-1 h-16 w-16 opacity-20"
          ></Image>
        </li>
        <li className="relative flex cursor-pointer items-center justify-end overflow-hidden px-2 py-3 hover:bg-[#f0f0f0] hover:bg-opacity-20">
          <p className="text-md pt-1 tracking-wider text-[#333]">
            Etkinlik Oluştur
          </p>
          <Image
            src={"/svg/event.svg"}
            alt="newPost"
            width={10}
            height={10}
            className="absolute -left-4 top-1 h-16 w-16 opacity-20"
          ></Image>
        </li>
      </ul> */}
    </div>
  );
};
