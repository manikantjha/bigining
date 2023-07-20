export interface IUpcomingEvent {
  _id?: string;
  imageURL: string;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  location?: string;
}

export interface IUpcomingEvents {
  _id?: string;
  upcomingEvents: Array<IUpcomingEvent>;
}
