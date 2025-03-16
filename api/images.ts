import { parseError } from "../components/toasts";
import { patch, post } from "./communications";

export async function uploadImages(images: any[]) {
  // so here image is an arry of this type
  //    [
  //   {
  //     "assetId": null,
  //     "base64": null,
  //     "duration": null,
  //     "exif": null,
  //     "fileName": "c742136d-2c15-461b-9ca9-94cd70307408.jpeg",
  //     "fileSize": 64664,
  //     "height": 1920,
  //     "mimeType": "image/jpeg",
  //     "rotation": null,
  //     "type": "image",
  //     "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FBeruitFalafel-a43a50a2-ac64-4bec-9d28-0b4ecc8b0cea/ImagePicker/d1642167-8f43-4bb5-b08c-415baa5602c3.jpeg",
  //     "width": 1440
  //   }
  // ]
  const imageData = [];

  for (const imageToUpload of images) {
    const blob = await (await fetch(imageToUpload.uri)).blob();
    const imageSize = imageToUpload.fileSize;

    imageData.push({
      data: blob,
      size: imageSize,
      mime: imageToUpload.mimeType,
      matchKey: imageToUpload.fileName,
    });
  }
  // so here image[0].data (blob) is an arry of this type
  // {
  //   "_data": {
  //     "__collector": {},
  //     "blobId": "655e6784-d956-4bc3-ab59-8b8d3a39713e",
  //     "lastModified": 0,
  //     "name": "c742136d-2c15-461b-9ca9-94cd70307408.jpeg",
  //     "offset": 0,
  //     "size": 64664,
  //     "type": "image/jpeg"
  //   },
  //   "size": 64664,
  //   "mime": "image/jpeg",
  //   "matchKey": "c742136d-2c15-461b-9ca9-94cd70307408.jpeg"
  // }

  const imagePrepResp = await post("file/upload", {
    files: imageData.map((image) => ({
      size: image.size,
      mimeType: image.mime,
      matchKey: image.matchKey,
    })),
  });

  if (imagePrepResp.data.success !== true) {
    throw new Error(parseError(imagePrepResp));
  }

  // And Image response.data is an arry of this type
  // [
  //   {
  //     "filesToUpload": [
  //       {
  //         "id": "5d4e34c7-64ad-443c-9494-b9d7178ecc7b",
  //         "matchKey": "bd84d05b-2aaa-4800-9cd4-f73a18e92a98.jpeg",
  //         "size": 64166,
  //         "uploadURL": "https://anno-development.s3.ap-southeast-2.amazonaws.com/5d4e34c7-64ad-443c-9494-b9d7178ecc7b?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAWFIPTDEMQU2YCUA3%2F20250316%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250316T215330Z&X-Amz-Expires=300&X-Amz-Signature=c16c374888322738fdbe5f8686c4316c97e08eaafb710d2426af6425247b1110&X-Amz-SignedHeaders=content-length%3Bhost&x-amz-checksum-crc32=AAAAAA%3D%3D&x-amz-sdk-checksum-algorithm=CRC32&x-id=PutObject",
  //         "userId": 2
  //       }
  //     ],
  //     "issues": []
  //   }
  // ]
  for (const presign of imagePrepResp.data.filesToUpload) {
    const file = imageData.find((image) => image.matchKey === presign.matchKey)?.data;

    if (!file) {
      throw new Error(`File not found for matchKey: ${presign.matchKey}`);
    }

    try {
      const uploadResp = await fetch(presign.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Length": file.size.toString(),
          "Content-Type": file.type,
        },
        body: file,
      });

      // this is the message response
      // if (uploadResp.ok) {
      //  {
      //   "ok": true,
      //   "status": 200,
      //   "etag": "\"3f82d580cd8ba4e68d54845635e96115\""
      // }
      

      if (!uploadResp.ok) {
        const responseText = await uploadResp.text();
        throw new Error(`Upload failed: ${uploadResp.status} - ${responseText}`);
      }
    } catch (error) {
      throw new Error(`Upload failed: ${error}`);
    }
  }

  const imageVerifResp = await patch("file/validate", {
    files: imagePrepResp.data.filesToUpload.map((file: any) => file.id),
  });

  if (imageVerifResp.status !== 200) {
    throw new Error(parseError(imageVerifResp));
  }
  console.log(imageVerifResp.data);
  // {
  //   "verified": [
  //     {
  //       "createdAt": "2025-03-17 09:06:31.708004",
  //       "id": "7f7dc1d4-f1b7-46ea-b9a9-2e08bc07f5dc",
  //       "presignedURL": "https://anno-development.s3.ap-southeast-2.amazonaws.com/7f7dc1d4-f1b7-46ea-b9a9-2e08bc07f5dc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAWFIPTDEMSWB5S76E%2F20250316%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20250316T220632Z&X-Amz-Expires=388800&X-Amz-Signature=1f6cfa98a2ce3043a3fb9403679120455cbe8e58abbe25b4470a6c368d5d2d11&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject",
  //       "s3Verified": true,
  //       "size": "64510",
  //       "updatedAt": "2025-03-17 09:06:32.256034",
  //       "userId": 2
  //     }
  //   ]
  // }

  return imageVerifResp.data.verified;
}
