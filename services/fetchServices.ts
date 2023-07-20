import { signout } from "./apiServices";

function getHeaders(token?: string | null) {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  requestHeaders.set("Accept", "application/json");
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }
  return requestHeaders;
}

export async function get(url: string, token?: string | null) {
  const options = {
    method: "GET",
    headers: getHeaders(token),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      return await signout();
    }
  }
  return await response.json();
}

export async function post<T>(url: string, data: T, token?: string | null) {
  const options = {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(data),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      return await signout();
    }
  }
  return await response.json();
}

export async function remove<T>(url: string, token?: string | null) {
  const options = {
    method: "DELETE",
    headers: getHeaders(token),
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    if ([401, 403].includes(response.status)) {
      return await signout();
    }
  }
  return await response.json();
}
