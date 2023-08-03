import { camelize } from "@/utils/utils";
import { DeepMap, FieldError } from "react-hook-form";

interface ITextAreaProps {
  label: string;
  placeholder?: string;
  error?: DeepMap<any, FieldError>;
  name: string;
  register: any;
  rows?: number;
}

const TextArea = ({
  label,
  placeholder = "",
  error,
  name,
  register,
  rows = 4,
}: ITextAreaProps) => {
  const ID = camelize(label);

  return (
    <div>
      <label
        htmlFor={ID}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        id={ID}
        rows={rows}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
        placeholder={placeholder}
        {...register(name)}
      />
      {error && <p className="text-red-700 text-sm">* {error.message}</p>}
    </div>
  );
};

export default TextArea;
