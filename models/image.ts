import { Schema } from "mongoose";

export const imageSizeSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});

export const imageSchema = new Schema({
  original: {
    type: imageSizeSchema,
    required: true,
  },
  medium: {
    type: imageSizeSchema,
    required: true,
  },
  small: {
    type: imageSizeSchema,
    required: true,
  },
});
