import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/sauce/";
export async function createSauce(
  name: string,
  price: number,
  description: string,
  foodPreferences: string[],
  itemType: number = 3,
) {
  const response = await post(`${endpoint}create`, {
    name: name,
    price: price,
    description: description,
    foodPreferences: foodPreferences,
    itemType: itemType.toString(), 
  });

  return response;
}

export async function getAllSauces( ) {
  const response = await get(`${endpoint}all`);
  return response;
}



export async function getAllSaucesByType(type: number = 3) {
  const response = await get(`${endpoint}allByTypes?itemType=${type}`);
  return response;
}

export async function editSauce(itemId: number, name: string, price: number, description: string, foodPreferences: string[], itemType: number = 3) {
  return await patch(`${endpoint}update/${itemId}`, {
    name,
    price,
    description,
    foodPreferences,
    itemType: itemType.toString(),
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
