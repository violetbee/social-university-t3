import Image from "next/image";

const Event = () => {
  return (
    <div className="group mx-auto mb-5 w-72">
      <div className=" rounded-lg bg-[#222] shadow-sm">
        <div className="relative flex -translate-y-1 translate-x-1 flex-col rounded-lg border-[1px] border-[#222] bg-white shadow-sm duration-200 group-hover:translate-y-0 group-hover:translate-x-0">
          <Image
            src="/images/konser.webp"
            alt=""
            width={200}
            height={200}
            className="h-24 w-full rounded-t-md object-cover"
          />
          <h1 className="px-3 py-2 text-lg font-semibold leading-6 tracking-wider">
            Apex Legends Turnuvası
          </h1>
          <div className="flex justify-between">
            <span className="px-3 font-medium">Etkinlik Tarihi:</span>
            <span className="px-3">21.04.2023</span>
          </div>
          <div className="flex justify-between">
            <span className="px-3 font-medium">Etkinlik Bitiş Tarihi:</span>
            <span className="px-3">21.04.2023</span>
          </div>

          <div
            className={`flex h-10 w-full items-center justify-center border-y-[1px] ${
              "file" === "file" ? "bgFile" : "bgNormal"
            }`}
          >
            <p className="text-lg font-medium text-white">
              Bu gönderi 3 adet dosya içermektedir
            </p>
          </div>
          <div className="flex items-center justify-between px-3 pt-2 pb-2">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 lg:mb-0">
                <Image
                  src="/images/43.jpg"
                  className="h-full w-full overflow-hidden rounded-full shadow"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-medium">Çağlar Karahüseyin</h1>
                <p className="text-xs text-gray-500">Yazılım Mühendisliği</p>
                <p className="text-xs text-gray-500">1 saat önce oluşturuldu</p>
              </div>
            </div>
            <button className="seeMore flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
