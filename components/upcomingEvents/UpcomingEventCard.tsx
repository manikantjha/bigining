import { IRowTheme } from "@/types/row";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import Card from "../common/Card";

interface IUpcomingEventCard extends IRowTheme {
  upcomingEvent?: IUpcomingEvent;
}

export default function UpcomingEventCard(props: IUpcomingEventCard) {
  if (!props.upcomingEvent) return;
  return (
    <div>
      <Card className="space-y-1 !p-3 text-black" theme={props.theme}>
        <div className="h-[350px] w-full overflow-hidden rounded-md mb-4 border border-black">
          <img
            src={props.upcomingEvent.image.medium.url}
            alt={props.upcomingEvent.name}
            className="!object-cover !h-full !w-full"
          />
        </div>
        <h3 className="text-xl font-medium">{props.upcomingEvent.name}</h3>
        {props.upcomingEvent.startDate && (
          <p className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            {new Date(props.upcomingEvent.startDate).toDateString()}
          </p>
        )}
        {/* {props.upcomingEvent.endDate && (
          <p>Ending: {new Date(props.upcomingEvent.endDate).toDateString()}</p>
        )} */}
        {props.upcomingEvent.location && (
          <p className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {props.upcomingEvent.location}
          </p>
        )}
      </Card>
    </div>
  );
}
