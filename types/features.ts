export interface IFeature {
  _id?: string;
  title: string;
  description: string;
}

export interface IFeatures {
  _id?: string;
  features: Array<IFeature>;
}
