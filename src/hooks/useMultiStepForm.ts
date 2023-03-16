import { useState } from "react";
import { SharePost } from "../types/app";

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

type SetForm = React.Dispatch<React.SetStateAction<SharePost>>;

export const useMultiStepForm = (
  steps: JSX.Element[],
  options: Options,
  setForm: SetForm,
  setOptions: React.Dispatch<
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
  >
) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (!options.postType) return i;
      if (i == steps.length - 1) return i;
      return i + 1;
    });
  };

  const prev = () => {
    setCurrentStepIndex((i) => {
      if (i == 0) return i;
      return i - 1;
    });
    if (currentStepIndex === 1) {
      setOptions((prev) => ({
        ...prev,
        disabledIfNotSelected: {
          category: false,
          department: false,
          classLevel: false,
          class: false,
        },
      }));
      setForm({
        type: "",
        title: "",
        content: "",
        categoryId: "",
        departmentId: "",
        classLevelId: "",
        classId: "",
      });
    }
  };

  const reset = () => {
    setCurrentStepIndex(0);
  };

  if (options.skip === "on") {
    steps.splice(1, 1);
  }

  const currentStep = steps[currentStepIndex];

  return { currentStepIndex, currentStep, next, prev, reset, steps };
};
