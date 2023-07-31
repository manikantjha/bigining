import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { GetIcon } from "@/components/common/icons/icons";
import { deleteService } from "@/services/apiServices";
import { IService } from "@/types/services";
import { useRouter } from "next/router";
import { useState } from "react";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import CommonButton from "../../common/CommonButton";
import ServiceCard from "./ServiceCard";

interface IServicesListProps {
  services: UseQueryResult<any, unknown>;
}

export default function ServicesList(props: IServicesListProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { page = 1 } = router.query;

  const deleteServiceMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteService(id);
    },
    onSuccess: () => {
      // If I provide page ID as well then only that page gets invalidated, other pages show stale data.
      queryClient.invalidateQueries(["services"]);
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  const handleEdit = (id: string) => {
    router.push(`services/${id}?page=${page}`);
  };

  const handleDelete = (id: string) => {
    setServiceId(id);
    setIsOpen(true);
  };

  function handleClose() {
    setIsOpen(false);
  }

  function handleConfirm() {
    if (serviceId) deleteServiceMutation.mutate(serviceId);
  }

  const data: IService[] = props.services?.data?.services || [];

  return (
    <div className="grid gap-4 grid-cols-1">
      <CommonButton
        className="w-fit"
        icon={<GetIcon name="add" />}
        color="accent"
        onClick={() => router.push(`services/add?page=${page}`)}
      >
        Add New Service
      </CommonButton>
      {data.map((service, index) => (
        <ServiceCard
          key={index}
          service={service}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      {isOpen && (
        <ConfirmDeleteModal
          isOpen={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
