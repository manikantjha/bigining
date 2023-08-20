import { IFaq } from "@/types/faqs";
import { useState } from "react";
import { UseQueryResult } from "react-query";
import RowWrapper from "../common/RowWrapper";
import Accordion from "../common/accordion/Accordion";

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
        {props.faqs?.data?.items
          ? props.faqs?.data?.items.map((item: IFaq, index: number) => (
              <Accordion
                key={index}
                objAccordion={{ ...item, _id: item._id || index.toString() }}
                expanded={expanded}
                setExpanded={setExpanded}
                listLength={props.faqs?.data?.items?.length}
                index={index}
              />
            ))
          : null}
      </div>
    </RowWrapper>
  );
}
