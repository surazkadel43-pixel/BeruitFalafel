import { del, get, imagePatch, imagePost } from "./communications";

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
  meats: string[] = [],
  genericName: string = ""
) {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("discountedPrice", discountedPrice.toString());
  formData.append("description", description);
  formData.append("productTypes", JSON.stringify(productTypes));
  formData.append("items", JSON.stringify(items));
  formData.append("sauces", JSON.stringify(sauces));
  formData.append("beverages", JSON.stringify(beverages));
  formData.append("meats", JSON.stringify(meats));
  formData.append("genericName", genericName);

  if (image && image.length > 0) {
    for (const img of image) {
      const imageInfo: any = {
        uri: img.uri,
        type: img.mimeType || "image/jpeg",
        name: img.fileName || "image.jpg",
      };
      formData.append("images", imageInfo);
    }
  }

  const response = await imagePost(`${endpoint}create`, formData);
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
  productTypes: string[] = [],
  items: string[] = [],
  sauces: string[] = [],
  beverages: string[] = [],
  meats: string[] = [],
  genericName: string = ""
) {
  const formData = new FormData();

  formData.append("productId", productId.toString()); // ✅ Include productId in body
  formData.append("name", name);
  formData.append("price", price.toString());
  formData.append("discountedPrice", discountedPrice.toString());
  formData.append("description", description);
  formData.append("productTypes", JSON.stringify(productTypes));
  formData.append("items", JSON.stringify(items));
  formData.append("sauces", JSON.stringify(sauces));
  formData.append("beverages", JSON.stringify(beverages));
  formData.append("meats", JSON.stringify(meats));
  formData.append("genericName", genericName);

  if (image && image.length > 0) {
    for (const img of image) {
      const imageInfo: any = {
        uri: img.uri,
        type: img.mimeType || "image/jpeg",
        name: img.fileName || "image.jpg",
      };
      formData.append("images", imageInfo); // 🔄 Assuming 'images' is the backend field
    }
  }

  const response = await imagePatch(`${endpoint}update/${productId}`, formData);
  return response;
}

export async function deleteCateringProduct(productId: string) {
  const response = await del(`${endpoint}delete/${productId}`);
  return response;
}

export async function getCateringProduct(page: number = 0, initialId: number = 0) {
  const response = await get(page === 0 && initialId === 0 ? `${endpoint}feed/product` : `${endpoint}feed/product?page=${page}&initId=${initialId}`);
  return response;
}

export async function searchCateringProduct(name: string) {
  const response = await get(`${endpoint}product?name=${name}`);
  return response;
}
