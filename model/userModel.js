import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 4,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      min: 6,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    photo: String,
    coverPicture: String,
    livesin: String,
    workAt: String,
    relationship: String,
    following: [],
    followers: [],
    posts: [],
    likedPosts: [],
    refreshToken: [],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
