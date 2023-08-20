import { createGenericController } from "@/HOFs/controllersHOF";
import UpcomingEvent from "@/models/upcomingEvent";
import { upcomingEventSchema } from "@/schemas/upcomingEventSchema";

const upcomingEventControllers = createGenericController({
  Model: UpcomingEvent,
  schema: upcomingEventSchema,
  imageKey: "image",
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/"}`
    );

    const limit = 10;
    const totalItems = await UpcomingEvent.count();
    const totalPages = Math.ceil(totalItems / limit);

    for (let i = 0; i < totalPages; i++) {
      await fetch(
        `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
          process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
        }&path=${"/upcomingEvents"}/${i + 1}`
      );
    }
  },
});

export default upcomingEventControllers;
