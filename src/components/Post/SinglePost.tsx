import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
// import { BiCategoryAlt } from "react-icons/bi";
import { ISinglePost } from "../../types/post";

export default function SinglePost({ post }: { post: ISinglePost }) {
  return (
    <div className="mb-5 w-full overflow-hidden rounded-xl border border-darkHelper bg-white shadow-md dark:bg-darkSecondary">
      <div className="relative flex h-72 w-full flex-col">
        {post.image ? (
          <Image
            src={post.image}
            alt="post image"
            width={180}
            height={180}
            layout="responsive"
            objectFit="cover"
            className="h-[180px] w-full"
          />
        ) : (
          <div
            className={`absolute inset-0 left-0 top-0 z-0 h-full w-full brightness-[30%] ${
              Math.ceil(Math.random() * 50) % 3 === 0
                ? "bg-[url('/images/categories/cat.jpg')]"
                : Math.ceil(Math.random() * 50) % 2 === 0
                ? "bg-[url('/images/categories/wave.jpg')]"
                : "bg-[url('/images/categories/sun.jpg')]"
            } bg-cover`}
          ></div>
        )}

        <div className="z-10 flex flex-1 flex-col justify-between p-3 sm:p-4">
          <span className="flex items-center gap-1 self-start rounded-xl bg-black px-4 pb-1 pt-2 text-lg font-medium text-white drop-shadow-md">
            {post.category?.name}
          </span>
          <div className="flex flex-col gap-4">
            <span className="text-2xl font-bold leading-7 text-gray-700  drop-shadow-md dark:text-white">
              {post.title}
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="avatar"
                  className="h-12 w-12 rounded-lg border-2 border-white"
                />
                <div className="flex flex-col">
                  <span className="mr-2 text-lg font-medium text-[#3C3C4399] dark:text-white">
                    {post.user.name + " " + post.user.surname}
                  </span>
                  <span className="text-white/70">{post.timeAgo}</span>
                </div>
              </div>

              <div className="flex">
                <div className="flex items-center divide-x divide-darkSecondary rounded-lg bg-darkBackground text-white/60">
                  <div className="flex h-10 items-center gap-1 px-4">
                    <AiOutlineComment size={18} />
                    <span className="text-[18px]">15</span>
                  </div>
                  <div className="flex h-10 items-center gap-1 px-4">
                    <AiOutlineLike size={18} />
                    <span className="text-[18px]">4</span>
                  </div>
                  <div className="flex h-10 items-center gap-1 px-4">
                    <span className="text-[15px]/[18px]">
                      {!!post.category ? "Yazı" : "Dosya"}
                    </span>
                  </div>
                </div>
              </div>
              {/* <Link
                  href={`/gonderi/yazi/${post.slug}`}
                  className="mt-4 self-end rounded-md border border-darkHelper bg-darkPrimary px-4 py-3 text-center font-medium tracking-wide text-white shadow-md transition-colors duration-300"
                >
                  Gönderiyi İncele
                </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
