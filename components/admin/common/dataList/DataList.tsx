import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import AddNewButton from "../AddNewButton";
import CommonButton from "../CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

interface IListProps<T> {
  data: T[];
  entityName: string;
  renderListItem: (
    item: T,
    onEdit: (item: T) => void,
    onDelete: (item: T) => void
  ) => JSX.Element;
  deleteMutation: (data: T) => Promise<any>;
  renderAddNewButton?: () => JSX.Element;
  containerClassName?: string;
  listItemClassName?: string;
}

function DataList<T>({
  data,
  entityName,
  renderListItem,
  deleteMutation,
  renderAddNewButton,
  containerClassName = "",
  listItemClassName = "",
}: IListProps<T>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const queryClient = useQueryClient();

  const { page = 1 } = router.query;

  function getEntityPathName() {
    if (entityName.includes(" ")) {
      const temp = entityName.split(" ");
      return temp[0].toLowerCase().concat(temp.slice(1).join());
    }
    return entityName.toLowerCase();
  }

  const entityPathName = getEntityPathName();

  const deleteItemMutation = useMutation({
    mutationFn: deleteMutation,
    onSuccess: () => {
      queryClient.invalidateQueries([entityPathName + "s"]);
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  function handleClose() {
    setIsOpen(false);
  }

  function handleConfirm() {
    if (itemToDelete) deleteItemMutation.mutate(itemToDelete);
  }

  function handleEdit(item: T) {
    router.push(`${entityPathName}s/${(item as any)._id}?page=${page}`);
  }

  function handleDelete(item: T) {
    setItemToDelete(item);
    setIsOpen(true);
  }

  return (
    <div>
      <div
        className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${containerClassName}`}
      >
        {renderAddNewButton ? (
          <CommonButton
            className="w-fit"
            color="accent"
            icon={<GetIcon name="add" size="w-5 h-5" />}
            onClick={() => router.push("faqs/add")}
          >
            Add New Faq
          </CommonButton>
        ) : (
          <AddNewButton
            herf={`${entityPathName}s/add?page=${page}`}
            router={router}
            text={`Add New ${entityName}`}
          />
        )}
        {!!data.length &&
          data.map((item: T) => (
            <>{renderListItem(item, handleEdit, handleDelete)}</>
          ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default DataList;
