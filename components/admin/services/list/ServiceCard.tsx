import { GetIcon } from "@/components/common/icons/icons";
import { IService } from "@/types/service";
import CommonButton from "../../common/CommonButton";
import ListItem from "./ListItem";

interface IServiceCardProps {
  service: IService;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function ServiceCard({
  service,
  onEdit,
  onDelete,
}: IServiceCardProps) {
  return (
    <div className="border rounded-md overflow-hidden grid grid-rows-[auto_1fr]">
      <div className="grid grid-cols-[1fr_auto] bg-gray-100">
        <h3 className="p-4 text-xl font-semibold">{service.title}</h3>
        <div className="p-4 flex items-center justify-end space-x-2">
          <CommonButton
            color="primary"
            icon={<GetIcon name="edit" size="w-5 h-5" />}
            onClick={() => {
              if (service._id) {
                onEdit(service._id);
              }
            }}
          />
          <CommonButton
            color="accent"
            icon={<GetIcon name="delete" size="w-5 h-5" />}
            onClick={() => {
              if (service._id) {
                onDelete(service._id);
              }
            }}
          />
        </div>
      </div>
      <div className="p-4">
        <ListItem list={service.list} />
      </div>
    </div>
  );
}
