import { useFieldArray, useFormContext } from "react-hook-form";

interface IServicesListForm {}

export default function ServicesListForm(props: IServicesListForm) {
  const {
    control,
    register,
    formState: { errors },
    getFieldState,
  } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `list`,
  });

  return (
    <div>
      {fields.map((item, index) => {
        const fieldState = getFieldState(`list[${index}]`);
        return (
          <>
            <div key={item.id} className="mb-4">
              <label
                htmlFor={`listItem${index}`}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Service List Item {index + 1}
              </label>
              <div className="grid grid-cols-[1fr_auto] place-items-center">
                <input
                  id={`listItem${index}`}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                  placeholder="Service List Item"
                  {...register(`list[${index}]`)}
                />
                <button
                  type="button"
                  className="bg-gray-50 border border-accentDark hover:bg-white active:bg-gray-200 p-1 text-accentDark font-semibold rounded-full flex items-center justify-center ml-4"
                  onClick={() => remove(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {fieldState.error && (
                <p className="text-red-700 mt-2 text-sm">
                  * {fieldState.error.message}
                </p>
              )}
            </div>
          </>
        );
      })}
      <div className="w-full flex items-center space-x-4 mt-8">
        <button
          type="button"
          className="bg-gray-50 border border-accentDark hover:bg-white active:bg-gray-200 px-3 py-1 text-accentDark font-semibold rounded-full"
          onClick={() => append("")}
        >
          Add List Item
        </button>
      </div>
    </div>
  );
}
