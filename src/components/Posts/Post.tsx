const Post = () => {
  return (
    <div className="relative h-[200px] w-full overflow-hidden border-[1px] border-black bg-white p-4">
      <div className="stateOfPost absolute -right-10 top-3 flex h-8 w-32 rotate-45 items-center justify-center bg-center text-lg text-white">
        Dosya
      </div>
      <h3 className="break-words pr-10 font-bold uppercase text-gray-900">
        Lorem ipsum dolor sit amet sdfhsdhsdgsdgsdg
      </h3>
    </div>
  );
};

export default Post;
