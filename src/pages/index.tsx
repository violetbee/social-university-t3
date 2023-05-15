import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import { prisma } from "../server/db/client";
import { User } from "@prisma/client";
import Features from "../components/Landing/Feature";
// import PostsAndFiles from "../inactiveComponents/PostsAndFiles";

type Props = {
  user: User;
};

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
        <div className="flex h-full w-full flex-col">
          {/* <PostsAndFiles /> */}
          <section className="relative h-56 bg-white shadow-sm">
            <div className="heroBg h-full w-full"></div>
            <div className="absolute left-1/2 top-1/2 flex w-9/12 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center gap-4">
              <p className="heroTextShadow text-center text-4xl font-bold tracking-wider text-violet-700">
                Öğrencilerin Akademik ve Sosyal Hayatını Birleştiriyoruz
                <br />
                Öğrenmenin Sınır Tanımayan Hali
              </p>
            </div>
          </section>
          <Features />
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
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
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
