import { truncateText } from "@/utils/utils";
import React from "react";
import CommonButton from "../CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

interface IRowListItemProps<T> {
  item: T;
  title: string;
  description?: string;
  imageURL?: string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export default function RowListItem<T>({
  item,
  title,
  description,
  imageURL,
  onEdit,
  onDelete,
}: IRowListItemProps<T>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-2 items-center border border-gray-200 rounded-md overflow-hidden">
      <div className="p-3 lg:p-4 grid grid-cols-[auto_1fr] gap-4 items-center">
        {/* Image */}
        {imageURL && (
          <div className="w-[50px] h-[50px] lg:w-[65px] lg:h-[65px] overflow-hidden border-2 border-gray-300 rounded-full ">
            <img
              src={imageURL}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Title & Description */}
        <div className="grid grid-rows-[auto_1fr]">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          {description && (
            <p className="text-gray-500 line-clamp-2">
              {truncateText(description, 100)}
            </p>
          )}
        </div>
      </div>
      {/* Action Buttons Desktop */}
      <div className={`p-3 lg:p-4 hidden space-x-2 justify-end lg:flex`}>
        <CommonButton
          onClick={() => onEdit(item)}
          color="primary"
          variant="outlined"
          className="w-fit h-fit"
          icon={<GetIcon name="edit" size="w-5 h-5" />}
        >
          Edit
        </CommonButton>
        <CommonButton
          onClick={() => onDelete(item)}
          color="accent"
          className="w-fit h-fit"
          variant="outlined"
          icon={<GetIcon name="delete" size="w-5 h-5" />}
        >
          Delete
        </CommonButton>
      </div>
      {/* Action Buttons Mobile */}
      <div className="p-3 lg:p-4 flex justify-end space-x-4 lg:hidden bg-gray-100">
        <CommonButton
          onClick={() => onEdit(item)}
          color="primary"
          variant="outlined"
          className="w-fit h-fit"
          icon={<GetIcon name="edit" size="w-5 h-5" />}
        />
        <CommonButton
          onClick={() => onDelete(item)}
          color="accent"
          className="w-fit h-fit"
          variant="outlined"
          icon={<GetIcon name="delete" size="w-5 h-5" />}
        />
      </div>
    </div>
  );
}
