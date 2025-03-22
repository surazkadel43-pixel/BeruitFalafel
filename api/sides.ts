import { del, get, imagePatch, imagePost, patch, post } from "./communications";

const endpoint = "api/v1/sides/";

export async function createSide(
  name: string,
  price: number,
  discountedPrice: number,
  description: string,
  image: any[] = [],
  sidesTypes: string[] = [], 
  items: string[] = [], 
  sauces: string[] = [], 
  beverages: string[] = [],
  meats: string[] = []
) {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('price', price.toString());
  formData.append('discountedPrice', discountedPrice.toString());
  formData.append('description', description);
  formData.append('sidesTypes', JSON.stringify(sidesTypes));
  formData.append('items', JSON.stringify(items));
  formData.append('sauces', JSON.stringify(sauces));
  formData.append('beverages', JSON.stringify(beverages));
  formData.append('meats', JSON.stringify(meats));

  if (image && image.length > 0) {
    for (const img of image) {
      const imageInfo: any = {
        uri: img.uri,
        type: img.mimeType || 'image/jpeg',
        name: img.fileName || 'image.jpg'
      };
      formData.append('images', imageInfo); // Assuming backend accepts 'images'
    }
  }

  const response = await imagePost(`${endpoint}create`, formData);
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
  image: any[] = [],
  sidesTypes: string[] = [],
  items: string[] = [],
  sauces: string[] = [],
  beverages: string[] = [],
  meats: string[] = []
) {
  const formData = new FormData();

  formData.append('sideId', sideId.toString());
  formData.append('name', name);
  formData.append('price', price.toString());
  formData.append('discountedPrice', discountedPrice.toString());
  formData.append('description', description);
  formData.append('sidesTypes', JSON.stringify(sidesTypes));
  formData.append('items', JSON.stringify(items));
  formData.append('sauces', JSON.stringify(sauces));
  formData.append('beverages', JSON.stringify(beverages));
  formData.append('meats', JSON.stringify(meats));

  if (image && image.length > 0) {
    for (const img of image) {
      const imageInfo: any = {
        uri: img.uri,
        type: img.mimeType || 'image/jpeg',
        name: img.fileName || 'image.jpg'
      };
      formData.append('images', imageInfo);
    }
  }

  const response = await imagePatch(`${endpoint}update/${sideId}`, formData);
  return response;
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
