import { IRowTheme } from "@/types/row";
import { UseQueryResult } from "react-query";
import RowWrapper from "../common/RowWrapper";
import NoData from "../common/NoData";
import { IUpcomingEvent } from "@/types/upcomingEvents";
import UpcomingEventCard from "./UpcomingEventCard";

interface IUpcomingEventsPageProps extends IRowTheme {
  upcomingEvents: UseQueryResult<any, unknown>;
  rowWrapperClassName?: string;
}

export default function UpcomingEventsPage(props: IUpcomingEventsPageProps) {
  if (
    !props.upcomingEvents ||
    !props.upcomingEvents.data ||
    !props.upcomingEvents.data.upcomingEvents ||
    !props.upcomingEvents.data.upcomingEvents[0] ||
    !props.upcomingEvents.data.upcomingEvents[0].upcomingEvents ||
    !props.upcomingEvents.data.upcomingEvents[0].upcomingEvents.length
  ) {
    return <NoData />;
  }

  const upcomingEvents =
    props.upcomingEvents.data.upcomingEvents[0].upcomingEvents;

  return (
    <RowWrapper
      title="Upcoming Events"
      // description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error?"
      theme={props.theme}
      containerWrapperClassName={`min-h-[calc(100vh_-_80px)] ${
        props.rowWrapperClassName || ""
      }`}
    >
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {upcomingEvents.map((event: IUpcomingEvent, index: number) => (
          <div key={index} className="px-2">
            <UpcomingEventCard objUpcomingEvent={event} theme={props.theme} />
          </div>
        ))}
      </div>
    </RowWrapper>
  );
}
