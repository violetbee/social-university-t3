import Link from "next/link";
import { trpc } from "../../../utils/trpc";
import { ICategoryProps } from "../../../types/app";

const Category = ({ params }: ICategoryProps) => {
  const { data } = trpc.category.getAll.useQuery();

  return (
    <div className="grid grid-cols-2 gap-4 text-center text-xl font-bold text-white lg-m:grid-cols-4 2xl:grid-cols-8">
      {data &&
        data.map((category) => (
          <Link
            id={category.slug}
            href={
              category.slug === "her-sey" ? "/dashboard" : `/${category.slug}`
            }
            key={category.id}
            className={`${
              params?.category === category.slug ||
              (params?.category === undefined && category.slug === "her-sey")
                ? "outline outline-1 outline-offset-4 outline-yellow-300"
                : ""
            } flex h-20 w-full items-center justify-center rounded-lg bg-darkSecondary px-2 duration-150 hover:-translate-y-2`}
          >
            <span className="drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
              {category.name}
            </span>
          </Link>
        ))}
    </div>
  );
};

export default Category;
