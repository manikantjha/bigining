// const BASE_URL = process.env.NEXT_PUBLIC_DEV_BASE_PATH || "";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_PATH || "";

//  Heroes --------------------------------------------------!

export const getHeroes = async () => {
  const response = await fetch(`${BASE_URL}/api/heroes`);
  const json = await response.json();
  return json;
};

export const getHero = async (pageId: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId }),
  };
  const response = await fetch(`${BASE_URL}/api/heroes/${pageId}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateHero = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/heroes`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Figures --------------------------------------------------!

export const getFigures = async () => {
  const response = await fetch(`${BASE_URL}/api/figures`);
  const json = await response.json();
  return json;
};

export const getFigure = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/figures/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateFigure = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/figures`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Features --------------------------------------------------!

export const getFeatures = async () => {
  const response = await fetch(`${BASE_URL}/api/features`);
  const json = await response.json();
  return json;
};

export const getFeature = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/features/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateFeature = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/features`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Services --------------------------------------------------!

export const getServices = async () => {
  const response = await fetch(`${BASE_URL}/api/services`);
  const json = await response.json();
  return json;
};

export const getService = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/services/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateService = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/services`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Packages --------------------------------------------------!

export const getPackages = async () => {
  const response = await fetch(`${BASE_URL}/api/packages`);
  const json = await response.json();
  return json;
};

export const getPackage = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/packages/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdatePackage = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/packages`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  FAQs --------------------------------------------------!

export const getFAQs = async () => {
  const response = await fetch(`${BASE_URL}/api/faqs`);
  const json = await response.json();
  return json;
};

export const getFAQ = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/faqs/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateFAQ = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/faqs`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Contact Info --------------------------------------------------!

export const getContactInfos = async () => {
  const response = await fetch(`${BASE_URL}/api/contactInfos`);
  const json = await response.json();
  return json;
};

export const getContactInfo = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/contactInfos/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateContactInfo = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/contactInfos`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Team Members --------------------------------------------------!

export const getTeamMembers = async () => {
  const response = await fetch(`${BASE_URL}/api/teamMembers`);
  const json = await response.json();
  return json;
};

export const getTeamMember = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/teamMembers/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateTeamMember = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/teamMembers`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Works --------------------------------------------------!

export const getWorks = async () => {
  const response = await fetch(`${BASE_URL}/api/works`);
  const json = await response.json();
  return json;
};

export const getWork = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/works/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateWork = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/works`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Auth --------------------------------------------------!

export const signup = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/signup`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const login = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/login`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const signout = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/signout`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Contact --------------------------------------------------!

export const contact = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/contact`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Companies --------------------------------------------------!

export const getCompanies = async () => {
  const response = await fetch(`${BASE_URL}/api/companies`);
  const json = await response.json();
  return json;
};

export const getCompany = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/companies/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateCompany = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/companies`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};

//  Celebs --------------------------------------------------!

export const getCelebs = async () => {
  const response = await fetch(`${BASE_URL}/api/celebs`);
  const json = await response.json();
  return json;
};

export const getCeleb = async (id: string) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId: id }),
  };
  const response = await fetch(`${BASE_URL}/api/celebs/${id}`, options);
  const json = await response.json();
  return json;
};

export const addUpdateCeleb = async (data: any) => {
  try {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`${BASE_URL}/api/celebs`, options);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error: ", error);
  }
};
