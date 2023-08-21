import ContactInfo from "@/models/contactInfo";
import { contactInfoSchema } from "@/schemas/contactInfoSchema";
import { revalidatePath } from "@/utils/server";
import { createGenericController } from "../HOFs/controllersHOF";

const contactInfoControllers = createGenericController({
  Model: ContactInfo,
  schema: contactInfoSchema,
  revalidate: async () => {
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/contact");
  },
});

export default contactInfoControllers;
