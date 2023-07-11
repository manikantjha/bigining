export interface IWork {
  _id?: string;
  imageURL: string;
  name: string;
  description: string;
}

export interface IWorks {
  _id?: string;
  works: Array<IWork>;
}
