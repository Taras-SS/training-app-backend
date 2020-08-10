import { Request, Response } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import mongoose from "mongoose";
import path from "path";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const checkFileType = (file: Express.Multer.File, cb: any) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: Video or images only!");
};

const selectMulterConfig = (fieldname: string) => {
  const multerConfig = multer({
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET || "",
      acl: "public-read",
      key(req, file, cb) {
        cb(null, file.originalname);
      },
    }),
    fileFilter(req, file, cb) {
      checkFileType(file, cb);
    },
  }).single(fieldname); // 'avatarImage','lectureVideo'

  return multerConfig;
};

export const uploadImage = (req: any, res: Response) => {
  selectMulterConfig("avatarImage")(req, res, async (error: any) => {
    if (error) {
      return res.status(422).json({ error });
    }
    if (req.file === undefined) {
      res.json("Error: No File Selected");
    } else {
      const imageLocation = req.file.location;
      return res.status(201).json({
        message: "Image successfully added",
        imageUrl: imageLocation,
      });
    }
  });
};
