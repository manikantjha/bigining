import { useRouter } from "next/navigation";

interface IFormSectionTitle {
  title: string;
  hasBackButton?: boolean;
}

export default function FormSectionTitle(props: IFormSectionTitle) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 place-content-center">
      {props.hasBackButton && (
        <button
          type="button"
          className="bg-primaryDark text-white border hover:bg-primaryDarker active:bg-primaryDarker p-1.5 font-semibold rounded-full flex border-none w-fit h-fit"
          onClick={() => router.back()}
        >
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
        </button>
      )}

      <h2 className="text-2xl font-bold mb-6">{props.title}</h2>
    </div>
  );
}
