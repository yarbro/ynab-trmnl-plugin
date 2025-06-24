import { API } from "ynab";

let client: API;

export function getYnabClient(): API {
  if (!client) {
    const token = process.env.YNAB_ACCESS_TOKEN;
    if (!token) throw new Error("YNAB_ACCESS_TOKEN is not set");
    client = new API(token);
  }
  return client;
}
