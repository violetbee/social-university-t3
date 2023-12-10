import { GetServerSideProps } from "next";
import Layout from "../../components/layouts/RootLayout";
import Head from "next/head";
import React, { ReactElement } from "react";
import { ParsedUrlQuery } from "querystring";
import { ISinglePost } from "../../types/post";
import type { NextPageWithLayout } from "../_app";
import { getTextTypePosts } from "../../apis/textTypePosts";
import { getFileTypePosts } from "../../apis/fileTypePosts";
import GonderiVeDosyaInPage from "../../components/pages/category/inPageDetail/GonderiVeDosya";
import EtkinliklerInPage from "../../components/pages/category/inPageDetail/Etkinlikler";

type Props = {
  content: ISinglePost;
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
};

const ContentPage: NextPageWithLayout<Props> = ({ content, params }) => {
  const { category } = params;

  const handleContentClientSwitch = (type: string) => {
    switch (type) {
      case "dosya-paylasimlari":
      case "gonderiler":
        return (
          <GonderiVeDosyaInPage post={content} category={category as string} />
        );
      case "soru-cevap-paylasimlari":
        return <div>Soru-Cevap</div>;
      case "anketler":
        return <div>Anketler</div>;
      case "etkinlikler":
        return <EtkinliklerInPage />;
    }
  };

  return (
    <>
      <Head>
        <title>Sosyal Üniversite</title>
        <meta name="description" content="Sosyal Üniversite" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full py-5">
        {handleContentClientSwitch(category as string)}
      </div>
    </>
  );
};

export default ContentPage;

ContentPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params)
    return {
      notFound: true,
    };

  const { slug, category } = context.params;

  const handleContentAPISwitch = (type: string) => {
    switch (type) {
      case "gonderiler":
        return getTextTypePosts(slug as string);
      case "dosya-paylasimlari":
        return getFileTypePosts(slug as string);
    }
  };

  const content = await handleContentAPISwitch(category as string);

  if (content) {
    const parsedContent = JSON.parse(JSON.stringify(content));
    return {
      props: { content: parsedContent, params: context.params },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
