interface IServiceChecklistItem {
  checklistItem: string;
}

export default function ServiceChecklistItem(props: IServiceChecklistItem) {
  return (
    <li className="flex space-x-2 items-center">
      <svg
        className="flex-shrink-0 w-4 h-4 text-black"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="text-base text-black">{props.checklistItem}</span>
    </li>
  );
}
