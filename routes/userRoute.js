import express from "express";
import {
  followUser,
  getAllFollowers,
  getAllUsers,
  getUser,
  updateUserPhoto,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/followers", getAllFollowers);
router.get("/user/:userId", getUser);
router.post("/user/:userId/follow", followUser);
router.put("/user/:userId/photo", updateUserPhoto);

export default router;
