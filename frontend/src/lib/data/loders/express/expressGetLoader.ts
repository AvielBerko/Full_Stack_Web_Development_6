import Indexable from "../interfaces/Indexable";
import { COOKIE_NAME, registerGetters } from "../mainLoader/getLoader";
import { SERVER_URL } from "./env";

async function getList<T extends Indexable>(path: string): Promise<T[]> {
  return fetch(`${SERVER_URL}/${path}`)
    .then((res) => res.json())
    .then((data) => data as unknown as T[]);
}

async function getOne<T extends Indexable>(
  fullPath: string
): Promise<T | null> {
  return fetch(`${SERVER_URL}/${fullPath}`)
    .then((res) => res.json())
    .then((data) => (data as unknown as T) ?? null);
}

async function find(path: string, query: any): Promise<any[]> {
  const queryStr = Object.keys(query).map((key) => `${key}=${query[key]}`);

  return fetch(`${SERVER_URL}/${path}?${queryStr.join("&")}`)
    .then((res) => res.json())
    .then((data) => {
      try {
      let cookie = data[0][COOKIE_NAME];
      if (cookie) {
        // make the cookie to expire in 1 day
        const date = new Date();
        date.setDate(date.getDate() + 1);
        cookie += `; expires=${date.toUTCString()}`;
        document.cookie = `${COOKIE_NAME}=${cookie};`;
        delete data[0].COOKIE_NAME;
      }
    } catch (e) { // No cookie in the response
      console.log(e);
    }
      return data as any[];
    });
}

async function page(path: string, page: number, limit: number): Promise<any[]> {
  return fetch(`${SERVER_URL}/${path}?_page=${page}&_limit=${limit}`)
    .then((res) => res.json())
    .then((data) => data as any[]);
}

export default function initExpressGetLoader() {
  registerGetters({
    getList,
    getOne,
    find,
    page,
    priority: 1,
  });
}
