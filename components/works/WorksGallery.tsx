/* eslint-disable @next/next/no-img-element */
import { IImageSize, IWork } from "@/types/works";
import { useRouter } from "next/router";
import { UseQueryResult } from "react-query";
import CommonMasonryGallery from "../common/CommonMasonryGallery";
import NoData from "../common/NoData";

interface IWorksGalleryProps {
  works?: UseQueryResult<any, unknown>;
}

export default function WorksGallery(props: IWorksGalleryProps) {
  const router = useRouter();

  if (
    !props ||
    !props.works?.data ||
    !props.works?.data?.works ||
    !props.works?.data?.works?.length
  ) {
    return <NoData />;
  }

  const works: IWork[] = props.works.data.works;

  const worksImagesLarge: IImageSize[] = works.map((work) => ({
    ...work.images[0].original,
    _id: work._id,
  }));

  const worksImagesMedium: IImageSize[] = works.map((work) => ({
    ...work.images[0].medium,
    _id: work._id,
  }));

  return (
    <div className="">
      {/* Smaller Screen */}
      <CommonMasonryGallery
        containerClassName="block md:hidden"
        images={worksImagesMedium}
        onImageClick={(image) => {
          if (image._id) {
            router.push(`/works/${image._id}`);
          }
        }}
      />
      {/* Larger Screen */}
      <CommonMasonryGallery
        containerClassName="hidden md:block"
        images={worksImagesLarge}
        onImageClick={(image) => {
          if (image._id) {
            router.push(`/works/${image._id}`);
          }
        }}
      />
    </div>
  );
}
