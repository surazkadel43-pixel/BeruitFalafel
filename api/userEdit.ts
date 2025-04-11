import { post } from "./communications";

const endpoint = "api/v1/auth/";

export async function changePassword(newPassword: any, confirmPassword: any, userId: any) {
  const response = await post(`${endpoint}changePassword`, {
    newPassword: newPassword,
    confirmPassword: confirmPassword,
    userId: userId
  });

  return response;
}

export async function changeName(firstName: any, lastName: any, userId: any) {
  
  const response = await post(`${endpoint}changeName`, {
    firstName: firstName,
    lastName: lastName,
    userId: userId
  });

  return response;
}

export async function changePhoneNumber(newPhoneNumber: any, userId: any) {
  const response = await post(`${endpoint}changephoneNumber`, {
    phoneNumber: newPhoneNumber,
    userId: userId
  });

  return response;
}