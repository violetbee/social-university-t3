import Link from "next/link";
import { useState, useRef, createRef } from "react";
import { trpc } from "../utils/trpc";
import { IDashboardProps } from "../types/app";

const Categories = ({ params }: IDashboardProps) => {
  const { data } = trpc.category.getAll.useQuery();
  const linkRef = useRef(null);

  return (
    <div className="flex items-center">
      {data &&
        data.map((category) => (
          <Link
            ref={linkRef}
            id={category.slug}
            onMouseEnter={() => {
              console.log(document.getElementById(linkRef.current));
            }}
            href={
              category.slug === "her-sey"
                ? "/dashboard"
                : `/gonderiler/${category.slug}`
            }
            key={category.id}
            className={`flex-shrink-0 cursor-pointer whitespace-nowrap border-[1px] px-3 py-2 align-middle leading-[1.2] duration-150  ${
              category.slug === params?.category ||
              (category.slug === "her-sey" && !params?.category)
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
