import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/sides/";

export async function createSide(
  name: string,
  price: number,
  discountedPrice: number,
  description: string,
  image: File | null,
  sidesTypes: string[] = [], 
  items: string[] = [], 
  sauces: string[] = [], 
  beverages: string[] = []
) {
  const response = await post(`${endpoint}create`, {
    name,
    price,
    discountedPrice,
    description,
    image,
    sidesTypes,
    items,
    sauces,
    beverages,
  });

  return response;
}

export async function getAllSides() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function editSide(
  sideId: number,
  name: string,
  price: number,
  discountedPrice: number,
  description: string,
  image: File | null,
  sidesTypes: string[] = [], // ✅ Defaults to an empty array
  items: string[] = [], // ✅ Defaults to an empty array
  sauces: string[] = [], // ✅ Defaults to an empty array
  beverages: string[] = [] // ✅ Defaults to an empty array
) {
  return await patch(`${endpoint}update/${sideId}`, {
    name,
    price,
    discountedPrice,
    description,
    image,
    sidesTypes,
    items,
    sauces,
    beverages,
  });
}

export async function deleteSide(sideId: string) {
  const response = await del(`${endpoint}delete/${sideId}`);
  return response;
}

export async function getSide(page: number = 0, initialId: number = 0) {
  const response = await get(
    page === 0 && initialId === 0 ? `${endpoint}feed/side` : `${endpoint}feed/side?page=${page}&initId=${initialId}`
  );
  return response;
}

export async function searchSide(name: string) {
  const response = await get(`${endpoint}side?name=${name}`);
  return response;
}
