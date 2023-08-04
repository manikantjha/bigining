import Company from "@/models/company";
import { companySchema } from "@/schemas/companySchema";
import { createGenericController } from "../HOFs/controllersHOF";

const companyControllers = createGenericController({
  Model: Company,
  schema: companySchema,
  imageKey: "image",
});

export default companyControllers;
