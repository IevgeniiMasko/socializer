import mongoose from "mongoose";

import uploadImage from "../utils/uploadImage.js";

import UserModel from "../model/userModel.js";
import PostModel from "../model/postModel.js";

export const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findById(userId).select("-password").exec();
  if (!user) return res.status(400).json({ info: "no such user" });
  return res.json(user);
};

export const getAllUsers = async (req, res) => {
  const authUser = req.authUser;
  const users = await UserModel.find(
    { _id: { $ne: authUser } },
    "_id firstname lastname followers photo"
  );

  res.json(users);
};

export const getAllFollowers = async (req, res) => {
  const authUser = req.authUser;
  const users = await UserModel.find(
    { followers: { $in: authUser } },
    "_id firstname lastname followers photo"
  );

  res.json(users);
};

export const updateUserPhoto = async (req, res) => {
  const { data, fileName } = req.body;
  const authUser = req.authUser;
  const user = await UserModel.findById(authUser).select("username").exec();
  const folderPath = user.username;

  const imgUrl = await uploadImage(data, "coverPhoto", folderPath);
  await UserModel.findByIdAndUpdate(authUser, { photo: imgUrl });
  const updateUser = await UserModel.findById(authUser);

  res.json(updateUser);
};

export const followUser = async (req, res) => {
  const { userId } = req.params;
  const authUser = req.authUser;
  const user = await UserModel.findById(userId).exec();
  const userMain = await UserModel.findById(authUser).exec();

  if (!user.followers.includes(authUser)) {
    user.followers.push(authUser);
  } else {
    user.followers = user.followers.filter((follower) => follower !== authUser);
  }
  await user.save();

  if (!userMain.following.includes(userId)) {
    userMain.following.push(userId);
  } else {
    userMain.following = userMain.following.filter(
      (follower) => follower !== userId
    );
  }
  await userMain.save();

  return res.json(user);
};
