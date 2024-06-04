import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { useForm } from "react-hook-form";
import { LiaPlusSolid } from "react-icons/lia";
import { CiSquareRemove } from "react-icons/ci";
import instance from "../../../../utils/axios";
import { getBase64 } from "../../../../utils/func";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";

const initialValues = {
  title: "",
  content: "",
  departmentId: "",
  classId: "",
  level: 0,
  universityId: "",
  files: [] as File[],
};

function DosyaForm({ cancelProcess }: { cancelProcess: () => void }) {
  const [files, setFiles] = useState<File[]>([]);

  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );

  const { register, handleSubmit, reset, setValue, watch, resetField } =
    useForm({
      defaultValues: initialValues,
    });

  const watchForm = watch();

  const ctx = trpc.useContext();

  const getDepartments = trpc.department.getAllDepartments.useQuery({
    universityId,
  });

  const getClasses = trpc.department.getClasses.useQuery(
    {
      departmentId: watchForm.departmentId,
      level: Number(watchForm.level),
    },
    {
      enabled: !!watchForm.level && !!watchForm.departmentId,
    },
  );

  const createDocPost = trpc.post.createDocPost.useMutation();

  const handleDocPost = async (data: typeof initialValues) => {
    try {
      const res = await Promise.all(
        files.map(async (file) => {
          const res = await instance.post("/api/fileUpload", {
            data: await getBase64(file),
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          return res.data;
        }),
      );

      createDocPost.mutate(
        {
          ...data,
          universityId,
          files: res.map((file) => {
            return {
              name: file.name,
              size: file.size,
              type: file.fileType,
              url: file.url,
            };
          }),
        },
        {
          onSuccess: (res) => {
            reset();
            ctx.invalidate();
            toast.success(res.message);
            cancelProcess();
          },
          onError: (err) => {
            JSON.parse(err.message).forEach((err: Error) =>
              toast.error(err.message),
            );
          },
        },
      );
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  useEffect(() => {
    if (watchForm.departmentId) {
      resetField("level");
      resetField("classId");
    }
  }, [watchForm.departmentId, resetField]);

  useEffect(() => {
    if (watchForm.level) {
      resetField("classId");
    }
  }, [watchForm.level, resetField]);

  return (
    <form
      onSubmit={handleSubmit(handleDocPost)}
      className="mx-auto flex w-full flex-col gap-4 p-4"
    >
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <label className="flex w-full flex-col md:w-2/4">
          <span className="text-lg font-semibold">Dosya Başlığı</span>
          <input
            type="text"
            {...register("title")}
            className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
          />
        </label>
        <div className="flex w-full flex-col md:w-2/6">
          <span className="text-lg font-semibold">Bölüm Seç</span>
          <div className="relative w-full">
            <select
              {...register("departmentId")}
              className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-[9px] pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
            >
              <option value="" disabled={!!watchForm.departmentId}>
                {getClasses.data?.length === 0
                  ? "Henüz bir ders yok"
                  : "Ders Seç"}
              </option>
              {getDepartments.data?.map(({ department }) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`flex w-full flex-col md:w-2/6 ${
            watchForm.departmentId ? "opacity-100" : "opacity-50"
          }`}
        >
          <span className="text-lg font-semibold">Sınıf Seç</span>
          <div className="relative w-full">
            <select
              {...register("level")}
              disabled={!watchForm.departmentId}
              className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-[9px] pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
            >
              <option value={0} disabled={!!watchForm.departmentId}>
                Sınıf Seç
              </option>
              {Array.from(
                {
                  length:
                    getDepartments.data?.find(
                      (item) => item.department.id === watchForm.departmentId,
                    )?.department.maxClassLevel || 0,
                },
                (_, i) => i + 1,
              ).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`flex w-full flex-col md:w-2/6 ${
            watchForm.level ? "opacity-100" : "opacity-50"
          }`}
        >
          <span className="text-lg font-semibold">Ders Seç</span>
          <div className="relative w-full">
            <select
              {...register("classId")}
              className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-[9px] pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
              disabled={!watchForm.level}
            >
              <option value="" disabled={!!watchForm.classId}>
                {getClasses.data?.length === 0
                  ? "Henüz bir ders yok"
                  : "Ders Seç"}
              </option>
              {getClasses.data?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <label className="flex flex-grow flex-col gap-2">
        <span className="text-lg font-semibold">Dosya Açıklaması*</span>
        <textarea
          {...register("content")}
          className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
        />
      </label>
      <div className="flex w-full gap-4">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 ">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-darkBackground bg-darkBackground/40 hover:dark:bg-darkBackground/10">
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => {
                const files = Array.from(e.target.files as FileList);
                setFiles((prev) => [...prev, ...files]);
                setValue("files", files);
              }}
            />
            <LiaPlusSolid className="h-8 w-8 shrink-0 text-white/50" />
          </div>
        </label>

        {files.length === 0 ? (
          <span className="flex w-full flex-col justify-center text-lg font-medium text-whitish/60">
            Henüz dosya seçmediniz.
            <p className="text-sm font-extralight tracking-wide">
              Gönderi tipiniz dosya olduğu için en az bir dosya seçmeniz
              gerekmektedir.
            </p>
          </span>
        ) : (
          <div className="flex gap-3">
            {files.map((file) => (
              <span
                key={file.name}
                className="relative flex h-full flex-col items-center justify-center gap-1 rounded-md border-2 border-darkBackground bg-darkBackground/40 px-8 text-lg font-medium text-white"
              >
                {file.name}
                <span className="font-extralight text-whitish/60">
                  {file.size > 1000000
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : `${(file.size / 1024).toFixed(2)} KB`}
                </span>
                <button
                  className="absolute right-0 top-0 items-center justify-center"
                  onClick={() => {
                    setFiles(files.filter((f) => f.name !== file.name));
                  }}
                >
                  <CiSquareRemove className="h-5 w-5 text-white" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className={`mx-auto space-x-4`}>
        <button
          type="submit"
          className="h-10 rounded-md border-[1px] border-[#777] px-10 font-medium text-[#333] duration-75 hover:bg-darkBackground hover:text-white dark:text-white"
        >
          Gönder
        </button>
        <button
          onClick={cancelProcess}
          className="h-10 font-medium text-[#555] hover:text-white"
        >
          İşlemi İptal Et
        </button>
      </div>
    </form>
  );
}
export default DosyaForm;
