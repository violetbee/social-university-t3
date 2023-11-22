import { Category, Department, User } from "@prisma/client";
import Image from "next/image";

import Link from "next/link";
import { MdOutlineReport } from "react-icons/md";

type Props = {
  id: string;
  title: string;
  content?: string;
  timeAgo?: string;
  image?: string | null;
  slug?: string;
  category: Pick<Category, "name" | "color"> | null;
  user: Pick<User, "id" | "name" | "surname" | "image"> & {
    department?: Pick<Department, "name"> | null;
  };
};

function PostBox({
  title,
  category,
  user,
  content,
  timeAgo,
  image,
  slug,
}: Props) {
  return (
    <Link
      href={`/gonderi/yazi/${slug}`}
      className={`relative rounded-xl border-l-4 bg-darkSecondary text-white shadow-md before:absolute before:-inset-1 before:z-[-1] before:rounded-xl before:bg-gradient-to-tr before:from-red-600 before:via-indigo-700 before:to-blue-800 before:opacity-0 before:transition-all before:duration-150 before:ease-in-out before:hover:z-0 before:hover:scale-105 before:hover:opacity-75 before:hover:shadow-2xl before:hover:blur-xl`}
      style={{ borderLeftColor: category?.color as string }}
    >
      <div className="flex flex-col gap-4 p-4">
        {image && (
          <div className="h-40 w-full overflow-hidden rounded-lg">
            <Image
              src={image}
              alt={title}
              width={400}
              height={500}
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="text-md font-bold">
            <h3 className="inline">{title}</h3>
            {timeAgo && (
              <span className="ml-2 text-xs font-extralight text-whitish/50">
                {timeAgo}
              </span>
            )}
          </div>
          {content && (
            <button className="text-xs font-extralight tracking-tight text-darkHelper dark:text-whitish/50">
              <MdOutlineReport className="text-xl hover:text-red-500" />
            </button>
          )}
        </div>
        {content && (
          <p className="font-thin text-whitish">
            {content.length > 60 ? content.slice(0, 60) + "..." : content}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-between">
          <Link
            href="#"
            className="shrink-0 rounded-md bg-darkBackground px-2 py-1 pt-[6px] text-sm"
          >
            #{category?.name}
          </Link>
        </div>
      </div>
    </Link>
  );
}

export default PostBox;
