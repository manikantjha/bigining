import { camelize } from "@/utils/utils";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

interface ICheckboxInputProps {
  label: string;
  error?: DeepMap<any, FieldError>;
  name: string;
  register: UseFormRegister<any>;
}

export default function Checkbox({
  label,
  error,
  name,
  register,
}: ICheckboxInputProps) {
  const ID = camelize(label);

  return (
    <div>
      <input
        id={ID}
        type="checkbox"
        value=""
        className="w-4 h-4 text-accentDark bg-gray-100 border-gray-300 rounded focus:ring-accentDark dark:focus:ring-accentDark dark:ring-offset-gray-800 focus:ring-2"
        {...register(name)}
      />
      <label
        htmlFor={ID}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
      {error && <p className="text-red-700 text-sm">* {error.message}</p>}
    </div>
  );
}
