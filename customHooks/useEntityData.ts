import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useEntityData = (
  entity: string,
  getEntityFn: (id: string) => Promise<any>
) => {
  const router = useRouter();
  const { id } = router.query;
  const caseOfAdd = id === "add";

  const data = useQuery({
    queryKey: [entity, id],
    queryFn: () => {
      if (id && !caseOfAdd) {
        return getEntityFn(id as string);
      }
      return Promise.resolve(undefined);
    },
  });

  return { data, caseOfAdd };
};

export default useEntityData;
