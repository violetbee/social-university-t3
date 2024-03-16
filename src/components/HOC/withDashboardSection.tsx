/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FC, useCallback, useMemo } from "react";
import { BiRefresh } from "react-icons/bi";

type Props = {
  isExpanded: boolean;
  toggleExpanded: () => void;
  itemPiece?: number;
};

export function withDashboardSection(
  WrappedComponent: FC<Props>,
  title: string | JSX.Element,
  itemPiece?: number,
) {
  const DashboardSection: FC<any> = (props: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const toggle = useCallback(() => {
      setIsExpanded((prev) => !prev);
    }, []);

    const value = useMemo(() => ({ toggle, isExpanded }), [toggle, isExpanded]);

    const [refresh, setRefresh] = useState<boolean>(false);

    return (
      <div className="flex flex-col">
        <div className="flex items-center pb-3">
          <div className="w-4 border-t-[1px] border-[#888]/20"></div>
          <span className="dark:text-whitish mx-4 flex-shrink text-2xl font-medium text-[#333]">
            {title}
          </span>
          <div className="flex-grow border-t-[1px] border-[#888]/20"></div>

          <button
            onClick={() => {
              setRefresh(!refresh);
              setTimeout(() => {
                setRefresh(false);
              }, 3000);
            }}
            className="text-whitish mx-1 flex-shrink rounded-md border border-darkHelper bg-darkSecondary px-4 py-[2px] text-lg font-medium shadow-md md:mx-4 md:px-5"
          >
            <BiRefresh
              className={`${refresh ? "animate-spin" : ""}`}
              size={30}
            />
          </button>
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
          <button
            onClick={value.toggle}
            className="bg-whitish mx-1 w-16 flex-shrink  rounded-md border-[1px] border-white py-[2px] text-lg font-medium text-darkHelper shadow-md md:mx-4 md:w-20"
          >
            {value.isExpanded ? "Gizle" : "Göster"}
          </button>
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
        </div>

        <div
          className={`${
            value.isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          } grid transition-all duration-300 ease-in-out`}
        >
          <WrappedComponent {...props} itemPiece={itemPiece} />
        </div>
      </div>
    );
  };
  return DashboardSection;
}

export default withDashboardSection;
