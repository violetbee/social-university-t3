import { useState } from "react";
import { FcDocument, FcOpenedFolder } from "react-icons/fc";
import { trpc } from "../utils/trpc";
import Link from "next/link";
import { TfiAngleRight } from "react-icons/tfi";
import Image from "next/image";

const PostsAndFiles = () => {
  const [active, setActive] = useState(true);
  const { data: posts } = trpc.post.getAllPosts.useQuery({
    query: active ? "TEXT" : "DOC",
  });

  return (
    <div className="col-span-1">
      <div className="h-12 w-full rounded-t-md bg-primary">
        <button
          onClick={() => setActive(true)}
          className={`h-full w-1/2 rounded-t-md ${
            active && "bg-gradient-to-r from-orange-500 to-orange-700"
          } text-white`}
        >
          Son 5 Gönderi
        </button>
        <button
          onClick={() => setActive(false)}
          className={`h-full w-1/2 rounded-t-md ${
            !active && "bg-gradient-to-l from-green-500 to-green-700"
          } text-white`}
        >
          Son 5 Dosya
        </button>
      </div>
      <div className="rounded-b-md shadow-sm">
        {posts?.slice(0, 5).map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between px-1 py-2 even:bg-gray-100"
          >
            <div className="flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                {post.user.image ? (
                  <Image
                    src={post.user.image as string}
                    alt={post.user.name as string}
                    width={150}
                    height={150}
                    className="rounded-full"
                  />
                ) : (
                  post.user.name?.at(0)
                )}
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-700">
                  {post.title}
                </h1>
                <p className="text-sm text-gray-500">
                  {post.content.slice(0, 50)}...
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                className="text-gray-500 hover:text-gray-700"
                href={`/posts/${post.id}`}
              >
                <TfiAngleRight size={30} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsAndFiles;
