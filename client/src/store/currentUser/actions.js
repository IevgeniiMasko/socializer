import { ADD_CURRENT_USER, CLEAR_CURRENT_USER } from "./types";

export const addCurrentUser = ({ user }) => ({
  type: ADD_CURRENT_USER,
  user,
});

export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER,
});
