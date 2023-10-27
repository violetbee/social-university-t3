import RootLayout from "../../components/Layouts/RootLayout";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import { trpc } from "../../utils/trpc";
import Image from "next/image";

const CategoryPage = () => {
  const { data: user } = trpc.user.getUserUniversityById.useQuery();

  const { data } = trpc.post.getAllPosts.useQuery({
    universityId: user?.university?.id as string,
  });

  return (
    <div className="columns-1 gap-5 sm:columns-2 md:columns-3 lg:columns-4">
      {data?.posts?.map((post) => (
        <div
          key={post.id}
          className="mb-5 flex break-inside-avoid-column flex-col items-start justify-start gap-2 rounded-lg bg-white p-4 shadow-md dark:bg-darkSecondary"
        >
          {post.image ? (
            <Image
              alt={post.title as string}
              src={post.image}
              className="h-full w-full overflow-hidden rounded-lg"
              width={400}
              height={500}
            />
          ) : (
            ""
          )}

          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              {post.user.image ? (
                <Image
                  src={post.user.image}
                  alt={post.user.name as string}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-darkHelper" />
              )}
              <div className="flex flex-col items-start justify-start">
                <span className="text-sm font-medium tracking-wide text-darkPrimary dark:text-white">
                  {post.user.name}
                </span>
                <span className="text-xs font-normal tracking-wide text-darkHelper dark:text-whitish">
                  {post.user.department?.name}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-normal tracking-wide text-darkHelper dark:text-whitish">
                {post.timeAgo}
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <span className="text-lg font-medium tracking-wide text-darkPrimary dark:text-white">
              {post.title}
            </span>
            <span className="text-sm font-normal tracking-wide text-darkHelper dark:text-whitish">
              {post.content}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;

CategoryPage.getLayout = (page: React.ReactElement) => (
  <RootLayout>
    <DashboardLayout params={page.props.params}>{page}</DashboardLayout>
  </RootLayout>
);
