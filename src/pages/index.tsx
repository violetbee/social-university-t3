import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { User } from "@prisma/client";
import {
  FcAdvertising,
  FcCloseUpMode,
  FcDocument,
  FcOpenedFolder,
} from "react-icons/fc";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import Stats from "../components/Stats";
import { useState } from "react";
import Link from "next/link";

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

  type Events = "kahvalti" | "konser" | "sinema" | "gezi";
  type EventInfo = {
    title: string;
    time: string;
    image: string;
    body: string;
    yer: string;
  };

  const events: Record<Events, EventInfo> = {
    kahvalti: {
      title: "Kahvaltı",
      time: "09:00",
      yer: "Kantin",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image:
        "https://c4.wallpaperflare.com/wallpaper/727/456/27/breakfast-4k-windows-for-desktop-wallpaper-preview.jpg",
    },
    konser: {
      title: "Pinhani Konseri",
      time: "10:00",
      yer: "Null AVM Merkezi",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image:
        "https://cdn.odatv4.com/images/2022_09/2022_09_30/odatv_image_88__0de4055ba77b45.jpg",
    },
    sinema: {
      title: "Sinema",
      time: "11:00",
      yer: "Sinema Salonu",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image:
        "https://c4.wallpaperflare.com/wallpaper/727/456/27/breakfast-4k-windows-for-desktop-wallpaper-preview.jpg",
    },
    gezi: {
      title: "Gezi",
      time: "12:00",
      yer: "Seul Parkı",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image:
        "https://c4.wallpaperflare.com/wallpaper/727/456/27/breakfast-4k-windows-for-desktop-wallpaper-preview.jpg",
    },
  } as const;

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <div className="col-span-1 md:col-span-2">
            <Stats />
          </div>

          <div className="flex flex-col justify-between gap-2 rounded-lg border-t-4 border-violet-700 bg-box px-5 py-4 text-white shadow-sm">
            <div className="space-y-2">
              <h1 className="text-lg font-medium">Dokümanlar</h1>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                optio?
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
          <div className="flex w-full flex-col gap-2 rounded-lg border-t-4 border-orange-400 bg-box px-5 py-4 text-white shadow-sm">
            <div className="space-y-2">
              <Link href="/all" className="text-lg font-medium">
                Paylaşımlar
              </Link>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                optio?
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

          {/* Events Area */}
          <div className="flex w-full flex-col gap-2 rounded-lg border-t-4 border-blue-700 bg-box px-5 py-4 text-white shadow-sm">
            <div className="space-y-2">
              <h1 className="text-lg font-medium">Etkinlikler</h1>
            </div>
            <div className="flex h-full flex-col gap-2 overflow-y-hidden overflow-x-scroll rounded-md px-2 py-4 md:h-60 md:w-full md:flex-row">
              {Object.keys(events).map((event, index) => {
                return (
                  <div
                    style={{
                      backgroundImage: `url(${
                        events[event as keyof typeof events].image
                      })`,
                    }}
                    key={index}
                    className={`cursor-pointer rounded-md bg-cover bg-center bg-no-repeat shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                  >
                    <div className="flex h-full flex-col justify-around bg-gradient-to-t from-black to-white/5 p-2 text-white md:w-40">
                      <h1
                        className="text-md font-bold drop-shadow-md"
                        style={{
                          textShadow: "-0.5px -0.5px #000, 0.5px 0.5px #000",
                        }}
                      >
                        {events[event as keyof typeof events].title}
                      </h1>
                      <p> {events[event as keyof typeof events].yer}</p>
                      <p className="text-sm">
                        {events[event as keyof typeof events].body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Announcements Area */}
          <div className="flex w-full flex-col gap-2 rounded-lg border-t-4 border-yellow-400 bg-box px-5 py-4 text-white shadow-sm">
            <div className="space-y-2">
              <h1 className="text-lg font-medium ">Duyurular</h1>
              <p className="text-sm text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
                optio?
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="animate-pulse rounded-full bg-green-600 p-[3px]" />
                  <p className="cursor-pointer leading-tight tracking-tight">
                    Yazılım Gerçekleme ve Test Örnek Sorular
                  </p>
                </div>
                <FcAdvertising size={48} />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-1">
                  <div className="animate-pulse rounded-full bg-green-600 p-[3px]" />
                  <p className="cursor-pointer leading-tight tracking-tight">
                    Yazılım Gerçekleme ve Test Örnek Sorular
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 rounded-lg border-t-4 border-pink-700 bg-box px-5 py-4 text-white shadow-sm">
            <h1 className="text-lg font-medium">Okul Kulüpleri</h1>
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
          <div className="flex w-full flex-col gap-2 rounded-lg border-t-4 border-cyan-600 bg-box px-5 py-4 text-white shadow-sm">
            <h1 className="text-lg font-medium">Yemekhane</h1>
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
                    <div className="absolute -left-[235px] -top-[280px] z-50 hidden w-60 rounded-lg border-[1px] bg-white p-4 text-black shadow-md group-hover:block">
                      {/* TODO Günün Yemeği Eklenecek */}
                      <h2 className="font-bold">Günün Yemeği (19.12.2022)</h2>
                      <ul>
                        <li>Şehriye Çorbası </li>
                        <li>Etli Nohut</li>
                        <li>Yemeği Pirinç Pilavı Yoğurt</li>
                      </ul>
                      <img
                        src="https://sks.samsun.edu.tr/wp-content/uploads/sites/6/2023/01/WhatsApp-Image-2023-01-02-at-10.02.51-768x576.jpeg"
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

        {/* Experimental */}
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
