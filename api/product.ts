import { del, get, imagePatch, imagePost, patch, post } from "./communications";

const endpoint = "api/v1/products/";

export async function createProduct(
  name: string,
  price: number,
  discountedPrice: number,
  description: string,
  image: any[] = [],
  productTypes: string[] = [], 
  items: string[] = [], 
  sauces: string[] = [], 
  beverages: string[] = [],
  meats: string[] = [],
  genericName: string = '',
  sides: string[] = [],
  quantity: number = 0,
  itemType: number = 3
) {
  
  const formData = new FormData();

  formData.append('name', name);
  formData.append('price', price.toString());
  formData.append('discountedPrice', discountedPrice.toString());
  formData.append('description', description);
  formData.append('productTypes', JSON.stringify(productTypes));
  formData.append('items', JSON.stringify(items));
  formData.append('sauces', JSON.stringify(sauces));
  formData.append('beverages', JSON.stringify(beverages));
  formData.append('meats', JSON.stringify(meats));
  formData.append('genericName', genericName);
  formData.append('sides', JSON.stringify(sides));
  formData.append('quantity', quantity.toString());
  formData.append('itemType', itemType.toString()); 

  if (image && image.length > 0) {
    for (const img of image) {
      const imageInfo: any = {
        uri: img.uri,
        type: img.mimeType || 'image/jpeg',
        name: img.fileName || 'image.jpg'
      };
      formData.append('images', imageInfo); // assumes backend expects 'images' as the key
    }
  }

  const response = await imagePost(`${endpoint}create`, formData);
  return response;
}



export async function editProduct(
  productId: number,
  name: string,
  price: number,
  discountedPrice: number,
  description: string,
  image: any[] = [],
  productTypes: string[] = [],
  items: string[] = [],
  sauces: string[] = [],
  beverages: string[] = [],
  meats: string[] = [],
  genericName: string = '',
  sides: string[] = [],
  quantity: number = 0,
  itemType: number = 3
) {
  const formData = new FormData();

  formData.append('productId', productId.toString()); // ✅ Include ID in form data
  formData.append('name', name);
  formData.append('price', price.toString());
  formData.append('discountedPrice', discountedPrice.toString());
  formData.append('description', description);
  formData.append('productTypes', JSON.stringify(productTypes));
  formData.append('items', JSON.stringify(items));
  formData.append('sauces', JSON.stringify(sauces));
  formData.append('beverages', JSON.stringify(beverages));
  formData.append('meats', JSON.stringify(meats));
  formData.append('genericName', genericName);
  formData.append('sides', JSON.stringify(sides));
  formData.append('quantity', quantity.toString());
  formData.append('itemType', itemType.toString()); // Assuming itemType is a number

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

  const response = await imagePatch(`${endpoint}update/${productId}`, formData);
  return response;
}

export async function getAllProducts(ItemType: number = 3) {
  const response = await get(`${endpoint}all?itemType=${ItemType}`);
  return response;
}
export async function deleteProduct(productId: string) {
  const response = await del(`${endpoint}delete/${productId}`);
  return response;
}

export async function getProduct(page: number = 0, initialId: number = 0) {
  const response = await get(
    page === 0 && initialId === 0 ? `${endpoint}feed/product` : `${endpoint}feed/product?page=${page}&initId=${initialId}`
  );
  return response;
}

export async function searchProduct(name: string) {
  const response = await get(`${endpoint}product?name=${name}`);
  return response;
}
