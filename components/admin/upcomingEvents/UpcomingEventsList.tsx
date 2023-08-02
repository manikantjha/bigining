import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { GetIcon } from "@/components/common/icons/icons";
import { deleteUpcomingEvent } from "@/services/apiServices";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import { truncateText } from "@/utils/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import AddNewButton from "../common/AddNewButton";
import CommonButton from "../common/CommonButton";

interface IUpcomingEventsListProps {
  upcomingEvents: UseQueryResult<any, unknown>;
}

export default function UpcomingEventsList(props: IUpcomingEventsListProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [upcomingEvent, setUpcomingEvent] = useState<IUpcomingEvent | null>(
    null
  );
  const queryClient = useQueryClient();

  const { page = 1 } = router.query;

  const deleteUpcomingEventMutation = useMutation({
    mutationFn: (data: IUpcomingEvent) => deleteUpcomingEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["upcomingEvents"]);
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  function handleClose() {
    setIsOpen(false);
  }

  function handleConfirm() {
    if (upcomingEvent) deleteUpcomingEventMutation.mutate(upcomingEvent);
  }

  const data = props.upcomingEvents?.data?.upcomingEvents || [];

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddNewButton
          herf={`upcomingEvents/add?page=${page}`}
          router={router}
          text="Add New Event"
          containerClassName="h-auto"
        />
        {!!data.length &&
          data.map((upcomingEvent: IUpcomingEvent) => (
            <div
              key={upcomingEvent._id}
              className="border p-4 rounded-lg grid grid-rows-[auto_1fr_auto] gap-4 h-auto"
            >
              <div>
                <h3 className="text-lg font-semibold">{upcomingEvent.name}</h3>
                {upcomingEvent.description && (
                  <p className="text-gray-500">
                    {truncateText(upcomingEvent.description, 120)}
                  </p>
                )}
              </div>
              <div className="h-[200px] overflow-hidden border-2 border-dashed rounded-md bg-gray-50">
                <img
                  src={upcomingEvent?.image?.medium?.url || ""}
                  alt={upcomingEvent.name}
                  className="w-full h-full rounded object-cover"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <CommonButton
                  onClick={() =>
                    router.push(
                      `upcomingEvents/${upcomingEvent._id}?page=${page}`
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
                    setUpcomingEvent(upcomingEvent);
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
