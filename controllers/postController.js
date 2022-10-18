import mongoose from "mongoose";

import UserModel from "../model/userModel.js";
import PostModel from "../model/postModel.js";

import uploadImage from "../utils/uploadImage.js";

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  const postsId = await UserModel.findById(userId, "posts").exec();

  // TODO: identify correct status
  if (!postsId) return res.status(400).json({ info: "no such user" });
  if (!postsId?.posts) return res.json([]);

  const postsArray = postsId.posts.map((post) => {
    return mongoose.Types.ObjectId(post);
  });

  const posts = await PostModel.find({
    _id: {
      $in: postsArray,
    },
  });

  const newPosts = await Promise.all(
    posts.map(async (post) => {
      const user = await UserModel.findById(post.userId);
      const postObject = post.toObject();
      postObject.firstname = user.firstname;
      postObject.lastname = user.lastname;
      postObject.userphoto = user.photo;
      return postObject;
    })
  );

  return res.json(newPosts);
};

export const getNewsfeed = async (req, res) => {
  const authUser = req.authUser;
  const user = await UserModel.findById(authUser);
  const followingUsers = user.following;
  followingUsers.push(authUser);

  const followingUsersMod = followingUsers.map((userId) => {
    return mongoose.Types.ObjectId(userId);
  });

  const postsIdFromFollowers = await UserModel.find(
    {
      _id: { $in: followingUsersMod },
    },
    "posts"
  );

  const postsIdFromFollowersMod = postsIdFromFollowers.map((item) => {
    item.posts = item.posts.map((subItem) => {
      return mongoose.Types.ObjectId(subItem);
    });
    return item;
  });

  const postsFromFollowers = await Promise.all(
    postsIdFromFollowersMod.map(async (item) => {
      return await PostModel.find({
        $and: [{ _id: { $in: item.posts } }, { userId: item._id.toString() }],
      });
    })
  );
  const postsFromFollowersArr = postsFromFollowers.reduce((prev, cur) => {
    return [...prev, ...cur];
  }, []);

  const postsFromFollowersMod = await Promise.all(
    postsFromFollowersArr.map(async (post) => {
      const user = await UserModel.findById(post.userId);
      const postObject = post.toObject();
      postObject.firstname = user.firstname;
      postObject.lastname = user.lastname;
      postObject.userphoto = user.photo;
      return postObject;
    })
  );

  return res.json(postsFromFollowersMod);
};

export const createPost = async (req, res) => {
  const authUser = req.authUser;
  const { content, userId, data, imgName } = req.body;
  const user = await UserModel.findById(authUser).exec();
  const folderPath = `${user.username}/postsPhoto`;

  // console.log(data);
  // console.log(imgName);
  // console.log(folderPath);

  const imgUrl = await uploadImage(data, imgName, folderPath);

  const newPost = new PostModel({
    content,
    userId: authUser,
    photo: imgUrl,
  });
  await newPost.save();

  const postId = newPost._id.toString();
  await UserModel.findByIdAndUpdate(
    { _id: userId },
    { $push: { posts: postId } }
  ).exec();

  const newPostExtended = newPost.toObject();
  newPostExtended.firstname = user.firstname;
  newPostExtended.lastname = user.lastname;
  newPostExtended.userphoto = user.photo;

  return res.json(newPostExtended);
};
// export const createPost = async (req, res) => {
//   const authUser = req.authUser;
//   const { content, userId } = req.body;

//   const newPost = new PostModel({
//     content,
//     userId: authUser,
//   });
//   await newPost.save();

//   const postId = newPost._id.toString();
//   await UserModel.findByIdAndUpdate(
//     { _id: userId },
//     { $push: { posts: postId } }
//   ).exec();

//   const user = await UserModel.findById(authUser).exec();

//   const newPostExtended = newPost.toObject();
//   newPostExtended.firstname = user.firstname;
//   newPostExtended.lastname = user.lastname;
//   newPostExtended.userphoto = user.photo;

//   return res.json(newPostExtended);
// };

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  const authUser = req.authUser;

  const post = await PostModel.findById(postId).exec();
  if (!post) return res.status(404).json({ info: "there is no such post" });

  await PostModel.findByIdAndDelete(postId).exec();

  await UserModel.findByIdAndUpdate(
    { _id: authUser },
    { $pull: { posts: postId } }
  ).exec();

  return res.json(postId);
};

export const likePost = async (req, res) => {
  const { postId } = req.params;
  const authUser = req.authUser;
  let post;

  post = await PostModel.findById(postId).exec();
  if (!post) return res.status(404).json({ info: "there is no such post" });

  if (!post.likedBy.includes(authUser)) {
    await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $push: { likedBy: authUser } }
    ).exec();

    await UserModel.findByIdAndUpdate(
      { _id: authUser },
      { $push: { likedPosts: postId } }
    ).exec();
  } else {
    await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $pull: { likedBy: authUser } }
    ).exec();

    await UserModel.findByIdAndUpdate(
      { _id: authUser },
      { $pull: { likedPosts: postId } }
    ).exec();
  }

  post = await PostModel.findById(postId).exec();

  return res.json(post);
};

// export const loadPostPhoto = async (req, res) => {
//   const { data, postId } = req.body;
//   const user = await PostModel.findById(postId).exec();
//   const folderPath = user.username;

//   const imgUrl = await uploadImage(data, "coverPhoto", folderPath);
//   await UserModel.findByIdAndUpdate(authUser, { photo: imgUrl });
//   const updateUser = await UserModel.findById(authUser);

//   res.json(updateUser);
// };
