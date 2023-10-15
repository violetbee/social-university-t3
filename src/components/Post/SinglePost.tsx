import Image from "next/image";
// import Link from "next/link";
import { AiFillHeart, AiOutlineEye, AiOutlineLike } from "react-icons/ai";
// import { BiCategoryAlt } from "react-icons/bi";
import { ISinglePost } from "../../types/post";

export default function SinglePost({ post }: { post: ISinglePost }) {
  return (
    <div className="w-full rounded-xl border border-darkHelper bg-white p-4 shadow-md dark:bg-darkSecondary">
      <div className="flex h-[225px] w-full flex-col gap-4">
        {post.image ? (
          <Image
            src={post.image}
            alt="post image"
            width={180}
            height={180}
            layout="responsive"
            objectFit="cover"
            className="h-full w-full"
          />
        ) : (
          <div
            className={`h-[150px] w-full ${
              Math.ceil(Math.random() * 50) % 3 === 0
                ? "bg-[url('/images/categories/cat.jpg')]"
                : Math.ceil(Math.random() * 50) % 2 === 0
                ? "bg-[url('/images/categories/wave.jpg')]"
                : "bg-[url('/images/categories/sun.jpg')]"
            } rounded-lg bg-cover bg-center bg-no-repeat`}
          ></div>
        )}
        <div className="flex items-center justify-between">
          <h4 className="text-xl">
            {post?.title.length > 40
              ? post?.title.slice(0, 40) + "..."
              : post?.title}
          </h4>
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-darkBackground">
            <AiFillHeart />
          </button>
        </div>
      </div>
      <div className="my-3 w-full border-b border-darkHelper" />
      <div className="text-whitish/80 flex justify-between">
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center">
            <AiOutlineEye className="mb-1 mr-2" />
            <span className="text-sm">{Math.ceil(Math.random() * 100)}</span>
          </div>
          <span className="text-2xl font-bold">‧</span>
          <div className="flex items-center">
            <AiOutlineLike className="mb-1 mr-2" />
            <span className="text-sm">{Math.ceil(Math.random() * 100)}</span>
          </div>
        </div>
        <span className="rounded-lg bg-darkBackground px-2 pb-1 pt-2 text-sm">
          {post?.category?.name}
        </span>
      </div>
    </div>
  );
}

/* <Link
                  href={`/gonderi/yazi/${post.slug}`}
                  className="mt-4 self-end rounded-md border border-darkHelper bg-darkPrimary px-4 py-3 text-center font-medium tracking-wide text-white shadow-md transition-colors duration-300"
                >
                  Gönderiyi İncele
                </Link> */
