import { Schema, model, Document } from "mongoose";

export interface IGoods extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

const goodsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

model<IGoods>("Goods", goodsSchema);
