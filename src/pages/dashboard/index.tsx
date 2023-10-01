import { GetServerSidePropsContext } from "next";
import Events from "../../components/Cards/Event/MultiEvent";
import RootLayout from "../../components/Layouts/RootLayout";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
// import Announcements from "../../inactiveComponents/Announcements/Announcements";
import withDashboardSection from "../../components/HoC/withDashboardSection";
import DiscoverYourCity from "../../components/Dashboard/DiscoverYourCitySection";
// import Category from "../../components/Dashboard/Category";
// import { ICategoryProps } from "../../types/app";
import Image from "next/image";
import MultiPost from "../../components/Post/MultiPost";
import Table from "../../components/Table/Table";
import { ReactElement } from "react";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
// import { HiLightningBolt, HiOutlineLightningBolt } from "react-icons/hi";
// import University from "../../components/UniversityArea/University";

const Dashboard = () => {
  // const AnnouncementsWithExpanded = withDashboardSection(
  //   Announcements,
  //   "Duyurular"
  // );
  const EventsWithExpanded = withDashboardSection(Events, "🎫 Etkinlikler", 4);
  const FeaturedSchoolClubs = withDashboardSection(
    Table,
    "🎒 Seçkin Kulüpler",
    4,
  );
  const PostsWithExpanded = withDashboardSection(
    MultiPost,
    "📝 Trend Gönderiler",
    2,
  );

  const DiscoverYourCityExpanded = withDashboardSection(
    DiscoverYourCity,
    <>
      <span className="text-green-400">🌇 {"Samsun"}</span> Şehrini Keşfet
    </>,
  );

  return (
    <>
      <DiscoverYourCityExpanded />
      <PostsWithExpanded />
      <Image
        src="/images/banner.png"
        className="h-full w-full rounded-md object-cover object-center shadow-md"
        alt="banner"
        width={1864}
        height={209}
      />
      <EventsWithExpanded />
      <FeaturedSchoolClubs />
    </>
  );
};
export default Dashboard;

Dashboard.getLayout = (page: ReactElement) => (
  <RootLayout>
    <DashboardLayout params={page.props.params}>{page}</DashboardLayout>
  </RootLayout>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getServerAuthSession({
    req: context.req,
    res: context.res,
  });

  const { params } = context;

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: { params: params || {} },
    };
  }
};
