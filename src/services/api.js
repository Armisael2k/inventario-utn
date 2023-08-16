import axios from "axios";

export function setupApiClient() {
  const api = axios.create({
    baseURL: "http://51.222.138.244:3000/",
  });

  return api;
}