import SinglePost from "./SinglePost";
import { trpc } from "../../../utils/trpc";
import type { IPost } from "../../../types/post";

type Props = {
  itemPiece?: number;
  slug?: string;
};

const MultiPost = ({ itemPiece, slug }: Props) => {
  const { data: universityId } = trpc.user.getUserUniversityById.useQuery();
  const { data } = trpc.post.getAllTypePosts.useQuery({
    query: universityId?.university?.id || "",
    slug: slug || "",
  });

  return (
    <div className="grid grid-cols-1 justify-between gap-8 px-2 pb-3 grid-sm:grid-cols-2 grid-md:grid-cols-3 grid-lg:grid-cols-4 grid-xl:grid-cols-5">
      {data?.posts.slice(0, itemPiece).map((post) => {
        return <SinglePost key={post.id} post={post as IPost} />;
      })}
    </div>
  );
};

export default MultiPost;
