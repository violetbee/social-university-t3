import RootLayout from "../../components/layouts/RootLayout";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { trpc } from "../../utils/trpc";
import PostBox from "../../components/Cards/Post/PostBox";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CategoryPage = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { query } = useRouter();

  const { data: user } = trpc.user.getUserUniversityById.useQuery();

  const { data: categories } = trpc.category.getAll.useQuery();

  const { data } = trpc.post.getAllPosts.useQuery({
    universityId: user?.university?.id as string,
    slug: selectedCategories.length > 0 ? selectedCategories : undefined,
  });

  useEffect(() => {
    if (query.category) {
      setSelectedCategories([query.category as string]);
    }
  }, [query]);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex gap-4 self-start">
        {categories?.map((category) => (
          <button
            key={category.id}
            className={`border-b p-1 text-center text-base font-medium duration-150 dark:text-white ${
              selectedCategories.includes(category.slug)
                ? "border-darkPrimary hover:border-b-red-400"
                : "border-b-transparent hover:border-darkPrimary dark:hover:border-darkPrimary"
            }`}
            onClick={() => {
              if (selectedCategories.includes(category.slug)) {
                setSelectedCategories((prev) =>
                  prev.filter((item) => item !== category.slug),
                );
              } else {
                setSelectedCategories((prev) => [...prev, category.slug]);
              }
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="relative z-0 grid flex-1 grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
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
