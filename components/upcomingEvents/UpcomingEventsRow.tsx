import { IRowTheme } from "@/types/row";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import LinkBtn from "../common/LinkBtn";
import RowWrapper from "../common/RowWrapper";
import UpcomingEventCard from "./UpcomingEventCard";

interface IUpcomingEventsRowProps extends IRowTheme {
  upcomingEvents: IUpcomingEvent[];
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

export default function UpcomingEventsRow({
  upcomingEvents,
  rowWrapperClassName = "",
  theme = "light",
}: IUpcomingEventsRowProps) {
  if (!upcomingEvents?.length) return null;

  const data = upcomingEvents || [];

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <RowWrapper
      title="Upcoming Events"
      theme={theme}
      containerWrapperClassName={`${rowWrapperClassName}`}
    >
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((event: IUpcomingEvent, index: number) => (
          <div key={index} className="px-2">
            <UpcomingEventCard upcomingEvent={event} theme={theme} />
          </div>
        ))}
      </div>
      <div className="block md:hidden">
        <Slider {...settings}>
          {data.map((event: IUpcomingEvent, index: number) => (
            <div key={index} className="px-2">
              <UpcomingEventCard upcomingEvent={event} theme={theme} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="mt-12">
        <LinkBtn
          href="/upcomingEvents/1"
          text="Sell All Events"
          theme={theme}
        />
      </div>
    </RowWrapper>
  );
}
