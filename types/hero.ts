export interface IHero {
  _id?: string;
  pageId: string;
  title: string;
  description?: string;
  imageURL: string;
  hasContactButton?: boolean;
  isVideo?: boolean;
}
