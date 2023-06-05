import Indexable from "../interfaces/Indexable";
import { registerGetters } from "../mainLoader/getLoader";
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
    .then((data) => data as any[]);
}

async function page(path: string, page: number,limit:number): Promise<any[]> {
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
