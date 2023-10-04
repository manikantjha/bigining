import { GetIcon } from "@/components/common/icons/icons";
import { useRouter } from "next/navigation";
import CommonButton from "./CommonButton";

interface IFormSectionTitle {
  title: string;
  hasBackButton?: boolean;
  titleClassName?: string;
}

export default function FormSectionTitle(props: IFormSectionTitle) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 place-content-center">
      {props.hasBackButton && (
        <CommonButton
          type="button"
          onClick={() => router.back()}
          className="w-fit h-fit"
          color="primary"
          icon={<GetIcon name="back" />}
        />
      )}
      <h2 className={`text-2xl font-bold mb-6 ${props.titleClassName}`}>
        {props.title}
      </h2>
    </div>
  );
}
