import { Schema, model, models } from "mongoose";

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

const Faq = models.faqs || model("faqs", faqSchema);

export default Faq;
