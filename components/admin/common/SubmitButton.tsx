import Loading from "@/components/common/Loading";

interface ISubmitButtonProps {
  isLoading: boolean;
}

export default function SubmitButton(props: ISubmitButtonProps) {
  return (
    <button
      type="submit"
      className="bg-accentDark hover:bg-orange-600 active:bg-orange-800 px-8 py-2 text-white font-semibold rounded-full grid grid-cols-[auto_1fr] place-items-center"
      disabled={props.isLoading}
    >
      {props.isLoading && (
        <Loading
          loaderContainerHeightWidth="!h-5 !w-fit"
          loaderHeightWidth="h-5 w-5"
        />
      )}
      Submit
    </button>
  );
}
