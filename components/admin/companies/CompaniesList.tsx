import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { GetIcon } from "@/components/common/icons/icons";
import { deleteCompany } from "@/services/apiServices";
import { ICompany } from "@/types/companies";
import { useRouter } from "next/router";
import { useState } from "react";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import AddNewButton from "../common/AddNewButton";
import CommonButton from "../common/CommonButton";

interface ICompaniesListProps {
  companies: UseQueryResult<any, unknown>;
}

export default function CompaniesList(props: ICompaniesListProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState<ICompany | null>(null);
  const queryClient = useQueryClient();

  const { page = 1 } = router.query;

  const deleteCompanyMutation = useMutation({
    mutationFn: (data: ICompany) => deleteCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

  function handleClose() {
    setIsOpen(false);
  }

  function handleConfirm() {
    if (company) deleteCompanyMutation.mutate(company);
  }

  const data = props.companies?.data?.companies || [];

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AddNewButton
          herf={`companies/add?page=${page}`}
          router={router}
          text="Add New Company"
          containerClassName="!h-auto"
        />
        {!!data.length &&
          data.map((company: ICompany) => (
            <div
              key={company._id}
              className="border p-4 rounded-lg grid grid-rows-[auto_1fr_auto] gap-4 h-auto"
            >
              <div>
                <h3 className="text-lg font-semibold">{company.name}</h3>
              </div>
              <div className="h-[200px] overflow-hidden border-2 border-dashed rounded-md bg-gray-50">
                <img
                  src={company?.image?.medium?.url || ""}
                  alt={company.name}
                  className="w-full h-full rounded object-cover"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <CommonButton
                  onClick={() =>
                    router.push(`companies/${company._id}?page=${page}`)
                  }
                  color="primary"
                  variant="outlined"
                  className="w-fit h-fit"
                  icon={<GetIcon name="edit" size="w-5 h-5" />}
                >
                  Edit
                </CommonButton>
                <CommonButton
                  onClick={() => {
                    setCompany(company);
                    setIsOpen(true);
                  }}
                  color="accent"
                  className="w-fit h-fit"
                  variant="outlined"
                  icon={<GetIcon name="delete" size="w-5 h-5" />}
                >
                  Delete
                </CommonButton>
              </div>
            </div>
          ))}
      </div>
      <ConfirmDeleteModal
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
