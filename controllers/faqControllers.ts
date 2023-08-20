import { createGenericController } from "@/HOFs/controllersHOF";
import Faq from "@/models/faq";
import { faqSchema } from "@/schemas/faqSchema";

const faqControllers = createGenericController({
  Model: Faq,
  schema: faqSchema,
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/faqs"}`
    );
  },
});

export default faqControllers;
