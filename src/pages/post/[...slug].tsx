import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import { prisma } from "../../server/db/client";
import Head from "next/head";
import { Category, Like, Post, User } from "@prisma/client";
import { RiPencilFill } from "react-icons/ri";
import { IoMdSchool } from "react-icons/io";
import { CgListTree } from "react-icons/cg";
import { FaUserAlt, FaSchool, FaAward } from "react-icons/fa";
import { MdMood } from "react-icons/md";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  purePost: Post & {
    user: User;
    like: Like;
    category: Category;
  };
};

const PerPost: NextPage<Props> = ({ purePost }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("");

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedMenu(e.currentTarget.name);
    setIsMenuOpen(true);
  };

  const switchMenu = (menu: string) => {
    switch (menu) {
      case "profileInfo":
        return <div>Profil Info</div>;
      case "userMood":
        return <div>User Mood</div>;
      case "userEduInfo":
        return <div>User Education Info</div>;
      case "userAwards":
        return <div>User Awards</div>;
    }
  };

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex justify-between gap-4">
          <div className="flex w-10/12 flex-col">
            <div className="flex w-full flex-col divide-y-[1px] divide-slate-900/10 rounded-t-lg bg-white px-5 py-4 shadow-sm">
              <h1 className="px-2 pt-1 pb-2 text-xl">
                {purePost.title.toUpperCase()}
              </h1>
              <p className="break-all px-2 py-4">{purePost.content}</p>
            </div>
            <div className="flex w-full justify-between rounded-b-lg bg-indigo-400 px-5 py-2 text-white shadow-inner shadow-black/20">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CgListTree />
                  {purePost.category.name}
                </div>
                <div className="flex items-center gap-1">
                  <RiPencilFill />
                  {purePost.type === "TEXT" ? "Yazı" : "Doküman"}
                </div>
                <div className="flex items-center gap-1">
                  <IoMdSchool />
                  {`${purePost.user.department || "Yazılım Mühendisliği"}`}
                </div>
              </div>
              <div>Deneme</div>
            </div>
          </div>
          <div className="h-48 w-2/12 rounded-lg bg-gradient-to-tr">
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
            <div
              className={`grid h-full w-full ${
                isMenuOpen ? "grid-cols-1" : "grid-cols-2"
              } rounded-lg bg-white`}
            >
              {/* User Info */}
              {isMenuOpen ? (
                switchMenu(selectedMenu)
              ) : (
                <>
                  {/* Profile Info */}
                  <button
                    onClick={handleMenuOpen}
                    className="flex items-center justify-center rounded-tl-lg bg-orange-400 duration-150 hover:bg-orange-400/70"
                    name="profileInfo"
                  >
                    <FaUserAlt size={30} color="white" />
                  </button>
                  {/* User Mood */}
                  <button
                    onClick={handleMenuOpen}
                    className="flex items-center justify-center rounded-tr-lg bg-red-400 duration-150 hover:bg-red-400/70"
                    name="userMood"
                  >
                    <MdMood size={38} color="white" />
                  </button>
                  {/* User Education Info */}
                  <button
                    onClick={handleMenuOpen}
                    className="flex items-center justify-center rounded-bl-lg bg-indigo-400 duration-150 hover:bg-indigo-400/70"
                    name="userEduInfo"
                  >
                    <FaSchool size={34} color="white" />
                  </button>
                  {/* User Awards */}
                  <button
                    onClick={handleMenuOpen}
                    className="flex items-center justify-center rounded-br-lg bg-purple-400 duration-150 hover:bg-purple-400/70"
                    name="userAwards"
                  >
                    <FaAward size={34} color="white" />
                  </button>
                </>
              )}
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
        id: String(slug),
      },
      include: {
        user: true,
        like: true,
        category: true,
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
