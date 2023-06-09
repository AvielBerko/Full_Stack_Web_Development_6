import { registerSavers } from "../mainLoader/saveLoader";
import Indexable from "../interfaces/Indexable";
import { SERVER_URL } from "./env";

async function save<T extends Indexable>(path: string, query: any, item: T) {
  const queryStr = Object.keys(query).map((key) => `${key}=${query[key]}`);
    await fetch(`${SERVER_URL}/${path}?${queryStr.join("&")}`, {
        method: "PUT",
        body: JSON.stringify(item),
        headers: {
        "Content-type": "application/json; charset=UTF-8",
        },
    });
}

async function push<T extends Indexable>(
  path: string,
  item: T
): Promise<string> {
  const response = await fetch(`${SERVER_URL}/${path}`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const pushedItem = await response.json();
  if (pushedItem.length !== 0 ) {
    return pushedItem[0].id.toString();
  }
  return pushedItem.id.toString();
}

async function remove(path: string, query: any): Promise<void> {
    const queryStr = Object.keys(query).map((key) => `${key}=${query[key]}`);
    await fetch(`${SERVER_URL}/${path}?${queryStr.join("&")}`, {
        method: "DELETE",
    });
}

export default function initExpressSaveLoader() {
    registerSavers({
        save,
        push,
        remove,
        priority: 1,
    });
}