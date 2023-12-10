import { useSlider } from "../../../../hooks/useSlider";
import { MultiEvent } from "../../../Cards/Event";

function Etkinlikler() {
  const { currentSlide, setSelectedSlide } = useSlider(3, true);

  return (
    <div className="space-y-6">
      <div className="relative h-80 w-full overflow-hidden">
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
          <div
            onClick={() => setSelectedSlide(0)}
            className={`${
              currentSlide === 0
                ? "opacity-100 before:w-full before:duration-[5000ms] before:ease-linear"
                : "opacity-40 before:w-0"
            } h-4 w-4 cursor-pointer bg-white before:block before:h-full before:bg-primary before:transition-[width] before:content-['']`}
          ></div>
          <div
            onClick={() => setSelectedSlide(1)}
            className={`${
              currentSlide === 1
                ? "opacity-100 before:w-full before:duration-[5000ms] before:ease-linear"
                : "opacity-40 before:w-0"
            } h-4 w-4 cursor-pointer bg-white before:block before:h-full before:bg-primary  before:transition-[width] before:content-['']`}
          ></div>
          <div
            onClick={() => setSelectedSlide(2)}
            className={`${
              currentSlide === 2
                ? "opacity-100 before:w-full before:duration-[5000ms] before:ease-linear"
                : "opacity-40 before:w-0"
            } h-4 w-4 cursor-pointer bg-white before:block before:h-full before:bg-primary  before:transition-[width] before:content-['']`}
          ></div>
        </div>
      </div>
      <MultiEvent itemPiece={5} />
    </div>
  );
}

export default Etkinlikler;
