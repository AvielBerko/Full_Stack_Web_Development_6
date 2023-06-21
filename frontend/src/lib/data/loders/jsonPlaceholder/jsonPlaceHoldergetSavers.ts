import { registerSavers } from "../mainLoader/saveLoader";
import Indexable from "../interfaces/Indexable";
import { JSON_PLACEHOLDER_URL } from "./env";

async function save<T extends Indexable>(path: string, query: any, item: T) {
  const queryStr = Object.keys(query).map((key) => `${key}=${query[key]}`);
    await fetch(`${JSON_PLACEHOLDER_URL}/${path}?${queryStr.join("&")}`, {
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
  const response = await fetch(`${JSON_PLACEHOLDER_URL}/${path}`, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const pushedItem = await response.json();
  return pushedItem.id.toString();
}

async function remove(path: string, query: any): Promise<void> {
  const queryStr = Object.keys(query).map((key) => `${key}=${query[key]}`);
    await fetch(`${JSON_PLACEHOLDER_URL}/${path}?${queryStr.join("&")}`, {
        method: "DELETE",
    });
}

export default function initJPHSaveLoader() {
    registerSavers({
        save,
        push,
        remove,
        priority: 1,
    });
}