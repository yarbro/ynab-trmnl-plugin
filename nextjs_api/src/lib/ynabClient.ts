import { API } from "ynab";

let client: API;

export function getYnabClient(token: string): API {
  if (!client) {
    client = new API(token);
  }
  return client;
}
