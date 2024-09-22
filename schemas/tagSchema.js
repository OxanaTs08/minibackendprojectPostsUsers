import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  countries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
});

export { tagSchema };
