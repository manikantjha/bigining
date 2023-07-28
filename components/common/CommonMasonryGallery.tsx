import { ImageWithId } from "@/types/worksNew";
import { CSSProperties } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

interface ICommonMasonryGalleryProps {
  images: ImageWithId[];
  containerClassName?: string;
  imageContainerClassName?: string;
  imageContainerStyle?: (image: ImageWithId) => CSSProperties;
  imageClassName?: string;
  onImageClick?: (image: ImageWithId, index: number) => void;
  columnsCountBreakPoints?: {
    [key: number]: number;
  };
}

const CommonMasonryGallery = ({
  images,
  containerClassName = "",
  imageContainerClassName = "",
  imageClassName = "",
  onImageClick,
  columnsCountBreakPoints = { 350: 2, 750: 3, 900: 4 },
  imageContainerStyle = (image) => ({
    aspectRatio: image.width / image.height,
  }),
}: ICommonMasonryGalleryProps) => {
  return (
    <div className={`${containerClassName}`}>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry>
          {images.map((image: ImageWithId, index: number) => (
            <div key={index}>
              <div
                style={imageContainerStyle(image)}
                className={`overflow-hidden rounded-xl m-2 border border-black cursor-pointer ${imageContainerClassName}`}
                onClick={() => {
                  if (onImageClick) {
                    onImageClick(image, index);
                  }
                }}
              >
                <img
                  src={image.url}
                  className={`object-cover w-full h-full ${imageClassName}`}
                  alt="gallery image"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default CommonMasonryGallery;
