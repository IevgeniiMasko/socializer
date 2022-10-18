import {
  ADD_ALL_POSTS,
  ADD_ONE_POST,
  CLEAR_POSTS,
  DELETE_POST,
  LIKE_POST,
} from "./types";

export const addAllPosts = ({ data }) => ({
  type: ADD_ALL_POSTS,
  posts: data,
});

export const addOnePost = ({ data }) => ({
  type: ADD_ONE_POST,
  post: data,
});

export const likePost = ({ data }) => ({
  type: LIKE_POST,
  post: data,
});

export const deletePost = ({ postId }) => ({
  type: DELETE_POST,
  postId,
});

export const clearPosts = () => ({
  type: CLEAR_POSTS,
});
