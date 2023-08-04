import Artist from "@/models/artist";
import { artistSchema } from "@/schemas/artistSchema";
import { createGenericController } from "../HOFs/controllersHOF";

const artistControllers = createGenericController({
  Model: Artist,
  schema: artistSchema,
  imageKey: "image",
});

export default artistControllers;
