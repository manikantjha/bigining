import { deleteFaq, getFaqsPaginated } from "@/services/apiServices";
import { IFaq } from "@/types/faqs";
import DataList from "../common/dataList/DataList";
import RowListItem from "../common/dataList/RowListItem";

interface IFaqsListProps {}

export default function FaqsList(props: IFaqsListProps) {
  return (
    <DataList<IFaq>
      title="FAQs"
      entityPlural="faqs"
      renderListItem={(item, onEdit, onDelete) => (
        <RowListItem
          key={item._id}
          item={item}
          title={item.question}
          description={item.answer}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      deleteEntityFn={deleteFaq}
      getEntitiesPaginatedFn={getFaqsPaginated}
    />
  );
}
