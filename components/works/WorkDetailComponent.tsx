import { IImageSize } from "@/types/image";
import { IWork } from "@/types/work";
import { useCallback, useState } from "react";
import { UseQueryResult } from "react-query";
import ImageViewer from "react-simple-image-viewer";
import CommonMasonryGallery from "../common/CommonMasonryGallery";

interface IWorkDetailComponentProps {
  work: UseQueryResult<any, unknown>;
}

export default function WorkDetailComponent({
  work,
}: IWorkDetailComponentProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  if (!work.data) return null;

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const data: IWork = work.data;

  const worksImagesLarge: IImageSize[] = data.images.map(
    (image) => image.original
  );

  const worksImagesMedium: IImageSize[] = data.images.map(
    (image) => image.medium
  );

  const worksImagesLargeUrls: string[] = worksImagesLarge.map(
    (image) => image.url
  );

  return (
    <div>
      <h2 className="text-3xl mb-2">{data.name}</h2>
      <p className="text-md mb-8">{data.description}</p>
      <div>
        {/* Larger Screen */}
        <CommonMasonryGallery
          containerClassName="hidden md:block"
          images={worksImagesLarge}
          onImageClick={(image, index) => {
            openImageViewer(index);
          }}
          columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
          imageContainerStyle={() => ({
            margin: "8px 16px 8px 0px",
          })}
          imageContainerClassName="h-[400px]"
        />
        {/* Smaller Screen */}
        <CommonMasonryGallery
          containerClassName="block md:hidden"
          images={worksImagesMedium}
          onImageClick={(image, index) => {
            openImageViewer(index);
          }}
          columnsCountBreakPoints={{ 350: 2, 750: 2, 900: 3 }}
          imageContainerStyle={() => ({
            margin: "8px 16px 8px 0px",
          })}
          imageContainerClassName="h-[250px]"
        />
        {isViewerOpen && (
          <ImageViewer
            src={worksImagesLargeUrls}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 1000,
            }}
            closeOnClickOutside={true}
          />
        )}
      </div>
    </div>
  );
}
