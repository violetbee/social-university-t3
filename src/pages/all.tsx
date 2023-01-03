import { ImDownload } from "react-icons/im";
import { trpc } from "../utils/trpc";
import Link from "next/link";

import { TbPencil } from "react-icons/tb";
import Layout from "../components/Layout";
import { MdOutlineKeyboardArrowDown, MdSort } from "react-icons/md";

const Post = () => {
  const { data: posts } = trpc.post.getAllPosts.useQuery();

  return (
    <Layout>
      <div className="flex w-full flex-col items-center rounded-lg border-t-4 border-teal-600 bg-box text-white shadow-sm">
        <div className="flex w-full items-center justify-between px-5 py-4">
          <p className="text-lg font-[500]">Kullanıcılar neler diyor?</p>
          <div className="flex items-center gap-1 rounded-md border-[1px]  px-3 py-1 shadow-sm sm-m:px-10 ">
            <MdSort />
            <p className="mb-[1px]">Sırala</p>
            <MdOutlineKeyboardArrowDown />
          </div>
        </div>
        {posts && posts.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-3 bg-primary px-4 py-3 lg:grid-cols-2">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="break-inside relative flex w-full flex-col justify-between space-y-3 overflow-hidden rounded-xl bg-white p-4 text-sm text-black dark:bg-slate-800 dark:text-white"
              >
                <div className="flex items-center justify-between font-medium">
                  <div className="space-x-2">
                    <span className="text-xs uppercase text-green-400">
                      {post.user.name} {post.user.surname && post.user.surname}
                    </span>
                    <span className="font-medium text-slate-500">
                      {post.category.name}
                    </span>
                  </div>

                  <span className="text-xs text-slate-500">
                    {post.publishedTimeAgo}
                  </span>
                </div>
                <div className="flex flex-row items-center space-x-3">
                  {post.type === "TEXT" ? (
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-green-500 text-white">
                      <TbPencil size={22} />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-violet-700 text-white">
                      <ImDownload size={22} />
                    </div>
                  )}
                  <span className="text-base font-medium">
                    {post.title.length > 50
                      ? post.title.slice(0, 50) + "..."
                      : post.title}
                  </span>
                </div>
                <div>
                  {" "}
                  {post.content && post.content.length > 100 ? (
                    <p className="text-sm text-slate-400">
                      {post.content.slice(0, 100) + "..."}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400">{post.content}</p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <dt className="sr-only">Yorum Yapanlar</dt>
                    <dd className="flex justify-start -space-x-1.5">
                      <a href="#" className="-m-1 inline-block">
                        <img
                          className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-800"
                          src="https://randomuser.me/api/portraits/women/46.jpg"
                          alt="avatar"
                        />
                      </a>
                      <a href="#" className="-m-1 inline-block">
                        <img
                          className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-800"
                          src="https://randomuser.me/api/portraits/men/45.jpg"
                          alt="avatar"
                        />
                      </a>
                      <a href="#" className="-m-1 inline-block">
                        <img
                          className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-slate-800"
                          src="https://randomuser.me/api/portraits/women/47.jpg"
                          alt="avatar"
                        />
                      </a>
                      <span className="-m-1 inline-block rounded-full ring-2 ring-white dark:ring-slate-800">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 31 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-slate-200 dark:text-slate-600"
                        >
                          <path
                            d="M31 15.5C31 24.0604 24.0604 31 15.5 31C6.93959 31 0 24.0604 0 15.5C0 6.93959 6.93959 0 15.5 0C24.0604 0 31 6.93959 31 15.5ZM8.20879 15.5C8.20879 19.5268 11.4732 22.7912 15.5 22.7912C19.5268 22.7912 22.7912 19.5268 22.7912 15.5C22.7912 11.4732 19.5268 8.20879 15.5 8.20879C11.4732 8.20879 8.20879 11.4732 8.20879 15.5Z"
                            fill="currentColor"
                          />
                          <path
                            d="M31 15.5C31 18.049 30.3714 20.5586 29.1698 22.8066C27.9682 25.0547 26.2307 26.9716 24.1113 28.3878C21.9919 29.8039 19.556 30.6755 17.0193 30.9254C14.4826 31.1752 11.9234 30.7956 9.56841 29.8201C7.21345 28.8447 5.1354 27.3035 3.51834 25.3331C1.90128 23.3627 0.795112 21.0239 0.297828 18.5239C-0.199455 16.0239 -0.0725081 13.4398 0.667425 11.0006C1.40736 8.56136 2.73744 6.34225 4.53984 4.53985L10.2876 10.2876C9.43046 11.1448 8.79791 12.2002 8.44602 13.3602C8.09413 14.5202 8.03376 15.7491 8.27025 16.9381C8.50675 18.127 9.03281 19.2393 9.80184 20.1764C10.5709 21.1134 11.5591 21.8464 12.6791 22.3103C13.799 22.7742 15.0161 22.9547 16.2225 22.8359C17.4289 22.7171 18.5874 22.3026 19.5953 21.6291C20.6033 20.9556 21.4295 20.0439 22.001 18.9748C22.5724 17.9058 22.8714 16.7122 22.8714 15.5H31Z"
                            fill="#2BC86A"
                          />
                        </svg>
                      </span>
                    </dd>
                  </div>
                  <Link
                    href={post.category.slug + "/" + post.id}
                    className="flex items-center justify-center space-x-1 rounded-full border-2 border-black bg-white px-4 py-1 text-xs font-medium text-black hover:bg-black hover:text-white dark:border-white dark:bg-slate-800 dark:text-white dark:hover:bg-white dark:hover:text-black"
                  >
                    <span>Devamını Gör</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h13M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center bg-primary py-10">
            <p className="text-lg font-[500]">Henüz bir gönderi yok.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default Post;
