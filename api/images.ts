import { parseError } from "../components/toasts";
import { patch, post } from "./communications";

export async function uploadImages(images: any[]) {
  const imageData = [];

  for (const imageToUpload of images) {
    const blob = await (await fetch(imageToUpload.uri)).blob();
    const imageSize = imageToUpload.fileSize;

    imageData.push({
      data: blob,
      size: imageSize,
    });
  }

  const imagePrepResp = await post("file/upload", {
    files: imageData.map((image) => ({
      size: image.size,
    })),
  });

  if (imagePrepResp.status !== 200) {
    throw new Error(parseError(imagePrepResp));
  }

  for (const presign of imagePrepResp.data.filesToUpload) {
    const file = imageData.find((image) => image.size === presign.size)?.data;

    if (!file) {
      throw new Error(`File not found for size: ${presign.size}`);
    }

    const uploadResp = await fetch(presign.uploadURL, {
      method: "PUT",
      headers: {
        "Content-Length": file.size.toString(),
      },
      body: file,
    });

    if (!uploadResp.ok) {
      const responseText = await uploadResp.text();
      throw new Error(`Upload failed: ${uploadResp.status} - ${responseText}`);
    }
  }

  const imageVerifResp = await patch("file/validate", {
    files: imagePrepResp.data.filesToUpload.map((file: any) => file.id),
  });

  if (imageVerifResp.status !== 200) {
    throw new Error(parseError(imageVerifResp));
  }

  return imageVerifResp.data.verified;
}
