import { ISinglePost } from "../../types/post";
import Image from "next/image";
import Link from "next/link";
import { BiCategoryAlt } from "react-icons/bi";

export default function SinglePost({ post }: { post: ISinglePost }) {
  return (
    <div className="mb-5 w-full max-w-[250px] overflow-hidden rounded-xl bg-white shadow-lg">
      <div className="relative w-full">
        <span className="absolute right-0 top-5 flex items-center gap-1 bg-blue-900 px-2 font-medium text-white">
          <BiCategoryAlt size={15} className="-mt-1" />
          <p className="align-bottom text-[15px]"> {post.category?.name}</p>
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
          <div className="h-[180px] w-full bg-gray-200"></div>
        )}
        <div className="p-3 sm:p-5">
          <p className="mb-1 text-[20px] font-bold leading-7 text-gray-700">
            {post.title}
          </p>
          <div className="flex justify-between">
            <p className="mr-2 text-[15px] text-[#3C3C4399]">{post.timeAgo}</p>
          </div>
          <p className="mt-2 font-[15px] text-[#7C7C80]">
            {post.content.slice(0, 50) +
              (post.content.length > 50 ? "..." : "")}
          </p>

          <Link
            href={`/gonderi/yazi/${post.slug}`}
            className="mt-4 block w-full transform rounded-[14px] bg-[#FFC933] px-4 py-3 text-center font-medium capitalize tracking-wide transition-colors duration-300 hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
          >
            Gönderiyi İncele
          </Link>
          {/* <Link
            target="_blank"
            href="#"
            className="mt-1.5 block w-full transform rounded-[14px] px-4 py-3 text-center font-medium capitalize tracking-wide transition-colors duration-300 hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
          >
            Download app
          </Link> */}
        </div>
      </div>
    </div>
  );
}
