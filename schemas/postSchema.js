import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export { postSchema };
