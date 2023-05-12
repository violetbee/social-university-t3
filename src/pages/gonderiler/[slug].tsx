import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import { prisma } from "../../server/db/client";
import Head from "next/head";
import {
  Category,
  Department,
  File,
  Like,
  Post,
  University,
  User,
} from "@prisma/client";

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
import React, { useState, useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { GoCommentDiscussion } from "react-icons/go";
import { trpc } from "../../utils/trpc";
import { AiFillLike } from "react-icons/ai";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";

type Props = {
  purePost: Post & {
    user: User & {
      department: Department;
      university: University;
    };
    like: Like;
    category: Category;
    files: File[];
  };
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
};

const PerPost: NextPage<Props> = ({ purePost }) => {
  const [comment, setComment] = useState<string>("");

  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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

  const date = new Date(purePost.createdAt);

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="w-full space-y-4 pb-4 pt-8 lg:px-14 xl:px-16">
          {/* <CategoryAndMenuSection params={params} /> */}
          <div className="flex gap-10">
            <ul className="flex w-10/12 flex-col gap-6">
              <li className="flex flex-col gap-6 rounded-md bg-white p-7 shadow-sm">
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    {purePost.user.image ? (
                      <Image
                        src={purePost.user.image as string}
                        alt={purePost.user.name as string}
                        width={44}
                        height={44}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#333] text-white">
                        {purePost.user.name?.at(0)}
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <p className="text-md flex leading-snug">
                        <span className="self-stretch leading-[24px]">@</span>
                        {purePost.user.name}
                      </p>
                      <p className="text-xs font-light leading-4 tracking-wide text-gray-400">
                        {date.toLocaleDateString() +
                          " " +
                          date.toLocaleString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: false,
                          })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center rounded-md p-1 hover:bg-gray-200 ">
                      {/* Three dots */}
                      <svg
                        className="h-6 w-6 text-[#222]"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
                <h1 className="text-lg font-semibold text-[#333]">
                  {purePost.title}
                </h1>
                <p>{purePost.content}</p>
                <div className="space-y-3">
                  {purePost.files.length > 0 && (
                    <div className="flex gap-2">
                      {purePost.files.map((file) => (
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
                    <ul className="flex items-center gap-2">
                      <FaHashtag className="h-6 w-6 text-[#676767]" />
                      <li className="rounded-md bg-[#ededed] px-2 py-1 text-[#6a6a6a] ">
                        deneme
                      </li>
                    </ul>
                    {/* up vote button */}
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          like.mutate({
                            postId: purePost.id,
                          });
                        }}
                        className="flex rounded-md bg-[#1682FD] px-3 py-2 text-white"
                      >
                        <AiFillLike className="mx-1 h-5 w-5 rounded-full text-white" />
                        Destekle
                      </button>
                      <p className="-ml-2 flex h-full items-center rounded-md border-y-[1px] border-r-[1px] border-[#1682FD] px-3 pb-1 pl-[18px] font-mono font-semibold text-[#444]">
                        {getAllLikes.data}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <div className="flex w-full flex-col gap-3 rounded-md bg-white p-7 shadow-sm">
                <textarea
                  placeholder="Yorum yap"
                  className="w-full rounded-md border-none bg-[#F5F5F5] p-2 outline-none focus:border-transparent focus:ring-2 focus:ring-[#E46D80] focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-[#F5F5F5]  "
                />
                {/* Send button */}
                <div className="flex gap-2 self-end">
                  <button className="flex items-center justify-center gap-1  rounded-md bg-[#d2d2d2] px-4 py-2 text-[#5a5a5a]">
                    İptal Et
                  </button>
                  <button className="flex items-center justify-center gap-1  rounded-md bg-[#E46D80] px-4 py-2 text-white">
                    <GoCommentDiscussion className="mx-1 h-5 w-5 text-white" />
                    Gönder
                  </button>
                </div>
              </div>
            </ul>
            <div className="h-full w-2/12">
              <div className="flex h-full flex-col items-center gap-3 rounded-md bg-white py-[30px] shadow-sm">
                {purePost.user.image ? (
                  <Image
                    src={purePost.user.image as string}
                    alt={purePost.user.name as string}
                    width={200}
                    height={200}
                    className="h-[130px] w-[130px] rounded-full"
                  />
                ) : (
                  <div className="flex h-[130px] w-[130px] items-center justify-center rounded-full bg-[#333] text-2xl text-white">
                    {purePost.user.name?.at(0)}
                  </div>
                )}
                <div className="w-2/3 rounded-full border-b-[1px] border-[#333]/10" />
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    <p className="text-lg font-semibold text-[#333]">
                      {purePost.user.name}
                    </p>
                    -
                    <p className="flex gap-1 text-lg font-semibold text-[#E46D80]">
                      5<FaCoins className="h-5 w-5 self-center pb-1" />
                    </p>
                  </div>
                  <p className="max-w-[220px] text-center text-sm font-light text-[#333]">
                    {/* {purePost.user.departmentId} */}
                    {purePost.user.university.name} -{" "}
                    {purePost.user.department?.name.includes(" ")
                      ? purePost.user.department.name
                          .split("")
                          .splice(0, purePost.user.department?.name.length - 9)
                          .join("") + "."
                      : purePost.user.department?.name}
                  </p>
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
            </div>
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
        slug: String(slug),
      },
      include: {
        user: {
          include: {
            department: true,
            university: true,
          },
        },
        like: true,
        category: true,
        files: true,
      },
    });

    if (post) {
      const purePost = JSON.parse(JSON.stringify(post));
      return {
        props: { purePost, params: context.params },
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
