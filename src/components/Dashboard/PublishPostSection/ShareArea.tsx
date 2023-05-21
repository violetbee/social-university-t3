import { useSelector } from "react-redux";
import Image from "next/image";
import { IPostSlicer } from "../../../types/post";
import { useForm } from "react-hook-form";
import GonderiForm from "./PostTypeForms/GonderiForm";
import DosyaForm from "./PostTypeForms/DosyaForm";
import EtkinlikForm from "./PostTypeForms/EtkinlikForm";
import AnketForm from "./PostTypeForms/AnketForm";
import { trpc } from "../../../utils/trpc";

const Share = () => {
  const isOpen = useSelector((state: IPostSlicer) => state.app.isShareOpen);

  const { register, watch, handleSubmit, reset, setValue } = useForm();

  const option = watch();

  // TRPC QUERIES START

  const createTextPost = trpc.post.createTextPost.useMutation();
  const getUserUniversityId = trpc.user.getUserUniversityById.useQuery();

  // TRPC QUERIES END

  const onSubmit = (data: any) => {
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${
      data?.coverImage[0]?.name
    }`;

    delete data.formType;
    // TODO: axios requests should be switch case due to formType
    createTextPost.mutateAsync({
      ...data,
      universityId: getUserUniversityId.data?.university?.id,
      image: fileName,
    });
  };

  return (
    <div
      className={`w-full overflow-hidden duration-300 ${
        isOpen ? "max-h-[1000px]" : "max-h-0"
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-3 rounded-md bg-white shadow-sm"
      >
        <div
          className={`${
            option.formType && "hidden"
          } grid w-full grid-cols-4 justify-between `}
        >
          <label className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
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
              <input
                type="radio"
                value="gonderi"
                {...register("formType")}
                className="hidden"
              />
              Bir gönderi paylaşmak için buraya tıklayın.
            </div>
          </label>
          <label className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
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
              <h1 className="text-lg font-semibold ">Dosya Paylaş</h1>
              <input
                type="radio"
                value="dosya"
                {...register("formType")}
                className="hidden"
              />
              Bir gönderi paylaşmak için buraya tıklayın.
            </div>
          </label>
          <label className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
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
              <h1 className="text-lg font-semibold ">Etkinlik Oluştur</h1>
              <input
                type="radio"
                value="etkinlik"
                {...register("formType")}
                className="hidden"
              />
              Bir gönderi paylaşmak için buraya tıklayın.
            </div>
          </label>
          <label className="group flex cursor-pointer items-center justify-evenly gap-3 rounded-l-md p-4 ">
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
              <h1 className="text-lg font-semibold ">Anket Oluştur</h1>
              <input
                type="radio"
                value="anket"
                {...register("formType")}
                className="hidden"
              />
              Bir gönderi paylaşmak için buraya tıklayın.
            </div>
          </label>
        </div>
        {option.formType === "gonderi" && (
          <GonderiForm
            register={register}
            setValue={setValue}
            option={option}
          />
        )}
        {option.formType === "dosya" && <DosyaForm />}
        {option.formType === "etkinlik" && <EtkinlikForm />}
        {option.formType === "anket" && <AnketForm />}
        <div
          className={`${
            option.formType ? "flex" : "hidden"
          } mx-auto max-w-[1200px] gap-10 pb-2`}
        >
          <button
            type="submit"
            className="h-10 rounded-md border-[1px] border-[#777] px-10 font-medium text-[#333] duration-75 hover:bg-[#333] hover:text-white"
          >
            Gönder
          </button>
          <button
            onClick={() => {
              reset();
            }}
            className="h-10 font-medium text-[#333]"
          >
            İptal Et
          </button>
        </div>
      </form>
    </div>
  );
};

export default Share;
