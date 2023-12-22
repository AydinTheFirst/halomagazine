import mongoose, { Schema } from "mongoose";
import { IMagazine } from "./magazine";

interface ISchema {
  id: string;
  title: string;
  description: string;
  magazines: IMagazine[];
}

const model = mongoose.model<ISchema>(
  "category",
  new Schema<ISchema>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    magazines: { type: [], required: true },
  })
);

export const categoryModel = model;
export type ICategory = ISchema;
