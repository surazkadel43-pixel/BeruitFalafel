import * as Crypto from "expo-crypto";

export const sha512 = async (text: string, salt: string): Promise<string> => {
  const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, `${salt}${text}${salt}`);
  return hash;
};

export async function hashPassword(password: string) {
  return await sha512(password, "Anno");
}
