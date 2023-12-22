import mongoose, { Schema } from "mongoose";

interface ISchema {
  id: string;
  catId: string;
  title: string;
  description: string;
  thumbnail: string;
  file: string;
  timestamp: string;
}

const model = mongoose.model<ISchema>(
  "magazine",
  new Schema<ISchema>({
    id: { type: String, required: true },
    catId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true },
    file: { type: String, required: true },
    timestamp: { type: String, required: true },
  })
);

export const magazieModel = model;
export type IMagazine = ISchema;
