import { LOGIN_USER, LOGOUT_USER, UPDATE_TOKEN, UPDATE_USER } from "./types";

const authInitialState = {
  accessToken: null,
  authUser: localStorage?.authUser ? JSON.parse(localStorage?.authUser) : {},
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      const accessToken = action.accessToken;
      const authUser = action.authUser;
      localStorage.authUser = JSON.stringify(authUser);
      return { ...state, accessToken, authUser };

    case LOGOUT_USER:
      delete localStorage.authUser;
      return { ...authInitialState };

    case UPDATE_USER:
      return { ...state, authUser: action.user };

    case UPDATE_TOKEN:
      return { ...state, accessToken: action.accessToken };

    default:
      return state;
  }
};

export default authReducer;
