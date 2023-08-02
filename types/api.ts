export interface IPaginatedApiResult<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
}

export interface IResult<T> {
  items: T;
}

export interface IDeleteApiResult {
  message: string;
}
