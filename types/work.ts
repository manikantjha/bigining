import { IImage } from "./image";

export interface IWork {
  _id?: string;
  name: string;
  description: string;
  images: IImage[];
}
