import { camelize } from "@/utils/utils";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

interface ISelectInputProps {
  label: string;
  options: { label: string; value: string }[];
  error?: DeepMap<any, FieldError>;
  name: string;
  register: UseFormRegister<any>;
}

const SelectInput = ({
  label,
  options,
  error,
  name,
  register,
}: ISelectInputProps) => {
  const ID = camelize(label);

  return (
    <div className="mt-2">
      <label
        htmlFor={ID}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={ID}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
        {...register(name)}
      >
        <option value="">Choose a {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-700 text-sm">* {error.message}</p>}
    </div>
  );
};

export default SelectInput;
