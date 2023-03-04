import Post from "./Post";

const Posts = () => {
  return (
    <div className="grid grid-cols-1 justify-between gap-8 px-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
