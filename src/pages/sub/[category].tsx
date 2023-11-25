import RootLayout from "../../components/layouts/RootLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Gonderiler from "../../components/category-pages/gonderiler";
import { GetServerSideProps } from "next";
import DosyaPaylasimlari from "../../components/category-pages/dosyaPaylasimlari";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  switch (params.category) {
    case "gonderiler":
      return <Gonderiler />;
    case "dosya-paylasimlari":
      return <DosyaPaylasimlari />;
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
