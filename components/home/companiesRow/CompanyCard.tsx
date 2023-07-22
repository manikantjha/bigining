import Card from "@/components/common/Card";
import { IRowTheme } from "@/types/row";
import React from "react";

interface ICompanyCardProps extends IRowTheme {
  objCompany: any;
}

export default function CompanyCard(props: ICompanyCardProps) {
  return (
    <Card theme={props.theme}>
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={props.objCompany.imageURL}
          alt={props.objCompany.name}
          className="object-contain h-[100px] mix-blend-multiply"
        />
      </div>
    </Card>
  );
}
