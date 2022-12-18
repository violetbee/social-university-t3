import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { User } from "@prisma/client";
import { FcDocument, FcOpenedFolder } from "react-icons/fc";
import Stats from "../components/Stats";

type Props = {
  user: User;
};

const Home: NextPage<Props> = () => {
  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col gap-3">
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
