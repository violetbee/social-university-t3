import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Image from "next/image";

const Dashboard = () => {
  return (
    <Layout>
      <div className="mx-auto h-full">
        <h1 className="px-4 py-3 pb-2 text-3xl font-semibold text-[#333]">
          Portal
        </h1>
        <div className="h-[2px] w-full bg-black" />
        <div className="w-1/3"></div>
      </div>
    </Layout>
  );
};
export default Dashboard;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
