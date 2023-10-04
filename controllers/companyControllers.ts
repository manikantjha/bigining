import Company from "@/models/company";
import { companySchema } from "@/schemas/companySchema";
import { revalidatePath } from "@/utils/server";
import { createGenericController } from "../HOFs/controllersHOF";

const companyControllers = createGenericController({
  Model: Company,
  schema: companySchema,
  imageKey: "image",
  revalidate: async () => {
    revalidatePath("/");
    revalidatePath("/about");
  },
});

export default companyControllers;
