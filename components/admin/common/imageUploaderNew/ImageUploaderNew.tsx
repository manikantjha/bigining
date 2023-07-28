import { IWorkImage } from "@/types/works";
import { ChangeEvent } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import CommonButton from "../CommonButton";
import BlankInput from "./BlankInput";
import ImageDisplay from "./ImageDisplay";
import { useFileSelection } from "./helper";

interface IImageUploaderNew {
  id: string;
  label: string;
  onChange: (event: IWorkImage | ChangeEvent) => void;
  inputContainerClassName?: string;
  image?: IWorkImage;
  index?: number;
  onRemove?: UseFieldArrayRemove;
  fileName?: string;
  folderName?: string;
}

export default function ImageUploaderNew(props: IImageUploaderNew) {
  const { objImages, setObjImages, selectFile } = useFileSelection();

  return (
    <div>
      <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </p>
      <div
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden ${
          props.inputContainerClassName || ""
        }`}
      >
        <div className="!w-full !h-full relative">
          {props.onRemove && (
            <CommonButton
              variant="outlined"
              color="accent"
              className="!p-1 absolute z-10 right-2 top-2"
              icon={
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
              }
              onClick={() => {
                if (props.onRemove && typeof props.index === "number") {
                  props.onRemove(props.index);
                }
              }}
            />
          )}
          <label htmlFor={props.id}>
            {objImages?.medium.url || props.image?.medium.url ? (
              <ImageDisplay
                imgSrc={objImages?.medium.url || props.image?.medium.url || ""}
                imgAlt="Selected image"
              />
            ) : (
              <BlankInput />
            )}
          </label>
          <input
            id={props.id}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (files) => {
              const res = await selectFile(
                files.target.files,
                props.fileName,
                props.folderName
              );
              if (res) {
                props.onChange(res);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
