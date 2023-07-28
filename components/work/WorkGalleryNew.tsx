/* eslint-disable @next/next/no-img-element */
import { IWorkNew, ImageWithId } from "@/types/worksNew";
import { useRouter } from "next/router";
import { UseQueryResult } from "react-query";
import NoData from "../common/NoData";
import CommonMasonryGallery from "../common/CommonMasonryGallery";

interface IWorkGalleryProps {
  works?: UseQueryResult<any, unknown>;
}

export default function WorkGalleryNew(props: IWorkGalleryProps) {
  const router = useRouter();

  if (
    !props ||
    !props.works?.data ||
    !props.works?.data?.works ||
    !props.works?.data?.works?.length
  ) {
    return <NoData />;
  }

  const works: IWorkNew[] = props.works.data.works;

  const worksImagesLarge: ImageWithId[] = works.map((work) => ({
    ...work.images[0].original,
    _id: work._id,
  }));

  const worksImagesMedium: ImageWithId[] = works.map((work) => ({
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
            router.push(`/worknew/${image._id}`);
          }
        }}
      />
      {/* Larger Screen */}
      <CommonMasonryGallery
        containerClassName="hidden md:block"
        images={worksImagesLarge}
        onImageClick={(image) => {
          if (image._id) {
            router.push(`/worknew/${image._id}`);
          }
        }}
      />
    </div>
  );
}
