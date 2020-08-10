import { Request, Response } from "express";
import { model } from "mongoose";

const Category = model("Category");

export const addCategory = async ({ body }: Request, res: Response) => {
  if (!body.title)
    return res.status(422).json({ message: "title  is required" });
  try {
    const { title } = body;
    const category = new Category({
      title: title,
    });
    const response = await category.save();
    return res.status(201).json({
      message: "category successfully added",
      category,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categoriees = await Category.find();
    res.status(200).json(categoriees);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const removeCategory = async ({params}: Request, res: Response) => {
  if (!params.id)
    return res.status(422).json({ message: "CategoryId is required" });
  try {
    const { id } = params;
    await Category.findOneAndRemove({ _id: id });
    return res.status(200).json({ message: "Successfully removed" });
  } catch (err) {
    return res.status(500).json(err);
  }
};
