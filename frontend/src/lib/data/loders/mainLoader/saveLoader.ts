import Indexable from "../interfaces/Indexable";

type SaverType = {
  save: <T extends Indexable>(path: string, query: any, item: T) => Promise<void>;
  push: <T extends Indexable>(path: string, item: T) => Promise<string>;
  remove: (path: string, query: any) => Promise<void>;
  priority: number;
};

const saverFunctions: SaverType[] = [];

export function registerSavers(savers: SaverType) {
  saverFunctions.push(savers);
}

export async function save<T extends Indexable>(
  path: string,
  query: any,
  item: T
): Promise<void> {
  for (const func of saverFunctions) {
    await func.save(path, query, item );
  }
}

export async function push<T extends Indexable>(path: string, item: T):Promise<string> {
  //get the function with the lowest priority
  const primarySaveFunction = saverFunctions.sort(
    (a, b) => a.priority - b.priority
  )[0];
  //push and save the id so we can return it
  const id = await primarySaveFunction.push(path, item);
  //push to all other functions
  const otherSaveFunctions = saverFunctions.filter(
    (func) => func !== primarySaveFunction
  );
  for (const func of otherSaveFunctions) {
    await func.push(path, item);
  }
  return id;
}

export  async function remove(path: string, query: any):Promise<void> {
  for (const func of saverFunctions) {
    await func.remove(path, query);
  }
}
