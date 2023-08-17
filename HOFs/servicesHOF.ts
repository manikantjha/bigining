import { get, post, remove } from "@/services/fetchServices";
import { IDeleteApiResult, IPaginatedApiResult } from "@/types/api";

// interface IApiData<T> {
//   success: boolean;
//   data: T;
//   message?: string;
// }

const BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_PATH;
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_PATH;

type Entity =
  | "artists"
  | "services"
  | "works"
  | "companies"
  | "faqs"
  | "features"
  | "figures"
  | "teamMembers"
  | "upcomingEvents"
  | "heroes"
  | "contactInfos"
  | "reviews";

function createEntityService<T>(entity: Entity) {
  const url = `${BASE_URL}/api/${entity}`;

  //   async function genericGet<Data>(query: string = ""): Promise<IApiData<Data>> {
  //     return await get(`${url}${query}`);
  //   }

  async function genericGetPaginated<Data>(
    query: string = ""
  ): Promise<IPaginatedApiResult<Data>> {
    return await get(`${url}${query}`);
  }

  async function genericGet<Data>(query: string = ""): Promise<Data> {
    return await get(`${url}${query}`);
  }

  async function genericPost<Data>(
    data: Data,
    isPublic?: boolean
  ): Promise<Data> {
    const token = isPublic ? null : localStorage.getItem("token");
    return await post(url, data, token);
  }

  async function genericUpdate<Data>(
    id: string,
    data: Data,
    isPublic?: boolean
  ): Promise<Data> {
    const token = isPublic ? null : localStorage.getItem("token");
    return await post(`${url}/${id}`, data, token);
  }

  async function genericDelete<Data>(
    id: string,
    data: Data,
    isPublic?: boolean
  ): Promise<IDeleteApiResult> {
    const token = isPublic ? null : localStorage.getItem("token");
    return await remove(`${url}/${id}`, data, token);
  }

  return {
    getPaginated: genericGetPaginated<T>,
    get: genericGet<T>,
    post: genericPost<T>,
    update: genericUpdate<T>,
    remove: genericDelete<T>,
  };
}

export default createEntityService;
