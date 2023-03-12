type Props = {
  children: React.ReactNode;
  label: string;
  id: string;
  className: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ children, label, id, className, onChange }: Props) => {
  return (
    <div>
      <label
        htmlFor="countries"
        className="block text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select onChange={onChange} id={id} className={className}>
        {children}
      </select>
    </div>
  );
};

export default Select;
