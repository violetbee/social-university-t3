import { useSession } from "next-auth/react";
import { SharePost } from "../../types/app";
import { trpc } from "../../utils/trpc";
import Select from "./Input/Select";

type SetOptions = React.Dispatch<
  React.SetStateAction<{
    postType: string;
    skip: string;
    disabledIfNotSelected: {
      category: boolean;
      department: boolean;
      classLevel: boolean;
      class: boolean;
    };
  }>
>;

type Options = {
  postType: string;
  skip: string;
  disabledIfNotSelected: {
    category: boolean;
    department: boolean;
    classLevel: boolean;
    class: boolean;
  };
};

type SelectCategoryOrDepartmentProps = {
  form: SharePost;
  setForm: React.Dispatch<React.SetStateAction<SharePost>>;
  options: Options;
  setOptions: SetOptions;
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

  const { data: user } = useSession();

  const { data: userUniversityId } =
    trpc.department.getUniversityIdByUserId.useQuery({
      userId: user?.user?.id as string,
    });

  const { data: departments } = trpc.department.getAllDepartments.useQuery({
    universityId: userUniversityId?.universityId as string,
  });

  const { data: classLevels } = trpc.department.getClassLevels.useQuery(
    {
      departmentId: form.departmentId,
    },
    {
      enabled: !!form.departmentId,
    }
  );

  const { data: classes } = trpc.department.getClasses.useQuery(
    {
      classLevelId: form.classLevelId,
      departmentId: form.departmentId,
    },
    {
      enabled: !!form.classLevelId,
    }
  );

  const handleQuery = (type: string) => {
    if (type === "TEXT") {
      return categories;
    } else {
      return departments;
    }
  };

  console.log(form);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mb-3 space-y-5 p-1">
      {handleQuery(options.postType) ? (
        <Select
          key={
            options.postType === "TEXT"
              ? categories[0]?.id
              : departments && departments[0]?.departmentId
          }
          disabled={options.disabledIfNotSelected.category}
          label={options.postType === "TEXT" ? "Kategori" : "Departman"}
          id={options.postType === "TEXT" ? "categories" : "departments"}
          className="block w-full border-b-2 border-b-gray-800 py-2 pr-10 text-base focus:border-indigo-500 focus:outline-none  sm:text-sm"
          onChange={(e) => {
            setForm({
              ...form,
              classLevelId: "",
              classId: "",
              [options.postType === "TEXT" ? "categoryId" : "departmentId"]:
                e.currentTarget.value,
            });
            setOptions({
              ...options,
              disabledIfNotSelected: {
                ...options.disabledIfNotSelected,
                category: true,
              },
            });
          }}
        >
          {!options.disabledIfNotSelected.category && (
            <option disabled={options.disabledIfNotSelected.category} value="">
              Seçiniz
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

      {options.postType === "DOC" && form.departmentId && (
        <Select
          label="Sınıf"
          id="classLevel"
          disabled={options.disabledIfNotSelected.classLevel}
          className="block w-full border-b-2 border-b-gray-800 py-2 pr-10 text-base focus:border-indigo-500 focus:outline-none  sm:text-sm"
          onChange={(e) => {
            setForm({
              ...form,
              classLevelId: e.currentTarget.value,
            });
            setOptions({
              ...options,
              disabledIfNotSelected: {
                ...options.disabledIfNotSelected,
                classLevel: true,
              },
            });
          }}
        >
          {!options.disabledIfNotSelected.classLevel && (
            <option
              disabled={options.disabledIfNotSelected.classLevel}
              value=""
            >
              Seçiniz
            </option>
          )}
          {classLevels?.map((item: any, i) => (
            <option key={i} value={item.classLevel.id}>
              {item.classLevel.name}
            </option>
          ))}
        </Select>
      )}
      {options.postType === "DOC" && form.classLevelId && (
        <Select
          label="Ders"
          id="class"
          className="block w-full border-b-2 border-b-gray-800 py-2 pr-10 text-base focus:border-indigo-500 focus:outline-none  sm:text-sm"
          disabled={options.disabledIfNotSelected.class}
          onChange={(e) => {
            setForm({
              ...form,
              classId: e.currentTarget.value,
            });
            setOptions({
              ...options,
              disabledIfNotSelected: {
                ...options.disabledIfNotSelected,
                class: true,
              },
            });
          }}
        >
          {!options.disabledIfNotSelected.class && (
            <option disabled={options.disabledIfNotSelected.class} value="">
              Seçiniz
            </option>
          )}
          {classes?.map((item: any, i) => (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default SelectCategoryOrDepartment;
