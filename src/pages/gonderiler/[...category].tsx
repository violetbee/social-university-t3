import { GetServerSideProps } from "next";
import RootLayout from "../../components/layouts/RootLayout";
import { ParsedUrlQuery } from "querystring";
import { MultiEvent as Events } from "../../components/Cards/Event";
import DashboardLayout from "../../components/layouts/DashboardLayout";

type Props = {
  params: {
    [key: string]: string | string[] | ParsedUrlQuery;
  };
};

const CategoryPage = ({ params }: Props) => {
  {
    params.category === "etkinlikler" ? <Events /> : "";
  }
};

export default CategoryPage;

CategoryPage.getLayout = (page: React.ReactElement) => (
  <RootLayout>
    <DashboardLayout params={page.props.params}>{page}</DashboardLayout>
  </RootLayout>
);

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
