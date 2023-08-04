import { createHandler } from "@/HOFs/handlersHOF";
import { getWorksForGalleryPaginated } from "@/controllers/workControllers";

const handler = createHandler({
  getFunction: getWorksForGalleryPaginated,
});

export default handler;
