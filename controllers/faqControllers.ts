import { createGenericController } from "@/HOFs/controllersHOF";
import Faq from "@/models/faq";
import { faqSchema } from "@/schemas/faqSchema";
import { revalidatePath } from "@/utils/server";

const faqControllers = createGenericController({
  Model: Faq,
  schema: faqSchema,
  revalidate: async () => {
    revalidatePath("/faqs");
  },
});

export default faqControllers;
