import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

export { placeSchema };
