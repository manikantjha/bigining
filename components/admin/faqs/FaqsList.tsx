import { GetIcon } from "@/components/common/icons/icons";
import { deleteFaq } from "@/services/apiServices";
import { IFaq } from "@/types/faqs";
import { truncateText } from "@/utils/utils";
import { useRouter } from "next/router";
import { UseQueryResult } from "react-query";
import CommonButton from "../common/CommonButton";
import DataList from "../common/dataList/DataList";

interface IFaqsListProps {
  faqs: UseQueryResult<any, unknown>;
}

export default function FaqsList(props: IFaqsListProps) {
  const data = props.faqs?.data?.items || [];
  const router = useRouter();

  const handleRenderListItem = (faq: IFaq) => (
    <>
      <div>
        <h3 className="text-lg font-semibold">{faq.question}</h3>
        <p className="text-gray-500">{truncateText(faq.answer, 120)}</p>
      </div>
    </>
  );

  const handleRenderAddNewButton = () => (
    <>
      <CommonButton
        className="w-fit"
        color="accent"
        icon={<GetIcon name="add" size="w-5 h-5" />}
        onClick={() => router.push("faqs/add")}
      >
        Add New Faq
      </CommonButton>
    </>
  );

  return (
    <DataList<IFaq>
      data={data}
      entityName="Faq"
      renderListItem={handleRenderListItem}
      deleteMutation={deleteFaq}
      renderAddNewButton={handleRenderAddNewButton}
      containerClassName="!grid-cols-1 !gap-4"
      listItemClassName="!h-fit grid-cols-1 lg:grid-cols-[1fr_auto]"
    />
  );
}
