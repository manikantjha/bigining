/* eslint-disable @next/next/no-img-element */
import LinkBtn from "@/components/common/LinkBtn";
import RowWrapper from "@/components/common/RowWrapper";
import { IRowTheme } from "@/types/row";
import { IWork } from "@/types/work";
import { UseQueryResult } from "react-query";
import Slider, { CustomArrowProps } from "react-slick";

interface IWorkGalleryProps extends IRowTheme {
  works?: UseQueryResult<any, unknown>;
}

function SampleNextArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-[50%] right-[-10px] translate-y-[-50%] cursor-pointer bg-black/50 rounded-full p-2 text-white z-10"
      title="next slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
        />
      </svg>
    </button>
  );
}

function SamplePrevArrow(props: CustomArrowProps) {
  const { className, style, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute top-[50%] left-[-10px] translate-y-[-50%] cursor-pointer bg-black/50 rounded-full p-2 text-white z-10"
      title="previous slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
    </button>
  );
}

export default function RecentWorkRow(props: IWorkGalleryProps) {
  const works: IWork[] = props?.works?.data?.works || [];
  const worksImages = works.map((work) => work.images[0].original);

  if (!worksImages.length) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: worksImages.length > 4 ? 4 : worksImages.length,
    slidesToScroll: worksImages.length > 4 ? 4 : worksImages.length,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: worksImages.length > 3 ? 3 : worksImages.length,
          slidesToScroll: worksImages.length > 3 ? 3 : worksImages.length,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: worksImages.length > 2 ? 2 : worksImages.length,
          slidesToScroll: worksImages.length > 2 ? 2 : worksImages.length,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <RowWrapper
      title="Recent Work"
      containerWrapperClassName="!overflow-x-hidden"
      theme={props.theme}
    >
      <div>
        <Slider {...settings}>
          {worksImages.map((item, index: number) => (
            <div key={index} className="px-2">
              <div className="w-full h-[400px] md:h-[400px] overflow-hidden rounded-lg border-2 border-black">
                <img
                  className="h-full w-full object-cover"
                  src={item.url}
                  alt="interior image"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-12">
        <LinkBtn href="/works" text="Sell All Work" theme={props.theme} />
      </div>
    </RowWrapper>
  );
}
