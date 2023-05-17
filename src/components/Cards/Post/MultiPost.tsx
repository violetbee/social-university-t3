import SinglePost from "./SinglePost";
import { trpc } from "../../../utils/trpc";
import type { ISinglePost } from "../../../types/post";

type Props = {
  itemPiece?: number;
  slug?: string;
};

const MultiPost = ({ itemPiece, slug }: Props) => {
  const { data: universityId } = trpc.user.getUserUniversityById.useQuery();
  const { data: allTypePosts } = trpc.post.getAllTypePosts.useQuery(
    {
      query: universityId?.university?.id || "",
      slug: slug || "",
    },
    {
      enabled: slug !== "dokumanlar" && !slug,
    }
  );

  const { data: docPosts } = trpc.post.getDocPosts.useQuery(undefined, {
    enabled: slug === "dokumanlar",
  });
  const { data: textPosts } = trpc.post.getTextPostsByCategory.useQuery(
    {
      slug: slug || "",
    },
    {
      enabled: slug !== "dokumanlar" && !!slug,
    }
  );

  function handlePosts():
    | typeof allTypePosts
    | typeof docPosts
    | typeof textPosts
    | undefined {
    if (slug === "dokumanlar") {
      return docPosts;
    } else if (slug !== "dokumanlar" && !slug) {
      return allTypePosts;
    } else {
      return textPosts;
    }
  }

  return (
    <div className="grid grid-cols-1 justify-between gap-8 px-2 pb-3 grid-sm:grid-cols-2 grid-md:grid-cols-3 grid-lg:grid-cols-4 grid-xl:grid-cols-5">
      {handlePosts()
        ?.posts?.slice(0, itemPiece)
        .map((post) => {
          return (
            <SinglePost key={post.id} post={post as unknown as ISinglePost} />
          );
        })}
    </div>
  );
};

export default MultiPost;
