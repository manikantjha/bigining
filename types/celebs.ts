export interface ICeleb {
  _id?: string;
  imageURL: string;
  name: string;
  description: string;
}

export interface ICelebs {
  _id?: string;
  celebs: Array<ICeleb>;
}
