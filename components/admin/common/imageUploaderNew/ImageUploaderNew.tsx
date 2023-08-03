import { GetIcon } from "@/components/common/icons/icons";
import { IImage } from "@/types/image";
import { useImageSelection } from "@/utils/image";
import { camelize } from "@/utils/utils";
import { ChangeEvent } from "react";
import { DeepMap, FieldError, UseFieldArrayRemove } from "react-hook-form";
import CommonButton from "../CommonButton";
import BlankInput from "./BlankInput";
import ImageDisplay from "./ImageDisplay";

interface IImageUploaderNew {
  label: string;
  onChange: (event: IImage | ChangeEvent) => void;
  containerClassName?: string;
  inputContainerClassName?: string;
  image?: IImage;
  index?: number;
  onRemove?: UseFieldArrayRemove;
  fileName?: string;
  folderName?: string;
  error?: DeepMap<any, FieldError>;
}

export default function ImageUploaderNew({
  label,
  onChange,
  inputContainerClassName = "",
  containerClassName = "",
  image,
  index,
  onRemove,
  fileName = "",
  folderName = "",
  error,
}: IImageUploaderNew) {
  const { objImages, setObjImages, selectFile } = useImageSelection();

  const ID = camelize(label);

  return (
    <div
      className={`w-full h-80 grid grid-rows-[auto_1fr_auto] gap-2 ${containerClassName}`}
    >
      <p className="text-sm font-medium text-gray-900">{label}</p>
      <div
        className={`w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative ${inputContainerClassName}`}
      >
        {onRemove && (
          <CommonButton
            variant="outlined"
            color="accent"
            className="!p-1 absolute right-2 top-2 z-10"
            icon={<GetIcon name="close" size="w-5 h-5" />}
            onClick={() => {
              if (onRemove && typeof index === "number") {
                onRemove(index);
              }
            }}
          />
        )}
        <label htmlFor={ID}>
          {objImages?.medium?.url || image?.medium?.url ? (
            <ImageDisplay
              imgSrc={objImages?.medium?.url || image?.medium?.url || ""}
              imgAlt={label}
            />
          ) : (
            <BlankInput />
          )}
        </label>
        <input
          id={ID}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (files) => {
            const res = await selectFile(
              files.target.files,
              fileName,
              folderName
            );
            if (res) {
              onChange(res);
            }
          }}
        />
      </div>
      {error && <p className="text-red-700 text-sm">* Image is required</p>}
    </div>
  );
}
