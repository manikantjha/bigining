import Company from "@/models/company";
import { companySchema } from "@/schemas/companySchema";
import { createGenericController } from "../HOFs/controllersHOF";

const companyControllers = createGenericController({
  Model: Company,
  schema: companySchema,
  imageKey: "image",
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/"}`
    );
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/about"}`
    );
  },
});

export default companyControllers;
