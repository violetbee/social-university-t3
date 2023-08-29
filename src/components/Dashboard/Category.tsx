import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { ICategoryProps } from "../../types/app";

const Category = ({ params }: ICategoryProps) => {
  const { data } = trpc.category.getAll.useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    params?.category,
  );

  return (
    <div className="flex flex-wrap items-center gap-[13px]">
      {data &&
        data.map((category) => (
          <Link
            id={category.slug}
            href={
              category.slug === "her-sey" ? "/dashboard" : `/${category.slug}`
            }
            onMouseEnter={() => setSelectedCategory(category.slug)}
            onMouseLeave={() => setSelectedCategory(params?.category)}
            key={category.id}
            className={`relative flex-shrink-0 cursor-pointer whitespace-nowrap ${
              params && Object.keys(params).length === 0 ? "hoverButton" : ""
            } border-[1px] px-3 py-2 align-middle leading-[1.2] duration-150 ${
              selectedCategory === category.slug
                ? "hoverButton"
                : "border-transparent"
            }`}
          >
            <p className="hidden md:block">{category.name}</p>
            <p className="block md:hidden">A</p>
            {Math.floor(Math.random() * 10) % 3 === 0 ? (
              <span className="absolute -right-2 -top-[11px] rounded-lg bg-[#dd4e63] px-2 pt-1 text-xs font-bold text-white">
                {Math.floor(Math.random() * 40) % 8}
              </span>
            ) : (
              ""
            )}
          </Link>
        ))}
    </div>
  );
};

export default Category;
