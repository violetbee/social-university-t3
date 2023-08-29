/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FC, useCallback, useMemo } from "react";

type Props = {
  isExpanded: boolean;
  toggleExpanded: () => void;
  itemPiece?: number;
};

export function withDashboardSection(
  WrappedComponent: FC<Props>,
  title: string,
  itemPiece?: number,
) {
  const DashboardSection: FC<any> = (props: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);

    const toggle = useCallback(() => {
      setIsExpanded((prev) => !prev);
    }, []);

    const value = useMemo(() => ({ toggle, isExpanded }), [toggle, isExpanded]);

    return (
      <div className="h-full rounded-2xl bg-white">
        <div className="flex items-center p-3">
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
          <span className="mx-4 flex-shrink text-2xl font-medium text-[#333]">
            {title}
          </span>
          <div className="flex-grow border-t-[1px] border-[#888]/20"></div>

          <button className="mx-1 flex-shrink rounded-md bg-[#333] px-4 py-[2px] text-lg font-medium text-white after:content-['>>'] md:mx-4 md:px-8 md:after:content-['Daha_Fazlasını_Gör'] "></button>
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
          <button
            onClick={value.toggle}
            className="mx-1 w-16 flex-shrink rounded-md  border-[1px] border-[#999] bg-white py-[2px] text-lg font-medium text-[#333] md:mx-4 md:w-20"
          >
            {value.isExpanded ? "Gizle" : "Göster"}
          </button>
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
        </div>

        <div
          className={`${
            value.isExpanded ? "max-h-[1000px]" : "max-h-0"
          } flex overflow-y-hidden overflow-x-scroll duration-200`}
        >
          <WrappedComponent {...props} itemPiece={itemPiece} />
        </div>
      </div>
    );
  };
  return DashboardSection;
}

export default withDashboardSection;
