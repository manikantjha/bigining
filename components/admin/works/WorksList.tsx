import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { GetIcon } from "@/components/common/icons/icons";
import { deleteWork } from "@/services/apiServices";
import { IWork } from "@/types/works";
import { truncateText } from "@/utils/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { UseQueryResult, useMutation } from "react-query";
import AddNewButton from "../common/AddNewButton";
import CommonButton from "../common/CommonButton";

interface IWorksListProps {
  works: UseQueryResult<any, unknown>;
}

export default function WorksList(props: IWorksListProps) {
  const router = useRouter();
  const deleteWorkMutation = useMutation("deleteWork", (data: IWork) =>
    deleteWork(data)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [work, setWork] = useState<IWork | null>(null);

  function onClose() {
    setIsOpen(false);
  }

  function onConfirm() {
    if (work)
      deleteWorkMutation.mutate(work, {
        onSettled() {
          setIsOpen(false);
          props.works.refetch();
        },
      });
  }

  const data = props.works?.data?.works || [];

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddNewButton herf="works/add" router={router} text="Add New Work" />
        {!!data.length &&
          data.map((work: IWork) => (
            <div
              key={work._id}
              className="border p-4 rounded-lg grid grid-rows-[auto_1fr_auto] gap-4 h-[400px]"
            >
              <div>
                <h3 className="text-lg font-semibold">{work.name}</h3>
                <p className="text-gray-500">
                  {truncateText(work.description, 120)}
                </p>
              </div>
              <div className="h-[200px] overflow-hidden border-2 border-dashed rounded-md bg-gray-50">
                <img
                  src={
                    (work &&
                      work.images &&
                      Array.isArray(work.images) &&
                      work.images.length &&
                      work.images[0].medium &&
                      work.images[0].medium.url) ||
                    ""
                  }
                  alt={work.name}
                  className="w-full h-full rounded object-cover"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <CommonButton
                  onClick={() => router.push(`works/${work._id}`)}
                  color="primary"
                  variant="outlined"
                  className="w-fit h-fit"
                  icon={<GetIcon name="edit" size="h-5 w-5" />}
                >
                  Edit
                </CommonButton>
                <CommonButton
                  onClick={() => {
                    setWork(work);
                    setIsOpen(true);
                  }}
                  color="accent"
                  className="w-fit h-fit"
                  variant="outlined"
                  icon={<GetIcon name="delete" size="h-5 w-5" />}
                >
                  Delete
                </CommonButton>
              </div>
            </div>
          ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  );
}
