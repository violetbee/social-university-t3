const Article = () => {
  return (
    <article className="relative flex h-full w-[300px] flex-shrink-0 bg-white transition hover:shadow-md md:w-[500px]">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
          <span>Çağlar</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>Oct 10</span>
        </time>
      </div>

      <div className="hidden sm:basis-56 md:block">
        <img
          alt="Guitar"
          src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href="#">
            <h3 className="font-bold uppercase text-gray-900">
              Finding the right guitar for your style - 5 tips
            </h3>
          </a>

          <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-700">
            Yazılım Mühendisliği
          </p>
        </div>

        <button className="seeMore absolute bottom-2 right-5 flex w-10 items-center justify-center md-m:right-2 md:right-2">
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
