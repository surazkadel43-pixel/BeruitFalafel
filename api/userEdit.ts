import { post } from "./communications";

const endpoint = "api/v1/auth/";

export async function changePassword(newPassword: any, confirmPassword: any) {
  const response = await post(`${endpoint}changePassword`, {
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  });

  return response;
}

export async function changeName(firstName: any, lastName: any) {
  const response = await post(`${endpoint}changeName`, {
    firstName: firstName,
    lastName: lastName,
  });

  return response;
}

export async function changePhoneNumber(newPhoneNumber: any) {
  const response = await post(`${endpoint}changephoneNumber`, {
    phoneNumber: newPhoneNumber,
  });

  return response;
}