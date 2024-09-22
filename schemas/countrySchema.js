import mongoose from "mongoose";

const countrySchema = new mongoose.Schema({
  name: { type: String },
  picture: { type: String },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
});

export { countrySchema };
