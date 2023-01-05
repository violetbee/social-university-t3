import { GetServerSideProps, NextPage } from "next";
import Layout from "../../../components/Layout";
import { prisma } from "../../../server/db/client";
import Head from "next/head";
import { Category, File, Like, Post, User } from "@prisma/client";
import { IoMdSchool } from "react-icons/io";
import { CgListTree } from "react-icons/cg";
import {
  FaUserAlt,
  FaSchool,
  FaAward,
  FaRegCalendarAlt,
  FaDownload,
} from "react-icons/fa";
import { MdMood } from "react-icons/md";
import React, { useState, useEffect, useRef } from "react";
import { PostUserInfo } from "../../../components/PostUserInfo";
import autoAnimate from "@formkit/auto-animate";
import { GoCommentDiscussion } from "react-icons/go";
import { trpc } from "../../../utils/trpc";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  purePost: Post & {
    user: User;
    like: Like;
    category: Category;
    files: File[];
  };
};

const PerPost: NextPage<Props> = ({ purePost }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("profileInfo");
  const [comment, setComment] = useState<string>("");

  // Animation Area Start
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  // Animation Area End

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedMenu(e.currentTarget.name);
    setIsMenuOpen(true);
  };

  // tRPC Area Start
  const ctx = trpc.useContext();
  const like = trpc.like.like.useMutation({
    onSuccess: () => {
      ctx.like.invalidate();
    },
  });
  const dislike = trpc.like.dislike.useMutation({
    onSuccess: () => {
      ctx.like.invalidate();
    },
  });
  const getAllLikes = trpc.like.totalLikes.useQuery({
    postId: purePost.id,
  });
  // tRPC Area End

  // Session Area Start
  const session = useSession();
  // Session Area End

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col justify-between gap-4 text-white lg:flex-row">
          <div className="order-2 flex flex-col gap-2 lg:order-1 lg:w-10/12">
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-col rounded-t-lg bg-box pb-4 shadow-sm">
                <h1 className="rounded-t-lg border-b-[1px] border-slate-900/50 bg-primary px-4 pt-2 pb-2 text-xl">
                  {purePost.title.toUpperCase()}
                </h1>
                <p className="break-all p-4 pb-0">{purePost.content}</p>
                {purePost.files.length > 0 && (
                  <>
                    <div className="mt-3 h-[1px] w-full border-t-[2px] border-dashed border-accent/50" />
                    <div className="p-4 pb-0">
                      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                        {purePost.files
                          .filter((item) => item.postId === purePost.id)
                          .map((file) => (
                            // file.type.includes("image") && "resim"
                            <div
                              key={file.id}
                              className="w-full rounded-xl bg-primary"
                            >
                              <div className="flex w-full items-center justify-between rounded-t-xl bg-emerald-900 px-2 py-1">
                                <h1>
                                  {file.name.length > 12
                                    ? file.name.slice(0, 12) + "..."
                                    : file.name}
                                </h1>
                                <h3 className="font-thin tracking-tight">
                                  {(file.size / 1000000).toFixed(3)} MB
                                </h3>
                              </div>
                              <div className="flex w-full flex-col p-2">
                                <ul className="flex flex-col gap-2">
                                  <li className="flex items-center gap-2">
                                    <FaUserAlt />
                                    <span>Yazılım Mühendisliği</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaSchool />
                                    <span>3. Sınıf</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaAward />
                                    <span>
                                      Yazılım Gerçekleme ve Test Dersi
                                    </span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <FaRegCalendarAlt />
                                    <span>11. Hafta PDF</span>
                                    {/* {new Date(file.createdAt).toLocaleDateString(
                                    "tr-TR"
                                  )} */}
                                  </li>
                                </ul>

                                <div className="mt-2 flex w-full justify-center">
                                  <Link
                                    href={`/file/${file.id}`}
                                    className="flex h-10 w-full items-center justify-center rounded-xl bg-emerald-900 hover:bg-emerald-800"
                                  >
                                    <FaDownload />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex w-full flex-col justify-between gap-2 rounded-b-lg bg-accent px-5 py-2 text-white shadow-inner shadow-black/20 lg-m:flex-row md:flex-row md:items-center md:justify-between md:gap-0">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CgListTree />
                    {purePost.category.name}
                  </div>
                  {/* <div className="flex items-center gap-1">
                  <RiPencilFill />
                  {purePost.type === "TEXT" ? "Yazı" : "Doküman"}
                </div> */}
                  <div className="flex items-center gap-1">
                    <IoMdSchool />
                    {/* {`${purePost.user.department || "Yazılım Mühendisliği"}`} */}
                    Yazılım Mühendisliği
                  </div>
                </div>
                {/* Post Like Area Start */}
                <div className="flex items-center justify-end gap-2">
                  <div className="flex items-center justify-between rounded-lg">
                    <button
                      onClick={() => {
                        like.mutateAsync({ postId: purePost.id.toString() });
                      }}
                      className="px-2 py-1"
                    >
                      <AiFillLike />
                    </button>
                    <div className="flex w-5 justify-center">
                      {getAllLikes.data}
                    </div>
                    <button
                      onClick={() => {
                        dislike.mutateAsync({ postId: purePost.id.toString() });
                      }}
                      className="px-2 py-1"
                    >
                      <AiFillDislike />
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
                {/* Post Like Area End */}
              </div>
            </div>
            <div className="w-full space-y-2 rounded-lg bg-box px-5 py-4 shadow-sm">
              <p>
                Bu gönder için henüz bir yorum mevcut değildir. İlk yorumu
                yazmak ister misin?{" "}
                {!session.data?.user &&
                  "Hemen üye girişi yap ve sen de aramıza katıl!"}
              </p>
              {session.data?.user && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-white">
                      <span className="text-green-600">
                        {session.data?.user?.name}
                      </span>{" "}
                      kullanıcı adıyla yazıyorsunuz.
                    </span>
                    <span
                      className={`label-text-alt text-white ${
                        comment.length > 244 && "text-red-500"
                      }`}
                    >
                      {comment.length}/250
                    </span>
                  </label>
                  <textarea
                    className="textarea-bordered textarea h-24 bg-accent"
                    placeholder="Yorumunuzu buraya yazın..."
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    maxLength={250}
                  />
                  <label className="label">
                    <span className="label-text-alt"></span>
                    <span className="label-text-alt text-white">
                      Yazılan yorumlardan kullanıcılar sorumludur
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="order-1 h-full w-full rounded-lg bg-gradient-to-tr lg:order-2 lg:h-44 lg:w-2/12">
            {/* {purePost.user.image ? (
                <Image
                  className="h-20 w-20 rounded-full"
                  src={purePost.user.image as string}
                  alt={purePost.user.name as string}
                  width={150}
                  height={150}
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-slate-900 p-3">
                  <div className="flex h-full w-full items-center justify-center rounded-md border-2 border-white text-3xl font-black leading-none text-white">
                    <CgUserlane />
                  </div>
                </div>
              )} */}

            {/* Per Post User Info Area Start */}
            <div
              ref={parent}
              className={`grid h-full w-full ${
                isMenuOpen
                  ? "grid-cols-1 lg:grid-cols-1"
                  : "grid-cols-4 lg:grid-cols-2"
              } rounded-lg bg-box`}
            >
              {/* User Info */}
              {isMenuOpen ? (
                <PostUserInfo
                  setIsMenuOpen={setIsMenuOpen}
                  menu={selectedMenu}
                  user={purePost.user}
                />
              ) : (
                <>
                  {/* Profile Info */}
                  <button
                    onClick={handleMenuOpen}
                    className="btn flex h-2/3 items-center justify-center rounded-none rounded-l-lg border-0 bg-orange-400 duration-150 hover:scale-95 hover:bg-orange-400/70 lg:h-full lg:rounded-bl-none"
                    name="profileInfo"
                  >
                    <FaUserAlt size={30} color="white" />
                  </button>
                  {/* User Mood */}
                  <button
                    onClick={handleMenuOpen}
                    className="btn flex h-2/3 items-center justify-center rounded-none border-0 bg-red-400 duration-150 hover:scale-95 hover:bg-red-400/70 lg:h-full lg:rounded-tr-lg"
                    name="userMood"
                  >
                    <MdMood size={38} color="white" />
                  </button>
                  {/* User Education Info */}
                  <button
                    onClick={handleMenuOpen}
                    className="btn flex h-2/3 items-center justify-center rounded-none border-0 bg-indigo-400 duration-150 hover:scale-95 hover:bg-indigo-400/70 lg:h-full lg:rounded-bl-lg"
                    name="userEduInfo"
                  >
                    <FaSchool size={34} color="white" />
                  </button>
                  {/* User Awards */}
                  <button
                    onClick={handleMenuOpen}
                    className="btn flex h-2/3 items-center justify-center rounded-none rounded-r-lg border-0 bg-purple-400 duration-150 hover:scale-95 hover:bg-purple-400/70 lg:h-full lg:rounded-br-lg lg:rounded-tr-none"
                    name="userAwards"
                  >
                    <FaAward size={34} color="white" />
                  </button>
                </>
              )}
            </div>
            {/* Per Post User Info Area End */}
            <div className="w-full rounded-b-xl p-4"></div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PerPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const slug = context.params.slug;

    const post = await prisma.post.findUnique({
      where: {
        id: String(slug),
      },
      include: {
        user: true,
        like: true,
        category: true,
        files: true,
      },
    });

    if (post) {
      const purePost = JSON.parse(JSON.stringify(post));
      return {
        props: { purePost },
      };
    } else {
      return {
        props: {
          msg: "Could not find any post",
        },
      };
    }
  } else {
    return {
      props: {},
    };
  }
};
