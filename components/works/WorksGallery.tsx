/* eslint-disable @next/next/no-img-element */
import { IImageSize } from "@/types/image";
import { IWork } from "@/types/work";
import { useRouter } from "next/router";
import CommonMasonryGallery from "../common/CommonMasonryGallery";
import NoData from "../common/NoData";

interface IWorksGalleryProps {
  works: IWork[];
}

export default function WorksGallery(props: IWorksGalleryProps) {
  const router = useRouter();

  if (!props.works || !props.works?.length) {
    return <NoData />;
  }

  const works = props.works || [];

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
            router.push(`/works/workDetails/${image._id}`);
          }
        }}
      />
      {/* Larger Screen */}
      <CommonMasonryGallery
        containerClassName="hidden md:block"
        images={worksImagesLarge}
        onImageClick={(image) => {
          if (image._id) {
            router.push(`/works/workDetails/${image._id}`);
          }
        }}
      />
    </div>
  );
}
