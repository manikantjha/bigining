import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { GetIcon } from "@/components/common/icons/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import CommonButton from "../common/CommonButton";
import AddNewButton from "./AddNewButton";

interface IListProps<T> {
  data: T[];
  entityName: string;
  renderListItem: (item: T) => JSX.Element;
  deleteMutation: (data: T) => Promise<any>;
}

function DataList<T>({
  data,
  entityName,
  renderListItem,
  deleteMutation,
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

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddNewButton
          herf={`${entityPathName}s/add?page=${page}`}
          router={router}
          text={`Add New ${entityName}`}
        />
        {!!data.length &&
          data.map((item: T) => (
            <div
              key={(item as any)._id}
              className="border p-4 rounded-lg grid grid-rows-[auto_1fr_auto] gap-4 h-[400px]"
            >
              {renderListItem(item)}
              <div className="flex space-x-2 mt-2">
                <CommonButton
                  onClick={() =>
                    router.push(
                      `${entityPathName}s/${(item as any)._id}?page=${page}`
                    )
                  }
                  color="primary"
                  variant="outlined"
                  className="w-fit h-fit"
                  icon={<GetIcon name="edit" size="w-5 h-5" />}
                >
                  Edit
                </CommonButton>
                <CommonButton
                  onClick={() => {
                    setItemToDelete(item);
                    setIsOpen(true);
                  }}
                  color="accent"
                  className="w-fit h-fit"
                  variant="outlined"
                  icon={<GetIcon name="delete" size="w-5 h-5" />}
                >
                  Delete
                </CommonButton>
              </div>
            </div>
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
