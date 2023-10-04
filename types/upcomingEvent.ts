import { IImage } from "./image";

export interface IUpcomingEvent {
  _id?: string;
  image: IImage;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
}
