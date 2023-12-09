type IPaginationProps = {
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  setPreviousPage: () => void;
  setNextPage: () => void;
  isPaginationLongEnough: () => (string | number)[];
  currentPage: number;
  setClickedPage: (item: number) => void;
};

export default function Pagination(props: IPaginationProps) {
  const {
    isPrevDisabled,
    setPreviousPage,
    isPaginationLongEnough,
    currentPage,
    setClickedPage,
    setNextPage,
    isNextDisabled,
  } = props;

  return (
    <div className="flex h-8 items-center justify-center gap-2">
      <button
        onClick={setPreviousPage}
        disabled={isPrevDisabled}
        className={`h-full rounded-md ${
          isPrevDisabled
            ? "text-white hover:bg-darkSecondary/70"
            : "hover:bg-darkPrimary hover:text-darkSecondary"
        } bg-darkBackground px-3 pt-1`}
      >
        Önceki
      </button>
      <div className="flex h-full flex-1 gap-4">
        {isPaginationLongEnough().map((item) => (
          <button
            key={item}
            className={`${
              currentPage === item ? "bg-darkBackground" : "bg-darkSecondary"
            } ${
              item === "..."
                ? "!border-none !bg-darkBackground !text-white"
                : ""
            }  h-full w-10 rounded-md border border-darkHelper pt-1 text-white hover:bg-darkPrimary hover:text-darkSecondary`}
            disabled={typeof item !== "number"}
            onClick={() => typeof item === "number" && setClickedPage(item)}
          >
            {typeof item === "number" ? item + 1 : item}
          </button>
        ))}
      </div>
      <button
        onClick={setNextPage}
        disabled={isNextDisabled}
        className={`h-full rounded-md ${
          isNextDisabled
            ? "text-white hover:bg-darkSecondary/70"
            : "hover:bg-darkPrimary hover:text-darkSecondary"
        } bg-darkBackground px-3 pt-1`}
      >
        Sonraki
      </button>
    </div>
  );
}
