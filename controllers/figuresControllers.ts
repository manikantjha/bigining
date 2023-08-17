import Figures from "@/models/figures";
import { figuresSchema } from "@/schemas/figuresSchema";
import { createGenericController } from "../HOFs/controllersHOF";

const figuresControllers = createGenericController({
  Model: Figures,
  schema: figuresSchema,
});

export default figuresControllers;
