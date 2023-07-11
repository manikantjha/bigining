export interface ICompany {
  _id?: string;
  imageURL: string;
  name: string;
}

export interface ICompanies {
  _id?: string;
  companies: Array<ICompany>;
}
