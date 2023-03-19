import SelectPostType from "./SelectPostType";
import SelectUni from "./SelectUni";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import { useState } from "react";
import SharePost from "./SharePost";
import type { SharePost as SharePostType } from "../../types/app";
import SelectCategoryOrDepartment from "./SelectCategoryOrDepartment";
import { trpc } from "../../utils/trpc";

const ShareForm = () => {
  const getUserUniversityById = trpc.user.getUserUniversityById.useQuery();

  const [options, setOptions] = useState({
    postType: "",
    skip: localStorage.getItem("skip") || "false",
    disabledIfNotSelected: {
      category: false,
      department: false,
      classLevel: false,
      class: false,
    },
  });

  const [form, setForm] = useState<SharePostType>({
    title: "",
    content: "",
    categoryId: "",
    type: "",
    departmentId: "",
    classLevelId: "",
    classId: "",
    universityId: getUserUniversityById.data?.university?.id || "",
  });

  const handlePostType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOptions({ ...options, postType: e.currentTarget.value });
    setForm({ ...form, type: e.currentTarget.value });
  };

  const handleSkip = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, skip: e.currentTarget.value });
    localStorage.setItem("skip", e.currentTarget.value);
  };

  const { currentStep, steps, currentStepIndex, next, prev } = useMultiStepForm(
    [
      <SelectPostType
        options={options}
        handlePostType={handlePostType}
        key={0}
      />,
      <SelectUni handleSkip={handleSkip} key={1} />,
      <SelectCategoryOrDepartment
        key={3}
        form={form}
        setForm={setForm}
        options={options}
        setOptions={setOptions}
      />,
      <SharePost form={form} setForm={setForm} options={options} key={4} />,
    ],
    options,
    setForm,
    setOptions
  );

  const checkIfDisabled =
    (options.postType === "DOC" &&
      currentStepIndex === (options.skip === "on" ? 1 : 2) &&
      (!form.categoryId || !form.departmentId) &&
      (!form.classLevelId || !form.classId)) ||
    (options.postType === "TEXT" &&
      currentStepIndex === (options.skip === "on" ? 1 : 2) &&
      !form.categoryId)
      ? true
      : false;

  return (
    <div className="w-96 space-y-1 rounded-md border-2 border-black bg-white p-2 shadow-lg">
      <div>{currentStep}</div>
      <div className="flex justify-between gap-4 p-1">
        {currentStepIndex > 0 && (
          <button
            onClick={(e) => {
              e.preventDefault();
              prev();
            }}
            className="h-10 w-full rounded-md bg-red-400 text-white"
          >
            GERİ
          </button>
        )}
        {currentStepIndex < steps.length - 1 && (
          <button
            disabled={checkIfDisabled}
            onClick={(e) => {
              e.preventDefault();
              next();
            }}
            className={`h-10 w-full rounded-md bg-blue-400 text-white ${
              !options.postType && "cursor-not-allowed bg-gray-600"
            }`}
          >
            {!options.postType || checkIfDisabled ? "SEÇİM YAPINIZ!" : "İLERİ"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareForm;
