import { usePagination } from "../../hooks/usePagination";

type IPaginationProps = {
  pageSize: number;
  totalItemLength: number;
};

export default function Pagination({
  pageSize,
  totalItemLength,
}: IPaginationProps) {
  const {
    currentPage,
    setNextPage,
    setPreviousPage,
    isPaginationLongEnough,
    setClickedPage,
    isNextDisabled,
    isPrevDisabled,
  } = usePagination(pageSize, totalItemLength);

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
