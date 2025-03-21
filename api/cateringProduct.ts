import { del, get, patch, post } from "./communications";

const endpoint = "api/v1/caterings/";

export async function createCateringProduct(
  name: string,
  price: number,
  discountedPrice: number,
  description: string,
  image: any[] = [],
  productTypes: string[] = [], 
  items: string[] = [], 
  sauces: string[] = [], 
  beverages: string[] = [],
  meats: string[] = []
) {
  const response = await post(`${endpoint}create`, {
    name,
    price,
    discountedPrice,
    description,
    image,
    productTypes,
    items,
    sauces,
    beverages,
    meats
  });

  return response;
}

export async function getAllCateringProducts() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function editCateringProduct(
  productId: number,
  name: string,
  price: number,
  discountedPrice: number,
  description: string,
  image: any[] = [],
  productTypes: string[] = [], // ✅ Defaults to an empty array
  items: string[] = [], // ✅ Defaults to an empty array
  sauces: string[] = [], // ✅ Defaults to an empty array
  beverages: string[] = [], // ✅ Defaults to an empty array
  meats: string[] = []
) {
  return await patch(`${endpoint}update/${productId}`, {
    name,
    price,
    discountedPrice,
    description,
    image,
    productTypes,
    items,
    sauces,
    beverages,
    meats
  });
}

export async function deleteCateringProduct(productId: string) {
  const response = await del(`${endpoint}delete/${productId}`);
  return response;
}

export async function getCateringProduct(page: number = 0, initialId: number = 0) {
  const response = await get(
    page === 0 && initialId === 0 ? `${endpoint}feed/product` : `${endpoint}feed/product?page=${page}&initId=${initialId}`
  );
  return response;
}

export async function searchCateringProduct(name: string) {
  const response = await get(`${endpoint}product?name=${name}`);
  return response;
}
