import { IRowTheme } from "@/types/row";
import { UseQueryResult } from "react-query";
import UpcomingEventCard from "./UpcomingEventCard";
import RowWrapper from "../common/RowWrapper";
import { IUpcomingEvent } from "@/types/upcomingEvents";
import Slider, { CustomArrowProps, Settings } from "react-slick";

interface IUpcomingEventsRowProps extends IRowTheme {
  upcomingEvents: UseQueryResult<any, unknown>;
  rowWrapperClassName?: string;
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

export default function UpcomingEventsRow(props: IUpcomingEventsRowProps) {
  if (
    !props.upcomingEvents ||
    !props.upcomingEvents.data ||
    !props.upcomingEvents.data.upcomingEvents ||
    !props.upcomingEvents.data.upcomingEvents[0] ||
    !props.upcomingEvents.data.upcomingEvents[0].upcomingEvents ||
    !props.upcomingEvents.data.upcomingEvents[0].upcomingEvents.length
  )
    return;
  const upcomingEvents =
    props.upcomingEvents.data.upcomingEvents[0].upcomingEvents;

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: upcomingEvents.length > 2 ? 2 : upcomingEvents.length,
    slidesToScroll: upcomingEvents.length > 2 ? 2 : upcomingEvents.length,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: upcomingEvents.length > 1 ? 1 : upcomingEvents.length,
          slidesToScroll: upcomingEvents.length > 1 ? 1 : upcomingEvents.length,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: upcomingEvents.length > 1 ? 1 : upcomingEvents.length,
          slidesToScroll: upcomingEvents.length > 1 ? 1 : upcomingEvents.length,
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
      title="Upcoming Events"
      // description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error?"
      theme={props.theme}
      containerWrapperClassName={`${props.rowWrapperClassName || ""}`}
    >
      <Slider {...settings}>
        {upcomingEvents.map((event: IUpcomingEvent, index: number) => (
          <div key={index} className="px-2">
            <UpcomingEventCard objUpcomingEvent={event} theme={props.theme} />
          </div>
        ))}
      </Slider>
    </RowWrapper>
  );
}
