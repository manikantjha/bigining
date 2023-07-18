export interface IContactInfoForm {
  title: string;
  description?: string;
  email: string;
  phone1: string;
  phone2?: string;
  address: string;
}

export interface IContactInfo extends IContactInfoForm {
  _id?: string;
}
