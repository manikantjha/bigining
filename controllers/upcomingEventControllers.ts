import { createGenericController } from "@/HOFs/controllersHOF";
import UpcomingEvent from "@/models/upcomingEvent";
import { upcomingEventSchema } from "@/schemas/upcomingEventSchema";

const upcomingEventControllers = createGenericController({
  Model: UpcomingEvent,
  schema: upcomingEventSchema,
  imageKey: "image",
});

export default upcomingEventControllers;
