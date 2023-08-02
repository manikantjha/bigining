import Card from "@/components/common/Card";
import { ICompany } from "@/types/company";
import { IRowTheme } from "@/types/row";
import React from "react";

interface ICompanyCardProps extends IRowTheme {
  company: ICompany;
}

export default function CompanyCard(props: ICompanyCardProps) {
  return (
    <Card theme={props.theme}>
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={props.company.image.small.url}
          alt={props.company.name}
          className="object-contain h-[100px] mix-blend-multiply"
        />
      </div>
    </Card>
  );
}
