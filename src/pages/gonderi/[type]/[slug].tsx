import { GetServerSideProps } from "next";
import Layout from "../../../components/layouts/RootLayout";
import { prisma } from "../../../server/db/client";
import Head from "next/head";

import {
  FaDownload,
  FaHashtag,
  FaCoins,
  FaInstagram,
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";
import React, { ReactElement } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowUp } from "react-icons/io";
import { trpc } from "../../../utils/trpc";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { ISinglePost } from "../../../types/post";
import { DocTypePost, TextTypePost } from "@prisma/client";
import type { NextPageWithLayout } from "../../_app";

type Props = {
  post: ISinglePost;
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
};

const PerPost: NextPageWithLayout<Props> = ({ post, params }) => {
  const { type } = params;

  // const [comment, setComment] = useState<string>("");

  const ctx = trpc.useContext();
  const like = trpc.like.like.useMutation({
    onSuccess: () => {
      ctx.like.invalidate();
    },
  });

  const getAllLikes = trpc.like.totalLikes.useQuery({
    postId: post.id,
  });

  const date = new Date(post.createdAt);

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full pb-4 pt-8 ">
        <div className="flex gap-10">
          <div className=" flex w-full flex-col gap-6 xl:w-9/12">
            <div className="relative h-72 w-full">
              <Image
                alt="image"
                src="/images/categories/rain.jpg"
                layout="fill"
                objectFit="cover"
                className="h-full w-full rounded-md border border-darkHelper shadow-md"
              />
            </div>

            <div className="flex flex-col gap-4 rounded-md border bg-white p-7 shadow-md dark:border-darkHelper dark:bg-darkSecondary ">
              <div className="flex flex-col gap-2 text-white/50">
                <div className="flex justify-between">
                  <div className="flex items-end gap-3 ">
                    <p className="text-base font-light ">
                      Bu gönderi
                      <span className="font-semibold text-white">
                        {" " + post.user.name + " "}
                      </span>
                      tarafından paylaşıldı.
                    </p>
                  </div>
                  <small className="text-xs/[23px] font-light tracking-wide">
                    {date.toLocaleDateString() +
                      " " +
                      date.toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      })}
                  </small>
                </div>
                <div className="h-[1px] w-full bg-darkHelper" />
              </div>
              <h1 className="text-lg font-semibold text-[#333] dark:text-white">
                {post.title}
              </h1>
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-2">
                  <IoIosArrowUp
                    onClick={() => {
                      like.mutate({
                        postId: post.id,
                      });
                    }}
                    className="cursor-pointer"
                    size={28}
                  />
                  <p className="text-[#333] dark:text-white/80">
                    {getAllLikes.data}
                  </p>
                  <IoIosArrowUp
                    size={28}
                    className="rotate-180 transform cursor-pointer"
                  />
                </div>
                <p className="text-[#333] dark:text-[#777]">{post.content}</p>
              </div>
              <div className="space-y-3">
                {type === "dokuman" && (
                  <div className="flex gap-2">
                    {post.files?.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-2 rounded-md bg-[#F5F5F5] p-2"
                      >
                        <FaDownload className="h-6 w-6 text-[#333]" />
                        <p className="text-[#333]">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <FaHashtag className="h-6 w-6 text-[#676767]" />
                    <button className="rounded-md bg-[#ededed] px-2 py-1 text-[#6a6a6a] shadow-md dark:border dark:border-darkHelper dark:bg-darkBackground dark:text-white/80">
                      deneme
                    </button>
                  </div>
                  {/* up vote button */}
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 rounded-md bg-white p-7 shadow-md dark:border dark:border-darkHelper dark:bg-darkSecondary">
              <textarea
                placeholder="Yorum yap"
                className="w-full rounded-md border-none bg-[#F5F5F5] p-2 text-[#333] outline-none focus:border-transparent focus:ring-2 focus:ring-darkPrimary/10 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-darkHelper dark:bg-darkBackground dark:text-white"
              />
              {/* Send button */}
              <div className="flex gap-2 self-end">
                <button className="flex items-center justify-center gap-1  rounded-md bg-[#d2d2d2] px-4 py-2 text-[#5a5a5a] dark:border dark:border-darkHelper dark:bg-darkBackground dark:text-white">
                  İptal Et
                </button>
                <button className="flex items-center justify-center gap-1  rounded-md bg-darkPrimary px-4 py-2 text-white dark:border dark:border-darkHelper">
                  <GoCommentDiscussion className="mx-1 h-5 w-5 text-white" />
                  Gönder
                </button>
              </div>
            </div>
          </div>
          <div className="hidden h-full w-3/12 xl:flex xl:flex-col xl:gap-6">
            <div className="flex h-full flex-col items-center gap-3 rounded-md bg-white py-[30px] shadow-sm dark:border dark:border-darkHelper dark:bg-darkSecondary dark:shadow-md">
              <div className="w-2/3 rounded-full border-b-[1px] border-[#333]/10" />
              <div className="flex items-center gap-4">
                {post.user.image ? (
                  <Image
                    src={post.user.image as string}
                    alt={post.user.name as string}
                    width={200}
                    height={200}
                    className="h-14 w-14 rounded-full"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#333] text-2xl text-white">
                    {post.user.name?.at(0)}
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <div className="flex gap-1">
                    <p className="text-lg text-[#333] dark:text-white">
                      {post.user.name}
                    </p>
                    -
                    <p className="flex gap-1 text-lg font-semibold text-[#E46D80]">
                      5<FaCoins className="h-5 w-5 self-center pb-1" />
                    </p>
                  </div>
                  <p className="max-w-[220px] text-center text-sm font-light text-[#333] dark:text-white/80">
                    {/* {post.user.departmentId} */}
                    {post.user.university?.name} <br />
                    {post.user.department?.name.includes(" ")
                      ? post.user.department.name
                          .split("")
                          .splice(0, post.user.department?.name.length - 9)
                          .join("") + "."
                      : post.user.department?.name}
                  </p>
                </div>
              </div>

              <div className="w-2/3 rounded-full border-b-[1px] border-[#333]/10" />
              {/* Social Platforms Like Instagram, Github, Twitter */}
              <div className="mt-1 flex w-full items-center justify-center gap-5">
                <FaInstagram className="h-4 w-4 text-[#666]" />
                <FaGithub className="h-4 w-4 text-[#666]" />
                <FaFacebook className="h-4 w-4 text-[#666]" />
                <FaTwitter className="h-4 w-4 text-[#666]" />
                <FaTwitch className="h-4 w-4 text-[#666]" />
              </div>
            </div>
            <div className="sticky top-4 flex h-64 w-full flex-col items-center justify-center rounded-md border border-darkHelper bg-white text-center font-bold tracking-widest text-black shadow-md">
              Bu alan reklam için ayrılmıştır
              <br />
              <span className="text-2xl">256x256</span>
              <div className="absolute left-1/2 top-1/2 h-[96%] w-[97%] -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-dashed border-darkHelper/30"></div>
            </div>
            <div className="flex h-[1000px] w-full items-center justify-center rounded-md border-darkHelper"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerPost;

PerPost.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const { slug, type } = context.params;

    let basePost: TextTypePost | DocTypePost | null;

    if (type === "yazi") {
      basePost = await prisma.textTypePost.findUnique({
        where: {
          slug: String(slug),
        },
        include: {
          user: {
            include: {
              department: true,
              university: true,
              classLevel: true,
            },
          },
          likes: true,
          category: true,
        },
      });
    } else {
      basePost = await prisma.docTypePost.findUnique({
        where: {
          slug: String(slug),
        },
        include: {
          user: {
            include: {
              department: true,
              university: true,
              classLevel: true,
            },
          },
          likes: true,
          files: true,
        },
      });
    }

    if (basePost) {
      const post = JSON.parse(JSON.stringify(basePost));
      return {
        props: { post, params: context.params },
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
