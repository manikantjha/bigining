import { Dispatch, SetStateAction } from "react";

interface IAccordion {
  objAccordion: {
    id: number;
    question: string;
    answer: string;
  };
  expanded: number;
  setExpanded: Dispatch<SetStateAction<number>>;
  listLength: number;
  index: number;
}

export default function Accordion(props: IAccordion) {
  const isExpanded = props.expanded === props.index;
  return (
    <div>
      <h2>
        <button
          type="button"
          className={`flex items-center justify-between w-full p-5 font-medium text-left text-black border ${
            props.index !== props.listLength - 1 ? "border-b-0" : "border-b"
          } border-black ${
            props.index === 0 ? "rounded-t-xl" : "rounded-t-none"
          } ${
            props.index === props.listLength - 1 && !isExpanded
              ? "rounded-b-xl"
              : "rounded-b-none"
          } focus:bg-primaryLighter hover:bg-primaryLighter`}
          onClick={() => props.setExpanded(props.index)}
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            {props.objAccordion.question}
          </span>
          <svg
            className={`w-6 h-6 transition-all ${
              isExpanded ? "rotate-180" : "rotate-0"
            } shrink-0`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </h2>
      <div className={`${isExpanded ? "block h-auto" : "hidden h-0"}`}>
        <div
          className={`p-5 border ${
            props.index !== props.listLength - 1 ? "border-b-0" : "border-b"
          } ${
            props.index === props.listLength - 1
              ? "rounded-b-xl"
              : "rounded-b-none"
          } font-light border-black`}
        >
          <p className="mb-2 text-black">{props.objAccordion.answer}</p>
        </div>
      </div>
    </div>
  );
}
