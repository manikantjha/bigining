import ContactInfo from "@/models/contactInfo";
import { contactInfoSchema } from "@/schemas/contactInfoSchema";
import { createGenericController } from "../HOFs/controllersHOF";

const contactInfoControllers = createGenericController({
  Model: ContactInfo,
  schema: contactInfoSchema,
});

export default contactInfoControllers;
