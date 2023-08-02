import { IImage } from "./image";

export interface ITeamMember {
  _id?: string;
  name: string;
  description: string;
  image: IImage;
}
