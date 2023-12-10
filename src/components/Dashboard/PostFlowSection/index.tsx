import PostBox from "../../Cards/Post/PostBox";
import { trpc } from "../../../utils/trpc";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";

const PostFlowSection = () => {
  const universityId = useSelector(
    (state: RootState) => state.university.universityId,
  );

  const { data } = trpc.post.getPostsSummary.useQuery(
    {
      universityId,
    },
    {
      staleTime: 1000 * 60 * 60,
    },
  );

  return (
    <div className="col-span-3 xl:col-span-2">
      <div className="flex items-center justify-between gap-5">
        <h3 className="text-2xl font-semibold">Akış</h3>
        <Link
          href="/gonderiler"
          className="rounded-md border border-darkHelper bg-darkBackground p-2 px-4 text-white duration-150 hover:bg-white hover:text-darkBackground"
        >
          Tümünü Gör
        </Link>
      </div>
      {data?.posts.length === 0 ? (
        <div className="flex h-[200px] flex-col items-center justify-center gap-4 text-gray-500">
          <svg
            viewBox="0 0 246.861 246.861"
            xmlSpace="preserve"
            className=""
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <g>
              <path
                fill="none"
                d="M230.614,93.452c-11.592-45.333-25.152-55.611-40.246-38.556
  c-7.488-26.783-22.85-47.706-52.236-52.93c-7.469-2.4-15.128-2.611-22.618-0.586C83.402,5.467,67.999,30.957,61.258,62.547
  c-16.624-9.692-31.675,3.96-44.777,46.57c-4.475,15.728,6.347,27.396,13.787,15.424c11.973-17.309,20.719-25.052,26.626-24.319
  c-1.079,27.736,1.561,55.662,3.586,75.476c-6.657,26.486,2.196,34.407,26.028,24.361c-13.624,35.946,13.095,51.335,32.337,18.27
  c13.715,45.913,35.14,30.487,31.547-4.575c18.438,33.299,40.074,22.3,31.3-10.948h0.001c20.937,16.745,33.586,3.085,10.51-26.091
  c2.592-24.594,6.135-58.033,3.65-89.156c4.32-6.46,12.127-0.389,24.043,20.316C225.678,119.063,234.092,108.15,230.614,93.452z
   M147.011,56.697c6.185,0,11.202,7.94,11.202,17.739s-5.018,17.74-11.202,17.74c-6.183,0-11.202-7.941-11.202-17.74
  S140.828,56.697,147.011,56.697z M103.824,56.887c6.183,0,11.203,7.941,11.203,17.739s-5.02,17.74-11.203,17.74
  c-6.184,0-11.203-7.942-11.203-17.74C92.621,64.828,97.64,56.887,103.824,56.887z M90.461,154.741
  c24.544-61.591,49.633-56.537,75.08,0.861C140.094,127.492,115.006,124.57,90.461,154.741z"
              />
            </g>
          </svg>
          <p>Henüz hiçbir gönderi yok</p>
        </div>
      ) : (
        <div className="z-0 mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {data?.posts?.map((post) => <PostBox key={post.id} {...post} />)}
        </div>
      )}
    </div>
  );
};

export default PostFlowSection;
