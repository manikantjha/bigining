import { lstFAQs } from "@/data/data";
import { useState } from "react";
import ContainerWrapper from "../common/ContainerWrapper";
import Title from "../common/Title";
import Accordion from "../common/accordion/Accordion";
import { UseQueryResult } from "react-query";
import RowWrapper from "../common/RowWrapper";

interface IFAQsRowProps {
  faqs: UseQueryResult<any, unknown>;
}

export default function FAQsRow(props: IFAQsRowProps) {
  const [expanded, setExpanded] = useState(1);
  return (
    <RowWrapper
      title="FAQs"
      containerWrapperClassName="min-h-[calc(100vh-76px)]"
    >
      <div>
        {props.faqs?.data?.faqs
          ? props.faqs?.data?.faqs[0]?.faqs.map((item: any, index: number) => (
              <Accordion
                key={index}
                objAccordion={item}
                expanded={expanded}
                setExpanded={setExpanded}
                listLength={props.faqs?.data?.faqs[0]?.faqs?.length}
                index={index}
              />
            ))
          : null}
      </div>
    </RowWrapper>
  );
}
