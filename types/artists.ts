import { IImage } from "./images";

export interface IArtist {
  _id?: string;
  name: string;
  description?: string;
  category: string;
  numberOfEvents?: number | null;
  image: IImage;
}
