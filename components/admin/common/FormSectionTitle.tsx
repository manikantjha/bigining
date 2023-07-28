import { useRouter } from "next/navigation";
import CommonButton from "./CommonButton";

interface IFormSectionTitle {
  title: string;
  hasBackButton?: boolean;
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
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          }
        />
      )}
      <h2 className="text-2xl font-bold mb-6">{props.title}</h2>
    </div>
  );
}
