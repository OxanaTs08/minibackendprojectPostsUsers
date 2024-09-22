import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import countriesRouter from "./routes/countries.js";
import tagsRouter from "./routes/tags.js";
import placesRouter from "./routes/places.js";

dotenv.config({ path: ".env" });
const uri = process.env.MONGO_URI;
const port = 4001;
const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/countries", countriesRouter);
app.use("/tags", tagsRouter);
app.use("/places", placesRouter);

mongoose
  .connect(uri, {})
  .then(() => {
    console.log("Mongoos Database connected successfully");
  })
  .catch((error) => {
    console.log("Mongoose connection failed:", error);
  });

app.listen(port, async () => {
  console.log(`Server is running at port : ${port}`);
});
