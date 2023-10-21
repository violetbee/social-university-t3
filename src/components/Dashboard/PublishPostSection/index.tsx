/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { IPostSlicer } from "../../../types/post";
import { useForm } from "react-hook-form";
import { AnketForm, GonderiForm, EtkinlikForm, DosyaForm } from "./particles";
import { trpc } from "../../../utils/trpc";
import { uniqueFileName } from "../../../utils/func";
import instance from "../../../utils/axios";
import { memo } from "react";
import { TfiFiles, TfiLayoutListPost } from "react-icons/tfi";
import { MdEmojiEvents } from "react-icons/md";
import { RiQuestionAnswerLine, RiSurveyLine } from "react-icons/ri";
import { SiHomeadvisor } from "react-icons/si";

const PublishPostSection = () => {
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
      className={`${
        isOpen
          ? "my-5 grid-rows-[1fr] opacity-100"
          : "mt-0 grid-rows-[0fr] opacity-0"
      }  col-span-7 grid transition-all duration-300 ease-in-out`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit);
        }}
        className="grid w-full grid-cols-1 overflow-hidden rounded-md bg-white shadow-md dark:border dark:border-darkHelper dark:bg-darkSecondary"
      >
        <div
          className={`${
            option.formType && "hidden"
          } grid w-full grid-cols-1 justify-between divide-y divide-darkHelper dark:bg-darkSecondary lg-m:grid-cols-2 lg:grid-cols-6 lg:divide-x`}
        >
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
            <TfiLayoutListPost className="h-6 w-6" />
            Gönderi Paylaş
            <input
              type="radio"
              value="gonderi"
              {...register("formType")}
              className="hidden"
            />
          </label>
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
            <TfiFiles className="h-6 w-6" />
            Dosya Paylaş
            <input
              type="radio"
              value="dosya"
              {...register("formType")}
              className="hidden"
            />
          </label>
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
            <MdEmojiEvents className="h-6 w-6" />
            Etkinlik Oluştur
            <input
              type="radio"
              value="etkinlik"
              {...register("formType")}
              className="hidden"
            />
          </label>
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
            <RiQuestionAnswerLine className="h-6 w-6" />
            Soru Sor
            <input
              type="radio"
              value="soru-cevap"
              {...register("formType")}
              className="hidden"
            />
          </label>
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
            <RiSurveyLine className="h-6 w-6" />
            Anket Oluştur
            <input
              type="radio"
              value="anket"
              {...register("formType")}
              className="hidden"
            />
          </label>
          <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 p-4 hover:bg-darkBackground">
            <SiHomeadvisor className="h-6 w-6" />
            İlan Oluştur
            <input
              type="radio"
              value="ilan"
              {...register("formType")}
              className="hidden"
            />
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
            className="h-10 rounded-md border-[1px] border-[#777] px-10 font-medium text-[#333] duration-75 hover:bg-darkBackground hover:text-white dark:text-white"
          >
            Gönder
          </button>
          <button
            onClick={() => {
              reset();
            }}
            className="h-10 font-medium text-[#555]"
          >
            İşlemi İptal Et
          </button>
        </div>
      </form>
    </div>
  );
};

export default memo(PublishPostSection);
