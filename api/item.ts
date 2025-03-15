import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/items/";
export async function createItem(
  name: string,
  price: number,
  description: string,
  foodPreferences: string[] // Array of dietary preferences
) {
  const response = await post(`${endpoint}create`, {
    name: name,
    price: price,
    description: description,
    foodPreferences: foodPreferences,
  });

  return response;
}

export async function getItems() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function editItem(itemId: number, name: string, price: number, description: string, foodPreferences: string[]) {
  return await patch(`${endpoint}update/${itemId}`, {
    name,
    price,
    description,
    foodPreferences,
  });
}


export async function deleteItem(itemId: number) {
  return await del(`${endpoint}delete/${itemId}`);
}
