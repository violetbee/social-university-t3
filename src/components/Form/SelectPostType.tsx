import Image from "next/image";

type Props = {
  handlePostType: (e: React.MouseEvent<HTMLButtonElement>) => void;
  options: {
    postType: string;
    skip: string;
  };
};

const SelectPostType = ({ handlePostType, options }: Props) => {
  return (
    <div className="flex flex-col gap-2 p-1">
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePostType(e);
        }}
        value={"TEXT"}
        className={`h-14 w-full ${
          options.postType === "TEXT" && "!bg-[#dd4e63] !text-white"
        } relative flex items-center justify-center overflow-hidden rounded-md border-[1px] border-gray-200 bg-white text-2xl font-medium tracking-tight text-slate-950 duration-200`}
      >
        YAZI
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePostType(e);
        }}
        value={"DOC"}
        className={`h-14 w-full rounded-md bg-white ${
          options.postType === "DOC" && "!bg-[#dd4e63] !text-white"
        } relative flex items-center justify-center overflow-hidden border-[1px] border-gray-200 text-2xl font-medium tracking-tight text-slate-950  duration-200`}
      >
        <p className={` absolute z-10`}>DOKÜMAN</p>
        <div className="absolute -bottom-10 -left-7"></div>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePostType(e);
        }}
        value={"EVENT"}
        className={`h-14 w-full rounded-md bg-white ${
          options.postType === "EVENT" && "!bg-[#dd4e63] !text-white"
        } relative flex items-center justify-center overflow-hidden border-[1px] border-gray-200 text-2xl font-medium tracking-tight text-slate-950  duration-200`}
      >
        <p className={` absolute z-10`}>ETKİNLİK</p>
        <div className="absolute -bottom-10 -left-7"></div>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePostType(e);
        }}
        value={"POLL"}
        className={`h-14 w-full rounded-md bg-white ${
          options.postType === "POLL" && "!bg-[#dd4e63] !text-white"
        } relative flex items-center justify-center overflow-hidden border-[1px] border-gray-200 text-2xl font-medium tracking-tight text-slate-950  duration-200`}
      >
        <p className={` absolute z-10`}>ANKET</p>
        <div className="absolute -bottom-10 -left-7"></div>
      </button>
    </div>
  );
};

export default SelectPostType;
