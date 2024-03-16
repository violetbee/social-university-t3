const AddEvent = () => {
  return (
    <div className="group relative mx-auto mb-5 h-44 w-72 cursor-pointer ">
      <div className="absolute top-0 right-0 h-full w-full rounded-lg bg-[#222] shadow-sm " />
      <div className="absolute -top-1 -right-1 h-full w-full rounded-lg border-[1px] border-[#222] bg-white shadow-sm duration-200 group-hover:top-0 group-hover:right-0">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#222]">
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
