import { ISinglePost } from "../../types/post";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";

export default function SinglePost({ post }: { post: ISinglePost }) {
  return (
    <div className="mb-5 w-full overflow-hidden rounded-xl border border-darkHelper bg-white shadow-md dark:bg-darkSecondary">
      <div className="relative flex h-full w-full flex-col lg:flex-row">
        <span className="absolute -top-3 right-0 flex items-center gap-1 rounded-l-md bg-white px-2 pt-4 font-medium text-[#111] shadow-[0_0.5px_3px,rgb(255,255,255)] ">
          <BiCategoryAlt size={15} className="-mt-1" />
          <span className="align-bottom text-[15px]">
            {post.category?.name}
          </span>
        </span>

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
            className={`h-[150px] w-full lg:h-full lg:w-[200px] ${
              Math.ceil(Math.random() * 50) % 3 === 0
                ? "bg-[url('/images/categories/cat.jpg')]"
                : Math.ceil(Math.random() * 50) % 2 === 0
                ? "bg-[url('/images/categories/wave.jpg')]"
                : "bg-[url('/images/categories/sun.jpg')]"
            } bg-cover`}
          ></div>
        )}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <span className="mb-1 text-lg font-bold leading-7 text-gray-700 dark:text-white">
            {post.title}
          </span>
          <div className="flex justify-between">
            <span className="mr-2 text-base text-[#3C3C4399]">
              {post.user.name + " " + post.user.surname} · {post.timeAgo}
            </span>
          </div>
          <span className="font-base mt-2 h-full text-[#7C7C80]">
            {post.content.slice(0, 140) +
              (post.content.length > 140 ? "..." : "")}
          </span>

          <div className="mt-2 flex justify-end">
            <div className="flex items-end gap-4 text-[#444444]">
              <div className="flex h-10 items-end gap-1">
                <AiOutlineComment size={18} />
                <span className="text-[18px]/[16px]">15</span>
              </div>
              <span className="text-[18px]/[20px]">·</span>
              <div className="flex h-10 items-end gap-1">
                <AiOutlineLike size={18} />
                <span className="text-[18px]/[16px]">4</span>
              </div>
              <span className="text-[18px]/[20px]">·</span>
              <div className="flex h-10 items-end gap-1">
                <span className="text-[15px]/[18px]">
                  {!!post.category ? "Yazı" : "Dosya"}
                </span>
              </div>
            </div>
          </div>
          <Link
            href={`/gonderi/yazi/${post.slug}`}
            className="mt-4 rounded-md border border-darkHelper bg-darkPrimary px-4 py-3 text-center font-medium tracking-wide text-white shadow-md transition-colors duration-300 "
          >
            Gönderiyi İncele
          </Link>
        </div>
      </div>
    </div>
  );
}
