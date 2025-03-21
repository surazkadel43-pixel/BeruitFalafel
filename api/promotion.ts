import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/promotion/";
export async function createPromotion(
  name: string = "",	
  code: string = "",
  description: string =  "",
  expiry: Date = new Date(Date.now() + 24 * 60 * 60 * 1000), 
  image: any[] = [] 
) {
  const response = await post(`${endpoint}create`, {
    name: name,
    code: code,
    description: description,
    expiry: expiry,
  });

  return response;
}

export async function getAllPromotion() {
  const response = await get(`${endpoint}all`);
  return response;
}


export async function removePromotion(itemId: string) {
  const response = await del(`${endpoint}delete/${itemId}`);
  return response;
}

export async function getPromotion(page: number = 0, initialId: number = 0) {
  const response = await get(page === 0 && initialId === 0 ? `${endpoint}feed/promotion` : `${endpoint}feed/promotion?page=${page}&initId=${initialId}`);
  return response;
}

export async function searchPromotion(name: string) {
  const response = await get(`${endpoint}promotion?code=${name}`);

  return response;
}