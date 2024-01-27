import { type InputHTMLAttributes, useRef } from "react";

type HTMLProps = InputHTMLAttributes<HTMLSelectElement> &
  InputHTMLAttributes<HTMLTextAreaElement> &
  InputHTMLAttributes<HTMLInputElement>;

type Props = {
  label?: string;
  name: string;
  type?: string;
  options?: { name: string; id: string }[];
} & HTMLProps;

export const Input = ({ label, name, type, ...rest }: Props) => {
  return (
    <label className="flex w-full flex-col gap-[2px] md:w-1/4">
      <span className="pl-1 text-base font-semibold">{label}</span>
      <input
        type={type}
        name={name}
        {...rest}
        className="block w-full rounded-lg border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-base"
      />
    </label>
  );
};

const Select = ({ label, name, options, ...rest }: Props) => {
  const ref = useRef<HTMLSelectElement>(null);

  return (
    <div className="flex w-full flex-col gap-[2px] md:w-1/6">
      <span className="pl-1 text-base font-semibold">{label}</span>
      <div className="relative w-full">
        <select
          name={name}
          {...rest}
          ref={ref}
          className="block w-full rounded-lg border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-[9px] pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-base"
        >
          <option value="">Seçim yapınız</option>
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const TextArea = ({ label, name, ...rest }: Props) => {
  return (
    <label className="flex w-full flex-col gap-[2px]">
      <span className="pl-1 text-base font-semibold">{label}</span>
      <textarea
        name={name}
        {...rest}
        rows={1}
        className="block w-full rounded-lg border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-base"
      />
    </label>
  );
};

Input.Select = Select;
Input.TextArea = TextArea;
