import { IImage } from "./image";

export interface IUpcomingEvent {
  _id?: string;
  image: IImage;
  name: string;
  description?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  location?: string;
}
