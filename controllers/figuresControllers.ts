import Figures from "@/models/figures";
import { figuresSchema } from "@/schemas/figuresSchema";
import { createGenericController } from "../HOFs/controllersHOF";

const figuresControllers = createGenericController({
  Model: Figures,
  schema: figuresSchema,
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

export default figuresControllers;
