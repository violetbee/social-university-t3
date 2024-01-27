import RootLayout from "../../components/layouts/RootLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Gonderiler from "../../components/pages/category/gonderiler/yazi-paylasimlari";
import DosyaPaylasimlari from "../../components/pages/category/gonderiler/dosya-paylasimlari";
import Etkinlikler from "../../components/pages/category/etkinlikler";
import Anketler from "../../components/pages/category/anketler";
import { GetServerSideProps } from "next";
import OkulKulupleri from "../../components/pages/category/okul-topluluklari";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const { category } = params;

  switch (category) {
    case "gonderiler":
      return <Gonderiler />;
    case "dosya-paylasimlari":
      return <DosyaPaylasimlari />;
    case "anketler":
      return <Anketler />;
    case "okul-topluluklari":
      return <OkulKulupleri />;
    case "etkinlikler":
      return <Etkinlikler />;
  }
};

export default CategoryPage;

CategoryPage.getLayout = (page: React.ReactElement) => (
  <RootLayout>
    <DashboardLayout params={page.props.params}>{page}</DashboardLayout>
  </RootLayout>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params) {
    const { category } = context.params;
    return {
      props: {
        params: {
          category,
        },
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
