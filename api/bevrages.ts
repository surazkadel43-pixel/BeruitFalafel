import { del, get, imagePatch, imagePost, patch, post } from "./communications";

const endpoint = "api/v1/bevrages/"; //Bevrages // bevrages
// In your createBevrage function (api/bevrages.js)
export async function createBevrage(name: string, price: number, description: string, drinkTypes: string[], images: any[] = []) {
  const formData = new FormData();
  
  formData.append('name', name);
  formData.append('price', price.toString());
  formData.append('description', description);
  formData.append('drinkTypes', JSON.stringify(drinkTypes));
  formData.append('genericName', "Bevrages");
  
  // Append each image to the FormData
  if (images && images.length > 0) {
    for (const image of images) {
      const imageInfo: any = {
        uri: image.uri,
        type: image.mimeType || 'image/jpeg',
        name: image.fileName || 'image.jpg'
      };
      formData.append('images', imageInfo);
    }
  }
  
  
  const response = await imagePost(`${endpoint}create`, formData);

  return response;
}

export async function getAllBevrages() {
  const response = await get(`${endpoint}all`);
  return response;
}

export async function editBevrage(itemId: number, name: string, price: number, description: string, drinkTypes: string[], images: any[] = []) {
  const formData = new FormData();
  
  formData.append('itemId', itemId.toString());
  formData.append('name', name);
  formData.append('price', price.toString());
  formData.append('description', description);
  formData.append('drinkTypes', JSON.stringify(drinkTypes));
  formData.append('genericName', "Bevrages");
  
  // Append each image to the FormData
  if (images && images.length > 0) {
    for (const image of images) {
      const imageInfo: any = {
        uri: image.uri,
        type: image.mimeType || 'image/jpeg',
        name: image.fileName || 'image.jpg'
      };
      formData.append('images', imageInfo);
    }
  }
  
  
  return await imagePatch(`${endpoint}update/${itemId}`, formData);
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
