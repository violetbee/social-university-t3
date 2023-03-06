/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FC } from "react";

type Props = {
  isExpanded: boolean;
  toggleExpanded: () => void;
  itemPiece?: number;
};

export function withDashboardSection(
  WrappedComponent: FC<Props>,
  title: string,
  itemPiece?: number
) {
  const DashboardSection: FC<any> = (props: Props) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const toggleExpanded = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div className="h-full">
        <div className="flex items-center pb-3">
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
          <span className="mx-4 flex-shrink text-2xl font-medium text-[#333]">
            {title}
          </span>
          <div className="flex-grow border-t-[1px] border-[#888]/20"></div>

          <button className="mx-1 flex-shrink rounded-md bg-[#181823] py-[2px] px-4 text-lg font-medium text-white after:content-['>>'] md:mx-4 md:px-8 md:after:content-['Daha_Fazlasını_Gör'] "></button>
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className="mx-1 w-16 flex-shrink rounded-md  bg-[#dd4e63] py-[2px] text-lg font-medium text-white md:mx-4 md:w-20"
          >
            {isExpanded ? "Gizle" : "Göster"}
          </button>
          <div className="w-2 border-t-[1px] border-[#888]/20"></div>
        </div>
        <div className="pb-5">
          <div
            className={`${
              isExpanded ? "max-h-[1000px]" : "max-h-0"
            } overflow-hidden duration-200`}
          >
            <WrappedComponent
              {...props}
              toggleExpanded={toggleExpanded}
              isExpanded={isExpanded}
              itemPiece={itemPiece}
            />
          </div>
        </div>
      </div>
    );
  };
  return DashboardSection;
}

export default withDashboardSection;
