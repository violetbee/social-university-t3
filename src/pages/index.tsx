import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { User } from "@prisma/client";
// import {
//   FcAdvertising,
//   FcCloseUpMode,
//   FcDocument,
//   FcOpenedFolder,
// } from "react-icons/fc";
// import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
// import Stats from "../inactiveComponents/Stats";
// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import Events from "../components/Events";
// import PostsAndFiles from "../components/PostsAndFiles";

type Props = {
  user: User;
};

// interface Club {
//   id: number;
//   title: string;
//   body: string;
// }

// const days = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24, 25, 26, 27, 28, 29, 30,
// ];
// const hardClubs: Club[] = [
//   {
//     id: 0,
//     title: "Yapay Zeka Kulübü",
//     body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio dolores ad reprehenderit excepturi a!",
//   },
//   {
//     id: 1,
//     title: "Web Geliştiricileri",
//     body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt cum, corporis molestias doloribus consequuntur soluta ullam ratione repellat cupiditate.",
//   },
// ];

const Home: NextPage<Props> = () => {
  //Fixed types

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mx-auto flex w-full bg-[#F7F7F7]">
          <div className="grid w-full grid-flow-col grid-rows-4 gap-2 overflow-y-auto p-2">
            {/* <PostsAndFiles />
            <Events /> */}

            <div className="relative h-56 bg-white shadow-sm">
              <div className="heroBg h-full w-full"></div>
              <div className="absolute top-1/2 left-1/2 flex w-9/12 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4">
                <p className="heroTextShadow text-center text-4xl font-bold tracking-wider text-violet-700">
                  Öğrencilerin Akademik ve Sosyal Hayatını Birleştiriyoruz
                  <br />
                  Öğrenmenin Sınır Tanımayan Hali
                </p>

                <div className="space-x-6">
                  <button className="rounded-md bg-orange-500 p-3 text-white">
                    Üye Ol
                  </button>
                  <button className="rounded-md bg-orange-500 p-3 text-white">
                    Giriş Yap
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        emailVerified: true,
      },
    });
    return {
      props: {
        user,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
