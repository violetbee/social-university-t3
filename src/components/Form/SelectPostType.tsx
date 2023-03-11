type Props = {
  handlePostType: (e: React.MouseEvent<HTMLButtonElement>) => void;
  options: {
    postType: string;
    skip: string;
  };
};

const SelectPostType = ({ handlePostType, options }: Props) => {
  return (
    <div className="flex w-full flex-col gap-2 p-1">
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePostType(e);
        }}
        value={"TEXT"}
        className={`h-20 w-full ${
          options.postType === "TEXT" && "border-4 border-black"
        } rounded-md bg-red-400 text-white`}
      >
        GÖNDERİ PAYLAŞACAĞIM
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePostType(e);
        }}
        value={"DOC"}
        className={`h-20 w-full rounded-md bg-violet-400 ${
          options.postType === "DOC" && "border-4 border-black"
        } text-white`}
      >
        DOKÜMAN PAYLAŞACAĞIM
      </button>
    </div>
  );
};

export default SelectPostType;
