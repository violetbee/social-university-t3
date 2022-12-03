import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Image from "next/image";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { DefaultSession } from "next-auth";

type Props = {
  auth_session: DefaultSession;
};

const Home: NextPage<Props> = ({ auth_session: session }) => {
  console.log(session);
  return (
    <div className="bg-[#F6F8FC]">
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {session?.user && (
          <div
            className={`flex  ${
              session && "h-52"
            } w-full rounded-md bg-white shadow-sm`}
          >
            <div className="flex w-1/4 flex-col items-center justify-center rounded-l-md border-r-[1px] border-b-zinc-500/70 bg-slate-400/30">
              {session?.user?.image ? (
                <Image
                  className="rounded-full"
                  alt="item"
                  src={session?.user?.image as string}
                  width={100}
                  height={150}
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900/70">
                  <p className="text-2xl font-bold text-white">
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </p>
                </div>
              )}
              <p>{`${session?.user?.name} ${session?.user?.surname}`}</p>
            </div>
            <div></div>
          </div>
        )}

        <div className="flex flex-col flex-wrap rounded-md bg-white p-[2px] shadow-sm lg:flex-row">
          <div className="w-full p-[4px] lg:w-9/12">
            <div className="flex h-full w-full flex-col rounded-md border-y-[1px] border-l-[5px] border-r-[1px] border-l-green-800 shadow-sm">
              <div className="w-full border-b-[1px] border-b-zinc-500/20 bg-neutral-50 px-2">
                <h1 className="py-2 font-[600]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam, placeat?
                </h1>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div className="w-full bg-neutral-50/50">
                  <p className="px-2 py-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Alias doloremque minus officia tenetur accusamus libero in
                    corporis tempore aperiam! Laboriosam.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="p-2 text-[#0F172A]">Çağlar Karahüseyin</p>
                  </div>
                  <div className="flex gap-4 pr-4">
                    <BiLeftArrowAlt size={24} />
                    <BiRightArrowAlt size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-52 w-full p-[4px] lg:w-3/12">
            <div className="h-full w-full rounded-md border-y-[1px] border-l-[5px] border-r-[1px] border-l-red-800 shadow-sm"></div>
          </div>
          <div className="h-52 w-full p-[4px] lg:w-1/2">
            <div className="h-full w-full rounded-md border-y-[1px] border-l-[5px] border-r-[1px] border-l-yellow-400 shadow-sm"></div>
          </div>
          <div className="h-52 w-full p-[4px] lg:w-1/2">
            <div className="h-full w-full rounded-md border-y-[1px] border-l-[5px] border-r-[1px] border-l-blue-800 shadow-sm"></div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });
  return {
    props: {
      auth_session: session,
    },
  };
};
