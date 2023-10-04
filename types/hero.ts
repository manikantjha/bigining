import { IImage } from "./image";

export interface IHero {
  _id?: string;
  pageId: "home" | "about" | "service";
  title: string;
  description?: string;
  image: IImage;
  hasContactButton?: boolean;
}
