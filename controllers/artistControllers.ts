import Artist from "@/models/artist";
import { artistSchema } from "@/schemas/artistSchema";

import { revalidatePath } from "@/utils/server";
import { createGenericController } from "../HOFs/controllersHOF";

const artistControllers = createGenericController({
  Model: Artist,
  schema: artistSchema,
  imageKey: "image",
  revalidate: async () => {
    const limit = 10;
    const totalItems = await Artist.count();
    const totalPages = Math.ceil(totalItems / limit);

    for (let i = 0; i < totalPages; i++) {
      revalidatePath(`/artists/${i + 1}`);
    }
  },
});

export default artistControllers;
