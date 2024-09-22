import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  name: { type: String },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

export { commentSchema };
