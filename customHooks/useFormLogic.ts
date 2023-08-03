import { yupResolver } from "@hookform/resolvers/yup";
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
  mutationFn: (data: TForm) => Promise<any>;
  entity: string;
  entityPlural: string;
}

const useFormLogic = <TForm extends FieldValues>({
  defaultValues,
  schema,
  mutationFn,
  entity,
  entityPlural,
}: IFormLogicProps<TForm>) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<TForm>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: mutationFn,
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
    register,
    handleSubmit,
    control,
    errors,
    getValues,
    onSubmit,
    isLoading: mutation.isLoading,
  };
};

export default useFormLogic;
