import mongoose, { Schema } from "mongoose";
import { IMagazine } from "./magazine";

export interface ICategory {
  id: string;
  title: string;
  description: string;
  magazines: IMagazine[];
}

export const categoryModel = mongoose.model<ICategory>(
  "category",
  new Schema<ICategory>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    magazines: { type: [], required: true },
  })
);
