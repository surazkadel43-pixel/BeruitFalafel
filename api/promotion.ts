import { del, get, imagePost, patch, post } from "./communications";

const endpoint = "api/v1/promotion/";
export async function createPromotion(
  name: string = "",
  code: string = "",
  description: string = "",
  expiry: Date = new Date(Date.now() + 24 * 60 * 60 * 1000),
  image: any[] = [],
  discount: number = 0,
  itemType: number = 3 
) {
  const formData = new FormData();

  formData.append('name', name);
  formData.append('code', code);
  formData.append('description', description);
  formData.append('expiry', expiry.toISOString()); // Use ISO string for date format
  formData.append('discount', discount.toString());
  formData.append('itemType', itemType.toString()); // Assuming itemType is a number

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


export async function getAllPromotion() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function getAllPromotionByTypes( itemType: number = 3) {
  const response = await get(`${endpoint}allByTypes?itemType=${itemType}`);
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