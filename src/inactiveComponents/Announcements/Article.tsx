import Image from "next/image";

const Article = () => {
  return (
    <article className="relative flex h-full w-[300px] flex-shrink-0 bg-white transition md:w-[500px]">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-[#333]">
          <span>Çağlar</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>Oct 10</span>
        </time>
      </div>

      <div className="hidden sm:basis-56 md:block">
        <Image
          alt="Guitar"
          src={`${process.env.NEXT_PUBLIC_BUCKET_URL}cpz00vxv2mj-fullstack.jpg`}
          className="aspect-square h-full w-full object-cover"
          width={300}
          height={300}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between pr-2 sm:pr-0">
        <div className=" border-gray-900/10 p-4 sm:p-6">
          <a href="#">
            <h3 className="font-bold uppercase text-[#333]">
              Finding the right guitar for your style - 5 tips
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-700">
            Yazılım Mühendisliği
          </p>
        </div>

        <button className="seeMore absolute bottom-2 right-9 flex w-10 items-center justify-center md-m:right-2 md:right-2">
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
    </article>
  );
};
export default Article;