import { IArtist } from "@/types/artist";
import { IUserCredentials } from "@/types/auth";
import { ICompany } from "@/types/company";
import { ISendMessage } from "@/types/contact";
import { IContactInfo } from "@/types/contactInfo";
import { IFaq } from "@/types/faqs";
import { IFeatures } from "@/types/features";
import { IFigures } from "@/types/figures";
import { IHero } from "@/types/hero";
import { IService } from "@/types/service";
import { ITeamMember } from "@/types/teamMember";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import { IWork } from "@/types/work";
import Router from "next/router";
import { get, post, remove } from "./fetchServices";
import { IReview } from "@/types/review";
import createEntityService from "@/HOFs/servicesHOF";

const BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_PATH;
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_PATH;

//  Heroes --------------------------------------------------!
export const getHeroes = async () => {
  return await get(`${BASE_URL}/api/heroes`);
};

export const getHero = async (pageId: string) => {
  return await get(`${BASE_URL}/api/heroes/${pageId}`);
};

export const addUpdateHero = async (data: IHero) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/heroes`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Figures --------------------------------------------------!

export const getFigures = async () => {
  return await get(`${BASE_URL}/api/figures`);
};

export const getFigure = async (id: string) => {
  return await get(`${BASE_URL}/api/figures/${id}`);
};

export const addUpdateFigure = async (data: IFigures) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/figures`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Features --------------------------------------------------!

export const getFeatures = async () => {
  return await get(`${BASE_URL}/api/features`);
};

export const getFeature = async (id: string) => {
  return await get(`${BASE_URL}/api/features/${id}`);
};

export const addUpdateFeature = async (data: IFeatures) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/features`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Services --------------------------------------------------!

export const getServicesList = async () => {
  return await get(`${BASE_URL}/api/services/list`);
};

export const getServicesPaginated = async (
  currentPage: number,
  limit: number
) => {
  return await get(
    `${BASE_URL}/api/services?page=${currentPage}&limit=${limit}`
  );
};

export const getService = async (id: string) => {
  return await get(`${BASE_URL}/api/services/${id}`);
};

export const addService = async (data: IService) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/services/`, data, token);
};

export const updateService = async (data: IService) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/services/${data._id}`, data, token);
};

export const deleteService = async (id: string) => {
  const token = localStorage.getItem("token");
  return await remove(`${BASE_URL}/api/services/${id}`, {}, token);
};

//  FAQs --------------------------------------------------!

const faqService = createEntityService<IFaq>("faqs");

export async function getFaqsPaginated(currentPage: number, limit: number) {
  return await faqService.getPaginated(`?page=${currentPage}&limit=${limit}`);
}

export const getFaq = async (id: string) => {
  return await faqService.get(`/${id}`);
};

export async function addFaq(data: IFaq) {
  return await faqService.post(data);
}

export async function updateFaq(data: IFaq) {
  if (!data._id) return;
  return await faqService.update(data._id, data);
}

export async function deleteFaq(data: IFaq) {
  if (!data._id) return;
  return await faqService.remove(data._id, data);
}

//  Contact Info --------------------------------------------------!

export const getContactInfos = async () => {
  return await get(`${BASE_URL}/api/contactInfos`);
};

export const getContactInfo = async (id: string) => {
  return await get(`${BASE_URL}/api/contactInfos/${id}`);
};

export const addUpdateContactInfo = async (data: IContactInfo) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/contactInfos`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Team Members --------------------------------------------------!

const teamMemberService = createEntityService<ITeamMember>("teamMembers");

export const getTeamMembersPaginated = async (
  currentPage: number,
  limit: number
) => {
  return await teamMemberService.getPaginated(
    `?page=${currentPage}&limit=${limit}`
  );
};

export const getTeamMember = async (id: string) => {
  return await teamMemberService.get(`/${id}`);
};

export const addTeamMember = async (data: ITeamMember) => {
  return await teamMemberService.post(data);
};

export const updateTeamMember = async (data: ITeamMember) => {
  if (!data._id) return;
  return await teamMemberService.update(data._id, data);
};

export const deleteTeamMember = async (data: ITeamMember) => {
  if (!data._id) return;
  return await teamMemberService.remove(data._id, data);
};

//  Works --------------------------------------------------!

export const getWorksPaginated = async (currentPage: number, limit: number) => {
  return await get(`${BASE_URL}/api/works?page=${currentPage}&limit=${limit}`);
};

export const getWorksForGalleryPaginated = async (
  currentPage: number,
  limit: number
) => {
  return await get(
    `${BASE_URL}/api/works/gallery?page=${currentPage}&limit=${limit}`
  );
};

export const getWork = async (id: string) => {
  if (!id || id === "add") return;
  return await get(`${BASE_URL}/api/works/${id}`);
};

export const addWork = async (data: IWork) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/works`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const updateWork = async (data: IWork) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/works/${data._id}`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const deleteWork = async (data: IWork) => {
  const token = localStorage.getItem("token");
  try {
    return await remove(`${BASE_URL}/api/works/${data._id}`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Auth --------------------------------------------------!

export const signup = async (data: IUserCredentials) => {
  try {
    return await post(`${BASE_URL}/api/signup`, data);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const signin = async (data: IUserCredentials) => {
  try {
    return await post(`${BASE_URL}/api/signin`, data);
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const signout = async () => {
  localStorage.removeItem("token");
  try {
    await get(`${BASE_URL}/api/signout`);
    Router.push("/login");
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Contact --------------------------------------------------!

export async function sendContactForm(data: ISendMessage) {
  return await post(`${BASE_URL}/api/contact`, data);
}

//  Reviews --------------------------------------------------!

const reviewService = createEntityService<IReview>("reviews");

export async function getActiveReviewsPaginated(
  currentPage: number,
  limit: number
) {
  return await reviewService.get(`/active?page=${currentPage}&limit=${limit}`);
}

export async function getReviewsPaginated(currentPage: number, limit: number) {
  return await reviewService.get(`?page=${currentPage}&limit=${limit}`);
}

export async function addReview(data: IReview) {
  return await reviewService.post(data, true);
}

export async function updateReview(data: IReview) {
  if (!data._id) return;
  return await reviewService.update(data._id, data);
}

export async function deleteReview(data: IReview) {
  if (!data._id) return;
  return await reviewService.remove(data._id, data);
}

//  Companies --------------------------------------------------!

export const getCompaniesPaginated = async (
  currentPage: number,
  limit: number
) => {
  return await get(
    `${BASE_URL}/api/companies?page=${currentPage}&limit=${limit}`
  );
};

export const getCompany = async (id: string) => {
  return await get(`${BASE_URL}/api/companies/${id}`);
};

export const addCompany = async (data: ICompany) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/companies`, data, token);
};

export const updateCompany = async (data: ICompany) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/companies/${data._id}`, data, token);
};

export const deleteCompany = async (data: ICompany) => {
  const token = localStorage.getItem("token");
  return await remove(`${BASE_URL}/api/companies/${data._id}`, data, token);
};

//  Artists --------------------------------------------------!

export const getArtistsPaginated = async (
  currentPage: number,
  limit: number
) => {
  return await get(
    `${BASE_URL}/api/artists?page=${currentPage}&limit=${limit}`
  );
};

export const getArtist = async (id: string) => {
  return await get(`${BASE_URL}/api/artists/${id}`);
};

export const addArtist = async (data: IArtist) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/artists`, data, token);
};

export const updateArtist = async (data: IArtist) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/artists/${data._id}`, data, token);
};

export const deleteArtist = async (data: IArtist) => {
  const token = localStorage.getItem("token");
  return await remove(`${BASE_URL}/api/artists/${data._id}`, data, token);
};

//  Upcoming Events --------------------------------------------------!

export const getUpcomingEventsPaginated = async (
  currentPage: number,
  limit: number
) => {
  return await get(
    `${BASE_URL}/api/upcomingEvents?page=${currentPage}&limit=${limit}`
  );
};

export const getUpcomingEvent = async (id: string) => {
  return await get(`${BASE_URL}/api/upcomingEvents/${id}`);
};

export const addUpcomingEvent = async (data: IUpcomingEvent) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/upcomingEvents`, data, token);
};

export const updateUpcomingEvent = async (data: IUpcomingEvent) => {
  const token = localStorage.getItem("token");
  return await post(`${BASE_URL}/api/upcomingEvents/${data._id}`, data, token);
};

export const deleteUpcomingEvent = async (data: IUpcomingEvent) => {
  const token = localStorage.getItem("token");
  return await remove(
    `${BASE_URL}/api/upcomingEvents/${data._id}`,
    data,
    token
  );
};
