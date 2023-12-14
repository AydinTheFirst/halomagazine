import mongoose, { Schema } from "mongoose";

export interface IMagazine {
  id: string;
  catId: string;
  title: string;
  description: string;
  thumbnail: string;
  file: string;
  timestamp: string;
}

export const magazieModel = mongoose.model<IMagazine>(
  "magazine",
  new Schema<IMagazine>({
    id: { type: String, required: true },
    catId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    thumbnail: { type: String, required: true },
    file: { type: String, required: true },
    timestamp: { type: String, required: true },
  })
);
