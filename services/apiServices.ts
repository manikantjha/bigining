import { IUserCredentials } from "@/types/auth";
import { ICelebs } from "@/types/celebs";
import { ICompanies } from "@/types/companies";
import { ISendMessage } from "@/types/contact";
import { IContactInfo } from "@/types/contactInfo";
import { IFAQs } from "@/types/faqs";
import { IFeatures } from "@/types/features";
import { IFigures } from "@/types/figures";
import { IHero } from "@/types/hero";
import { IPackages } from "@/types/packages";
import { IServices } from "@/types/services";
import { ITeamMembers } from "@/types/teamMembers";
import { IWorks } from "@/types/works";
import { get, post } from "./fetchServices";
import Router from "next/router";

// const BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_PATH;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_PATH;

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

export const getServices = async () => {
  return await get(`${BASE_URL}/api/services`);
};

export const getService = async (id: string) => {
  return await get(`${BASE_URL}/api/services/${id}`);
};

export const addUpdateService = async (data: IServices) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/services`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Packages --------------------------------------------------!

export const getPackages = async () => {
  return await get(`${BASE_URL}/api/packages`);
};

export const getPackage = async (id: string) => {
  return await get(`${BASE_URL}/api/packages/${id}`);
};

export const addUpdatePackage = async (data: IPackages) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/packages`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  FAQs --------------------------------------------------!

export const getFAQs = async () => {
  return await get(`${BASE_URL}/api/faqs`);
};

export const getFAQ = async (id: string) => {
  return await get(`${BASE_URL}/api/faqs/${id}`);
};

export const addUpdateFAQ = async (data: IFAQs) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/faqs`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

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

export const getTeamMembers = async () => {
  return await get(`${BASE_URL}/api/teamMembers`);
};

export const getTeamMember = async (id: string) => {
  return await get(`${BASE_URL}/api/teamMembers/${id}`);
};

export const addUpdateTeamMember = async (data: ITeamMembers) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/teamMembers`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Works --------------------------------------------------!

export const getWorks = async () => {
  return await get(`${BASE_URL}/api/works`);
};

export const getWork = async (id: string) => {
  return await get(`${BASE_URL}/api/works/${id}`);
};

export const addUpdateWork = async (data: IWorks) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/works`, data, token);
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
  return post(`${BASE_URL}/api/contact`, data).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to send message!");
    }
    return res.json();
  });
}

//  Companies --------------------------------------------------!

export const getCompanies = async () => {
  return await get(`${BASE_URL}/api/companies`);
};

export const getCompany = async (id: string) => {
  return await get(`${BASE_URL}/api/companies/${id}`);
};

export const addUpdateCompany = async (data: ICompanies) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/companies`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Celebs --------------------------------------------------!

export const getCelebs = async () => {
  return await get(`${BASE_URL}/api/celebs`);
};

export const getCeleb = async (id: string) => {
  return await get(`${BASE_URL}/api/celebs/${id}`);
};

export const addUpdateCeleb = async (data: ICelebs) => {
  const token = localStorage.getItem("token");
  try {
    return await post(`${BASE_URL}/api/celebs`, data, token);
  } catch (error) {
    console.log("Error: ", error);
  }
};
