import { trpc } from "../../../../utils/trpc";
import PostBox from "../../../Cards/Post/PostBox";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import Pagination from "../../../pagination";
import { usePagination } from "../../../../hooks/usePagination";
import SubCategory from "../../../subCategory";

const NUMBER_OF_POSTS_RECEIVED = 6;

const Gonderiler = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [totalPostsLength, setTotalPostsLength] = useState(0);

  const { query } = useRouter();
  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );
  const { data: categories } = trpc.subCategory.getAll.useQuery();
  const pagination = usePagination(NUMBER_OF_POSTS_RECEIVED, totalPostsLength);
  const { data, isSuccess } = trpc.post.getAllPosts.useQuery(
    {
      universityId,
      slug:
        selectedCategories.size > 0
          ? Array.from(selectedCategories)
          : undefined,
      skip: pagination.currentPage * NUMBER_OF_POSTS_RECEIVED,
      take: NUMBER_OF_POSTS_RECEIVED,
    },
    {
      enabled: universityId !== undefined,
    },
  );

  useEffect(() => {
    if (isSuccess) {
      setTotalPostsLength(data.count);
      data.posts.length === 0 && pagination.setClickedPage(0);
    }
  }, [isSuccess, data?.count, data?.posts.length, pagination]);

  useEffect(() => {
    if (query.sub) {
      setSelectedCategories(new Set().add(query.sub) as Set<string>);
    }
  }, [query]);

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <SubCategory
        data={categories?.map((category) => ({
          name: category.name,
          slug: category.slug,
          id: category.id,
        }))}
        onChange={pagination.setClickedPage}
        filter={selectedCategories}
        setFilter={setSelectedCategories}
      />
      <div className="relative z-0 grid w-full flex-1 grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {data?.posts?.map((post) => <PostBox key={post.id} {...post} />)}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};

export default Gonderiler;
