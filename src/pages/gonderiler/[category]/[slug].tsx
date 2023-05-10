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
import CategoryAndMenuSection from "../../../components/CategoryAndMenuSection";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";

type Props = {
  purePost: Post & {
    user: User;
    like: Like;
    category: Category;
    files: File[];
  };
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
};

const PerPost: NextPage<Props> = ({ purePost, params }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("profileInfo");
  const [comment, setComment] = useState<string>("");

  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedMenu(e.currentTarget.name);
    setIsMenuOpen(true);
  };

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

  const session = useSession();

  console.log(purePost);

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto w-full space-y-4 pb-4 lg:px-14 xl:px-16">
          <CategoryAndMenuSection params={params} />
          <span className="mx-3 text-3xl font-semibold text-[#444]">
            {purePost.title}
          </span>
          <ul className="flex flex-col space-y-1.5 text-left">
            <li className="relative flex gap-x-4 overflow-hidden pb-5">
              <div className="relative">
                <div className="absolute bottom-0 left-6 top-14 -ml-px h-full w-px border-r  border-gray-300"></div>
                {purePost.user.image ? (
                  <Image
                    src={purePost.user.image as string}
                    width={100}
                    height={100}
                    className="h-12 w-14 rounded-md object-fill"
                    alt="deneme"
                  />
                ) : (
                  <p className="flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-zinc-200 bg-white text-black">
                    {purePost.user.name?.at(0)}
                  </p>
                )}
              </div>
              <div className="w-full">
                <p className="text-md flex min-h-full w-full flex-col rounded-2xl bg-white px-6 py-4 font-medium text-gray-900 shadow-sm">
                  {purePost.content}
                </p>
              </div>
            </li>
            <li className="relative flex gap-x-4 overflow-hidden pb-5">
              <div className="relative">
                <div className="absolute bottom-0 left-6 top-14 -ml-px h-full w-px border-r  border-gray-300"></div>
                {purePost.user.image ? (
                  <Image
                    src={purePost.user.image as string}
                    width={100}
                    height={100}
                    className="h-12 w-14 rounded-md object-fill"
                    alt="deneme"
                  />
                ) : (
                  <p className="flex h-12 w-12 items-center justify-center rounded-full border-[1px] border-zinc-200 bg-white text-black">
                    {purePost.user.name?.at(0)}
                  </p>
                )}
              </div>
              <p className="text-md flex min-h-full w-full flex-col items-center rounded-2xl bg-white px-6 py-4 font-medium text-gray-900 shadow-sm">
                {purePost.content}
              </p>
            </li>
          </ul>
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
