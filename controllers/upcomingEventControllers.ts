import { createGenericController } from "@/HOFs/controllersHOF";
import UpcomingEvent from "@/models/upcomingEvent";
import { upcomingEventSchema } from "@/schemas/upcomingEventSchema";
import { revalidatePath } from "@/utils/server";

const upcomingEventControllers = createGenericController({
  Model: UpcomingEvent,
  schema: upcomingEventSchema,
  imageKey: "image",
  revalidate: async () => {
    revalidatePath("/");

    const limit = 10;
    const totalItems = await UpcomingEvent.count();
    const totalPages = Math.ceil(totalItems / limit);

    for (let i = 0; i <= totalPages; i++) {
      revalidatePath(`/upcomingEvents/${i + 1}`);
    }
  },
});

export default upcomingEventControllers;
