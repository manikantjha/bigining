import Artist from "@/models/artist";
import { artistSchema } from "@/schemas/artistSchema";
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
      await fetch(
        `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
          process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
        }&path=${"/artists"}/${i + 1}`
      );
    }
  },
});

export default artistControllers;
