import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Layout from "../../components/Layout";

const PerPost: NextPage = ({
  slug,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <Layout>{slug}</Layout>;
};

export default PerPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params;
  console.log(slug);
  return {
    props: { slug },
  };
};
