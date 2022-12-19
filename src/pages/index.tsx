import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { User } from "@prisma/client";
import { FcCloseUpMode, FcDocument, FcOpenedFolder } from "react-icons/fc";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import Stats from "../components/Stats";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import {
  BiArrowFromLeft,
  BiArrowFromRight,
  BiDownArrow,
  BiUpArrow,
} from "react-icons/bi";
import Image from "next/image";
import Post from "../components/Post";
import { MdOutlineKeyboardArrowDown, MdSort } from "react-icons/md";

type Props = {
  user: User;
};

interface Club {
  id: number;
  title: string;
  body: string;
}

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];

const Home: NextPage<Props> = () => {
  const posts = trpc.post.getAllPosts.useQuery();

  const hardClubs: Club[] = [
    {
      id: 0,
      title: "Yapay Zeka Kulübü",
      body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio dolores ad reprehenderit excepturi a!",
    },
    {
      id: 1,
      title: "Web Geliştiricileri",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum incidunt cum, corporis molestias doloribus consequuntur soluta ullam ratione repellat cupiditate.",
    },
  ];

  const [selected, setSelected] = useState<number>(0);

  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clubsLength = hardClubs.length;

    if (selected === clubsLength - 1) {
      setSelected(
        e.currentTarget.name === "next" ? (prev) => prev : (prev) => prev - 1
      );
    } else if (selected === 0) {
      setSelected(
        e.currentTarget.name === "next" ? (prev) => prev + 1 : (prev) => prev
      );
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
        <div className="flex flex-col gap-2 md:gap-3">
          <Stats />

          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex h-full w-full flex-col justify-between gap-2 rounded-lg border-t-4 border-violet-700 bg-white px-5 py-4 shadow-sm md:w-1/2">
              <div className="space-y-2">
                <h1 className="text-lg font-medium text-gray-700">
                  Dokümanlar
                </h1>
                <p className="text-sm text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ullam, optio?
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="animate-pulse rounded-full bg-green-600 p-[3px]" />
                  <p className="cursor-pointer leading-tight tracking-tight">
                    Yazılım Gerçekleme ve Test Örnek Sorular
                  </p>
                </div>
                <FcOpenedFolder size={48} />
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-2 rounded-lg border-t-4 border-orange-400 bg-white px-5 py-4 shadow-sm md:w-1/2">
              <div className="space-y-2">
                <h1 className="text-lg font-medium text-gray-700">
                  Paylaşımlar
                </h1>
                <p className="text-sm text-gray-700">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ullam, optio?
                </p>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="animate-pulse rounded-full bg-green-600 p-[3px]" />
                  <p className="cursor-pointer leading-tight tracking-tight">
                    Okulda yeniyim, hangi kulübü tercih etmeliyim?
                  </p>
                </div>
                <FcDocument size={48} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="flex h-full w-full flex-col gap-3 rounded-lg border-t-4 border-pink-700 bg-white px-5 py-4 shadow-sm md:w-1/2">
              <h1 className="text-lg font-medium text-gray-700">
                Okul Kulüpleri
              </h1>
              <div className="flex flex-1 items-center justify-between gap-8 md:gap-4 lg:gap-3">
                <button name="previous" onClick={handleSelect}>
                  <TfiAngleLeft size={25} />
                </button>
                <div className="flex justify-around gap-6 md:gap-1 lg:gap-6">
                  <div className="avatar flex items-center">
                    <div className="h-12 w-12 rounded-xl lg:h-20 lg:w-20">
                      <img src="https://placeimg.com/192/192/tech" />
                    </div>
                  </div>
                  <div key={hardClubs[selected]?.id} className="flex flex-col">
                    <h2 className="text-center text-lg">
                      {hardClubs[selected]?.title}
                    </h2>
                    <p className="hidden text-sm font-light sm-m:block md:hidden lg:block">
                      {hardClubs[selected]?.body.slice(0, 80) + "..."}
                    </p>
                  </div>
                </div>
                <button name="next" onClick={handleSelect}>
                  <TfiAngleRight size={25} />
                </button>
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-2 rounded-lg border-t-4 border-cyan-600 bg-white px-5 py-4 shadow-sm md:w-1/2">
              <h1 className="text-lg font-medium text-gray-700">Yemekhane</h1>
              <div className="flex justify-between">
                <div className="flex w-full flex-wrap gap-2 lg:w-5/6">
                  {days.map((item) => (
                    <div
                      className={`group relative cursor-help text-center ${
                        item === 5 && "bg-green-700 text-white"
                      } w-6 rounded-full border-[1px]`}
                      key={item}
                    >
                      {item}
                      <div className="absolute z-50 hidden w-60 rounded-lg border-[1px] bg-white p-4 text-black shadow-md group-hover:block">
                        {/* TODO Günün Yemeği Eklenecek */}
                        <h2 className="font-bold">Günün Yemeği (19.12.2022)</h2>
                        <ul>
                          <li>Şehriye Çorbası </li>
                          <li>Etli Nohut</li>
                          <li>Yemeği Pirinç Pilavı Yoğurt</li>
                        </ul>
                        <img
                          src="https://sks.samsun.edu.tr/wp-content/uploads/sites/6/2022/12/WhatsApp-Image-2022-12-19-at-10.19.57-768x576.jpeg"
                          alt="yemek"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <FcCloseUpMode
                  size={48}
                  className="hidden self-center justify-self-end lg:block"
                />
              </div>
            </div>
          </div>
          {/* <div className="flex h-[500px] flex-col divide-y-[1px] rounded-lg bg-white shadow-sm">
            {posts.data?.slice(0, 6).map((post) => (
              <div key={post.id} className="flex h-1/6 divide-x-[1px]">
                <div className="flex items-center justify-center p-2">
                  {post.user.image ? (
                    <Image
                      src={post.user.image as string}
                      alt={post.user.name as string}
                      height={100}
                      width={100}
                      className="h-16 w-16 rounded-full"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-3xl leading-none text-white">
                      ?
                    </div>
                  )}
                </div>
                <div className="flex-1"></div>
                <div></div>
              </div>
            ))}
          </div> */}

          {/* Experimental */}

          <div className="flex flex-col divide-y-[1px] rounded-lg border-t-4 border-lime-600 bg-white shadow-sm">
            <div className="flex items-center justify-between  px-5 py-4">
              <p className="text-lg font-[500] text-stone-900">
                Kullanıcılar neler diyor?
              </p>
              <div className="flex items-center gap-1 rounded-md border-[1px] px-3 py-1 shadow-sm sm-m:px-10 ">
                <MdSort />
                <p className="mb-[1px]">Sırala</p>
                <MdOutlineKeyboardArrowDown />
              </div>
            </div>
            {posts.data?.slice(0, 4).map(
              (post): JSX.Element => (
                <Post post={post} key={post.id} />
              )
            )}
            {/* Pagination */}
            <div className="flex items-center justify-between rounded-b-md border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">97</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Previous</span>
                      <BiArrowFromLeft className="h-5 w-5" aria-hidden="true" />
                    </a>
                    {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                    >
                      1
                    </a>

                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                    >
                      <span className="sr-only">Next</span>
                      <BiArrowFromRight
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </nav>
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
