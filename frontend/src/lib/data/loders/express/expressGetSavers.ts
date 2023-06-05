import { registerSavers } from "../mainLoader/saveLoder";
import Indexable from "../interfaces/Indexable";
import { SERVER_URL } from "./env";

async function save<T extends Indexable>(path: string, item: T) {
    await fetch(`${SERVER_URL}/${path}`, {
        method: "PATCH",
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
  return pushedItem.id.toString();
}

async function remove(path: string): Promise<void> {
    await fetch(`${SERVER_URL}/${path}`, {
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