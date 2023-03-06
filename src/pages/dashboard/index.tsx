import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Events from "../../components/Events/Events";
import Announcements from "../../components/Announcements";
import CategorySearch from "../../components/CategorySearch";
import withDashboardSection from "../../components/HoC/withDashboardSection";
import Posts from "../../components/Posts/Posts";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const Dashboard = () => {
  const media1225 = useMediaQuery("(min-width: 1225px)");
  const media768 = useMediaQuery("(min-width: 768px)");

  const media = media1225 ? 5 : media768 ? 3 : 2;

  const AnnouncementsWithExpanded = withDashboardSection(
    Announcements,
    "Duyurular"
  );
  const EventsWithExpanded = withDashboardSection(Events, "Etkinlikler", media);
  const PostsWithExpanded = withDashboardSection(Posts, "Son Gönderiler");
  return (
    <Layout>
      <div className="container mx-auto w-full pb-4 lg:px-14 xl:px-16">
        <CategorySearch />
        <AnnouncementsWithExpanded />
        <PostsWithExpanded />
        <EventsWithExpanded />
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
