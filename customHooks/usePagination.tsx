import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const usePagination = (
  entity: string,
  getPaginatedDataFn: (currentPage: number, limit: number) => Promise<any>
) => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const data = useQuery({
    queryKey: [entity, page],
    queryFn: () => {
      return getPaginatedDataFn(parseInt(page as string), limit);
    },
  });

  const PaginationComponent = () => (
    <Pagination
      currentPage={data?.data?.currentPage}
      totalItems={data?.data?.totalItems}
      itemsPerPage={limit}
      alwaysVisible
      containerClassName="!mt-[80px]"
      baseHref={`/admin/${entity}`}
    />
  );

  return { data, PaginationComponent };
};

export default usePagination;
