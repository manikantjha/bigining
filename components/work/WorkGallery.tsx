/* eslint-disable @next/next/no-img-element */
import { IWork } from "@/types/works";
import { useCallback, useState } from "react";
import { UseQueryResult } from "react-query";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ImageViewer from "react-simple-image-viewer";
import NoData from "../common/NoData";

interface IWorkGalleryProps {
  works?: UseQueryResult<any, unknown>;
}

export default function WorkGallery(props: IWorkGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  if (
    !props.works ||
    !props.works.data ||
    !props.works.data.works ||
    !props.works.data.works[0] ||
    !props.works.data.works[0].works ||
    !props.works.data.works[0].works.length
  ) {
    return <NoData />;
  }

  const works = props.works.data.works[0].works;
  const worksImages = works.map((work: IWork) => work.imageURL);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="p-1 lg:p-2 min-h-[calc(100vh-76px)] bg-bgLight">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
        <Masonry>
          {worksImages.map((image: string, index: number) => (
            <div
              key={index}
              className="cursor-pointer h-0 pt-[50%] relative md:m-2 m-1"
            >
              <div className="cursor-pointer w-full h-auto overflow-hidden p-1 md:p-2">
                <img
                  src={image}
                  className="absolute top-0 left-0 object-cover object-[50%_0] w-full h-full rounded lg:rounded-xl border border-black"
                  alt=""
                  onClick={() => openImageViewer(index)}
                  loading="lazy"
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
