import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/meat/";
export async function createMeat(
  name: string,
  price: number,
  description: string,
  foodPreferences: string[], // Array of dietary preferences
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

export async function getAllMeats() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function getAllMeatsByType(type: number = 3) {
  const response = await get(`${endpoint}allByTypes?itemType=${type}`);
  return response;
}

export async function editMeat(itemId: number, name: string, price: number, description: string, foodPreferences: string[], itemType: number = 3,) {
  
  return await patch(`${endpoint}update/${itemId}`, {
    name,
    price,
    description,
    foodPreferences,
    itemType: itemType.toString(),
  });
}


export async function deleteMeat(itemId: string) {
  return await del(`${endpoint}delete/${itemId}`);
}
export async function getMeat(page: number = 0, initialId: number = 0) {
  const response = await get(page === 0 && initialId === 0 ? `${endpoint}feed/meat` : `${endpoint}feed/meat?page=${page}&initId=${initialId}`);
  return response;
}

export async function searchMeat(name: string) {
  const response = await get(`${endpoint}meat?name=${name}`);

  return response;
}