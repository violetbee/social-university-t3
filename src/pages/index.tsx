import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <div className="bg-[#F6F8FC]">
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col flex-wrap lg:flex-row">
          <div className=" h-52 w-full p-2 lg:w-1/2">
            <div className="h-full w-full rounded-md bg-[#F0D4C5] shadow-sm"></div>
          </div>
          <div className="h-52 w-full p-2 lg:w-1/2">
            <div className="h-full w-full bg-[#F5C5D6] shadow-sm"></div>
          </div>
          <div className="h-52 w-full p-2 lg:w-1/2">
            <div className="h-full w-full bg-[#DBD8F1] shadow-sm"></div>
          </div>
          <div className="h-52 w-full p-2 lg:w-1/2">
            <div className="h-full w-full bg-[#D1E2EA] shadow-sm"></div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
