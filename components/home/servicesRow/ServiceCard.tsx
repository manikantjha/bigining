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
          <h2 className="text-2xl text-left font-semibold text-textLight">
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
