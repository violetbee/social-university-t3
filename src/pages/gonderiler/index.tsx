import RootLayout from "../../components/layouts/RootLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { trpc } from "../../utils/trpc";
import PostBox from "../../components/Cards/Post/PostBox";

const CategoryPage = () => {
  const { data: user } = trpc.user.getUserUniversityById.useQuery();

  // const { data: categories } = trpc.category.getAll.useQuery();

  const { data } = trpc.post.getAllPosts.useQuery({
    universityId: user?.university?.id as string,
  });

  return (
    <div className="flex h-full gap-4">
      {/* <div className="h-full w-[8%] divide-y divide-dashed divide-[#13141b] overflow-hidden rounded-md border border-darkHelper bg-[#101117] shadow-md">
        <p className="pb-2 pt-3 text-center text-base/none">Kategoriler</p>
        <div className="flex w-full flex-col justify-center">
          {categories?.map((category) => (
            <button
              key={category.id}
              className="border-l-4 py-2 text-center text-xs duration-150"
              style={{ borderLeftColor: category.color as string }}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div> */}
      <div className="z-0 grid flex-1 grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {data?.posts?.map((post) => <PostBox key={post.id} {...post} />)}
      </div>
    </div>
  );
};

export default CategoryPage;

CategoryPage.getLayout = (page: React.ReactElement) => (
  <RootLayout>
    <DashboardLayout params={page.props.params}>{page}</DashboardLayout>
  </RootLayout>
);
