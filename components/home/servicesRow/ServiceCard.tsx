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
    <Card theme={props.theme} className="!p-0 !bg-primaryLighter !text-left">
      <div
        className="bg-white rounded-lg"
        id="about"
        role="tabpanel"
        aria-labelledby="about-tab"
      >
        <div
          className={`flex items-center space-x-4 px-5 md:px-6 py-4 md:py-6 bg-gradient-to-br from-primaryDark via-secondaryLight to-accentLight border-b border-black`}
        >
          {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-10 h-10 fill-white"
              >
                <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
                <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
              </svg> */}

          <h2 className="text-2xl text-center font-semibold text-black">
            {props.objService.title}
          </h2>
        </div>
        <hr />
        <div className="p-5 md:p-6 bg-primaryLighter">
          <ul role="list" className="space-y-2">
            {props.objService?.list?.map((item, index) => (
              <ServiceChecklistItem key={index} checklistItem={item} />
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
