import { FileUploader } from "react-drag-drop-files";

function GonderiForm({ register, option }: any) {
  const fileTypes = ["JPG", "PNG", "GIF"];

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
            {option.categories?.map((item: any, i: number) => (
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
      {/* Upload Cover Image Area with Beautiful Tailwind Css */}

      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold">Gönderi Fotoğrafı</span>
        <label className="flex h-32 w-full border-2 border-dashed border-gray-300 hover:border-gray-600 hover:bg-gray-100">
          <FileUploader
            handleChange={(file: any) => {
              register("coverImage", { value: file });
            }}
            name="file"
            types={fileTypes}
            hoverTitle=" "
            classes="w-full h-full flex flex-col items-center justify-center"
          >
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
            <p className="pt-1 text-sm tracking-wider text-gray-400">
              Fotoğrafı Buraya Sürükleyin
            </p>
          </FileUploader>
        </label>
      </div>
    </div>
  );
}
export default GonderiForm;
