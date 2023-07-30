import { GetIcon } from "@/components/common/icons/icons";
import { IImage } from "@/types/images";
import { useImageSelection } from "@/utils/image";
import { ChangeEvent } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
import CommonButton from "../CommonButton";
import BlankInput from "./BlankInput";
import ImageDisplay from "./ImageDisplay";

interface IImageUploaderNew {
  id: string;
  label: string;
  onChange: (event: IImage | ChangeEvent) => void;
  containerClassName?: string;
  inputContainerClassName?: string;
  image?: IImage;
  index?: number;
  onRemove?: UseFieldArrayRemove;
  fileName?: string;
  folderName?: string;
}

export default function ImageUploaderNew({
  id,
  label,
  onChange,
  inputContainerClassName = "",
  containerClassName = "",
  image,
  index,
  onRemove,
  fileName = "",
  folderName = "",
}: IImageUploaderNew) {
  const { objImages, setObjImages, selectFile } = useImageSelection();

  return (
    <div
      className={`w-full h-80 grid grid-rows-[auto_1fr] gap-2 ${containerClassName}`}
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
        <label htmlFor={id}>
          {objImages?.medium?.url || image?.medium?.url ? (
            <ImageDisplay
              imgSrc={objImages?.medium?.url || image?.medium?.url || ""}
              imgAlt={id}
            />
          ) : (
            <BlankInput />
          )}
        </label>
        <input
          id={id}
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
    </div>
  );
}
