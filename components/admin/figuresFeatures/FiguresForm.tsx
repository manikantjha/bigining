import { figuresSchema } from "@/schemas/figuresSchema";
import { createUpdateFigures } from "@/services/apiServices";
import { IFigures } from "@/types/figures";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import FormSectionContainer from "../common/FormSectionContainer";
import FormSectionWrapper from "../common/FormSectionWrapper";
import SubmitButton from "../common/form/SubmitButton";
import TextInput from "../common/form/TextInput";

interface IFiguresFormProps {
  figures: UseQueryResult<any, unknown>;
}

export default function FiguresForm(props: IFiguresFormProps) {
  const defaultValues = props.figures?.data ? props.figures?.data : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFigures>({
    resolver: yupResolver(figuresSchema as any),
    defaultValues,
  });

  const addUpdateMutation = useMutation({ mutationFn: createUpdateFigures });

  const onSubmit = (data: IFigures) => {
    const _id = props?.figures?.data ? props?.figures?.data?._id : undefined;
    addUpdateMutation.mutate({ ...data, _id });
  };

  return (
    <FormSectionWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          {[...Array(4)].map((item, index) => (
            <div className="grid gap-6 mb-4 md:grid-cols-2" key={index}>
              <TextInput
                label={`Figure ${index + 1}`}
                name={`figures.${index}.figure`}
                register={register}
                error={
                  (errors.figures && errors.figures[index]?.figure) || undefined
                }
                placeholder="Figure"
              />
              <TextInput
                label={`Description ${index + 1}`}
                name={`figures.${index}.description`}
                register={register}
                error={
                  (errors.figures && errors.figures[index]?.description) ||
                  undefined
                }
                placeholder="Figure Description"
              />
            </div>
          ))}
          <div className="w-full flex items-center space-x-4 mt-8">
            <SubmitButton loading={addUpdateMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
    </FormSectionWrapper>
  );
}
