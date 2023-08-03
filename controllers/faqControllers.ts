import { createGenericController } from "@/HOFs/controllersHOF";
import Faq from "@/models/faq";
import { faqSchema } from "@/schemas/faqSchema";

const faqControllers = createGenericController({
  Model: Faq,
  schema: faqSchema,
});

export default faqControllers;
