import Features from "@/models/features";
import { featuresSchema } from "@/schemas/featuresSchema";
import { revalidatePath } from "@/utils/server";
import { createGenericController } from "../HOFs/controllersHOF";

const featuresControllers = createGenericController({
  Model: Features,
  schema: featuresSchema,
  revalidate: async () => {
    revalidatePath("/");
  },
});

export default featuresControllers;
