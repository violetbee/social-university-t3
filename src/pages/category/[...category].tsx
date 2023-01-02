import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/Layout";
import { prisma } from "../../server/db/client";

type Props = {
  posts: string;
};

const Category: NextPage<Props> = ({ posts }) => {
  return <Layout>{posts}</Layout>;
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const { category } = params as { category: string };

  const getPostsByCategory = await prisma.category.findMany({
    where: {
      slug: category[0],
    },
    include: {
      posts: true,
    },
  });

  if (!getPostsByCategory) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      posts: JSON.stringify(getPostsByCategory),
    },
  };
};
