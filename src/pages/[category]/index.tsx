import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import {
  Category,
  Post as PostType,
  User,
  Department,
  Class,
  ClassLevel,
} from "@prisma/client";
import CategoryAndMenuSection from "../../components/Dashboard/CategoryAndMenuSection";
import { ParsedUrlQuery } from "querystring";
import Events from "../../components/Cards/Event/MultiEvent";
import MultiPost from "../../components/Cards/Post/MultiPost";

type Props = {
  posts: (PostType & {
    user: User;
    category: Category | null;
    publishedTimeAgo: string;
    department: Department | null;
    class: Class | null;
    classLevel: ClassLevel | null;
  })[];
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
};

const Category: NextPage<Props> = ({ params }) => {
  return (
    <Layout>
      <div className="w-full pb-4 lg:px-14 xl:px-16">
        <CategoryAndMenuSection params={params} />
        {params?.category === "etkinlikler" ? (
          <Events />
        ) : (
          <MultiPost slug={params?.category as string} />
        )}
      </div>
    </Layout>
  );
};

export default Category;

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
