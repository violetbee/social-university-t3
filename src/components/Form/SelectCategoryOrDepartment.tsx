import { useState, SetStateAction, Dispatch } from "react";
import { SharePost } from "../../types/app";
import { trpc } from "../../utils/trpc";
import Select from "./Input/Select";

type SelectCategoryOrDepartmentProps = {
  form: SharePost;
  setForm: React.Dispatch<React.SetStateAction<SharePost>>;
  options: {
    postType: string;
    skip: string;
    disabledIfNotSelected: boolean;
  };
  setOptions: Dispatch<
    SetStateAction<{
      postType: string;
      skip: string;
      disabledIfNotSelected: boolean;
    }>
  >;
};

const SelectCategoryOrDepartment = ({
  form,
  setForm,
  options,
  setOptions,
}: SelectCategoryOrDepartmentProps) => {
  const {
    data: categories,
    isLoading,
    error,
  } = trpc.category.getAll.useQuery();

  const { data: departments } = trpc.department.getAllDepartments.useQuery({
    universityId: "clf5dgklw0000vx1suw37ckci",
  });

  const handleQuery = (type: string) => {
    if (type === "TEXT") {
      return categories;
    } else {
      return departments;
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(form);

  return (
    <div className="mb-3 p-1">
      {handleQuery(options.postType) ? (
        <Select
          key={
            options.postType === "TEXT"
              ? categories[0]?.id
              : departments && departments[0]?.departmentId
          }
          label={options.postType === "TEXT" ? "Kategori" : "Departman"}
          id={options.postType === "TEXT" ? "categories" : "departments"}
          className="block w-full border-b-2 border-b-gray-800 py-2 pr-10 text-base focus:border-indigo-500 focus:outline-none  sm:text-sm"
          onChange={(e) => {
            setOptions((prev) => ({ ...prev, disabledIfNotSelected: true }));
            setForm({
              ...form,
              [options.postType === "TEXT" ? "categoryId" : "departmentId"]:
                e.currentTarget.value,
            });
          }}
        >
          {!options.disabledIfNotSelected && (
            <option disabled={options.disabledIfNotSelected}>
              Lütfen bir seçim yapınız.
            </option>
          )}
          {handleQuery(options.postType)?.map((item: any, i) => (
            <option
              key={i}
              value={options.postType === "TEXT" ? item.id : item.department.id}
            >
              {options.postType === "TEXT" ? item.name : item.department.name}
            </option>
          ))}
        </Select>
      ) : (
        <p>
          Henüz herhangi bir{" "}
          {options.postType === "TEXT" ? "kategori" : "departman"} yok.
        </p>
      )}
    </div>
  );
};

export default SelectCategoryOrDepartment;
