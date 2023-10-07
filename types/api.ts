export interface IPaginatedApiResult<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
}

interface IApiData<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface IResult<T> {
  items: T;
}

export interface IDeleteApiResult {
  message: string;
}
