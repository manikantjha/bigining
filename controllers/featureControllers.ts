import Features from "@/models/feature";
import { featuresSchema } from "@/schemas/featuresSchema";
import { createGenericController } from "../HOFs/controllersHOF";

const featuresControllers = createGenericController({
  Model: Features,
  schema: featuresSchema,
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/"}`
    );
  },
});

export default featuresControllers;
