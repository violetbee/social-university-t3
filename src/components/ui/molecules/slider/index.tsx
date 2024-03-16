import { useSlider } from "../../../../hooks/useSlider";

function Banner() {
  const { currentSlide, setSelectedSlide } = useSlider(3, true);

  return (
    <div className="relative h-80 w-full overflow-hidden rounded-md">
      <div
        className="flex h-full w-full transition-all duration-500 ease-in-out"
        style={{ transform: `translate(calc(-100%*${currentSlide}))` }}
      >
        <div
          style={{ transform: `translate(calc(100%*0))` }}
          className="absolute left-0 flex h-full w-full shrink-0 items-center justify-center bg-zinc-950"
        >
          <h1 className="text-4xl font-bold text-white">Slide 1</h1>
        </div>
        <div
          style={{ transform: `translate(calc(100%*1))` }}
          className="absolute left-0 flex h-full w-full shrink-0 items-center justify-center bg-slate-950"
        >
          <h1 className="text-4xl font-bold text-white">Slide 2</h1>
        </div>
        <div
          style={{ transform: `translate(calc(100%*2))` }}
          className="absolute left-0 flex h-full w-full shrink-0 items-center justify-center bg-stone-950"
        >
          <h1 className="text-4xl font-bold text-white">Slide 3</h1>
        </div>
      </div>
      <div className="absolute bottom-3 left-4 flex gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <button
            onClick={() => setSelectedSlide(index)}
            key={index}
            className={`h-4 w-4 cursor-pointer overflow-hidden rounded-full duration-200 ${
              currentSlide === index ? "bg-white" : "bg-darkPrimary/20"
            }`}
          >
            <div
              className={`h-full ${
                currentSlide === index
                  ? "w-full bg-darkPrimary transition-[width] duration-[5000ms] ease-linear"
                  : "w-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Banner;
