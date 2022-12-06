import { BiArchive } from "react-icons/bi";
import { FcDislike, FcLike } from "react-icons/fc";
import { GoCommentDiscussion } from "react-icons/go";
import { ImDownload } from "react-icons/im";
import { TiWarning } from "react-icons/ti";

type PostType = {
  id: number;
  title: string;
  content: string;
  type: "text" | "doc";
  user: {
    id: number;
    name: string;
    createdAt: string;
  };
};

const Post = ({ post }: { post: PostType }) => {
  return (
    <div
      className={`flex w-full flex-col gap-1 border-l-4 ${
        post.type === "text" ? "border-l-green-700" : "border-l-red-700"
      } p-3`}
    >
      <h3 className="text-md font-medium text-stone-900">{post.title}</h3>
      {post.type === "text" ? (
        <p className="text-sm ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea asperiores
          sint reiciendis eum quis delectus nihil quidem perspiciatis repellat
          hic?
        </p>
      ) : (
        <div className="relative w-full rounded-md bg-green-600/40 px-4 py-2 md:w-2/3">
          <ImDownload
            className="absolute right-1 bottom-1 opacity-40"
            size={30}
          />
          <p>
            <span className="font-medium">Bölüm: </span>Yazılım Mühendisliği
          </p>
          <p>
            <span className="font-medium">Ders: </span>Yazılım Gerçekleme ve
            Test
          </p>
          <p>
            <span className="font-medium">İçerik: </span>2021 Vize Çalışma
            Soruları
          </p>
          <p>
            <span className="font-medium text-red-700">Uyarı!: </span>Dökümanlar
            zararlı içerik içerebilir, kontrolü size aittir, indirirken dikkatli
            olun.
          </p>
        </div>
      )}
      <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex gap-2 text-gray-700">
          <p>{post.user.name}</p> · <p>10 dakika önce</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="flex items-center rounded-lg">
            <button className="px-2 py-1">
              <FcLike />
            </button>
            <div className="px-2">-1</div>
            <button className="px-2 py-1">
              <FcDislike />
            </button>
          </div>
          <p className="hidden lg:block">·</p>
          <div className="flex items-center rounded-lg">
            <button className="px-2 py-1">
              <GoCommentDiscussion />
            </button>
            <div className="px-2">0</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
