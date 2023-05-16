import Image from "next/image";
import Link from "next/link";
import { IDocPost, IPost, ITextPost } from "../../../types/post";

const Post = ({ post }: { post: IPost }) => {
  return (
    <div className="relative flex h-[350px] w-full flex-col justify-between overflow-hidden rounded-md border-[#888]/30 bg-white shadow-sm">
      {post.files && (
        <div className="stateOfPost absolute -right-10 top-3 flex h-8 w-32 rotate-45 items-center justify-center bg-center text-lg text-white">
          Dosya
        </div>
      )}

      {!post.files && (
        // IMAGE
        <Image
          src="/images/passage.jpg"
          alt=""
          className="mb-3 h-20 w-full object-cover"
          width={200}
          height={200}
        />
      )}

      <div
        className={`flex flex-1 flex-col space-y-2 px-3 ${
          post.files && "pt-4"
        }`}
      >
        <h3
          className={`break-words ${
            post.files && "pr-10"
          } font-semibold uppercase text-[#333]`}
        >
          {post.title.slice(0, 40) + "..."}
        </h3>
        <p className="break-words pr-7 text-[#333]">
          {post.content.slice(0, 57) + "..."}
        </p>
      </div>
      {post.files && (
        <>
          <div className="h-px w-full border-t-[1px] border-dashed"></div>
          <div className="px-3 py-4">
            <div className="flex justify-between">
              <span className="font-medium">Bölüm:</span>
              <span>{post.department?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Sınıf:</span>
              <span>{post.classLevel?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ders:</span>
              <span>{post.class?.name}</span>
            </div>
          </div>
        </>
      )}
      <div className="w-full px-2">
        <Link
          className="mb-4 flex h-12 items-center justify-center rounded-lg bg-[#dd4e63] text-white"
          href={`/gonderiler/${post.slug}`}
        >
          Gönderiyi İncele
        </Link>
      </div>

      <div className="space-y-4">
        <div className="h-px w-full border-t-[1px] border-dashed"></div>
        <div className="flex items-center px-3 pb-3">
          <div className="flex w-full items-center justify-between">
            {post.user?.image ? (
              <Image
                src={post.user.image || "/images/avatar.png"}
                alt="avatar"
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333]">
                <p className="text-md pt-1 font-bold text-white">
                  {post.user?.name?.slice(0, 1)}
                </p>
              </div>
            )}{" "}
            <p className="text-[#333]">{`${post.user?.name} ${
              post.user.surname || ""
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
