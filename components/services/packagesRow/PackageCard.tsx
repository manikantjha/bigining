import Card from "@/components/common/Card";
import PackageListItem from "./PackageListItem";
import { IRowTheme } from "@/types/row";

interface IPackageCard extends IRowTheme {
  objPackage: {
    title: string;
    price: string;
    list: string[];
  };
}

export default function PackageCard(props: IPackageCard) {
  return (
    <Card theme={props.theme} className="!p-0">
      <div
        className={`${
          props.theme === "dark" ? "bg-bgLight" : "bg-bgDarkLight"
        } text-center`}
      >
        <div className="p-4 lg:p-6 bg-gradient-to-br from-primaryDark via-secondaryLight to-accentLight border-b border-black">
          <p className="text-2xl font-semibold text-black">
            {props.objPackage.title}
          </p>
        </div>
        <hr />
        <div className="px-4 lg:px-6 py-4 border-b border-black">
          <div className="flex items-baseline justify-center">
            <span className="text-3xl font-semibold">&#8377;</span>
            <span className="text-5xl font-semibold tracking-tight">
              {props.objPackage.price}*
            </span>
          </div>
          <span className="text-base block mt-2">*Starting From</span>
        </div>
      </div>
      <hr />
      <div className="p-4 lg:p-6">
        <ul role="list" className="space-y-4">
          {props.objPackage.list.map((item, index) => (
            <PackageListItem key={index} objPackageListItem={item} />
          ))}
        </ul>
      </div>
    </Card>
  );
}
