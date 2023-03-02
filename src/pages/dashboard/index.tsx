import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Events from "../../components/Events/Events";
import Announcements from "../../components/Announcements";
import CategorySearch from "../../components/CategorySearch";

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto w-full pb-4">
        <CategorySearch />
        <Announcements />
        <Events itemPiece={5} />
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
