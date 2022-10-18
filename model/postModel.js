import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: String,
    content: String,
    photo: String,
    likedBy: [],
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
