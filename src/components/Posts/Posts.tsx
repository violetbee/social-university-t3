import Post from "./Post";
import { trpc } from "../../utils/trpc";

type Props = {
  itemPiece?: number;
  slug?: string;
};

const Posts = ({ itemPiece, slug }: Props) => {
  const { data: universityId } = trpc.user.getUserUniversityById.useQuery();
  const { data } = trpc.post.getAllPosts.useQuery({
    query: universityId?.university?.id || "",
    slug: slug || "",
  });

  return (
    <div className="grid grid-cols-1 justify-between gap-8 px-2 pb-3 grid-sm:grid-cols-2 grid-md:grid-cols-3 grid-lg:grid-cols-4 grid-xl:grid-cols-5">
      {data?.posts.slice(0, itemPiece).map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
