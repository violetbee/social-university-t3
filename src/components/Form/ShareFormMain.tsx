import SelectPostType from "./SelectPostType";
import SelectUni from "./SelectUni";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import React, { useEffect, useState } from "react";
import SharePost from "./SharePost";
import type { SharePost as SharePostType } from "../../types/app";
import SelectCategoryOrDepartment from "./SelectCategoryOrDepartment";
import { trpc } from "../../utils/trpc";
import SelectEvent from "./SelectEvent";
import SelectPoll from "./SelectPoll";

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
    options.postType && // if postType is already selected, then deselect it
      e.currentTarget.value === options.postType &&
      setOptions({ ...options, postType: "" });
    setForm({ ...form, type: e.currentTarget.value });
  };

  const handleSkip = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, skip: e.currentTarget.value });
    localStorage.setItem("skip", e.currentTarget.value);
  };

  // this function is handling which component will be rendered due to post type

  const { currentStep, steps, currentStepIndex, next, prev } = useMultiStepForm(
    [
      <SelectPostType
        options={options}
        handlePostType={handlePostType}
        key={0}
      />,
      <SelectUni handleSkip={handleSkip} key={1} />,
      handleComponentDueToType(options.postType),
      <SharePost form={form} setForm={setForm} options={options} key={4} />,
    ],
    options,
    setForm,
    setOptions
  );

  function handleComponentDueToType(type: string) {
    if (type === "DOC" || type === "TEXT") {
      return (
        <SelectCategoryOrDepartment
          key={3}
          form={form}
          setForm={setForm}
          options={options}
          setOptions={setOptions}
        />
      );
    } else {
      return <SelectEvent />;
    }
  }

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
    <div className="w-96 rounded-md bg-[url('/images/edu.jpg')] bg-[length:500px_500px] bg-no-repeat shadow-lg">
      <div className="flex items-center justify-center rounded-t-md bg-[#181823] bg-opacity-95 py-3">
        <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
          {currentStepIndex === 0
            ? "Gönderi Türünü Seçiniz"
            : currentStepIndex === 1
            ? "Üniversitenizi Seçiniz"
            : currentStepIndex === 2 && options.postType === "DOC"
            ? "Okul Bilgilerini Seçiniz"
            : "Gönderinizi Paylaşın"}
        </h1>
      </div>
      <div className="h-full w-full rounded-md bg-white bg-opacity-80 p-4">
        {/* Components step by step */}
        {currentStep}
        {/* Step end */}
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
              {!options.postType || checkIfDisabled
                ? "SEÇİM YAPINIZ!"
                : "İLERİ"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareForm;
