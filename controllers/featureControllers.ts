import Features from "@/models/feature";
import { featuresSchema } from "@/schemas/featuresSchema";
import { createGenericController } from "../HOFs/controllersHOF";

const featuresControllers = createGenericController({
  Model: Features,
  schema: featuresSchema,
});

export default featuresControllers;
