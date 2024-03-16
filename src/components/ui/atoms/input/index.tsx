import { type InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type HTMLProps = InputHTMLAttributes<HTMLSelectElement> &
  InputHTMLAttributes<HTMLTextAreaElement> &
  InputHTMLAttributes<HTMLInputElement>;

type Props = {
  label?: string;
  type?: string;
  options?: { name: string; id: string }[];
  register: UseFormRegisterReturn<string>;
} & HTMLProps;

export const Input = ({ label, type, register, ...rest }: Props) => {
  return (
    <label className="flex w-full flex-col gap-[2px] md:w-1/4">
      <span className="pl-1 text-base font-semibold">{label}</span>
      <input
        type={type}
        {...register}
        {...rest}
        className="block w-full rounded-lg border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-base"
      />
    </label>
  );
};

const Select = ({ label, options, register, ...rest }: Props) => {
  return (
    <div className="flex w-full flex-col gap-[2px] md:w-1/6">
      <span className="pl-1 text-base font-semibold">{label}</span>
      <div className="relative w-full">
        <select
          {...register}
          {...rest}
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

const TextArea = ({ label, register, ...rest }: Props) => {
  return (
    <label className="flex w-full flex-col gap-[2px]">
      <span className="pl-1 text-base font-semibold">{label}</span>
      <textarea
        {...register}
        {...rest}
        rows={3}
        className="block w-full rounded-lg border-b-[1px] border-b-gray-800/20 bg-darkBackground px-2 py-1 pr-10 text-base focus:border-indigo-500 focus:outline-none sm:text-base"
      />
    </label>
  );
};

Input.Select = Select;
Input.TextArea = TextArea;
