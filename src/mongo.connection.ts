import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI = "mongodb+srv://root:root@cluster0.4fftmre.mongodb.net/";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("Connection error", error);
  });
