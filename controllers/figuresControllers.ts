import Figures from "@/models/figures";
import { figuresSchema } from "@/schemas/figuresSchema";
import { revalidatePath } from "@/utils/server";
import { createGenericController } from "../HOFs/controllersHOF";

const figuresControllers = createGenericController({
  Model: Figures,
  schema: figuresSchema,
  revalidate: async () => {
    await revalidatePath("/");
    await revalidatePath("/about");
  },
});

export default figuresControllers;
