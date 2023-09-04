/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import Image from "next/image";
import { IPostSlicer } from "../../../types/post";
import { useForm } from "react-hook-form";
import {
  AnketForm,
  GonderiForm,
  EtkinlikForm,
  DosyaForm,
} from "./PostTypeForms";
import { trpc } from "../../../utils/trpc";
import { uniqueFileName } from "../../../utils/func";
import instance from "../../../utils/axios";
import { memo } from "react";

const Share = () => {
  const isOpen = useSelector((state: IPostSlicer) => state.app.isShareOpen);

  const { register, watch, handleSubmit, reset, setValue } = useForm();

  const option = watch();

  // TRPC QUERIES START

  const ctx = trpc.useContext();
  const createTextPost = trpc.post.createTextPost.useMutation();
  // const createDocPost = trpc.post.createDocPost.useMutation();
  const getUserUniversityId = trpc.user.getUserUniversityById.useQuery();

  // TRPC QUERIES END

  async function handlePostType(data: any, formType: string) {
    const formData = new FormData();
    switch (formType) {
      case "gonderi":
        try {
          let isImageExist = false;
          let uniqueName = "";
          if (!!data.coverImage) {
            uniqueName = uniqueFileName(data.coverImage[0].name);
            formData.append("uploadingFiles", data.coverImage[0], uniqueName);
            await instance.post("/api/awsUpload", formData);
            isImageExist = true;
          }
          setTimeout(async () => {
            await createTextPost.mutateAsync(
              {
                ...data,
                universityId: getUserUniversityId.data?.university?.id,
                image: isImageExist ? uniqueName : null,
              },
              {
                onSuccess: () => {
                  reset();
                  ctx.invalidate();
                },
              },
            );
          }, 2000);
        } catch (e) {
          console.log(e);
        }
        break;
      case "dosya":
        Object.values(data.coverImage).forEach((file: any) => {
          const uniqueName = uniqueFileName(file.name);
          formData.append("uploadingFiles", file);
          formData.append("fileName", uniqueName);
        });
        break;
    }
  }

  const onSubmit = async (data: any) => {
    delete data.formType;
    handlePostType(data, option.formType);
  };

  return (
    <div
      className={`w-full overflow-hidden pt-7 duration-300 ${
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
                className="h-10 w-10 shrink-0"
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
                className="h-5 w-5 shrink-0"
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
                className="h-10 w-10 shrink-0"
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
                className="h-10 w-10 shrink-0"
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

export default memo(Share);
