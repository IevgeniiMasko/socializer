import { LOGIN_USER, LOGOUT_USER, UPDATE_TOKEN, UPDATE_USER } from "./types";

export const loginUser = ({ accessToken, userId, authUser }) => ({
  type: LOGIN_USER,
  userId,
  accessToken,
  authUser,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const updateUser = ({ user }) => ({
  type: UPDATE_USER,
  user,
});

export const updateToken = ({ accessToken }) => ({
  type: UPDATE_TOKEN,
  accessToken,
});
