import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
}

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

model<ICategory>("Category", CategorySchema);
