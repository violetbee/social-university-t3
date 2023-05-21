import { trpc } from "../../../../utils/trpc";
import { useFiles } from "../../../../hooks/useFiles";
import { useEffect } from "react";

function GonderiForm({ register, option, setValue }: any) {
  const { handleFiles, refinedFiles } = useFiles();

  // TRPC QUERIES START
  const getCategories = trpc.category.getAll.useQuery();
  // TRPC QUERIES END

  useEffect(() => {
    setValue("coverImage", refinedFiles);
  }, [refinedFiles, setValue]);

  return (
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
      <div className="flex justify-between gap-5">
        <label className="flex w-1/4 flex-col">
          <span className="text-lg font-semibold">Gönderi Başlığı</span>
          <input
            type="text"
            {...register("title")}
            className="block w-full border-b-[1px] border-b-gray-800/20 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
          />
        </label>
        <label className="flex w-1/6 flex-col justify-between gap-2">
          <span className="text-lg font-semibold">Kategori Seç</span>
          <select
            {...register("categoryId")}
            className="block w-full border-b-[1px] border-b-gray-800/20 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
          >
            {getCategories.data?.map((item: any, i: number) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-grow flex-col gap-2">
          <span className="text-lg font-semibold">Gönderi Etiketleri</span>
          <input
            type="text"
            {...register("tags")}
            className="block w-full border-b-[1px] border-b-gray-800/20 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none  sm:text-sm"
          />
        </label>
      </div>

      <label className="flex flex-grow flex-col gap-2">
        <span className="text-lg font-semibold">Gönderi İçeriği</span>
        <textarea
          {...register("content")}
          className="block w-full border-b-[1px] border-b-gray-800/20 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Gönderi Fotoğrafı</span>
        <div className="relative flex h-32 w-full border-2 border-dashed border-gray-300 hover:border-gray-600 hover:bg-gray-100">
          {/* X Icon */}
          {option.coverImage?.length > 0 && (
            <button
              className="absolute right-2 top-2 rounded-full bg-white p-1 hover:bg-gray-200"
              onClick={() => {
                setValue("coverImage", []);
              }} // Clear coverImage
            >
              <svg
                className="h-6 w-6 text-gray-400 group-hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 26l9.5-9.5 7 7L36 16"
                />
              </svg>
            </button>
          )}
          {/* X Icon */}
          <label className=" flex h-full w-full flex-col items-center justify-center">
            <svg
              className="h-10 w-10 text-gray-400 group-hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 26l9.5-9.5 7 7L36 16"
              />
            </svg>
            {option.coverImage && Array.from(option.coverImage).length > 0 ? (
              <div className="flex gap-4">
                {Array.from(option.coverImage).map((item: any, i: any) => (
                  <p
                    key={i}
                    className="rounded-md border-[1px] border-[#999]/10 px-2 py-1 text-sm text-gray-500 group-hover:text-gray-600"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 group-hover:text-gray-600">
                Gönderi için bir fotoğraf seçin
              </p>
            )}
            <input
              type="file"
              className=" hidden "
              onChange={(e) => {
                handleFiles(e);
              }}
              disabled={option.coverImage?.length > 0 ? true : false}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
export default GonderiForm;
