import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/bevrages/"; //Bevrages // bevrages
export async function createBevrage(name: string, price: number, description: string, drinkTypes: string[], images: any[] = []) {
  const response = await post(`${endpoint}create`, {
    name: name,
    price: price,
    description: description,
    drinkTypes: drinkTypes,
    images: images.length > 0 ? images : undefined,
  });

  return response;
}

export async function getAllBevrages() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function editBevrage(itemId: number, name: string, price: number, description: string, drinkTypes: string[], images: any[] = []) {
  return await patch(`${endpoint}update/${itemId}`, {
    name,
    price,
    description,
    drinkTypes,
    images: images.length > 0 ? images : undefined,
  });
}

export async function deleteBevrage(itemId: string) {
  return await del(`${endpoint}delete/${itemId}`);
}
export async function getBevrage(page: number = 0, initialId: number = 0) {
  const response = await get(page === 0 && initialId === 0 ? `${endpoint}feed/bevrage` : `${endpoint}feed/bevrage?page=${page}&initId=${initialId}`);
  return response;
}

export async function searchBevrage(name: string) {
  const response = await get(`${endpoint}bevrage?name=${name}`);

  return response;
}
