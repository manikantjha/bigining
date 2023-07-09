import { Schema, model, models } from "mongoose";

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const faqsSchema = new Schema({ faqs: [faqSchema] });

const FAQs = models.faqs || model("faqs", faqsSchema);

export default FAQs;
