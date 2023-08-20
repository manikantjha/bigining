import ContactInfo from "@/models/contactInfo";
import { contactInfoSchema } from "@/schemas/contactInfoSchema";
import { createGenericController } from "../HOFs/controllersHOF";

const contactInfoControllers = createGenericController({
  Model: ContactInfo,
  schema: contactInfoSchema,
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/"}`
    );
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/services"}`
    );
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/contact"}`
    );
  },
});

export default contactInfoControllers;
