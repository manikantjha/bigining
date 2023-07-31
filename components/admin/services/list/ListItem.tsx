import { useState } from "react";
import CommonButton from "../../common/CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

interface IListItemProps {
  list?: string[];
  visibleItemsCount?: number;
}

export default function ListItem({
  list,
  visibleItemsCount = 2,
}: IListItemProps) {
  const [showAllItems, setShowAllItems] = useState(false);

  const toggleShowAllItems = () => {
    setShowAllItems((prev) => !prev);
  };

  if (!list) return null;

  const displayedList = showAllItems ? list : list.slice(0, visibleItemsCount);

  return (
    <ul className="ml-4">
      {displayedList.map((item, index) => (
        <li
          key={index}
          className={`my-1 ${
            index === list.length - 1 ||
            (!showAllItems && index === visibleItemsCount - 1)
              ? "pb-2"
              : "border-b border-gray-100 pb-2"
          } flex items-center gap-2`}
        >
          <GetIcon name="check-circle" size="w-4 h-4" />
          {item}
        </li>
      ))}
      {list.length > visibleItemsCount && (
        <li>
          <CommonButton
            variant="text"
            className="mt-2 !p-0 bg-transparent hover:bg-transparent hover:underline"
            onClick={toggleShowAllItems}
          >
            {showAllItems ? "Show Less" : "Show More"}
          </CommonButton>
        </li>
      )}
    </ul>
  );
}
