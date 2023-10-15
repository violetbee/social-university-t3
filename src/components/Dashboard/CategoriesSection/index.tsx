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
      <div className="flex w-full justify-between gap-4">
        <div className="relative flex max-w-full gap-4 overflow-x-hidden">
          <div className="2.5xl:hidden absolute right-0 top-0 z-50 block h-full w-10 bg-gradient-to-r from-transparent to-darkBackground" />
          <Link
            href="/dashboard"
            className={`${
              url ? "border-b border-darkPrimary" : "border-b-darkHelper"
            } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-x-darkHelper border-t-darkHelper bg-white p-3 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
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
              } flex shrink-0 flex-col items-center justify-center gap-2 rounded-lg border border-x-darkHelper border-t-darkHelper bg-white p-3 duration-150 dark:bg-darkSecondary dark:shadow-md hover:dark:bg-darkBackground`}
            >
              <span className="text-center text-lg font-medium tracking-wider text-darkSecondary dark:text-white dark:drop-shadow-[2px_1px_2px_rgb(0,0,0)]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
        <ShareButton />
      </div>
      <PublishPostSection />
    </div>
  );
};

export default Category;
