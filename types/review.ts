export interface IReview {
  _id?: string;
  email: string;
  name: string;
  rating: number;
  message: string;
  isActive?: boolean;
}
