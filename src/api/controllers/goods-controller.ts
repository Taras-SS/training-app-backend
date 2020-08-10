import { Request, Response } from "express";
import { model } from "mongoose";
import { IGoods } from "../models/goods-model";

const Goods = model("Goods");

export const addGoods = async ({ body }: Request, res: Response) => {
  if (!body.title || !body.description || !body.imageUrl || !body.price || !body.categoryId)
    return res
      .status(422)
      .json({ message: "title, description, imageUrl, categoryId and price are required" });
  try {
    const { title, description, imageUrl, price, categoryId } = body;
    const item = new Goods({
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
      categoryId: categoryId
    });
    const response = await item.save();
    return res.status(201).json({
      message: "Item created",
      item,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
  return null;
};

export const getAllGoods = async (req: Request, res: Response) => {
  try {
    const response = await Goods.find();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
};
