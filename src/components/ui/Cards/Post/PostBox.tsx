import { Category, Department, User } from "@prisma/client";
import Image from "next/image";

import Link from "next/link";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineReport } from "react-icons/md";

type Props = {
  id: string;
  title: string;
  content?: string;
  timeAgo?: string;
  image?: string | null;
  slug?: string;
  category: Pick<Category, "name" | "color" | "slug"> | null;
  user: Pick<User, "id" | "name" | "surname" | "image"> & {
    department?: Pick<Department, "name"> | null;
  };
  _count?: {
    comments: number;
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
  _count,
}: Props) {
  return (
    <Link
      href={`gonderiler/${slug}`}
      className={`relative rounded-xl border-l-4 bg-darkSecondary text-white shadow-md duration-150 hover:shadow-lg dark:border-darkPrimary dark:hover:bg-darkSecondary/50`}
      style={{ borderLeftColor: category?.color as string }}
      passHref
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
          <div>
            <h3 className="text-md inline font-bold">{title}</h3>
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
          {user && (
            <div className="flex items-center gap-2">
              <Image
                src={(user.image as string) || "/images/avatar-male.svg"}
                alt={user.name as string}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="text-xs font-light text-whitish">
                {user.name}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 rounded-md">
            {_count && (
              <div className="flex shrink-0 items-center gap-2 rounded-md border border-darkHelper bg-darkBackground px-2 text-white">
                <FaRegComments />
                <span className="pb-[1px] pt-[5px]">{_count?.comments}</span>
              </div>
            )}
            <Link
              href={{
                pathname: "/gonderiler",
                query: { sub: category?.slug },
              }}
              className="shrink-0 rounded-md border border-darkHelper bg-darkBackground px-2 py-[2px] pt-[4px] text-white duration-150 hover:bg-white hover:text-darkBackground"
            >
              #{category?.name}
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostBox;
