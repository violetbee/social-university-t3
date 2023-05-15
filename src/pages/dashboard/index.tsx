import { GetServerSidePropsContext } from "next";
import Layout from "../../components/Layout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import Events from "../../components/Cards/Event/MultiEvent";
// import Announcements from "../../inactiveComponents/Announcements/Announcements";
import CategoryAndMenuSection from "../../components/Dashboard/CategoryAndMenuSection";
import withDashboardSection from "../../components/HoC/withDashboardSection";
import Posts from "../../components/Cards/Post/MultiPost";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import Share from "../../components/Dashboard/PublishPostSection/ShareArea";

const Dashboard = () => {
  const media1225 = useMediaQuery("(min-width: 1225px)");
  const media768 = useMediaQuery("(min-width: 768px)");

  const media = media1225 ? 5 : media768 ? 4 : 2;

  // const AnnouncementsWithExpanded = withDashboardSection(
  //   Announcements,
  //   "Duyurular"
  // );
  const EventsWithExpanded = withDashboardSection(Events, "Etkinlikler", media);
  const PostsWithExpanded = withDashboardSection(
    Posts,
    "Son Gönderiler",
    media
  );

  return (
    <Layout>
      <div className="w-full lg:px-14 xl:px-16">
        <CategoryAndMenuSection />
        <Share />
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
