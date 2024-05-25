import { GetServerSideProps } from "next";
import Layout from "../../components/layouts/RootLayout";
import Head from "next/head";
import React, { ReactElement } from "react";
import { ParsedUrlQuery } from "querystring";
import { ISinglePost } from "../../types/post";
import type { NextPageWithLayout } from "../_app";
import { getTextTypePost } from "../../server/api/post/GET/text-type-post";
import { getFileTypePost } from "../../server/api/post/GET/file-type-post";
import GonderilerDetail from "../../components/ui/organisms/pages/category/gonderiler/detail";
import EtkinliklerInPage from "../../components/ui/organisms/pages/category/etkinlikler/detail";
import {
  type EventDetails,
  getEventDetails,
} from "../../server/api/event/GET/event-detail";
import { getSchoolClubDetails } from "../../server/api/school-club/GET/detail";
import DashboardLayout from "../../components/layouts/DashboardLayout";

type Props = {
  content: ISinglePost | EventDetails;
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
          <GonderilerDetail
            post={content as ISinglePost}
            category={category as string}
          />
        );
      case "soru-cevap-paylasimlari":
        return <div>Soru-Cevap</div>;
      case "anketler":
        return <div>Anketler</div>;
      case "okul-topluluklari":
        return <div>Okul Toplulukları</div>;
      case "etkinlikler":
        return (
          <EtkinliklerInPage
            event={content as EventDetails}
            category={category as string}
          />
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
      <div className="h-full py-5">
        {handleContentClientSwitch(category as string)}
      </div>
    </>
  );
};

export default ContentPage;

ContentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <DashboardLayout>{page}</DashboardLayout>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params)
    return {
      notFound: true,
    };

  const { slug, category } = context.params;

  if (!slug || !category) {
    return {
      notFound: true,
    };
  }

  const handleContentAPISwitch = (type: string | string[]) => {
    switch (type) {
      case "gonderiler":
        return getTextTypePost(slug);
      case "dosya-paylasimlari":
        return getFileTypePost(slug);
      case "etkinlikler":
        return getEventDetails(slug);
      case "okul-topluluklari":
        return getSchoolClubDetails(slug, undefined);
    }
  };

  const content = await handleContentAPISwitch(category);

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
