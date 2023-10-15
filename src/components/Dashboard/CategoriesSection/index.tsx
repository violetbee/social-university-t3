import Link from "next/link";
import { trpc } from "../../../utils/trpc";
import { ICategoryProps } from "../../../types/app";
import { useEffect, useState } from "react";
import { ShareButton } from "../SearchBarSection/particles/ShareButton";
import PublishPostSection from "../PublishPostSection";

const Category = ({ params }: ICategoryProps) => {
  const { data } = trpc.category.getAll.useQuery();
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      setUrl("/dashboard");
    } else {
      setUrl(``);
    }
  }, [params?.category]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg-m:grid-cols-4 2xl:grid-cols-7">
        <Link
          href="/dashboard"
          className={`${
            url ? "border-b border-darkPrimary" : "border-b-darkHelper"
          } flex flex-col items-center justify-center gap-2 rounded-lg border border-x-darkHelper border-t-darkHelper bg-white py-3 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
        >
          <span className="text-center text-lg font-medium tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_1px_rgb(0,0,0)]">
            Her Şey
          </span>
        </Link>
        {data?.map((category) => (
          <Link
            id={category.slug}
            href={
              category.slug === "her-sey" ? "/dashboard" : `/${category.slug}`
            }
            key={category.id}
            className={`${
              params?.category === category.slug ||
              (params?.category === undefined && category.slug === "her-sey")
                ? "border-b border-darkPrimary"
                : "border-b-darkHelper"
            } flex flex-col items-center justify-center gap-2 rounded-lg border border-x-darkHelper border-t-darkHelper bg-white py-3 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
          >
            <span className="text-center text-lg font-medium tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
              {category.name}
            </span>
          </Link>
        ))}
        <ShareButton />
      </div>
      <PublishPostSection />
    </div>
  );
};

export default Category;
