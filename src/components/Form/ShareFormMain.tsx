import SelectPostType from "./SelectPostType";
import SelectUni from "./SelectUni";
import PostForm from "./Post/PostForm";
import DocForm from "./Doc/DocForm";
import { useMultiStepForm } from "../../hooks/useMultiStepForm";
import { useState } from "react";
import SharePost from "./Post/SharePost";
import { trpc } from "../../utils/trpc";

const ShareForm = () => {
  const [options, setOptions] = useState({
    postType: "",
    skip: localStorage.getItem("skip") || "false",
  });

  const [form, setForm] = useState<SharePost>({
    title: "",
    content: "",
    categoryId: "",
    type: "",
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
      <PostForm key={2} />,
      <DocForm setForm={setForm} key={3} />,
      <SharePost form={form} setForm={setForm} options={options} key={4} />,
    ],
    options
  );

  return (
    <div className="w-96 space-y-1 rounded-md border-2 border-black bg-white p-2 shadow-lg">
      <div>{currentStep}</div>
      <div className="flex justify-between p-1">
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
            onClick={(e) => {
              e.preventDefault();
              next();
            }}
            className={`h-10 w-full rounded-md bg-blue-400 text-white ${
              !options.postType && "cursor-not-allowed bg-gray-600"
            }`}
          >
            {!options.postType ? "LÜTFEN BİR SEÇİM YAPIN!" : "İLERİ"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShareForm;
