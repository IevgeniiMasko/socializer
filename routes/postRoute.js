import express from "express";
import {
  getUserPosts,
  createPost,
  deletePost,
  likePost,
  getNewsfeed,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/user/:userId", getUserPosts);
router.get("/newsfeed", getNewsfeed);
router.post("/post/create", createPost);
router.delete("/post/:postId/delete", deletePost);
router.patch("/post/:postId/like", likePost);

export default router;
