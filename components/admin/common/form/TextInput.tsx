import { camelize } from "@/utils/utils";
import { HTMLInputTypeAttribute } from "react";
import { DeepMap, FieldError, UseFormRegister } from "react-hook-form";

interface ITextInputProps {
  label: string;
  placeholder?: string;
  error?: DeepMap<any, FieldError>;
  name: string;
  register: UseFormRegister<any>;
  type?: HTMLInputTypeAttribute;
}

const TextInput = ({
  label,
  placeholder = "",
  error,
  name,
  register,
  type = "text",
}: ITextInputProps) => {
  const ID = camelize(label);

  return (
    <div>
      <label
        htmlFor={ID}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={ID}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-700 text-sm">* {error.message}</p>}
    </div>
  );
};

export default TextInput;
