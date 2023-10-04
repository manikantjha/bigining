import { useAuth } from "@/contexts/AuthContext";
import { IAuthContext } from "@/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  DeepPartial,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as yup from "yup";

interface IFormLogicProps<TForm extends yup.Maybe<yup.AnyObject>> {
  defaultValues: DeepPartial<TForm>;
  schema: yup.ObjectSchema<TForm>;
  mutationFn: (data: TForm, token: string) => Promise<any>;
  entity: string;
  entityPlural: string;
  isPublic?: boolean;
}

const useFormLogic = <TForm extends FieldValues>({
  defaultValues,
  schema,
  mutationFn,
  entity,
  entityPlural,
  isPublic,
}: IFormLogicProps<TForm>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;
  const { user } = useAuth() as IAuthContext<User>;

  const methods = useForm<TForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (data: TForm) => {
      const token = isPublic ? "" : await user.getIdToken();
      return mutationFn(data, token);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([entity, data._id], data);
      queryClient.invalidateQueries([entityPlural, page]);
      router.replace(`/admin/${entityPlural}?page=${page}`);
    },
  });

  const onSubmit: SubmitHandler<TForm> = (data) => {
    try {
      mutation.mutate(data);
    } catch (error) {
      console.log("Error submitting form: ", error);
    }
  };

  return {
    methods,
    onSubmit,
    isLoading: mutation.isLoading,
  };
};

export default useFormLogic;
