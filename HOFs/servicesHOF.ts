import { get, post, remove } from "@/services/fetchServices";
import { IDeleteApiResult, IPaginatedApiResult } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_PATH;

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
    token: string,
    isPublic?: boolean
  ): Promise<Data> {
    const newToken = isPublic ? null : token;
    return await post(url, data, newToken);
  }

  async function genericUpdate<Data>(
    id: string,
    data: Data,
    token: string,
    isPublic?: boolean
  ): Promise<Data> {
    const newToken = isPublic ? null : token;
    return await post(`${url}/${id}`, data, newToken);
  }

  async function genericDelete<Data>(
    id: string,
    data: Data,
    token: string,
    isPublic?: boolean
  ): Promise<IDeleteApiResult> {
    const newToken = isPublic ? null : token;
    return await remove(`${url}/${id}`, data, newToken);
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
