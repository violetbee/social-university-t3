import { Category, Like, Post, User } from "@prisma/client";
import Image from "next/image";

type Props = Post & {
  user: User;
  category: Category | null;
  like: Like[];
};

const Post = (props: Props) => {
  return (
    <div className="relative flex h-[350px] w-full flex-col justify-between overflow-hidden rounded-md border-[#888]/30 bg-white shadow-sm">
      {props.type === "DOC" && (
        <div className="stateOfPost absolute -right-10 top-3 flex h-8 w-32 rotate-45 items-center justify-center bg-center text-lg text-white">
          Dosya
        </div>
      )}

      {props.type === "TEXT" && (
        // IMAGE
        <Image
          src="/images/passage.jpg"
          alt=""
          className="h-20 w-full object-cover"
          width={200}
          height={200}
        />
      )}

      <div className={`space-y-2 px-3 ${props.type === "DOC" && "pt-4"}`}>
        <h3
          className={`break-words ${
            props.type === "DOC" && "pr-10"
          } font-semibold uppercase text-[#333]`}
        >
          {props.title.slice(0, 40) + "..."}
        </h3>
        <p className="break-words pr-7 text-[#333]">
          {props.content.slice(0, 100) + "..."}
        </p>
      </div>
      {props.type === "DOC" && (
        <>
          <div className="h-px w-full border-t-[1px] border-dashed"></div>
          <div className="px-3">
            <div className="flex justify-between">
              <span className="font-medium">Bölüm:</span>
              <span>{props.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Sınıf:</span>
              <span>{props.classLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Ders:</span>
              <span>{props.class}</span>
            </div>
          </div>
        </>
      )}
      <div className="px-3">
        <button className="h-12 w-full bg-[#dd4e63] text-white">
          Gönderiyi İncele
        </button>
      </div>

      <div className="space-y-4">
        <div className="h-px w-full border-t-[1px] border-dashed"></div>
        <div className="flex items-center px-3 pb-3">
          <div className="flex w-full items-center justify-between">
            {props.user?.image ? (
              <Image
                src={props.user.image || "/images/avatar.png"}
                alt="avatar"
                className="h-8 w-8 rounded-full"
                width={32}
                height={32}
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333]">
                <p className="text-md pt-1 font-bold text-white">
                  {props.user?.name?.slice(0, 1)}
                </p>
              </div>
            )}{" "}
            <p className="text-[#333]">{`${props.user?.name} ${
              props.user.surname || ""
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
