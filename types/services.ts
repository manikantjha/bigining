export interface IService {
  _id?: string;
  title: string;
  list: string[];
}

export interface IServices {
  _id?: string;
  services: Array<IService>;
}
