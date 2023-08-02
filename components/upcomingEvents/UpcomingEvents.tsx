import { IRowTheme } from "@/types/row";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import { UseQueryResult } from "react-query";
import NoData from "../common/NoData";
import RowWrapper from "../common/RowWrapper";
import UpcomingEventCard from "./UpcomingEventCard";

interface IUpcomingEventsProps extends IRowTheme {
  upcomingEvents: UseQueryResult<any, unknown>;
  rowWrapperClassName?: string;
}

export default function UpcomingEvents({
  upcomingEvents,
  rowWrapperClassName,
  theme,
}: IUpcomingEventsProps) {
  if (!upcomingEvents?.data?.upcomingEvents?.length) {
    return <NoData />;
  }
  const data = upcomingEvents?.data?.upcomingEvents || [];

  return (
    <RowWrapper
      title="Upcoming Events"
      theme={theme}
      containerWrapperClassName={`min-h-[calc(100vh_-_80px)] ${
        rowWrapperClassName || ""
      }`}
    >
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {data.map((event: IUpcomingEvent, index: number) => (
          <div key={index} className="px-2">
            <UpcomingEventCard upcomingEvent={event} theme={theme} />
          </div>
        ))}
      </div>
    </RowWrapper>
  );
}
