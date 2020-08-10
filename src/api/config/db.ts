import mongoose from "mongoose";

const dbURL = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0-yz0io.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connect = () => {
  setTimeout(
    () =>
      mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
    1000
  );
};

mongoose.connection.on("connected", () => {
  console.log("DB is connected");
});

mongoose.connection.on("error", (err) => {
  console.log(`error: ${err}`);
  return connect();
});

mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});

connect();

import "../models/goods-model";
import "../models/user-model";
import "../models/category-model";
