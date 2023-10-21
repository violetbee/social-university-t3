/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { trpc } from "../../../../utils/trpc";
import { IoRemoveCircle } from "react-icons/io5";

function GonderiForm({ register, option, setValue }: any) {
  const getCategories = trpc.category.getAll.useQuery();
  const [tag, setTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (tag.length > 0 && !tags.includes(tag) && tags.length < 3) {
        setTags((prev) => [...prev, tag]);
        setTag("");
      } else {
        e.currentTarget.disabled;
      }
    }
  };

  useEffect(() => {
    setValue("tags", tags.join(","));
  }, [tags]);

  return (
    <div className="mx-auto flex w-full flex-col gap-4 p-4">
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <label className="flex w-full flex-col md:w-1/4">
          <span className="text-lg font-semibold">Gönderi Başlığı</span>
          <input
            type="text"
            {...register("title")}
            className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
          />
        </label>
        <div className="flex w-full flex-col md:w-1/6">
          <span className="text-lg font-semibold">Kategori Seç</span>
          <div className="relative w-full">
            <select
              {...register("category")}
              className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-[9px] pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
            >
              {getCategories.data?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <label className="relative flex flex-grow flex-col">
          <span className="text-lg font-semibold">Gönderi Etiketleri</span>
          <div className="relative flex gap-2">
            <input
              type="text"
              className="w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value.trim());
              }}
              onKeyDown={handleTags}
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2">
              {tags.map((item, i) => (
                <span
                  key={i}
                  className="relative flex h-full items-center rounded-sm bg-darkPrimary px-2 text-darkBackground"
                >
                  {item}
                  <button
                    className="absolute -right-1 -top-1"
                    onClick={() => {
                      setTags(tags.filter((tag) => tag !== item));
                    }}
                  >
                    <IoRemoveCircle className="h-4 w-4 text-darkBackground" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </label>
      </div>

      <label className="flex flex-grow flex-col gap-2">
        <span className="text-lg font-semibold">Gönderi İçeriği</span>
        <textarea
          {...register("content")}
          className="block w-full rounded-sm border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-lg"
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Gönderi Fotoğrafı</span>
        <div className="relative flex h-32 w-full border-2 border-dashed border-gray-300 hover:border-darkHelper hover:bg-gray-100 dark:bg-darkBackground">
          {/* X Icon */}
          {option.coverImage?.length > 0 && (
            <button
              className="absolute right-2 top-2 rounded-full bg-white p-1 hover:bg-gray-200"
              onClick={() => {
                setValue("coverImage", []);
              }}
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
              className="hidden"
              onChange={(e) => {
                setValue("coverImage", e.target.files);
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
