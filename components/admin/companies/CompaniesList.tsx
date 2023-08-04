import { deleteCompany, getCompaniesPaginated } from "@/services/apiServices";
import { ICompany } from "@/types/company";
import DataList from "../common/dataList/DataList";
import RowListItem from "../common/dataList/RowListItem";

interface ICompaniesListProps {}

export default function CompaniesList(props: ICompaniesListProps) {
  return (
    <DataList<ICompany>
      title="Companies"
      entityPlural="companies"
      renderListItem={(item, onEdit, onDelete) => (
        <RowListItem
          key={item._id}
          item={item}
          title={item.name}
          imageURL={item.image?.medium?.url || ""}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      deleteEntityFn={deleteCompany}
      getEntitiesPaginatedFn={getCompaniesPaginated}
    />
  );
}
