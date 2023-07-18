export interface IArtist {
  _id?: string;
  imageURL: string;
  name: string;
  description?: string;
}

export interface IArtists {
  _id?: string;
  artists: Array<IArtist>;
}
