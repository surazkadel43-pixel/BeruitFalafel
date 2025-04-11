import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/items/";
export async function createItem(name: string, price: number, description: string, foodPreferences: string[], itemType: number = 3) {
  const response = await post(`${endpoint}create`, {
    name: name,
    price: price,
    description: description,
    foodPreferences: foodPreferences,
    itemType: itemType.toString(),
  });

  return response;
}

export async function getAllItems() {
  const response = await get(`${endpoint}all`);
  return response;
}
export async function getAllItemsByType(type: number = 3) {
  const response = await get(`${endpoint}allByTypes?itemType=${type}`);
  return response;
}

export async function editItem(itemId: number, name: string, price: number, description: string, foodPreferences: string[], itemType: number = 3) {
  return await patch(`${endpoint}update/${itemId}`, {
    name,
    price,
    description,
    foodPreferences,
    itemType: itemType.toString(),
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
