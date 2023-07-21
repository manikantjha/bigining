import Card from "@/components/common/Card";
import { IRowTheme } from "@/types/row";
import ServiceChecklistItem from "./ServiceChecklistItem";

interface IServiceCard extends IRowTheme {
  objService: {
    title: string;
    list: string[];
  };
}

export default function ServiceCard(props: IServiceCard) {
  return (
    <Card theme={props.theme} className="!p-0 !bg-bgDarkLight !text-left">
      <div className="rounded-lg">
        <div
          className={`flex items-center space-x-4 px-5 md:px-6 py-4 md:py-6 bg-gradient-to-br from-primaryDark via-secondaryDark to-accentDark border-b border-black`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-textLight"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
            />
          </svg>

          <h2 className="text-2xl text-center font-semibold text-textLight">
            {props.objService.title}
          </h2>
        </div>
        {props.objService?.list && !!props.objService.list.length && (
          <>
            <hr />
            <div className="p-5 md:p-6 bg-bgDarkLight">
              <ul role="list" className="space-y-2">
                {props.objService?.list?.map((item, index) => (
                  <ServiceChecklistItem key={index} checklistItem={item} />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
