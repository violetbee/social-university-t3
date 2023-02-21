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
import Stats from "../inactiveComponents/Stats";
import { useState } from "react";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import Image from "next/image";

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

  type Events = "kahvalti" | "konser" | "sinema" | "gezi" | string;
  type EventInfo = {
    title: string;
    time: string;
    image: string;
    body: string;
    yer: string;
  };

  //Fixed types

  const events: Record<Events, EventInfo> = {
    kahvalti: {
      title: "Kahvaltı",
      time: "09:00",
      yer: "Kantin",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image: "/images/bfast.jpg",
    },
    konser: {
      title: "Pinhani Konseri",
      time: "10:00",
      yer: "Null AVM Merkezi",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image: "/images/konser.webp",
    },
    sinema: {
      title: "Sinema",
      time: "11:00",
      yer: "Sinema Salonu",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image: "/images/bfast.jpg",
    },
    gezi: {
      title: "Gezi",
      time: "12:00",
      yer: "Seul Parkı",
      body: "Lorem Ipsum dolar apset sit amet consectetur adipisicing elit. Quisquam, quod.",
      image: "/images/bfast.jpg",
    },
  };

  const { data: posts } = trpc.post.getAllPosts.useQuery({ query: "" });

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mx-auto flex w-9/12">
          <div className="mt-2 ml-1 grid w-full grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2">
            <div className="col-span-2">
              <p className="text-2xl">Yaklaşan Etkinlikler</p>
              <div className="rounded-md border-[1px] p-4">
                {/* Boxes for events horizontal */}
                <div className="flex flex-row justify-between">
                  {Object.keys(events).map((event, index) => (
                    <div
                      key={index}
                      className="flex h-[16rem] w-[13rem] cursor-pointer flex-col items-center justify-between rounded-md border-[1px] hover:shadow-lg"
                    >
                      <div className="h-24 overflow-hidden rounded-t-md">
                        <Image
                          src={events[event].image}
                          alt="Event Image"
                          width={800}
                          height={600}
                          className="h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm">{events[event].title}</p>
                        <p className="text-sm">{events[event].time}</p>

                        <p className="text-sm">{events[event].yer}</p>

                        <a className="text-sm text-blue-500">Detaylar</a>
                      </div>
                    </div>
                  ))}
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
