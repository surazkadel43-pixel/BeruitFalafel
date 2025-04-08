import axios, { AxiosResponse } from "axios";
import { snatch } from "./store";



//192.168.1.124 this is my computer ipv4 address 
// const apiUrl = "http://127.0.0.1:8080/"; for expom app this refers to own computer i have to use this
const apiUrl = "http://192.168.1.107:8080/";
//const apiUrl = "http://192.168.162.4:8080/";



async function getOptions() {
  return {
    headers: {
      Authorization: await snatch("authCookie"),
    },
  };
}
async function getImageOptions() {
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: await snatch("authCookie"),
    },
  };
}

export async function post(endpoint: string, data: any): Promise<AxiosResponse> {
  
  try {
    const response = await axios.post(`${apiUrl}${endpoint}`, data, await getOptions());
    
    return response;
  } catch (error) {
    
    return errorHandler(error);
  }
}
export async function imagePost(endpoint: string, data: any): Promise<AxiosResponse> {
  
  try {
    const response = await axios.post(`${apiUrl}${endpoint}`, data, await getImageOptions());
    
    return response;
  } catch (error) {
    
    return errorHandler(error);
  }
}

export async function imagePatch(endpoint: string, data: any): Promise<AxiosResponse> {
  
  try {
    const response = await axios.patch(`${apiUrl}${endpoint}`, data, await getImageOptions());
    
    return response;
  } catch (error) {
    
    return errorHandler(error);
  }
}


export async function get(endpoint: string) {
  try {
    const response = await axios.get(`${apiUrl}${endpoint}`, await getOptions());
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function patch(endpoint: string, data: any) {
  try {
    const response = await axios.patch(`${apiUrl}${endpoint}`, data, await getOptions());
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function del(endpoint: string) {
  try {
    const response = await axios.delete(`${apiUrl}${endpoint}`, await getOptions());
    return response;
  } catch (error) {
    return errorHandler(error);
  }
}

function errorHandler(error: any): AxiosResponse {
 
  if (axios.isAxiosError(error) && error.response) {
    
    return error.response;
  }

  return { status: 600 , data: { message: "The server couldn't be reached. Please try again later.", success: false}, headers: {}, statusText: "The server couldn't be reached. Please try again later.", config: {} as any };
}
