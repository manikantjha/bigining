import { Schema, model, models } from "mongoose";

const serviceSchema = new Schema({
  title: { type: String, required: true },
  list: [String],
  createdAt: { type: Date, default: Date.now },
});

const servicesSchema = new Schema({ services: [serviceSchema] });

const Services = models.services || model("services", servicesSchema);

export default Services;
