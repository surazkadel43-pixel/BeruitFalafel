import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/genericItem/";
export async function createItem(
  name: string,
  description: string,
  foodPreferences: string[] // Array of dietary preferences
) {
  const response = await post(`${endpoint}create`, {
    name: name,
    description: description,
    foodPreferences: foodPreferences,
  });

  return response;
}

export async function getAllGenericItems() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function editItem(itemId: number, name: string, description: string, foodPreferences: string[]) {
  return await patch(`${endpoint}update/${itemId}`, {
    name,
    description,
    foodPreferences,
  });
}

export async function deleteItem(itemId: string) {
  const response = await del(`${endpoint}delete/${itemId}`);
  return response;
}

export async function getItem(page: number = 0, initialId: number = 0) {
  const response = await get(page === 0 && initialId === 0 ? `${endpoint}feed/item` : `${endpoint}feed/item?page=${page}&initId=${initialId}`);
  return response;
}

export async function searchItem(name: string) {
  const response = await get(`${endpoint}item?name=${name}`);

  return response;
}
