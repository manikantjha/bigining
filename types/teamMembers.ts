export interface ITeamMember {
  _id?: string;
  imageURL: string;
  name: string;
  description: string;
}

export interface ITeamMembers {
  _id?: string;
  teamMembers: Array<ITeamMember>;
}
