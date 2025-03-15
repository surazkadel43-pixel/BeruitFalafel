import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/sauce/";
export async function createSauce(
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

export async function getSauces() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function editSauce(itemId: number, name: string, price: number, description: string, foodPreferences: string[]) {
  console.log(itemId, name, price, description, foodPreferences);
  return await patch(`${endpoint}update/${itemId}`, {
    name,
    price,
    description,
    foodPreferences,
  });
}


export async function deleteSauce(itemId: string) {
  return await del(`${endpoint}delete/${itemId}`);
}
export async function getSauce(page: number = 0, initialId: number = 0) {
  const response = await get(page === 0 && initialId === 0 ? `${endpoint}feed/sauce` : `${endpoint}feed/sauce?page=${page}&initId=${initialId}`);
  return response;
}

export async function searchSauce(name: string) {
  const response = await get(`${endpoint}sauce?name=${name}`);

  return response;
}