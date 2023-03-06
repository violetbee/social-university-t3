import Post from "./Post";
import { trpc } from "../../utils/trpc";
import { useState } from "react";

const Posts = () => {
  const [query, setQuery] = useState<string | null>("");

  const { data: posts } = trpc.post.getAllPosts.useQuery({ query });

  return (
    <div className="grid grid-cols-1 justify-between gap-8 px-2 pb-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      {posts?.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
