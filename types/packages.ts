export interface IPackage {
  _id?: string;
  title: string;
  price: number;
  list: string[];
}

export interface IPackages {
  _id?: string;
  packages: Array<IPackage>;
}
