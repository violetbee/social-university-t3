import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import SearchSection from "../../components/Dashboard/SearchSection";
import { ParsedUrlQuery } from "querystring";
import { MultiEvent as Events } from "../../components/Cards/Event";
import Category from "../../components/Dashboard/Category";

type Props = {
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
};

const CategoryPage: NextPage<Props> = ({ params }) => {
  return (
    <Layout>
      <div className="w-full space-y-4 lg:px-14 xl:px-16">
        <SearchSection />
        <Category params={params} />
        {params.category === "etkinlikler" ? <Events /> : ""}
      </div>
    </Layout>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  if (params) {
    return {
      props: {
        params,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
