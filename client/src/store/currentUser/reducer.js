import { LOGOUT_USER } from "../auth/types";
import { ADD_CURRENT_USER, CLEAR_CURRENT_USER } from "./types";

const authInitialState = {};

const currentUserReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_USER:
      return { ...action.user };

    case CLEAR_CURRENT_USER:
      return authInitialState;

    default:
      return state;
  }
};

export default currentUserReducer;
