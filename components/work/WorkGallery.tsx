/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react";
import { UseQueryResult } from "react-query";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageViewer from "react-simple-image-viewer";

export const photos = [
  {
    src: "/assets/interior/01.jpg",
    width: 2,
    height: 2,
  },
  {
    src: "/assets/interior/02.jpg",
    width: 1,
    height: 1,
  },
  {
    src: "/assets/interior/03.jpg",
    width: 3,
    height: 4,
  },
  {
    src: "/assets/interior/04.jpg",
    width: 3,
    height: 4,
  },
  {
    src: "/assets/interior/05.jpg",
    width: 3,
    height: 4,
  },
  {
    src: "/assets/interior/06.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/assets/interior/07.jpg",
    width: 3,
    height: 4,
  },
  {
    src: "/assets/interior/08.jpg",
    width: 4,
    height: 3,
  },
  {
    src: "/assets/interior/09.jpg",
    width: 4,
    height: 3,
  },
];

interface IWorkGalleryProps {
  works?: UseQueryResult<any, unknown>;
}

export const images = photos.map((photo) => photo.src);

export default function WorkGallery(props: IWorkGalleryProps) {
  const works =
    (props?.works?.data?.works && props?.works?.data?.works[0]?.works) || [];
  const worksImages = works.map((work: any) => work.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="p-1 lg:p-2 min-h-[calc(100vh-76px)] bg-accentLighter">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
        <Masonry>
          {worksImages.map((image: string, index: number) => (
            <div key={index} className="cursor-pointer overflow-hidden">
              <div className="cursor-pointer w-full h-auto overflow-hidden p-1 md:p-2">
                <img
                  src={image}
                  className="w-full h-full rounded lg:rounded-xl border border-black"
                  alt=""
                  onClick={() => openImageViewer(index)}
                />
              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {isViewerOpen && (
        <ImageViewer
          src={worksImages}
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
  );
}
