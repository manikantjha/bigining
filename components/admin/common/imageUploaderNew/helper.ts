import { WorkImage } from "@/types/worksNew";
import { useState } from "react";

export function useFileSelection() {
  const [objImages, setObjImages] = useState<WorkImage | null>();

  async function selectFile(
    files: FileList | null,
    fileName?: string,
    folderName?: string
  ) {
    if (!files || (files && !files.length)) return;
    if (files[0].size < 10000000) {
      const res = await convertToWebp(files[0], fileName, folderName);
      setObjImages(res);
      return res;
    } else {
      console.log("File size too large!");
    }
  }

  return { objImages, setObjImages, selectFile };
}

export const convertToWebp = async (
  file: File,
  fileName?: string,
  folderName?: string
) => {
  return new Promise<WorkImage>((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const originalWidth = img.width;
        const originalHeight = img.height;

        const maxMediumWidth = 300;
        const maxMediumHeight = 200;

        const maxSmallWidth = 150;
        const maxSmallHeight = 100;

        let mediumWidth, mediumHeight, smallWidth, smallHeight;

        if (originalWidth > originalHeight) {
          mediumWidth =
            originalWidth > maxMediumWidth ? maxMediumWidth : originalWidth;
          mediumHeight = Math.floor(
            (mediumWidth / originalWidth) * originalHeight
          );
          smallWidth =
            originalWidth > maxSmallWidth ? maxSmallWidth : originalWidth;
          smallHeight = Math.floor(
            (smallWidth / originalWidth) * originalHeight
          );
        } else {
          mediumHeight =
            originalHeight > maxMediumHeight ? maxMediumHeight : originalHeight;
          mediumWidth = Math.floor(
            (mediumHeight / originalHeight) * originalWidth
          );
          smallHeight =
            originalHeight > maxSmallHeight ? maxSmallHeight : originalHeight;
          smallWidth = Math.floor(
            (smallHeight / originalHeight) * originalWidth
          );
        }

        const canvasOriginal = document.createElement("canvas");
        const canvasMedium = document.createElement("canvas");
        const canvasSmall = document.createElement("canvas");

        const ctxOriginal = canvasOriginal.getContext("2d");
        const ctxMedium = canvasMedium.getContext("2d");
        const ctxSmall = canvasSmall.getContext("2d");

        canvasOriginal.width = originalWidth;
        canvasOriginal.height = originalHeight;
        canvasMedium.width = mediumWidth;
        canvasMedium.height = mediumHeight;
        canvasSmall.width = smallWidth;
        canvasSmall.height = smallHeight;

        ctxOriginal?.drawImage(img, 0, 0);

        ctxMedium?.drawImage(
          img,
          0,
          0,
          canvasMedium.width,
          canvasMedium.height
        );

        ctxSmall?.drawImage(img, 0, 0, canvasSmall.width, canvasSmall.height);

        const base64Original = canvasOriginal.toDataURL("image/webp");
        const base64Medium = canvasMedium.toDataURL("image/webp");
        const base64Small = canvasSmall.toDataURL("image/webp");

        resolve({
          original: {
            path: `${folderName ? folderName : "images"}/${
              fileName
                ? fileName.replace(" ", "_")
                : file.name.replace(" ", "_")
            }_original_${Date.now()}.webp`,
            url: base64Original,
            width: originalWidth,
            height: originalHeight,
          },
          medium: {
            path: `${folderName ? folderName : "images"}/${
              fileName
                ? fileName.replace(" ", "_")
                : file.name.replace(" ", "_")
            }_medium_${Date.now()}.webp`,
            url: base64Medium,
            width: mediumWidth,
            height: mediumHeight,
          },
          small: {
            path: `${folderName ? folderName : "images"}/${
              fileName
                ? fileName.replace(" ", "_")
                : file.name.replace(" ", "_")
            }_small_${Date.now()}.webp`,
            url: base64Small,
            width: smallWidth,
            height: smallHeight,
          },
        });
      };

      img.src = reader.result as string;
    };
    reader.readAsDataURL(new Blob([file]));
  });
};
