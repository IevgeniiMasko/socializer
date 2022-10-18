import {
  ADD_ALL_POSTS,
  ADD_ONE_POST,
  CLEAR_POSTS,
  DELETE_POST,
  LIKE_POST,
} from "./types";

const postReducer = (state = [], action) => {
  let newState;

  switch (action.type) {
    case ADD_ALL_POSTS:
      return [...action.posts];

    case ADD_ONE_POST:
      return [action.post, ...state];

    case LIKE_POST:
      const likedBy = action.post.likedBy;
      const postId = action.post._id;
      newState = state.map((post) => {
        if (post._id === postId) post.likedBy = likedBy;
        return post;
      });
      return newState;

    case DELETE_POST:
      newState = state.filter((post) => {
        return post._id !== action.postId;
      });
      return newState;

    case CLEAR_POSTS:
      return [];

    default:
      return state;
  }
};

export default postReducer;
