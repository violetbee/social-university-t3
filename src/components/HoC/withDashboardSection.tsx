import { useState, FC } from "react";

export function withDashboardSection(
  WrappedComponent: FC<any>,
  title: string,
  itemPiece?: number
) {
  const DashboardSection: FC<any> = (props: any) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
    const toggleExpanded = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div className="h-full">
        <div className="flex items-center pb-3">
          <div className="w-2 border-t-[1px] border-black"></div>
          <span className="mx-4 flex-shrink text-2xl font-medium text-[#222]">
            {title}
          </span>
          <div className="flex-grow border-t-[1px] border-black"></div>
          <button className="mx-1 flex-shrink border-2 border-black bg-black py-[1px] px-4 text-lg font-medium text-white md:mx-4 md:px-8 ">
            {/* Sort Events SVG */}
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm4 0a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="w-2 border-t-[1px] border-black"></div>

          <button className="mx-1 flex-shrink border-2 border-black bg-black py-[1px] px-4 text-lg font-medium text-white after:content-['>'] md:mx-4 md:px-8 md:after:content-['Daha_Fazlasını_Gör'] "></button>
          <div className="w-2 border-t-[1px] border-black"></div>
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
            }}
            className="mx-1 w-16 flex-shrink border-2 border-black bg-white py-[1px] text-lg font-medium text-black md:mx-4 md:w-20"
          >
            {isExpanded ? "Gizle" : "Göster"}
          </button>
          <div className="w-2 border-t-[1px] border-black"></div>
        </div>
        <WrappedComponent
          {...props}
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
          itemPiece={itemPiece}
        />
      </div>
    );
  };
  return DashboardSection;
}

export default withDashboardSection;
