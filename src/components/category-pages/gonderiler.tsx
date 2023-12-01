import { trpc } from "../../utils/trpc";
import PostBox from "../../components/Cards/Post/PostBox";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import Pagination from "../pagination";

const Gonderiler = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { query } = useRouter();

  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );

  const { data: categories } = trpc.category.getAll.useQuery();

  const { data } = trpc.post.getAllPosts.useQuery(
    {
      universityId,
      slug: selectedCategories.length > 0 ? selectedCategories : undefined,
    },
    {
      enabled: universityId !== undefined,
    },
  );

  useEffect(() => {
    if (query.textCategory) {
      setSelectedCategories([query.textCategory as string]);
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
      <div className="mt-8 self-center">
        <Pagination pageSize={2} totalItemLength={16} />
      </div>
    </div>
  );
};

export default Gonderiler;
