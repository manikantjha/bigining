export interface IFAQ {
  _id?: string;
  question: string;
  answer: string;
}

export interface IFAQs {
  _id?: string;
  faqs: Array<IFAQ>;
}
