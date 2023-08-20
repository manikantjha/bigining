import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { GetIcon } from "@/components/common/icons/icons";
import { useAuth } from "@/contexts/AuthContext";
import usePagination from "@/customHooks/usePagination";
import { IAuthContext } from "@/types/auth";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import AddNewButton from "../AddNewButton";
import FormSectionTitle from "../FormSectionTitle";

interface IListProps<T> {
  title: string;
  entityPlural: string;
  renderListItem: (
    item: T,
    onEdit: (item: T) => void,
    onDelete: (item: T) => void
  ) => JSX.Element;
  getEntitiesPaginatedFn: (currentPage: number, limit: number) => Promise<any>;
  deleteEntityFn: (data: T, token: string) => Promise<any>;
  layoutType?: "grid" | "row";
  containerClassName?: string;
}

function DataList<T>({
  title,
  entityPlural,
  renderListItem,
  getEntitiesPaginatedFn,
  deleteEntityFn,
  containerClassName = "",
  layoutType = "row",
}: IListProps<T>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const queryClient = useQueryClient();
  const { user } = useAuth() as IAuthContext<User>;

  const { data, PaginationComponent } = usePagination(
    entityPlural,
    getEntitiesPaginatedFn
  );

  const { page = 1 } = router.query;

  const deleteItemMutation = useMutation({
    mutationFn: async (data: T) =>
      deleteEntityFn(data, await user.getIdToken()),
    onSuccess: () => {
      queryClient.invalidateQueries([entityPlural]);
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
    router.push(`${entityPlural}/${(item as any)._id}?page=${page}`);
  }

  function handleDelete(item: T) {
    setItemToDelete(item);
    setIsOpen(true);
  }

  if (data.isLoading) return <Loading />;
  if (data.isError) return <Error />;

  const lstEntities = data.data?.items || [];

  return (
    <div className="grid grid-rows-[auto_1fr] gap-8">
      <div className="grid grid-cols-[1fr_auto] items-center">
        <FormSectionTitle title={title} titleClassName="!mb-0" />
        <AddNewButton
          router={router}
          className="h-fit w-fit"
          color="accent"
          icon={<GetIcon name="add" size="w-5 h-5" />}
          href={`${entityPlural}/add?page=${page}`}
        >
          Add New
        </AddNewButton>
      </div>
      <div
        className={`grid gap-2 ${
          layoutType === "row"
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        } ${containerClassName}`}
      >
        {!!lstEntities.length &&
          lstEntities.map((item: T) => (
            <>{renderListItem(item, handleEdit, handleDelete)}</>
          ))}
      </div>
      <PaginationComponent />
      {isOpen && (
        <ConfirmDeleteModal
          isOpen={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          isLoading={deleteItemMutation.isLoading}
        />
      )}
    </div>
  );
}

export default DataList;
