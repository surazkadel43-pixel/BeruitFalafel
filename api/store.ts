import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function store(key: string, value: string) {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}
export async function storeJSON(key: string, data: object) {
  const jsonData = JSON.stringify(data); // Convert the object to a JSON string
  
  if (Platform.OS === "web") {
    localStorage.setItem(key, jsonData); // Store in localStorage for web
  } else {
    await SecureStore.setItemAsync(key, jsonData); // Store in SecureStore for mobile
  }
}

export async function snatch(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
}



export async function dispose(key: string) {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}
