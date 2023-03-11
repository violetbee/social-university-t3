import { useState } from "react";

type Options = {
  postType: string;
  skip: string;
};

export const useMultiStepForm = (steps: JSX.Element[], options: Options) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  console.log(currentStepIndex);

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
  };

  const reset = () => {
    setCurrentStepIndex(0);
  };

  if (options.skip === "on") {
    steps.splice(1, 1);
  }

  if (options.postType === "TEXT") {
    steps.splice(options.skip === "on" ? 2 : 3, 1);
  } else {
    steps.splice(options.skip === "on" ? 1 : 2, 1);
  }

  const currentStep = steps[currentStepIndex];

  return { currentStepIndex, currentStep, next, prev, reset, steps };
};
