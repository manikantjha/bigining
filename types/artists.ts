export interface IArtist {
  _id?: string;
  imageURL: string;
  name: string;
  category: string;
  description?: string;
}

export interface IArtists {
  _id?: string;
  artists: Array<IArtist>;
}
