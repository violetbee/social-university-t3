import { useState, useEffect, useMemo, use } from "react";

export const useSlider = (length: number, autoMove: boolean) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  function nextSlide() {
    setCurrentSlide((prev) => prev + 1);
  }

  function prevSlide() {
    setCurrentSlide((prev) => prev - 1);
  }

  function setSelectedSlide(index: number) {
    setCurrentSlide(index);
  }

  useEffect(() => {
    if (autoMove) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % length);
      }, 5000);
      return () => clearInterval(interval);
    } else {
      if (currentSlide === length) {
        setCurrentSlide(0);
      } else if (currentSlide < 0) {
        setCurrentSlide(length - 1);
      }
    }
  }, [currentSlide, autoMove, length]);

  const memoizedSlider = useMemo(() => {
    return {
      currentSlide,
      nextSlide,
      prevSlide,
      setSelectedSlide,
    };
  }, [currentSlide]);

  return memoizedSlider;
};
