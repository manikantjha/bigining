import { truncateText } from "@/utils/utils";
import React from "react";
import CommonButton from "../CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

interface IListItemProps<T> {
  item: T;
  title: string;
  description?: string;
  imageURL?: string;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
}

export default function ListItem<T>({
  item,
  title,
  description,
  imageURL,
  onEdit,
  onDelete,
}: IListItemProps<T>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-4 border border-gray-200 rounded-md overflow-hidden">
      <div className="p-4 grid grid-cols-[auto_1fr] gap-4">
        {/* Image */}
        {imageURL && (
          <div className="w-[75px] h-[75px] overflow-hidden border-2 rounded-full border-gray-300">
            <img
              src={imageURL}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        {/* Title & Description */}
        <div className="place-self-start self-center">
          <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
          {description && (
            <p className="text-gray-500 line-clamp-2">
              {truncateText(description, 100)}
            </p>
          )}
        </div>
      </div>
      {/* Action Buttons */}
      <div className={`p-4 hidden space-x-2 justify-self-end lg:flex`}>
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
      <div className="p-4 flex justify-end space-x-4 bg-slate-50 lg:hidden">
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
