import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Categories = () => {
  const [active, setActive] = useState<string>("her-sey");
  const { query } = useRouter();
  const { data } = trpc.category.getAll.useQuery();

  return (
    <div className="flex items-center">
      {data &&
        data.map((category) => (
          <Link
            onMouseEnter={() => setActive(category.slug)}
            onMouseLeave={() =>
              setActive((query.category as string) || "her-sey")
            }
            href={
              category.slug === "her-sey"
                ? "/dashboard"
                : `/gonderiler/${category.slug}`
            }
            key={category.id}
            className={`flex-shrink-0 cursor-pointer whitespace-nowrap border-[1px] px-3 py-2 align-middle leading-[1.2] duration-150  ${
              active === category.slug
                ? "rounded-full border-[#888] bg-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[0.25rem_0.25rem_#333]"
                : "border-transparent"
            }`}
          >
            <p className="hidden md:block">{category.name}</p>
            <p className="block md:hidden">A</p>
          </Link>
        ))}
    </div>
  );
};

export default Categories;
