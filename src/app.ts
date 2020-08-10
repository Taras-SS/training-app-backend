import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import passport from "passport";

import cors from "cors";
import "./api/config/db";
import "./api/config/passport";

import apiRouter from "./api/routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(passport.initialize());

app.use("/api", (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers", "Access-Token, access-token");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
  next();
});

app.use(cors());
app.use("/api", apiRouter);

export default app;
