import { IRowTheme } from "@/types/row";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import NoData from "../common/NoData";
import UpcomingEventCard from "./UpcomingEventCard";

interface IUpcomingEventsProps extends IRowTheme {
  upcomingEvents: IUpcomingEvent[];
}

export default function UpcomingEvents({
  upcomingEvents,
  theme,
}: IUpcomingEventsProps) {
  if (!upcomingEvents || !upcomingEvents.length) {
    return <NoData />;
  }

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {upcomingEvents.map((event: IUpcomingEvent, index: number) => (
        <div key={index} className="px-2">
          <UpcomingEventCard upcomingEvent={event} theme={theme} />
        </div>
      ))}
    </div>
  );
}
