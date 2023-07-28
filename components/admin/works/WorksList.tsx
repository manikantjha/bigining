import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { deleteWork } from "@/services/apiServices";
import { IWork } from "@/types/works";
import { useRouter } from "next/router";
import { useState } from "react";
import { UseQueryResult, useMutation } from "react-query";
import CommonButton from "../common/CommonButton";
import { truncateText } from "@/utils/helpers";

interface IWorksListProps {
  works: UseQueryResult<any, unknown>;
}

const WorksList = (props: IWorksListProps) => {
  const router = useRouter();
  const deleteWorkMutation = useMutation("deleteWork", (data: IWork) =>
    deleteWork(data)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [work, setWork] = useState<IWork | null>(null);

  if (!props.works?.data?.works) {
    return null;
  }

  function onClose() {
    setIsOpen(false);
  }

  function onConfirm() {
    if (work)
      deleteWorkMutation.mutate(work, {
        onSettled(data, error, variables, context) {
          setIsOpen(false);
          props.works.refetch();
        },
      });
  }

  const data = props.works?.data?.works;

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((work: IWork) => (
          <div
            key={work._id}
            className="border p-4 rounded-lg grid grid-rows-[auto_auto_auto] gap-4"
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
                  work?.images && work.images[0] && work.images[0].medium?.url
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                }
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                }
              >
                Delete
              </CommonButton>
            </div>
          </div>
        ))}
        <div
          key="add"
          className="border p-4 rounded-lg flex items-center justify-center"
        >
          <div className="flex flex-col justify-center items-center space-y-4">
            <CommonButton
              onClick={() => router.push(`works/add`)}
              variant="filled"
              className="w-fit"
              color="accent"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <h3 className="text-lg font-semibold">Add New Work</h3>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default WorksList;
