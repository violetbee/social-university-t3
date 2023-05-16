import { useSelector } from "react-redux";
import Image from "next/image";
import { IPostSlicer } from "../../../types/post";

const Share = () => {
  const isOpen = useSelector((state: IPostSlicer) => state.app.isShareOpen);

  return (
    <div
      className={`w-full overflow-hidden duration-300 ${
        isOpen ? "max-h-[1000px]" : "max-h-0"
      }`}
    >
      <div className="mb-3 grid w-full grid-cols-4 justify-between rounded-md bg-white  shadow-sm">
        {/* I want to build a multi step form, first step will be post type. Post types are basic, file included, event type.  Post type step will be horizontal and select input.
        Options will be horizontal */}
        <div className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#525252] group-hover:bg-[#DD4E63]">
            <Image
              src={"/svg/plus.svg"}
              alt="newPost"
              width={100}
              height={100}
              className="h-10 w-10"
            ></Image>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold ">Gönderi Paylaş</h1>
            <p className="text-sm text-gray-500">
              Bir gönderi paylaşmak için buraya tıklayın.
            </p>
          </div>
        </div>
        <div className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#525252] group-hover:bg-[#DD4E63]">
            <Image
              src={"/svg/fileD.svg"}
              alt="newPost"
              width={100}
              height={100}
              className="h-5 w-5"
            ></Image>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Dosya Paylaş</h1>
            <p className="text-sm text-gray-500">
              Bir gönderi paylaşmak için buraya tıklayın.
            </p>
          </div>
        </div>
        <div className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#525252] group-hover:bg-[#DD4E63]">
            <Image
              src={"/svg/plus.svg"}
              alt="newPost"
              width={100}
              height={100}
              className="h-10 w-10"
            ></Image>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Etkinlik Oluştur</h1>
            <p className="text-sm text-gray-500">
              Bir gönderi paylaşmak için buraya tıklayın.
            </p>
          </div>
        </div>
        <div className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#525252] group-hover:bg-[#DD4E63]">
            <Image
              src={"/svg/plus.svg"}
              alt="newPost"
              width={100}
              height={100}
              className="h-10 w-10"
            ></Image>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Anket Oluştur</h1>
            <p className="text-sm text-gray-500">
              Bir gönderi paylaşmak için buraya tıklayın.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
