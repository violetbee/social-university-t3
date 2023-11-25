import { ISinglePost } from "../../types/post";
import { trpc } from "../../utils/trpc";
import SinglePost from "./SinglePost";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

type Props = {
  itemPiece?: number;
  slug?: string;
};

const MultiPost = ({ itemPiece, slug }: Props) => {
  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );

  const { data: allTypePosts } = trpc.post.getAllPosts.useQuery(
    {
      universityId,
    },
    {
      enabled: slug !== "dokumanlar" && !slug,
    },
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
    },
  );

  function handlePosts() {
    if (slug === "dokumanlar") {
      return docPosts;
    } else if (slug !== "dokumanlar" && !slug) {
      return allTypePosts;
    } else {
      return textPosts;
    }
  }

  return (
    <div className="grid grid-cols-1 gap-5 overflow-hidden md:grid-cols-3">
      {handlePosts()
        ?.posts?.slice(0, itemPiece)
        .map((post) => {
          return <SinglePost key={post.id} post={post as ISinglePost} />;
        })}
    </div>
  );
};

export default MultiPost;
