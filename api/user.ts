import { get, post } from "./communications";

const endpoint = "api/v1/auth/";
export async function signUp(email: string, password: string, phoneNumber: string = "", firstName: string = "", lastName: string = "", confirmPassword: string) {
  
  const response = await post(`${endpoint}register`, {
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    firstName: firstName,
    lastName: lastName,
    confirmPassword: confirmPassword
  });

  return response;
}

export async function logIn(email: string, password: string) {
 
  const response = await post(`${endpoint}login`, {
    email: email,
    password: password,
  });

  return response;
}

export async function validateAuthCookie(authCookie: string) {
  const response = await post(`${endpoint}auth/validate`, {
    authCookie: authCookie,
  });

  return response;
}

export async function invalidateAuthCookie(authCookie: string) {
  const response = await post(`${endpoint}user/auth/invalidate`, {
    authCookie: authCookie,
  });

  return response;
}

export async function getCurrentUser() {
  const response = await get(`${endpoint}auth/currentUser`)

  return response;
}

export async function sendVertificationCode(email : any) {
  const response = await post(`${endpoint}sendVerificationCode`, {
    email: email
  })

  return response;
}

export async function verifyVertificationCode(userDetails: any, code: any) {
  const response = await post(`${endpoint}verify-otp`, {
    email: userDetails,
    otp: code
  })

  return response;
}
export async function verifyEmail(email: any) {
  const response = await post(`${endpoint}verifyEmail`, {
    email: email
  })

  return response;
}

export async function verify6DigitCode(email: any, code: any) {
  const response = await post(`verifyResetCode`, {
    email: email,
    code: code
  })

  return response;
}

export async function resetPassword(email: any, newPassword: any, confirmPassword: any, ) {
  const response = await post(`resetPassword`, {
    email: email,
    newPassword: newPassword,
    confirmPassword: confirmPassword
  })

  return response;
}