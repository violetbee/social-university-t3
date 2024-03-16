import React from "react";

type Props = {
  data?: {
    name: string;
    slug: string | null;
    id: string;
  }[];
  onChange: (value: number) => void;
  filter: Set<string>;
  setFilter: React.Dispatch<React.SetStateAction<Set<string>>>;
};

function SubCategory({ data, onChange, filter, setFilter }: Props) {
  const handleSubCategoryClick = (subCategory: { slug: string | null }) => {
    const updatedFilter = new Set(filter);
    if (updatedFilter.has(subCategory.slug || "")) {
      updatedFilter.delete(subCategory.slug || "");
    } else {
      updatedFilter.add(subCategory.slug || "");
    }
    setFilter(updatedFilter);
  };
  return (
    <div className="flex gap-4 self-start">
      {data?.map((subCategory) => (
        <button
          key={subCategory.id}
          className={`border-b p-1 text-center text-base font-medium duration-150 dark:text-white ${
            filter.has(subCategory.slug || "")
              ? "border-darkPrimary hover:border-b-red-400"
              : "border-b-transparent hover:border-darkPrimary dark:hover:border-darkPrimary"
          }`}
          onClick={() => {
            onChange(0);
            handleSubCategoryClick(subCategory);
          }}
        >
          {subCategory.name}
        </button>
      ))}
    </div>
  );
}

export default SubCategory;
